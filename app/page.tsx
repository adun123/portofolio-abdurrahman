"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "./components/Reveal";

/* ----------------------------- content ----------------------------- */

const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  url?: string;
  private?: boolean;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "BTN AI OCR Workflow",
    category: "Banking · Document AI",
    year: "2026",
    problem:
      "Operations teams at BTN reviewed paper-heavy applications by hand — slow, inconsistent, and impossible to audit at scale.",
    solution:
      "A full-stack OCR workflow platform with AI-assisted extraction, traceable review queues, and structured handoff for downstream systems.",
    impact:
      "Repetitive document review became a clear, observable workflow with reviewer states, audit trails, and an enterprise-ready interface.",
    stack: ["Next.js", "TypeScript", "Node.js", "OCR", "LLM"],
    url: "https://btn-ai.vercel.app/",
  },
  {
    index: "02",
    title: "DCKTRP Document Intelligence",
    category: "Public Sector · Document AI",
    year: "2026",
    problem:
      "Administrative document flows mixed scanned forms, mixed quality scans, and inconsistent fields — manual review was the bottleneck.",
    solution:
      "Document intelligence system with OCR-assisted processing, classification, and a focused reviewer surface that exposes source context next to extracted fields.",
    impact:
      "Field validation, source inspection, and reviewer actions live on one screen — reducing context-switching across multi-page documents.",
    stack: ["Next.js", "Node.js", "OCR", "Document AI"],
    private: true,
  },
  {
    index: "03",
    title: "Pegadaian AI",
    category: "FinTech · Decision Support",
    year: "2025 — 2026",
    problem:
      "Collateral assessment and loan simulation lived in disconnected tools, forcing analysts to stitch data, pricing, and policy by hand.",
    solution:
      "An AI decision-support app that joins financial inputs, market pricing context, and Gemini-assisted reasoning into a single simulation experience.",
    impact:
      "Faster, more consistent collateral and loan exploration — with AI reasoning kept transparent next to the numbers.",
    stack: ["Next.js", "Express", "Gemini", "FinTech"],
    url: "https://pegadaian-dev.vercel.app/",
  },
  {
    index: "04",
    title: "BYD Content Marketing AI",
    category: "Creative AI · Marketing",
    year: "2026",
    problem:
      "Campaign teams started every brief from a blank page — slow ideation, inconsistent angles, and copy that didn't carry the product story.",
    solution:
      "A guided creative workflow that translates product inputs and visuals into campaign angles, directions, and asset-ready copy structures.",
    impact:
      "Ideation moved from blank-page work to a repeatable AI-assisted exploration loop the team can iterate on.",
    stack: ["Next.js", "Gemini", "Computer Vision", "Tailwind"],
    url: "https://byd-marketing-ai.vercel.app/",
  },
];

const EXPERIENCE = [
  {
    period: "Dec 2025 — Now",
    role: "Full Stack Engineer Intern",
    place: "PT Solusi Data Industri (Dataisolv)",
    detail:
      "Building product interfaces, backend flows, and AI-assisted web systems for enterprise workflow use cases.",
  },
  {
    period: "Apr — May 2026",
    role: "Agentic AI Co-Trainer",
    place: "XLSMART",
    detail:
      "Supporting agentic AI learning delivery, participant guidance, and practical workflow enablement.",
  },
  {
    period: "Sep 2024 — Jun 2025",
    role: "Research Intern",
    place: "STAS-RG",
    detail:
      "Contributing to research-group work — applied systems thinking, technical documentation, prototyping.",
  },
  {
    period: "2024 — 2025",
    role: "Teaching Assistant",
    place: "Telkom University",
    detail:
      "Supporting students with technical learning and structured practice across computing topics.",
  },
];

const SKILLS = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "PHP", "Laravel", "REST APIs"],
  },
  {
    label: "AI & LLM",
    items: [
      "Gemini",
      "OCR",
      "Document Intelligence",
      "Computer Vision",
      "Prompt Workflows",
    ],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "Schema Design", "Query Design", "Validation"],
  },
  {
    label: "Tooling",
    items: ["Git", "Vercel", "Postman", "Linux"],
  },
];

const ACHIEVEMENTS = [
  "PKM Funded Project — Program Kreativitas Mahasiswa",
  "1st Winner — Business Idea Competition",
];

/* ----------------------------- helpers ----------------------------- */

