export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  url?: string;
  images: string[]; // exactly 4, equal aspect ratio
  private?: boolean; // no screenshots — use creative document visual
};

/**
 * Image convention: /public/projects/<slug>/1.png … 4.png
 * Until the user supplies real screenshots, ProjectTile shows a labeled
 * gradient placeholder automatically.
 */
function imgs(slug: string): string[] {
  return [1, 2, 3, 4].map((n) => `/projects/${slug}/${n}.png`);
}

export const PROJECTS: Project[] = [
  {
    slug: "btn-ai",
    title: "BTN AI OCR Workflow",
    category: "Banking · Document AI",
    year: "2026",
    description:
      "Full-stack OCR workflow platform with AI-assisted extraction, traceable review queues, and structured handoff for downstream banking systems.",
    stack: ["Next.js", "TypeScript", "Node.js", "OCR", "LLM"],
    url: "https://btnai.vercel.app/",
    images: imgs("btn-ai"),
  },
  {
    slug: "dcktrp",
    title: "DCKTRP Document Intelligence",
    category: "Public Sector · Document AI",
    year: "2026",
    description:
      "Document intelligence system with OCR-assisted processing, classification, and a focused reviewer surface for multi-page government documents.",
    stack: ["Next.js", "Node.js", "OCR", "Document AI"],
    images: imgs("dcktrp"),
    private: true,
  },
  {
    slug: "pegadaian",
    title: "Pegadaian AI",
    category: "FinTech · Decision Support",
    year: "2025 — 2026",
    description:
      "AI decision-support app joining financial inputs, market pricing, and Gemini-assisted reasoning into a single collateral simulation experience.",
    stack: ["Next.js", "Express", "Gemini", "FinTech"],
    url: "https://pegadaian-dev.vercel.app/",
    images: imgs("pegadaian"),
  },
  {
    slug: "byd",
    title: "BYD Content Marketing AI",
    category: "Creative AI · Marketing",
    year: "2026",
    description:
      "Guided creative workflow translating product inputs and visuals into campaign angles, directions, and asset-ready copy structures.",
    stack: ["Next.js", "Gemini", "Computer Vision", "Tailwind"],
    url: "https://byd-marketing-ai.vercel.app/",
    images: imgs("byd"),
  },
  {
    slug: "aquaculture",
    title: "AquaCulture",
    category: "IoT · Aquaculture Monitoring",
    year: "2025",
    description:
      "Web-based fish farming monitoring system integrating IoT sensors to track water quality (pH, temperature,dissolved oxygen) and log fish feeding data through real-time dashboards and historical charts.",
    stack: ["Laravel", "MySQL", "Tailwind", "Alpine.js", "Chart.js", "Sanctum"],
    url: "",
    images: imgs("aquaculture"),
  },
];

export const EXPERIENCE = [
  {
    period: "Dec 2025 — Jun 2026",
    role: "Full Stack Engineer Intern",
    place: "PT Solusi Data Industri (Dataisolv)",
  },
  {
    period: "Apr — May 2026",
    role: "Agentic AI Co-Trainer",
    place: "XLSMART",
  },
  {
    period: "Sep 2024 — Jun 2025",
    role: "Research Intern",
    place: "STAS-RG",
  },
  {
    period: "2024 — 2025",
    role: "Teaching Assistant",
    place: "Telkom University",
  },
];

export const SKILLS = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"] },
  { label: "Backend", items: ["Node.js", "Express", "PHP", "Laravel", "REST"] },
  { label: "AI & LLM", items: ["Gemini", "OCR", "Document AI", "Prompting"] },
  { label: "Data", items: ["PostgreSQL", "Schema Design", "Validation"] },
  { label: "Tooling", items: ["Git", "Vercel", "Postman"] },
];

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
