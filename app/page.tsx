"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const navLinks = ["About", "Skills", "Work", "Contact"];

const skills = [
  {
    category: "Interface Systems",
    signal: "01",
    items: ["React", "Next.js", "TypeScript", "Design Systems", "Motion"],
  },
  {
    category: "Product Engines",
    signal: "02",
    items: ["Node.js", "Express", "PHP", "Laravel", "PostgreSQL", "Prisma"],
  },
  {
    category: "Delivery Ops",
    signal: "03",
    items: ["Docker", "Vercel", "Git", "CI/CD", "Linux"],
  },
];

const projects = [
  {
    number: "01",
    title: "Pegadaian AI App",
    category: "Full Stack / AI + FinTech",
    description:
      "OCR document intelligence and computer vision workflows for collateral assessment, market pricing, and real-time loan simulations with rule-based financial models.",
    stack: ["Next.js", "Node.js", "Gemini AI", "Tailwind", "Express"],
    year: "2025",
    proof: "Collateral scoring lab",
  },
  {
    number: "02",
    title: "BYD Content Marketing AI",
    category: "AI Product / Creative Automation",
    description:
      "A single-asset campaign engine that turns product visuals into image, caption, and video concepts through prompt tuning and template-led generation flows.",
    stack: ["Next.js", "Gemini AI", "Computer Vision", "Tailwind", "Node.js"],
    year: "2025",
    proof: "Campaign generation desk",
  },
  {
    number: "03",
    title: "Orion CMS",
    category: "Full Stack / SaaS",
    description:
      "Headless editorial platform with role-based access, media CDN handling, and a live-preview workspace for fast-moving content teams.",
    stack: ["React", "Node.js", "Prisma", "S3"],
    year: "2024",
    proof: "Editorial control room",
  },
];

const timeline = [
  ["Jakarta", "Building from Indonesia for teams that move across time zones."],
  ["5+ years", "From first interface sketches to production infrastructure."],
  ["AI ready", "FinTech, computer vision, and creative automation shaped into usable tools."],
];

const portraitSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 900">
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f2d9b0"/>
      <stop offset="0.52" stop-color="#c87f45"/>
      <stop offset="1" stop-color="#14434b"/>
    </linearGradient>
    <radialGradient id="halo" cx="34%" cy="23%" r="58%">
      <stop offset="0" stop-color="#fff6df" stop-opacity="0.94"/>
      <stop offset="1" stop-color="#fff6df" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="720" height="900" fill="#17282b"/>
  <rect width="720" height="900" fill="url(#paper)" opacity="0.9"/>
  <circle cx="255" cy="210" r="260" fill="url(#halo)"/>
  <path d="M95 782c39-166 147-267 281-267s235 102 264 267" fill="#10191a" opacity="0.86"/>
  <path d="M218 381c-12-112 39-206 154-210 119-4 174 88 166 203-8 117-69 202-158 205-87 3-149-80-162-198Z" fill="#6f3c27"/>
  <path d="M233 356c24-48 91-43 132-72 57-39 103-18 151 21-15-84-65-139-145-137-91 2-138 72-138 188Z" fill="#10191a"/>
  <path d="M231 410c32 50 87 76 154 76 61 0 105-28 136-74-18 92-65 160-141 163-74 3-128-64-149-165Z" fill="#2b1511" opacity="0.34"/>
  <path d="M172 142h378M148 690h425M599 186v518M126 186v518" stroke="#f7e6c0" stroke-width="8" opacity="0.38"/>
  <path d="M118 730 610 168M112 206l505 505" stroke="#f6c05c" stroke-width="3" opacity="0.28"/>
  <g fill="#f7e6c0" opacity="0.74">
    <circle cx="141" cy="172" r="7"/><circle cx="581" cy="172" r="7"/>
    <circle cx="141" cy="722" r="7"/><circle cx="581" cy="722" r="7"/>
  </g>
