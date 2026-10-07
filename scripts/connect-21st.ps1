$ErrorActionPreference = 'Stop'

# Run directly in a local PowerShell terminal. The key is never written to this project.
$secureKey = Read-Host 'Masukkan API key akun 21st.dev kamu (input disembunyikan)' -AsSecureString
$keyPointer = [IntPtr]::Zero

try {
    $keyPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)
    $apiKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($keyPointer).Trim()
    if ([string]::IsNullOrWhiteSpace($apiKey)) {
        throw 'API key kosong. Ambil key dari https://21st.dev/settings/api-keys.'
    }

    $requestHeaders = @{
        Authorization = "Bearer $apiKey"
        Accept = 'application/json, text/event-stream'
    }

    function Invoke-21stRpc {
        param([hashtable]$Payload)
        $response = Invoke-WebRequest -UseBasicParsing -Method Post `
            -Uri 'https://21st.dev/api/mcp' `
            -Headers $requestHeaders -ContentType 'application/json' `
            -Body ($Payload | ConvertTo-Json -Depth 12 -Compress) -TimeoutSec 30

        if ($response.Headers['Mcp-Session-Id']) {
            $requestHeaders['Mcp-Session-Id'] = [string]$response.Headers['Mcp-Session-Id']
        }
        if ([string]::IsNullOrWhiteSpace($response.Content)) { return $null }
        $responseText = [string]$response.Content
        if ($responseText.TrimStart().StartsWith('{')) {
            return ($responseText | ConvertFrom-Json)
        }
        foreach ($line in ($responseText -split '\r?\n')) {
            if ($line.StartsWith('data:')) {
                $message = $line.Substring(5).Trim() | ConvertFrom-Json
                if ($message.PSObject.Properties.Name -contains 'id') { return $message }
            }
        }
        throw 'Respons MCP tidak dapat dibaca. API key belum disimpan.'
    }

    $initialization = Invoke-21stRpc @{
        jsonrpc = '2.0'; id = 1; method = 'initialize'
        params = @{
            protocolVersion = '2025-03-26'
            capabilities = @{}
            clientInfo = @{ name = 'jascon-21st-setup'; version = '1.0.0' }
        }
    }
    if ($initialization.error -or -not $initialization.result.serverInfo) {
        throw 'Autentikasi atau inisialisasi MCP gagal. API key belum disimpan.'
    }
    $requestHeaders['MCP-Protocol-Version'] = $initialization.result.protocolVersion
    Invoke-21stRpc @{ jsonrpc = '2.0'; method = 'notifications/initialized' } | Out-Null
    $toolList = Invoke-21stRpc @{ jsonrpc = '2.0'; id = 2; method = 'tools/list'; params = @{} }
    if ($toolList.error -or -not $toolList.result.tools) {
        throw 'MCP belum mengembalikan daftar tools. API key belum disimpan.'
    }

    $usageTool = $toolList.result.tools | Where-Object { $_.name -eq 'get_usage' } | Select-Object -First 1
    if (-not $usageTool -or @($usageTool.inputSchema.required).Where({ $_ }).Count -gt 0) {
        throw 'Tool get_usage yang diharapkan belum tersedia. API key belum disimpan.'
    }
    $usageCheck = Invoke-21stRpc @{
        jsonrpc = '2.0'; id = 3; method = 'tools/call'
        params = @{ name = 'get_usage'; arguments = @{} }
    }
    if ($usageCheck.error -or $usageCheck.result.isError -or -not $usageCheck.result) {
        throw 'Pembacaan akun melalui get_usage gagal. API key belum disimpan.'
    }

    [Environment]::SetEnvironmentVariable('API_KEY_21ST', $apiKey, 'User')
    $env:API_KEY_21ST = $apiKey
    Write-Host 'MCP 21st.dev berhasil merespons; API key tersimpan di environment akun Windows.'
    Write-Host ("Tools tersedia: " + (($toolList.result.tools | ForEach-Object { $_.name }) -join ', '))
    Write-Host 'Tutup lalu buka kembali Codex agar API_KEY_21ST terbaca oleh aplikasi.'
    Write-Host 'Sesudah itu, minta Codex menguji tool bookmark atau get_usage yang hanya membaca data.'
}
catch {
    # Do not print HTTP response bodies or credential-bearing request details.
    Write-Host 'Koneksi gagal. API key belum disimpan oleh skrip ini. Cek key dan koneksi internet.' -ForegroundColor Red
    exit 1
}
finally {
    if ($keyPointer -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($keyPointer)
    }
    $apiKey = $null
    $secureKey.Dispose()
}
