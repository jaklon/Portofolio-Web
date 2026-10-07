import { writeFile } from 'node:fs/promises'

const endpoint = 'https://21st.dev/api/mcp'
const token = process.env.API_KEY_21ST
const headers = {
  Accept: 'application/json, text/event-stream',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token ?? ''}`,
}

async function rpc(method, params, id) {
  const body = { jsonrpc: '2.0', method }
  if (params !== undefined) body.params = params
  if (id !== undefined) body.id = id
  const response = await fetch(endpoint, {
    method: 'POST', headers, body: JSON.stringify(body), signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) throw new Error(`MCP HTTP status ${response.status}`)
  const session = response.headers.get('mcp-session-id')
  if (session) headers['Mcp-Session-Id'] = session
  if (id === undefined) return null
  const text = await response.text()
  let messages
  if (text.trimStart().startsWith('{')) messages = [JSON.parse(text)]
  else messages = text.split(/\r?\n/).filter(line => line.startsWith('data:'))
    .map(line => JSON.parse(line.slice(5).trim()))
  const message = messages.find(item => item.id === id)
  if (!message || message.error) throw new Error(`MCP RPC failed: ${method}`)
  return message.result
}

try {
  if (!token) throw new Error('API_KEY_21ST is missing')
  const init = await rpc('initialize', {
    protocolVersion: '2025-03-26', capabilities: {},
    clientInfo: { name: 'jascon-21st-check', version: '1.0.0' },
  }, 1)
  headers['MCP-Protocol-Version'] = init.protocolVersion
  await rpc('notifications/initialized')
  const listed = await rpc('tools/list', {}, 2)
  const tools = [...listed.tools]
  let cursor = listed.nextCursor
  let requestId = 3
  while (cursor) {
    const next = await rpc('tools/list', { cursor }, requestId++)
    tools.push(...next.tools)
    cursor = next.nextCursor
  }

  const toolName = process.argv[2]
  if (!toolName) {
    console.log(JSON.stringify({
      endpoint, server: init.serverInfo, protocol: init.protocolVersion,
      tools: tools.map(tool => ({
        name: tool.name,
        ...( /bookmark|usage|profile|list.*team|get_component/i.test(tool.name)
          ? { description: tool.description, inputSchema: tool.inputSchema, annotations: tool.annotations }
          : {}),
      })),
    }, null, 2))
  } else {
    const tool = tools.find(item => item.name === toolName)
    if (!tool) throw new Error('Requested tool is not exposed by the server')
    if (tool.annotations?.readOnlyHint !== true) throw new Error('MCP check accepts only read-only tools')
    const rawArgs = process.env.TWENTY_FIRST_CHECK_ARGS ?? process.argv[3]
    const args = rawArgs ? JSON.parse(rawArgs) : {}
    for (const required of tool.inputSchema?.required ?? []) {
      if (!(required in args)) throw new Error(`Required argument missing: ${required}`)
    }
    const result = await rpc('tools/call', { name: toolName, arguments: args }, requestId++)
    if (result.isError) throw new Error(`MCP tool failed: ${toolName}`)
    const output = { endpoint, server: init.serverInfo, tool: toolName, result }
    console.log(JSON.stringify(output, null, 2))
    if (process.env.TWENTY_FIRST_CHECK_OUTPUT) {
      await writeFile(process.env.TWENTY_FIRST_CHECK_OUTPUT, JSON.stringify(output, null, 2) + '\n')
    }
  }
} catch (error) {
  // Never print bearer tokens, request headers, or HTTP error bodies.
  console.error(error.message.includes('MCP') || error.message.startsWith('Required')
    ? error.message : '21st connection check failed')
  process.exitCode = 1
}
