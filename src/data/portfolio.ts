import type {
  Achievement,
  Education,
  Experience,
  Project,
  SkillGroup,
} from '../types/portfolio'

export const projects: Project[] = [
  {
    slug: 'circular-waste-company-profile',
    title: 'Circular Waste Company Profile',
    client: 'PT Circular Waste Management',
    category: 'freelance',
    role: 'Website Developer',
    period: 'Jun 2026 — Present',
    status: 'Ongoing',
    featured: true,
    summary:
      'A responsive company profile delivered from interface implementation through production operations.',
    overview:
      'An end-to-end website engagement covering the public-facing experience and the practical work required to move it into production.',
    contributions: [
      'Built the responsive React company profile and interaction system.',
      'Implemented the enquiry flow with EmailJS and prepared SEO metadata and the web manifest.',
      'Handled domain activation, hosting, company email, and GitHub Actions to FTP deployment.',
    ],
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'EmailJS', 'GitHub Actions'],
    deliveryContext:
      'The work combines frontend delivery with the operational details of launching and maintaining a business website.',
    media: [{ src: '/projects/circular-waste/home.webp', alt: 'Circular Waste Management homepage with its green circular-economy hero and waste-processing solutions', width: 1274, height: 717 }],
    cover: { src: '/projects/circular-waste/cover.webp', alt: 'Circular Waste Management logo and screenshot of circularwaste.id', width: 1024, height: 1024 },
    externalUrl: 'https://circularwaste.id/',
    logo: '/projects/circular-waste/logo.png',
    visual: 'circular',
    accent: 'lime',
  },
  {
    slug: 'lippi-mining-company-profile',
    title: 'Mining Company Profile',
    client: 'PT Lippi Mining',
    category: 'freelance',
    role: 'Website Developer',
    period: 'Aug 2026',
    status: 'Completed',
    featured: false,
    summary:
      'A React company profile with a server-backed SMTP contact path and production hosting setup.',
    overview:
      'A focused business website built around clear company information, responsive presentation, and a reliable route for inbound enquiries.',
    contributions: [
      'Developed the responsive frontend using React and Tailwind CSS.',
      'Connected the contact experience to a PHP 8.1 SMTP backend.',
      'Deployed the static build to cPanel and Apache and configured the hosting and company email environment.',
    ],
    stack: ['React 18', 'Tailwind CSS', 'PHP 8.1', 'SMTP', 'cPanel', 'Apache'],
    deliveryContext:
      'The delivery required coordination between a modern static frontend and a conventional shared-hosting environment.',
    media: [{ src: '/projects/lippi-mining/home.webp', alt: 'Lippi Mining Consultant homepage with its navy and orange resource-management hero', width: 1270, height: 714 }],
    cover: { src: '/projects/lippi-mining/cover.webp', alt: 'Lippi Mining Consultant logo and screenshot of lippimining.co', width: 1024, height: 1024 },
    externalUrl: 'https://lippimining.co/',
    logo: '/projects/lippi-mining/logo.webp',
    visual: 'industrial',
    accent: 'cyan',
  },
  {
    slug: 'carbon-treat-one-page-site',
    title: 'Carbon Treat One-page Site',
    client: 'Yayasan Carbon Treat Indonesia',
    category: 'freelance',
    role: 'Web Developer',
    period: 'Aug 2026',
    status: 'Completed',
    featured: false,
    summary:
      'A compact one-page organisation profile with a native PHP and PHPMailer contact workflow.',
    overview:
      'A concise web presence designed to keep the organisation story and contact journey in one responsive page.',
    contributions: [
      'Built the one-page React experience and responsive layout.',
      'Implemented the contact flow with native PHP and PHPMailer SMTP.',
      'Managed npm and Composer dependencies and deployed the production build through cPanel.',
    ],
    stack: ['React 19', 'Tailwind CSS', 'PHP', 'PHPMailer', 'Composer', 'cPanel'],
    deliveryContext:
      'The project paired a lightweight frontend with a hosting-compatible server mail flow.',
    media: [{ src: '/projects/carbon-treat/home.webp', alt: 'Carbon Treat Indonesia homepage with its foundation logo and green forest landscape', width: 1265, height: 712 }],
    cover: { src: '/projects/carbon-treat/cover.webp', alt: 'Carbon Treat Indonesia logo and screenshot of carbontreat.id', width: 1024, height: 1024 },
    externalUrl: 'https://carbontreat.id/',
    logo: '/projects/carbon-treat/logo.png',
    visual: 'carbon',
    accent: 'lime',
  },
  {
    slug: 'alpha-power-company-profile',
    title: 'Alpha Power Company Profile',
    client: 'Alpha Power Co., Ltd.',
    category: 'freelance',
    role: 'Website Builder',
    period: 'Jul 2025',
    status: 'Completed',
    featured: false,
    summary:
      'A Wix-based company profile and on-page SEO engagement for an international client.',
    overview:
      'A business website engagement for a Kaohsiung-based company, focused on accessible content presentation and search readiness.',
    contributions: [
      'Built and configured the company profile using Wix.',
      'Implemented the on-page SEO foundation.',
      'Supported production of a professional company promotional video.',
    ],
    stack: ['Wix', 'On-page SEO', 'Content delivery'],
    deliveryContext:
      'This remote engagement added international client collaboration to the delivery process.',
    media: [{ src: '/projects/alpha-power/home.webp', alt: 'Alpha Power homepage with its company logo and customized industrial gearbox hero', width: 1253, height: 705 }],
    cover: { src: '/projects/alpha-power/cover.webp', alt: 'Alpha Power logo and screenshot of alphamachinery.net', width: 1024, height: 1024 },
    externalUrl: 'https://www.alphamachinery.net/',
    logo: '/projects/alpha-power/logo.avif',
    visual: 'power',
    accent: 'blue',
  },
  {
    slug: 'fire-detection-nlp-chatbot',
    title: 'Fire Detection NLP Chatbot',
    client: 'Politeknik Negeri Jakarta',
    category: 'academic',
    role: 'Project Leader · NLP Chatbot Developer',
    period: 'Academic project',
    status: 'Completed',
    featured: true,
    summary:
      'The conversational AI component of a multidisciplinary fire detection platform combining web, vision, machine learning, and IoT.',
    overview:
      'A five-person academic project in which I led the team and owned the NLP chatbot, connecting a served language model to retrieved reference material.',
    contributions: [
      'Led a five-member team across the wider fire detection system.',
      'Developed the chatbot with Qwen 2.5 3B AWQ served through vLLM.',
      'Implemented retrieval using ChromaDB, BM25, and Sentence Transformers.',
    ],
    stack: ['Qwen 2.5 3B AWQ', 'vLLM', 'RAG', 'ChromaDB', 'BM25', 'Sentence Transformers'],
    deliveryContext:
      'The chatbot was one component in a broader system spanning a web application, computer vision, machine learning, and IoT sensors.',
    media: [],
    visual: 'fire',
    accent: 'cyan',
  },
  {
    slug: 'integrated-web-mobile-applications',
    title: 'Integrated Web & Mobile Applications',
    client: 'CEP — CCIT FTUI',
    category: 'academic',
    role: 'Project Leader · Software Integration',
    period: '2022 — 2025',
    status: 'Academic collection',
    featured: false,
    summary:
      'A collection of project-based website, mobile, and web-mobile integration work completed during software engineering study.',
    overview:
      'Multiple academic builds covering design, development, integration, and team delivery across browser and mobile surfaces.',
    contributions: [
      'Led multiple website and mobile application projects.',
      'Coordinated design, development, integration, and delivery work.',
      'Connected web and mobile components while applying Java, Kotlin, and DevOps foundations.',
    ],
    stack: ['Java', 'Kotlin', 'Web-mobile integration', 'DevOps foundations'],
    deliveryContext:
      'The collection represents repeated project delivery rather than a single product or public repository.',
    media: [],
    visual: 'connected',
    accent: 'blue',
  },
  {
    slug: 'ciso-security-operations',
    title: 'CISO Security Operations',
    client: 'PT Mandiri Sekuritas',
    category: 'internship',
    role: 'CISO Intern',
    period: 'Jul 2026 — Present',
    status: 'In progress',
    featured: true,
    confidential: true,
    summary:
      'High-level contributions to internal security operations tooling, risk analysis, and security-awareness work.',
    overview:
      'An ongoing internship inside the CISO division. This public case study intentionally stays at responsibility level and excludes internal interfaces, architecture, data, workflows, and credentials.',
    contributions: [
      'Contributing to internal dashboard surfaces that support security operations.',
      'Supporting vulnerability and risk-event analysis.',
      'Assisting with security-awareness simulation and campaign preparation.',
    ],
    stack: ['Internal tooling', 'Security operations', 'Risk analysis'],
    deliveryContext:
      'The work is confidential and in progress. No internal product media, system detail, or operational data is published.',
    media: [],
    visual: 'secure',
    accent: 'lime',
  },
]