</svg>
`);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["hero"]));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          setVisibleSections((current) => {
            if (current.has(sectionId)) return current;
            const next = new Set(current);
            next.add(sectionId);
            return next;
          });
        });
      },
      { rootMargin: "-30% 0px -45%", threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sectionClass = (section: string, baseClass: string) =>
    `${baseClass} ${visibleSections.has(section) ? styles.sectionVisible : ""}`;

  return (
    <main className={styles.main}>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`} aria-label="Primary navigation">
        <a
          href="#hero"
          className={styles.navLogo}
          aria-label="Abdurrahman portfolio home"
          aria-current={activeSection === "hero" ? "location" : undefined}
          onClick={() => setActiveSection("hero")}
        >
          <span>A</span>
          <span>R</span>
        </a>
        <ul className={styles.navLinks}>
          {navLinks.map((link) => {
            const target = link.toLowerCase();
            return (
              <li key={link}>
                <a
                  href={`#${target}`}
                  className={`${styles.navLink} ${activeSection === target ? styles.navLinkActive : ""}`}
                  aria-current={activeSection === target ? "location" : undefined}
                  onClick={() => setActiveSection(target)}
                >
                  {link}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <section id="hero" className={`${styles.hero} ${styles.sectionVisible}`}>
        <div className={styles.gridWash} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Abdurrahman / Fullstack developer</p>
          <h1 className={styles.heroTitle}>
            Building useful web products from interface to backend logic.
          </h1>
          <p className={styles.heroLead}>
            I work with React, Next.js, PHP, Laravel, and Node.js to ship clean interfaces, reliable APIs, and automation tools for real product needs.
          </p>
          <div className={styles.heroActions}>
            <a href="#work" className={styles.btnPrimary}>Open the work ledger</a>
            <a href="#contact" className={styles.btnSecondary}>Start a build note</a>
          </div>
        </div>

        <div className={styles.heroPanel} aria-label="Profile composition for Abdurrahman">
          <div className={styles.portraitFrame}>
            <Image
              src={`data:image/svg+xml,${portraitSvg}`}
              alt="Temporary illustrated profile portrait of Abdurrahman in a Jakarta engineering dossier style"
              width={720}
              height={900}
              className={styles.portrait}
            />
          </div>
          <div className={styles.statusCard}>
            <span className={styles.statusDot} />
            <span>Available for AI, FinTech, and creative automation builds</span>
          </div>
          <div className={styles.coordinateCard}>
            <span>JKT</span>
            <strong>06.2088 S / 106.8456 E</strong>
          </div>
        </div>
      </section>

      <section id="about" className={sectionClass("about", styles.about)}>
        <div className={styles.sectionRail}>
          <span className={styles.sectionNumber}>01</span>
          <span className={styles.sectionLabel}>About</span>
        </div>
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>A builder for teams that need the prototype to become the product.</h2>
          <div className={styles.aboutBody}>
            <p>
              I am Abdurrahman, a Jakarta-based fullstack engineer working across interface systems, backend services, and AI-assisted workflows. My work sits at the practical edge of FinTech, computer vision, and creative operations.
            </p>
            <p>
              I like products with a pulse: dashboards that explain risk clearly, content tools that remove repetitive work, and platforms where the architecture stays calm as the idea gets bigger.
            </p>
          </div>
          <div className={styles.timelineGrid}>
            {timeline.map(([label, detail]) => (
              <article key={label} className={styles.timelineCard}>
                <strong>{label}</strong>
                <span>{detail}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={sectionClass("skills", styles.skills)}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>02</span>
          <span className={styles.sectionLabel}>Skills</span>
          <h2 className={styles.sectionTitle}>A practical stack for shipping polished, intelligent products.</h2>
        </div>
        <div className={styles.skillsGrid}>
          {skills.map((group) => (
            <article key={group.category} className={styles.skillCard}>
              <span className={styles.skillSignal}>{group.signal}</span>
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className={sectionClass("work", styles.work)}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>03</span>
          <span className={styles.sectionLabel}>Selected work</span>
          <h2 className={styles.sectionTitle}>Project notes from AI labs, finance desks, and editorial rooms.</h2>
        </div>
        <div className={styles.projectLedger}>
          {projects.map((project) => (
            <article key={project.number} className={styles.projectCard}>
              <div className={styles.projectIndex}>
                <span>{project.number}</span>
                <small>{project.year}</small>
              </div>
              <div className={styles.projectBody}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.projectStack}>
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className={styles.projectProof}>
                <span>{project.proof}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={sectionClass("contact", styles.contact)}>
        <div className={styles.contactCard}>
          <span className={styles.sectionLabel}>Contact</span>
          <h2>Have an ambitious product problem? Send the first signal.</h2>
          <p>
            I am open to freelance builds and full-time product engineering roles, especially around AI, FinTech, and creative automation.
          </p>
          <div className={styles.contactActions}>
            <a
              href="mailto:abdurrahmanaikon@gmail.com"
              className={styles.mailLink}
              aria-label="Email Abdurrahman at abdurrahmanaikon@gmail.com"
            >
              abdurrahmanaikon@gmail.com
            </a>
            <a href="/abdurrahman-cv.txt" className={styles.downloadLink} download>
              Download CV
            </a>
          </div>
          <div className={styles.socials} aria-label="Social links">
            <a href="https://www.linkedin.com/in/abdurrahmanaikon" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/abdurrahmanaikon" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#work">Case Notes</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Abdurrahman / Fullstack engineer / Jakarta</span>
        <a href="#hero">Back to top</a>
      </footer>
    </main>
  );
}
