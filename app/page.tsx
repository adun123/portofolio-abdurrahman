"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const navLinks = [
  { label: "About", target: "about" },
  { label: "Projects", target: "projects" },
  { label: "Experience", target: "experience" },
  { label: "Skills", target: "skills" },
  { label: "Achievements", target: "achievements" },
  { label: "Contact", target: "contact" },
];

const heroSignals = ["AI workflows", "OCR systems", "Enterprise web apps", "LLM integrations"];

const profileImage = {
  src: "/photo.jpeg",
  alt: "Portrait of Abdurrahman",
};

const cvPath = "/Abdurrahman-CV.pdf";

const projects = [
  {
    number: "01",
    title: "BTN AI OCR Workflow Platform",
    category: "Banking AI / OCR Workflow",
    description:
      "A full-stack OCR workflow platform for BTN use cases, designed around document intake, AI-assisted extraction, review queues, and structured handoff for operational teams.",
    impact:
      "Turned repetitive document review into a clearer AI-assisted workflow with traceable review states and enterprise-ready interface patterns.",
    stack: ["Next.js", "TypeScript", "Node.js", "OCR", "AI Workflow"],
    year: "Apr-May 2026",
    visual: "Document queue",
    link: "https://btn-ai.vercel.app/",
    linkLabel: "Open website",
  },
  {
    number: "02",
    title: "DCKTRP Document Intelligence System",
    category: "Document AI / Public Sector",
    description:
      "Document intelligence system focused on OCR-assisted processing, classification, and review experiences for complex administrative document flows.",
    impact:
      "Reduced manual friction by making extracted fields, source context, and reviewer actions easier to inspect in one product surface.",
    stack: ["Next.js", "Node.js", "OCR", "Document AI", "Dashboard"],
    year: "Mar-Apr 2026",
    visual: "Extraction grid",
    privateNote: "Private / confidential project",
  },
  {
    number: "03",
    title: "Pegadaian AI App",
    category: "FinTech AI / Decision Support",
    description:
      "AI and FinTech application exploring collateral assessment, market pricing context, and loan simulation workflows for Pegadaian product scenarios.",
    impact:
      "Connected financial inputs, AI reasoning support, and practical simulation screens into a more usable decision-support experience.",
    stack: ["Next.js", "Express", "Gemini AI", "FinTech", "Simulation"],
    year: "Dec 2025-Jan 2026",
    visual: "Scoring console",
    link: "https://pegadaian-dev.vercel.app/",
    linkLabel: "Open website",
  },
  {
    number: "04",
    title: "BYD Content Marketing AI",
    category: "Creative AI / Marketing Automation",
    description:
      "Content marketing AI workflow for BYD campaigns, translating product inputs into faster creative directions, campaign angles, and asset-ready copy structures.",
    impact:
      "Helped move campaign ideation from blank-page work into a guided AI workflow for repeatable creative exploration.",
    stack: ["Next.js", "Gemini AI", "Computer Vision", "Prompt Workflow", "Tailwind CSS"],
    year: "Jan-Feb 2026",
    visual: "Campaign lab",
    link: "https://byd-marketing-ai.vercel.app/",
    linkLabel: "Open website",
  },
  {
    number: "05",
    title: "AquaCulture Monitoring System",
    category: "IoT / Monitoring Platform",
    description:
      "Monitoring system concept for aquaculture operations, bringing environmental signals and operational status into a web interface for clearer observation.",
    impact:
      "Created a practical monitoring direction for field data, status visibility, and faster response planning in aquaculture contexts.",
    stack: ["Web Dashboard", "Monitoring", "IoT Concept", "Data Visualization", "Product Design", "Laravel"],
    year: "2025",
    visual: "Sensor map",
    link: "https://github.com/adun123/AquaCulture.git",
    linkLabel: "View GitHub",
  },
];

const experiences = [
  {
    role: "Full Stack Engineer Intern",
    place: "PT Solusi Data Industri / Dataisolv",
    period: "Dec 2025-Present",
    detail:
      "Building product interfaces, backend flows, and AI-assisted web systems for enterprise workflow use cases.",
  },
  {
    role: "Agentic AI Co-Trainer",
    place: "XLSMART",
    period: "Apr 2026-May 2026",
    detail:
      "Supporting agentic AI learning delivery, participant guidance, and practical AI workflow enablement.",
  },
  {
    role: "Teaching Assistant Roles",
    place: "Academic learning support",
    period: "2024-2025",
    detail:
      "Assisting students with technical learning, structured practice, and classroom support across computing topics.",
  },
  {
    role: "Research Internship",
    place: "STAS-RG",
    period: "Sep 2024-Jun 2025",
    detail:
      "Contributing to research-group work while sharpening applied systems thinking and technical documentation habits.",
  },
];

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive UI", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PHP", "Laravel", "REST APIs", "Workflow Logic"],
  },
  {
    category: "AI & LLM",
    items: ["Gemini AI", "LLM Integrations", "OCR", "Document Intelligence", "Prompt Workflows", "Computer Vision"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Git", "Deployment Flow", "Environment Setup", "API Integration", "Monitoring Mindset"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "Relational Modeling", "Query Design", "Data Validation", "Operational Records"],
  },
];

