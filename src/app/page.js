"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ============================================
   ANIMATED COUNTER COMPONENT
   ============================================ */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ============================================
   FLOATING PARTICLES BACKGROUND
   ============================================ */
function ParticlesBackground() {
  return (
    <div className="particles-container" aria-hidden="true">
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            "--tx": `${(Math.random() - 0.5) * 200}px`,
            "--ty": `${-Math.random() * 300 - 100}px`,
          }}
        />
      ))}
      <style jsx>{`
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          background: rgba(124, 77, 255, 0.4);
          border-radius: 50%;
          animation: particle-float linear infinite;
        }
        .particle:nth-child(even) {
          background: rgba(0, 212, 212, 0.3);
        }
        .particle:nth-child(3n) {
          background: rgba(255, 77, 109, 0.25);
        }
      `}</style>
    </div>
  );
}

/* ============================================
   SCROLL REVEAL HOOK
   ============================================ */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* ============================================
   FEATURE CARD DATA
   ============================================ */
const features = [
  {
    icon: "🤖",
    title: "AI Smart Matching",
    desc: "Gemini-powered engine matches students to perfect internships with compatibility scores. No more random applications.",
    color: "rgba(124, 77, 255, 0.12)",
  },
  {
    icon: "🔗",
    title: "Blockchain Verification",
    desc: "SHA-256 hashed certificates with QR verification. Tamper-proof credentials that employers can trust instantly.",
    color: "rgba(0, 212, 212, 0.12)",
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    desc: "Live dashboards with 8+ chart types. Track attendance, performance, skill gaps, and placement funnels in real-time.",
    color: "rgba(255, 77, 109, 0.12)",
  },
  {
    icon: "🎯",
    title: "InternScore™",
    desc: "Proprietary 0-100 performance index combining attendance, mentor rating, milestones, and peer feedback.",
    color: "rgba(16, 185, 129, 0.12)",
  },
  {
    icon: "🚀",
    title: "Startup Launchpad",
    desc: "Turn internship projects into startups. Submit ideas, get matched with mentors, and track your entrepreneurial journey.",
    color: "rgba(245, 158, 11, 0.12)",
  },
  {
    icon: "🪪",
    title: "Digital Passport",
    desc: "Auto-generated shareable portfolio with verified achievements, skills, certificates — your career in one URL.",
    color: "rgba(59, 130, 246, 0.12)",
  },
];

const stakeholders = [
  {
    icon: "👨‍🎓",
    title: "Students",
    desc: "Discover internships, track progress, build skills, earn verified certificates, and launch startups.",
    features: ["AI Matching", "Skill Radar", "Digital Passport", "QR Attendance"],
  },
  {
    icon: "👨‍🏫",
    title: "Faculty Mentors",
    desc: "Monitor assigned students, evaluate performance, provide continuous feedback, and generate reports.",
    features: ["Student Monitor", "Evaluation Center", "Attendance Heatmap", "Auto Reports"],
  },
  {
    icon: "🏢",
    title: "Industry Partners",
    desc: "Post internships, manage applicants, evaluate interns, and convert top talent to full-time hires.",
    features: ["Post Internships", "PPO Pipeline", "Intern Evaluation", "Talent Pool"],
  },
  {
    icon: "🔑",
    title: "TPO / Admin",
    desc: "Command center with complete oversight. Analytics, audit trails, user management, and institution-wide insights.",
    features: ["Command Center", "Analytics Suite", "Audit Trail", "Bulk Management"],
  },
];

const techLogos = [
  { name: "Next.js", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "Supabase", icon: "🗄️" },
  { name: "Gemini AI", icon: "🤖" },
  { name: "Chart.js", icon: "📈" },
  { name: "Blockchain", icon: "🔗" },
];

