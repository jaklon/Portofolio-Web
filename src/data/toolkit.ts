export type ToolkitCategory = 'frontend' | 'backend' | 'ai' | 'devops' | 'mobile' | 'security'

export interface ToolkitTool {
  id: string
  title: string
  category: ToolkitCategory
  description: string
  src: string
  alt: string
}

export const toolkitCategories: { id: ToolkitCategory; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI & Data' },
  { id: 'devops', label: 'DevOps' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'security', label: 'Cybersecurity' },
]

const entries: [string, string, ToolkitCategory, string][] = [
  ['react', 'React', 'frontend', 'Responsive company profiles and web interfaces.'],
  ['typescript', 'TypeScript', 'frontend', 'Typed frontend development.'],
  ['javascript', 'JavaScript', 'frontend', 'Interactive experiences in the browser.'],
  ['html5', 'HTML', 'frontend', 'Semantic structure for web pages.'],
  ['css', 'CSS', 'frontend', 'Responsive layouts, styling, and visual details.'],
  ['tailwindcss', 'Tailwind CSS', 'frontend', 'Utility-based styling in web projects.'],
  ['vite', 'Vite', 'frontend', 'Frontend development and production builds.'],
  ['motion', 'Motion / Framer Motion', 'frontend', 'Interface transitions and animation.'],
  ['gsap', 'GSAP', 'frontend', 'Scroll and interface animation.'],
  ['wix', 'Wix', 'frontend', 'Company-profile delivery for Alpha Power.'],
  ['python', 'Python', 'backend', 'Backend and applied AI development.'],
  ['php', 'PHP', 'backend', 'Server-side contact and SMTP workflows.'],
  ['emailjs', 'EmailJS', 'backend', 'The enquiry workflow for Circular Waste.'],
  ['phpmailer', 'PHPMailer', 'backend', 'SMTP contact delivery for Carbon Treat.'],
  ['smtp', 'SMTP', 'backend', 'Email transport in client contact workflows.'],
  ['qwen', 'Qwen', 'ai', 'Qwen 2.5 3B AWQ in the fire-detection chatbot.'],
  ['vllm', 'vLLM', 'ai', 'Serving the language model for the NLP chatbot.'],
  ['chroma', 'ChromaDB', 'ai', 'Vector retrieval in the academic chatbot.'],
  ['sentence-transformers', 'Sentence Transformers', 'ai', 'Embeddings for the chatbot retrieval workflow.'],
  ['bm25', 'BM25', 'ai', 'Keyword retrieval in the chatbot.'],
  ['rag', 'RAG', 'ai', 'Connecting the chatbot to retrieved reference material.'],
  ['githubactions', 'GitHub Actions', 'devops', 'The build-to-FTP deployment workflow for Circular Waste.'],
  ['apache', 'Apache', 'devops', 'Production web hosting for client websites.'],
  ['cpanel', 'cPanel', 'devops', 'Website deployment and shared-hosting setup.'],
  ['composer', 'Composer', 'devops', 'PHP dependency management for Carbon Treat.'],
  ['npm', 'npm', 'devops', 'JavaScript dependency and build workflows.'],
  ['ftp', 'FTP', 'devops', 'Publishing website builds to production hosting.'],
  ['java', 'Java', 'mobile', 'Academic software engineering and application projects.'],
  ['kotlin', 'Kotlin', 'mobile', 'Academic mobile application development.'],
  ['gophish', 'Gophish', 'security', 'A phishing-simulation tool I have worked with.'],
  ['tenable', 'Tenable', 'security', 'Vulnerability and exposure-management tooling I have used.'],
  ['trendmicro', 'Trend Micro', 'security', 'Cybersecurity tooling I have worked with.'],
  ['laps', 'Microsoft LAPS', 'security', 'Local administrator password-management tooling I have used.'],
  ['cyberark', 'CyberArk PAM', 'security', 'Privileged access-management tooling I have worked with.'],
]

export const toolkit: ToolkitTool[] = entries.map(([id, title, category, description]) => ({
  id, title, category, description,
  src: `/logos/${id}.svg`,
  alt: `${title} icon`,
}))