const achievements = [
  {
    title: "PKM Funded Project",
    detail:
      "Recognized through a funded Program Kreativitas Mahasiswa project, reflecting product initiative, research framing, and team execution.",
  },
  {
    title: "1st Winner Business Idea Competition",
    detail:
      "Awarded first place for a business idea competition through clear problem positioning, solution framing, and practical delivery narrative.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    const timer = window.setTimeout(() => setLoading(false), 950);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-34% 0px -50%", threshold: 0.08 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence>
        {loading ? (
          <motion.div
            className={styles.loader}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            aria-label="Loading portfolio"
          >
            <motion.div
              className={styles.loaderMark}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
            <span>Preparing Abdurrahman portfolio</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`} aria-label="Primary navigation">
        <a
          href="#hero"
          className={styles.navLogo}
          aria-label="Abdurrahman portfolio home"
          aria-current={activeSection === "hero" ? "location" : undefined}
          onClick={() => setActiveSection("hero")}
        >
          <span>AI</span>
          <span>AR</span>
        </a>
        <button
          className={styles.menuToggle}
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
        <ul id="primary-navigation" className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
          {navLinks.map((link) => (
            <li key={link.target}>
              <a
                href={`#${link.target}`}
                className={`${styles.navLink} ${activeSection === link.target ? styles.navLinkActive : ""}`}
                aria-current={activeSection === link.target ? "location" : undefined}
                onClick={() => {
                  setActiveSection(link.target);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="hero" className={styles.hero}>
        <div className={styles.gridWash} aria-hidden="true" />
        <motion.div
          className={styles.heroCopy}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p className={styles.kicker} variants={reveal} transition={{ duration: 0.65 }}>
            Abdurrahman / AI-Powered Full Stack Engineer
          </motion.p>
          <motion.h1 className={styles.heroTitle} variants={reveal} transition={{ duration: 0.72 }}>
            Engineering AI workflows into premium web products.
          </motion.h1>
          <motion.p className={styles.heroLead} variants={reveal} transition={{ duration: 0.72 }}>
            I build OCR systems, enterprise web apps, and LLM integrations that turn messy operational work into clear, reliable digital products.
          </motion.p>
          <motion.div className={styles.heroActions} variants={reveal} transition={{ duration: 0.72 }}>
            <a href="#projects" className={styles.btnPrimary}>View Projects</a>
            <DownloadCvLink mounted={mounted} className={styles.btnSecondary} />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroPanel}
          initial={{ opacity: 0, y: 42, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          aria-label="AI engineering control panel"
        >
          <div className={styles.signalOrb} aria-hidden="true" />
          <div className={styles.photoFrame}>
            {photoFailed ? (
              <div className={styles.photoFallback}>
                <strong>AR</strong>
                <span>Replace public/profile.png with your photo</span>
              </div>
            ) : (
              <Image
                src={profileImage.src}
                alt={profileImage.alt}
                fill
                priority
                sizes="(max-width: 688px) 88vw, (max-width: 1024px) 28rem, 24rem"
                className={styles.profilePhoto}
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>
          <div className={styles.consoleCard}>
            <div className={styles.consoleTopline}>
              <span>LIVE BUILD NODE</span>
              <strong>Jakarta</strong>
            </div>
            <div className={styles.consoleScreen}>
              {heroSignals.map((signal, index) => (
                <motion.div
                  className={styles.signalRow}
                  key={signal}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.44 + index * 0.12 }}
                >
                  <span>0{index + 1}</span>
                  <strong>{signal}</strong>
                </motion.div>
              ))}
            </div>
            <div className={styles.consoleFooter}>
              <span>Next.js + AI systems</span>
              <span>Production-minded delivery</span>
            </div>
          </div>
          <div className={styles.statusCard}>
            <span className={styles.statusDot} />
            <span>Available for AI product engineering, OCR platforms, and enterprise workflow systems.</span>
          </div>
        </motion.div>
      </section>

      <motion.section id="about" className={styles.about} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger}>
        <SectionRail number="01" label="About" />
        <motion.div className={styles.aboutContent} variants={reveal} transition={{ duration: 0.65 }}>
          <h2 className={styles.sectionTitle}>A full stack engineer for teams moving AI from demo to workflow.</h2>
          <div className={styles.aboutBody}>
            <p>
              I am Abdurrahman, an AI-Powered Full Stack Engineer and Informatics student at Telkom University working across interfaces, backend services, OCR pipelines, and LLM-enabled workflows.
            </p>
            <p>
              My work sits where product clarity meets technical execution: enterprise dashboards, document intelligence systems, FinTech experiments, and AI workflows that make complex operations easier to review and ship.
            </p>
          </div>
          <div className={styles.profileStats} aria-label="Professional focus areas">
            <span>AI workflows</span>
            <span>OCR systems</span>
            <span>Enterprise web apps</span>
            <span>LLM integrations</span>
          </div>
        </motion.div>
      </motion.section>

      <motion.section id="projects" className={styles.projects} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger}>
        <SectionIntro number="02" label="Featured Projects" title="Five product builds shaped around AI, workflow clarity, and real operational use cases." />
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <motion.article className={styles.projectCard} key={project.title} variants={reveal} transition={{ duration: 0.58 }} whileHover={{ y: -8 }}>
              <div className={styles.projectVisual} aria-hidden="true">
                <span>{project.visual}</span>
                <div className={styles.visualFrame}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className={styles.projectIndex}>
                <span>{project.number}</span>
                <small>{project.year}</small>
              </div>
              <div className={styles.projectBody}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.projectImpact}>
                  <strong>Impact</strong>
                  <span>{project.impact}</span>
                </div>
                <div className={styles.projectStack}>
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className={styles.projectActions}>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noreferrer noopener" aria-label={`Open ${project.title}`}>
                      {project.linkLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className={styles.projectPrivate}>{project.privateNote}</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section id="experience" className={styles.experience} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger}>
        <SectionIntro number="03" label="Experience Timeline" title="A path through full-stack delivery, AI training, teaching support, and research practice." />
        <div className={styles.timeline}>
          {experiences.map((item) => (
            <motion.article className={styles.timelineItem} key={item.role} variants={reveal} transition={{ duration: 0.58 }}>
              <span className={styles.timelineDot} aria-hidden="true" />
              <div>
                <span className={styles.timelinePeriod}>{item.period}</span>
                <h3>{item.role}</h3>
                <strong>{item.place}</strong>
                <p>{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section id="skills" className={styles.skills} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger}>
        <SectionIntro number="04" label="Skills" title="A practical stack for shipping AI-powered full-stack products." />
        <div className={styles.skillsGrid}>
          {skills.map((group, index) => (
            <motion.article className={styles.skillCard} key={group.category} variants={reveal} transition={{ duration: 0.58 }}>
              <span className={styles.skillSignal}>0{index + 1}</span>
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section id="achievements" className={styles.achievements} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger}>
        <SectionIntro number="05" label="Achievements" title="Signals of initiative across funded work and competitive product thinking." />
        <div className={styles.achievementGrid}>
          {achievements.map((achievement) => (
            <motion.article className={styles.achievementCard} key={achievement.title} variants={reveal} transition={{ duration: 0.58 }}>
              <span>Award</span>
              <h3>{achievement.title}</h3>
              <p>{achievement.detail}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section id="contact" className={styles.contact} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger}>
        <motion.div className={styles.contactCard} variants={reveal} transition={{ duration: 0.65 }}>
          <span className={styles.sectionLabel}>Contact</span>
          <h2>Let us turn the next AI workflow into a product.</h2>
          <p>
            I am open to conversations around AI-powered web apps, OCR platforms, enterprise dashboards, document intelligence, and LLM integrations.
          </p>
          <div className={styles.contactActions}>
            <a href="mailto:abdurrahmanaikon@gmail.com" className={styles.mailLink} aria-label="Email Abdurrahman at abdurrahmanaikon@gmail.com">
              abdurrahmanaikon@gmail.com
            </a>
            <DownloadCvLink mounted={mounted} className={styles.downloadLink} />
            <a href="https://www.linkedin.com/in/abdurrahman-8719092b1" className={styles.downloadLink} target="_blank" rel="noreferrer noopener">LinkedIn</a>
          </div>
          <div className={styles.socials} aria-label="Additional contact details">
            <span>GitHub available on request</span>
            <a href="tel:+6281398515784">+62 81398 515784</a>
          </div>
        </motion.div>
      </motion.section>

      <footer className={styles.footer}>
        <span>Abdurrahman / AI-Powered Full Stack Engineer / Jakarta</span>
        <a href="#hero">Back to top</a>
      </footer>
    </main>
  );
}

function SectionRail({ number, label }: { number: string; label: string }) {
  return (
    <motion.div className={styles.sectionRail} variants={reveal} transition={{ duration: 0.65 }}>
      <span className={styles.sectionNumber}>{number}</span>
      <span className={styles.sectionLabel}>{label}</span>
    </motion.div>
  );
}

function DownloadCvLink({ mounted, className }: { mounted: boolean; className: string }) {
  if (!mounted) {
    return (
      <span className={`${className} ${styles.downloadPending}`} aria-hidden="true">
        Download CV
      </span>
    );
  }

  return (
    <a href={cvPath} className={className} download>
      Download CV
    </a>
  );
}

function SectionIntro({ number, label, title }: { number: string; label: string; title: string }) {
  return (
    <motion.div className={styles.sectionIntro} variants={reveal} transition={{ duration: 0.65 }}>
      <span className={styles.sectionNumber}>{number}</span>
      <span className={styles.sectionLabel}>{label}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </motion.div>
  );
}