export const experiences: Experience[] = [
  {
    company: 'PT Mandiri Sekuritas',
    role: 'CISO Intern',
    period: 'Jul 2026 — Present',
    mode: 'Jakarta · On-site',
    summary: 'Contributing to internal security tooling, risk analysis, and security-awareness work.',
  },
  {
    company: 'PT Circular Waste Management',
    role: 'Website Developer · Freelance',
    period: 'Jun 2026 — Present',
    mode: 'Remote',
    summary: 'Building and operating a responsive company website from frontend through deployment.',
  },
  {
    company: 'PT Lippi Mining',
    role: 'Website Developer · Freelance',
    period: 'Aug 2026',
    mode: 'Remote',
    summary: 'Delivered a React company profile, SMTP contact backend, and shared-hosting setup.',
  },
  {
    company: 'Yayasan Carbon Treat Indonesia',
    role: 'Web Developer · Freelance',
    period: 'Aug 2026',
    mode: 'Remote',
    summary: 'Delivered a one-page React website and PHP mail flow through cPanel.',
  },
  {
    company: 'Alpha Power Co., Ltd.',
    role: 'Website Builder · Freelance',
    period: 'Jul 2025',
    mode: 'Taiwan · Remote',
    summary: 'Built a Wix company profile and its on-page SEO foundation.',
  },
]