/* ============================================
   LANDING PAGE COMPONENT
   ============================================ */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [stakeholdersRef, stakeholdersVisible] = useScrollReveal();
  const [techRef, techVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* ===== NAVBAR ===== */}
      <nav className={`landing-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-brand">
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "var(--gradient-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "1.1rem", color: "#fff",
          }}>
            N
          </div>
          <span style={{
            fontSize: "1.25rem", fontWeight: 800,
            background: "var(--gradient-primary)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Internova
          </span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#stakeholders">For You</a>
          <a href="#tech">Technology</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="btn btn-ghost" style={{ fontSize: "0.875rem" }}>
            Sign In
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            Get Started →
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="btn btn-ghost btn-icon mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#stakeholders" onClick={() => setMobileMenuOpen(false)}>For You</a>
          <a href="#tech" onClick={() => setMobileMenuOpen(false)}>Technology</a>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
          <Link href="/register" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
            Get Started
          </Link>
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <ParticlesBackground />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
          <div className="hero-badge">
            <span style={{ display: "inline-block", animation: "pulse-dot 2s infinite" }}>🟢</span>
            Building Smarter Internship Ecosystems
          </div>

          <h1 className="hero-title">
            The Future of{" "}
            <span className="gradient-text">Internships</span>
            <br />
            is Intelligent
          </h1>

          <p className="hero-subtitle">
            AI-powered matching. Blockchain-verified credentials. Real-time tracking.
            One platform connecting students, mentors, and industry — transforming
            internships into career catalysts.
          </p>

          <div className="hero-actions">
            <Link href="/register" className="btn btn-primary btn-lg">
              🚀 Start Your Journey
            </Link>
            <Link href="/login" className="btn btn-secondary btn-lg">
              ▶ View Demo
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">
                <AnimatedCounter target={2500} suffix="+" />
              </div>
              <div className="hero-stat-label">Active Interns</div>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--border-default)" }} />
            <div className="hero-stat">
              <div className="hero-stat-value">
                <AnimatedCounter target={150} suffix="+" />
              </div>
              <div className="hero-stat-label">Partner Companies</div>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--border-default)" }} />
            <div className="hero-stat">
              <div className="hero-stat-value">
                <AnimatedCounter target={94} suffix="%" />
              </div>
              <div className="hero-stat-label">Placement Rate</div>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--border-default)" }} />
            <div className="hero-stat">
              <div className="hero-stat-value">
                <AnimatedCounter target={87} />
              </div>
              <div className="hero-stat-label">Avg InternScore™</div>
            </div>
          </div>
        </div>

        {/* Gradient fade at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background: "linear-gradient(transparent, var(--bg-primary))",
          pointerEvents: "none",
        }} />
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="features-section" ref={featuresRef}>
        <div className="section-header">
          <div className="section-badge">✨ Powerful Features</div>
          <h2 className="section-title">
            Everything You Need,{" "}
            <span className="text-gradient">Nothing You Don&apos;t</span>
          </h2>
          <p className="section-subtitle">
            Six pillars of innovation that transform raw internship data into
            actionable intelligence and verified credentials.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                opacity: featuresVisible ? 1 : 0,
                transform: featuresVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 500ms ease ${i * 100}ms`,
              }}
            >
              <div className="feature-icon" style={{ background: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STAKEHOLDERS SECTION ===== */}
      <section id="stakeholders" className="features-section" ref={stakeholdersRef}>
        <div className="section-header">
          <div className="section-badge">👥 Built for Everyone</div>
          <h2 className="section-title">
            Four Roles, <span className="text-gradient">One Platform</span>
          </h2>
          <p className="section-subtitle">
            Every stakeholder gets a dedicated, intelligent dashboard designed for
            their specific workflows and needs.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "var(--space-5)",
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          {stakeholders.map((s, i) => (
            <div
              key={i}
              className="card"
              style={{
                opacity: stakeholdersVisible ? 1 : 0,
                transform: stakeholdersVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 500ms ease ${i * 120}ms`,
                textAlign: "center",
                padding: "var(--space-8) var(--space-6)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "var(--space-5)", lineHeight: "var(--leading-relaxed)" }}>
                {s.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", justifyContent: "center" }}>
                {s.features.map((f, j) => (
                  <span key={j} className="badge badge-primary">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="features-section" style={{ background: "rgba(124, 77, 255, 0.02)" }}>
        <div className="section-header">
          <div className="section-badge">🔄 How It Works</div>
          <h2 className="section-title">
            From Application to <span className="text-gradient">Achievement</span>
          </h2>
          <p className="section-subtitle">
            The complete internship journey — streamlined, intelligent, and verified at every step.
          </p>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "var(--space-1)", maxWidth: 700, margin: "0 auto",
        }}>
          {[
            { step: "01", title: "Discover & Match", desc: "AI analyzes your skills and finds perfect internship matches with compatibility scores", icon: "🔍" },
            { step: "02", title: "Apply & Get Selected", desc: "Smart application tracking — from applied to shortlisted to interview to selected", icon: "📝" },
            { step: "03", title: "Track & Grow", desc: "QR attendance, milestone tracking, weekly journals, skill radar — all in real-time", icon: "📊" },
            { step: "04", title: "Evaluate & Verify", desc: "Multi-dimensional evaluations by faculty + industry mentors, blockchain-verified certificates", icon: "✅" },
            { step: "05", title: "Launch & Convert", desc: "PPO pipeline, startup launchpad, digital passport — turn internships into careers", icon: "🚀" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "var(--space-6)",
              padding: "var(--space-6)", width: "100%",
            }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                flexShrink: 0,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "var(--gradient-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "var(--text-sm)", color: "#fff",
                }}>
                  {item.step}
                </div>
                {i < 4 && (
                  <div style={{
                    width: 2, height: 40,
                    background: "linear-gradient(var(--primary-500), transparent)",
                    marginTop: "var(--space-2)",
                  }} />
                )}
              </div>
              <div style={{ paddingTop: "var(--space-2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                  <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                  <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700 }}>{item.title}</h3>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section id="tech" className="features-section" ref={techRef}>
        <div className="section-header">
          <div className="section-badge">⚙️ Built With Best</div>
          <h2 className="section-title">
            Enterprise-Grade <span className="text-gradient">Technology</span>
          </h2>
          <p className="section-subtitle">
            Built on battle-tested, production-ready technologies used by Fortune 500 companies.
          </p>
        </div>

        <div style={{
          display: "flex", justifyContent: "center", flexWrap: "wrap",
          gap: "var(--space-5)", maxWidth: 800, margin: "0 auto",
        }}>
          {techLogos.map((tech, i) => (
            <div
              key={i}
              className="card"
              style={{
                textAlign: "center",
                padding: "var(--space-6) var(--space-8)",
                minWidth: 140,
                opacity: techVisible ? 1 : 0,
                transform: techVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
                transition: `all 400ms ease ${i * 80}ms`,
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-2)" }}>{tech.icon}</div>
              <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{tech.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section id="about" className="cta-section" ref={ctaRef}>
        <div style={{
          position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto",
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 600ms ease",
        }}>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, var(--text-4xl))",
            fontWeight: 800, marginBottom: "var(--space-4)",
            letterSpacing: "var(--tracking-tight)",
          }}>
            Ready to Transform{" "}
            <span className="text-gradient">Your Internship Experience?</span>
          </h2>
          <p style={{
            color: "var(--text-secondary)", fontSize: "var(--text-lg)",
            marginBottom: "var(--space-8)", lineHeight: "var(--leading-relaxed)",
          }}>
            Join thousands of students, mentors, and companies already using Internova
            to build meaningful internship ecosystems.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn btn-primary btn-lg">
              🚀 Get Started Free
            </Link>
            <Link href="/login" className="btn btn-secondary btn-lg">
              📊 View Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "var(--space-3)", marginBottom: "var(--space-4)",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "var(--gradient-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "0.85rem", color: "#fff",
          }}>
            N
          </div>
          <span style={{ fontWeight: 700, fontSize: "var(--text-base)" }}>Internova</span>
        </div>
        <p>Where Talent Meets Opportunity, Verified by Trust</p>
        <p style={{ marginTop: "var(--space-2)", fontSize: "var(--text-xs)" }}>
          © 2026 Team Internova. Built with 💜 for GHR Intern-Track Hackathon.
        </p>
      </footer>

      {/* ===== MOBILE MENU STYLES ===== */}
      <style jsx>{`
        .mobile-menu-btn {
          display: none;
          font-size: 1.3rem;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-default);
          padding: var(--space-4);
          z-index: 299;
          flex-direction: column;
          gap: var(--space-3);
          animation: fadeInDown 200ms ease;
        }
        .mobile-menu a {
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-weight: 500;
          transition: all 150ms ease;
        }
        .mobile-menu a:hover {
          background: var(--glass-bg);
          color: var(--text-primary);
        }
        @media (max-width: 1024px) {
          .mobile-menu-btn { display: flex; }
          .mobile-menu { display: flex; }
        }
      `}</style>
    </div>
  );
}