const screenshot = (url: string) =>
  `https://image.thum.io/get/width/1600/crop/1000/noanimate/${url}`;

/* ============================== page ============================== */

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Work />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}

/* ------------------------------- nav ------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-bg/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[88rem] items-center justify-between px-6 py-5 transition-colors duration-500 md:px-10 ${
          scrolled ? "border-b border-line" : "border-b border-transparent"
        }`}
      >
        <a
          href="#top"
          className="text-sm font-medium tracking-tight text-fg"
          aria-label="Abdurrahman — home"
        >
          Abdurrahman<span className="text-fg-muted">.</span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 md:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent-soft"
          >
            Get in touch
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-sm text-fg"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* mobile sheet */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-b border-line bg-bg/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-[88rem] flex-col gap-1 px-6 py-6"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-lg text-fg-soft transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="py-5 text-lg text-fg"
          >
            Get in touch →
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------ hero ------------------------------ */

function Hero() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const yShift = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -40]);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-40 pb-32 md:pt-56 md:pb-44"
    >
      {/* soft, subtle background — single radial wash, no glow noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, rgba(123,156,255,0.08), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50rem] opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] bg-grain"
      />

      <motion.div
        style={{ y: yShift }}
        className="mx-auto max-w-[88rem] px-6 md:px-10"
      >
        <Reveal duration={0.7}>
          <div className="mb-12 flex items-center gap-3 text-sm text-fg-muted">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 0 4px rgba(123,156,255,0.12)" }}
            />
            Available for new work — 2026
          </div>
        </Reveal>

        <Reveal delay={0.05} duration={0.9} y={20}>
          <h1 className="max-w-[18ch] text-balance font-medium tracking-[-0.04em] text-fg text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95]">
            Building <span className="serif text-fg-soft">intelligent</span>{" "}
            systems and{" "}
            <span className="serif text-fg-soft">digital</span>{" "}
            experiences.
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-16">
          <Reveal delay={0.15} className="md:col-span-7 md:col-start-1">
            <p className="max-w-[44ch] text-lg leading-relaxed text-fg-soft md:text-xl">
              I&apos;m Abdurrahman — an AI-powered full stack engineer working
              at the seam between product and machine intelligence. I build OCR
              pipelines, LLM workflows, and enterprise web products that move
              from prototype to reliable, observable systems.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="md:col-span-4 md:col-start-9">
            <div className="flex flex-col items-start gap-4 text-base text-fg-muted md:items-end">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 text-fg transition-colors hover:text-accent-soft"
              >
                <span className="h-px w-8 bg-fg/40 transition-all duration-300 group-hover:w-12 group-hover:bg-accent-soft" />
                Selected work
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
              >
                <span className="h-px w-8 bg-fg-muted/50 transition-all duration-300 group-hover:w-12 group-hover:bg-fg" />
                Get in touch
              </a>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------ work ------------------------------ */

function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-32 md:py-48">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <Reveal>
          <SectionHeader index="(01)" label="Selected Work">
            A handful of projects where AI met a real workflow — and shipped.
          </SectionHeader>
        </Reveal>

        <div className="mt-24 flex flex-col gap-32 md:gap-48">
          {PROJECTS.map((p, i) => (
            <ProjectCase key={p.title} project={p} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCase({
  project,
  reverse,
}: {
  project: Project;
  reverse: boolean;
}) {
  return (
    <article className="grid gap-10 md:grid-cols-12 md:gap-12">
      {/* preview */}
      <Reveal
        className={`md:col-span-7 ${reverse ? "md:order-2 md:col-start-6" : ""}`}
        duration={0.9}
      >
        <ProjectPreview project={project} />
      </Reveal>

      {/* meta + body */}
      <Reveal
        className={`md:col-span-5 md:self-end ${
          reverse ? "md:order-1 md:col-start-1" : ""
        }`}
        delay={0.1}
      >
        <div className="flex items-center gap-4 text-sm text-fg-muted">
          <span className="font-mono text-fg">{project.index}</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          <span>{project.year}</span>
        </div>

        <p className="mt-6 text-sm tracking-wide text-fg-muted">
          {project.category}
        </p>

        <h3 className="mt-3 text-balance font-medium tracking-[-0.03em] text-fg text-[clamp(2rem,4vw,3.25rem)] leading-[1.02]">
          {project.title}
        </h3>

        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-fg-soft">
          <p>
            <span className="text-fg-muted">Problem — </span>
            {project.problem}
          </p>
          <p>
            <span className="text-fg-muted">Approach — </span>
            {project.solution}
          </p>
          <p>
            <span className="text-fg-muted">Impact — </span>
            {project.impact}
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-fg-muted">
          {project.stack.map((s, i) => (
            <li key={s} className="flex items-center gap-4">
              {i > 0 && (
                <span aria-hidden className="text-fg-faint">
                  ·
                </span>
              )}
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-3 border-b border-line pb-2 text-sm text-fg transition-colors hover:border-accent-soft hover:text-accent-soft"
            >
              Visit live site
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-3 border-b border-line pb-2 text-sm text-fg-muted">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-fg-faint"
              />
              Private engagement
            </span>
          )}
        </div>
      </Reveal>
    </article>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const hasUrl = Boolean(project.url);

  return (
    <div className="group relative">
      {/* browser-like thin chrome — quiet, not skeuomorphic */}
      <div className="flex items-center gap-1.5 px-1 pb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-fg-faint/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-fg-faint/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-fg-faint/30" />
        <span className="ml-3 truncate text-xs text-fg-faint">
          {hasUrl
            ? new URL(project.url!).hostname.replace(/^www\./, "")
            : "private.case-study"}
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-bg-2">
        {hasUrl ? (
          <Image
            src={screenshot(project.url!)}
            alt={`${project.title} — live preview`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            unoptimized
          />
        ) : (
          <PrivatePreview project={project} />
        )}

        {/* gentle vignette so screenshot fits the dark canvas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,11,0) 60%, rgba(10,10,11,0.6) 100%)",
          }}
        />
      </div>
    </div>
  );
}

function PrivatePreview({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-8">
      <div className="flex items-center justify-between text-xs text-fg-muted">
        <span>{project.category}</span>
        <span>{project.index}</span>
      </div>
      <div>
        <p className="serif text-fg-soft text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05]">
          A document intelligence surface where{" "}
          <span className="text-fg">extraction</span>,{" "}
          <span className="text-fg">classification</span>, and{" "}
          <span className="text-fg">review</span> live on the same screen.
        </p>
      </div>
      <div className="flex items-center justify-between text-xs text-fg-faint">
        <span>{project.year}</span>
        <span>Confidential</span>
      </div>
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(237,237,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(237,237,237,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ------------------------------ about ------------------------------ */

function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-32 md:py-48">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-3">
            <p className="tab">(02) — About</p>
            <div className="mt-12 hidden md:block">
              <div className="relative aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-md border border-line bg-bg-2">
                <Image
                  src="/photo.jpeg"
                  alt="Portrait of Abdurrahman"
                  fill
                  sizes="(min-width: 768px) 16rem, 50vw"
                  className="object-cover grayscale-[15%]"
                  priority={false}
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-9 md:col-start-4" delay={0.1}>
            <h2 className="max-w-[20ch] text-balance font-medium tracking-[-0.035em] text-fg text-[clamp(2rem,5vw,4.25rem)] leading-[1.04]">
              An engineer for teams moving AI from{" "}
              <span className="serif text-fg-soft">demo</span> to{" "}
              <span className="serif text-fg-soft">workflow</span>.
            </h2>

            <div className="mt-12 grid gap-8 text-[17px] leading-relaxed text-fg-soft md:grid-cols-2 md:gap-12">
              <p>
                I&apos;m an Informatics student at Telkom University and a full
                stack engineer working across interfaces, backend services, OCR
                pipelines, and LLM-enabled workflows. My work sits where product
                clarity meets technical execution — enterprise dashboards,
                document intelligence, FinTech experiments, and AI workflows
                that make complex operations easier to review and ship.
              </p>
              <p>
                I care about restraint: clear interfaces, observable systems,
                and code that ages well. The best engineering I&apos;ve seen
                feels quiet — the system does the work, and the product gets
                out of the way.
              </p>
            </div>

            {/* mobile portrait */}
            <div className="mt-12 md:hidden">
              <div className="relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-md border border-line bg-bg-2">
                <Image
                  src="/photo.jpeg"
                  alt="Portrait of Abdurrahman"
                  fill
                  sizes="80vw"
                  className="object-cover grayscale-[15%]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- experience ---------------------------- */

function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-32 md:py-48">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <Reveal>
          <SectionHeader index="(03)" label="Experience">
            A path through engineering, AI training, research, and teaching.
          </SectionHeader>
        </Reveal>

        <ul className="mt-20 border-t border-line">
          {EXPERIENCE.map((item, i) => (
            <Reveal as="li" key={item.role + item.place} delay={i * 0.05}>
              <div className="grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-bg-2/40 md:grid-cols-12 md:gap-8 md:py-10">
                <div className="md:col-span-3">
                  <p className="text-sm text-fg-muted">{item.period}</p>
                </div>
                <div className="md:col-span-6">
                  <h3 className="text-xl font-medium tracking-tight text-fg md:text-2xl">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-fg-muted">{item.place}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-[15px] leading-relaxed text-fg-soft">
                    {item.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* achievements — quiet, inline */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-4 text-sm text-fg-muted md:grid-cols-2 md:gap-8">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a}
                className="flex items-center gap-4 border-t border-line pt-6"
              >
                <span aria-hidden className="text-fg-faint">
                  ✦
                </span>
                <span className="text-fg-soft">{a}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- skills ----------------------------- */

function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-32 md:py-48">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <Reveal>
          <SectionHeader index="(04)" label="Toolkit">
            Tools I reach for, grouped by where they live in a build.
          </SectionHeader>
        </Reveal>

        <div className="mt-20 border-t border-line">
          {SKILLS.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-4 border-b border-line py-7 md:grid-cols-12 md:gap-8 md:py-9">
                <div className="md:col-span-3">
                  <p className="tab">{group.label}</p>
                </div>
                <div className="md:col-span-9">
                  <p className="text-lg leading-relaxed text-fg-soft md:text-xl">
                    {group.items.map((item, idx) => (
                      <span key={item}>
                        {item}
                        {idx < group.items.length - 1 && (
                          <span
                            aria-hidden
                            className="mx-3 text-fg-faint"
                          >
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- contact ----------------------------- */

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-32 md:py-56">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <Reveal>
          <p className="tab">(05) — Contact</p>
        </Reveal>

        <Reveal delay={0.05} duration={0.9} y={20}>
          <h2 className="mt-10 max-w-[16ch] text-balance font-medium tracking-[-0.04em] text-fg text-[clamp(2.75rem,8vw,7rem)] leading-[0.95]">
            Let&apos;s build something{" "}
            <span className="serif text-fg-soft">lasting</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-[52ch] text-lg leading-relaxed text-fg-soft md:text-xl">
            Open to conversations around AI-powered web apps, OCR platforms,
            document intelligence, and LLM integrations. Quick replies,
            considered work.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="mailto:abdurrahmanaikon@gmail.com"
            className="group mt-16 inline-flex items-baseline gap-4 border-b border-line pb-3 text-balance font-medium tracking-[-0.02em] text-fg text-[clamp(1.5rem,3.5vw,2.75rem)] transition-colors hover:border-accent-soft hover:text-accent-soft md:mt-20"
          >
            abdurrahmanaikon@gmail.com
            <span
              aria-hidden
              className="text-fg-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-soft"
            >
              ↗
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.3}>
          <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-sm text-fg-muted">
            <li>
              <a
                href="https://www.linkedin.com/in/abdurrahman-8719092b1"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-fg"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href="/Abdurrahman-CV.pdf"
                download
                className="transition-colors hover:text-fg"
              >
                Download CV
              </a>
            </li>
            <li>
              <a
                href="tel:+6281398515784"
                className="transition-colors hover:text-fg"
              >
                +62 813 9851 5784
              </a>
            </li>
            <li className="text-fg-faint">Jakarta · Open to remote</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- footer ----------------------------- */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-4 px-6 py-10 text-xs text-fg-faint md:flex-row md:items-center md:justify-between md:px-10">
        <span>© {year} Abdurrahman. All rights reserved.</span>
        <span>Designed and built in Jakarta.</span>
        <a href="#top" className="transition-colors hover:text-fg">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

/* --------------------------- shared bits --------------------------- */

function SectionHeader({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
      <div className="md:col-span-4">
        <p className="tab">
          {index} — {label}
        </p>
      </div>
      <div className="md:col-span-8">
        <p className="max-w-[28ch] text-balance text-fg-soft text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2]">
          {children}
        </p>
      </div>
    </div>
  );
}