export const education: Education[] = [
  {
    institution: 'Politeknik Negeri Jakarta',
    program: 'Informatics Engineering · Semester 7',
    period: '2022 — Present',
    summary: 'Coursework spans data and big data, application frameworks, cloud computing, visual programming, and ICT project management.',
  },
  {
    institution: 'CEP — CCIT FTUI',
    program: 'Software Engineering',
    period: '2022 — Nov 2025',
    summary: 'Project-based web, mobile, and integration work using Java, Kotlin, and DevOps foundations.',
  },
]

export const achievements: Achievement[] = [
  { title: 'Certified LLM Security Expert', issuer: 'Red Team Leaders', date: 'Jul 2026' },
  { title: 'Web Application Hackathon Participant', issuer: 'National Play IT', date: 'Jun 2026' },
  { title: 'TOEPS PBT · 583', issuer: 'Neo Spectra English Course', date: 'Oct 2025' },
  { title: '5th IC2IE Participant', issuer: 'International Conference', date: '2022' },
]

export const skillGroups: SkillGroup[] = [
  { label: 'Frontend', skills: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Tailwind CSS', 'Vite', 'Motion'] },
  { label: 'Backend & Integration', skills: ['Python', 'PHP', 'SMTP', 'EmailJS', 'PHPMailer', 'Web-mobile integration'] },
  { label: 'AI & Retrieval', skills: ['LLM integration', 'Qwen', 'vLLM', 'RAG', 'ChromaDB', 'BM25', 'Sentence Transformers'] },
  { label: 'Delivery', skills: ['GitHub Actions', 'FTP', 'cPanel', 'Apache', 'Domain & hosting setup', 'On-page SEO'] },
  { label: 'Foundations', skills: ['Java', 'Kotlin', 'Mobile development', 'DevOps concepts', 'Project leadership'] },
]

export const contacts = {
  email: 'jasconkembuan9@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jascon-kembuan',
}
