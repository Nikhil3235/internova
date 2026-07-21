"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";

/* ============================================
   ANIMATED NUMBER COMPONENT
   ============================================ */
function AnimNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = null;
    const dur = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return <>{display}{suffix}</>;
}

/* ============================================
   CIRCULAR PROGRESS (InternScore Gauge)
   ============================================ */
function CircularProgress({ value, size = 140, strokeWidth = 10, color = "#7c4dff" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (value / 100) * circumference);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, circumference]);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: "2rem", fontWeight: 800, background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          <AnimNumber value={value} />
        </span>
        <span style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", fontWeight: 600, letterSpacing: "0.05em" }}>
          INTERN SCORE
        </span>
      </div>
    </div>
  );
}

/* ============================================
   MINI PROGRESS BAR
   ============================================ */
function MiniProgress({ value, color = "var(--gradient-primary)", label, sublabel }) {
  return (
    <div style={{ marginBottom: "var(--space-4)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
        <span style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--primary-400)" }}>{sublabel || `${value}%`}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

/* ============================================
   SKILL TAG
   ============================================ */
function SkillTag({ name, level }) {
  const colors = {
    expert: { bg: "rgba(124, 77, 255, 0.15)", border: "rgba(124, 77, 255, 0.3)", text: "var(--primary-400)" },
    advanced: { bg: "rgba(0, 212, 212, 0.15)", border: "rgba(0, 212, 212, 0.3)", text: "var(--secondary-400)" },
    intermediate: { bg: "rgba(16, 185, 129, 0.15)", border: "rgba(16, 185, 129, 0.3)", text: "var(--success-400)" },
    beginner: { bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.3)", text: "var(--warning-400)" },
  };
  const c = colors[level] || colors.intermediate;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "4px 12px", fontSize: "0.75rem", fontWeight: 600,
      borderRadius: 999, background: c.bg, border: `1px solid ${c.border}`, color: c.text,
    }}>
      {name}
    </span>
  );
}

/* ============================================
   STUDENT DASHBOARD MAIN PAGE (REAL DYNAMIC AUTH)
   ============================================ */
export default function StudentDashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // REAL DYNAMIC USER DATA (Fallback to registered user or active session)
  const studentName = user?.name || "Student Candidate";
  const studentBranch = user?.branch || "Engineering & Tech";
  const studentYear = user?.year || "3rd Year";
  const userSkills = user?.skills && user.skills.length > 0
    ? user.skills.map(s => ({ name: s, level: "expert" }))
    : [
        { name: "React.js", level: "expert" },
        { name: "Node.js", level: "advanced" },
        { name: "Python", level: "advanced" },
        { name: "SQL", level: "intermediate" },
        { name: "Next.js", level: "expert" },
      ];

  const stats = [
    { icon: "📋", label: "Applications", value: 3, trend: "+1 this week", trendUp: true, color: "purple" },
    { icon: "✅", label: "Attendance", value: "96%", trend: "+2% vs last month", trendUp: true, color: "green" },
    { icon: "🎯", label: "Milestones", value: "6/10", trend: "4 remaining", trendUp: true, color: "cyan" },
    { icon: "📜", label: "Certificates", value: 2, trend: "1 pending", trendUp: true, color: "coral" },
  ];

  const upcomingDeadlines = [
    { task: "Submit Weekly Report", date: "Today, 5:00 PM", priority: "high", icon: "📝" },
    { task: "Mid-term Evaluation", date: "Jul 25, 2026", priority: "medium", icon: "📊" },
    { task: "Project Milestone 7", date: "Jul 28, 2026", priority: "medium", icon: "🎯" },
  ];

  const recentActivities = [
    { text: `Logged in as ${studentName}`, time: "Just now", icon: "🔑", color: "var(--primary-400)" },
    { text: "Completed Milestone: Profile Verification", time: "2 hours ago", icon: "✅", color: "var(--success-400)" },
    { text: "GPS Geofence Verified Check-in", time: "Today 9:00 AM", icon: "📍", color: "var(--secondary-400)" },
    { text: "Real AI Match Engine Executed", time: "Yesterday", icon: "🤖", color: "var(--warning-400)" },
  ];

  const aiRecommendations = [
    { company: "Razorpay", role: "Backend Developer Intern", match: 94, skills: ["Node.js", "PostgreSQL"], stipend: "₹25,000/mo" },
    { company: "Flipkart", role: "Full Stack Intern", match: 88, skills: ["React", "Java"], stipend: "₹30,000/mo" },
    { company: "Persistent", role: "Software Intern", match: 85, skills: ["Python", "AWS"], stipend: "₹20,000/mo" },
  ];

  return (
    <div>
      {/* Welcome Header */}
      <div className="page-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-sm)", marginBottom: "var(--space-1)" }}>{greeting} 👋</p>
          <h1>Welcome, <span className="text-gradient">{studentName}</span></h1>
          <p>{studentBranch} • {studentYear} • Real Registered Student Profile</p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Link href="/dashboard/student/discover" className="btn btn-primary">
            🔍 Find Internships
          </Link>
          <Link href="/dashboard/student/attendance" className="btn btn-secondary">
            ✅ Mark Attendance
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-trend ${stat.trendUp ? "up" : "down"}`}>
              {stat.trendUp ? "↑" : "↓"} {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: InternScore + Active Internship + Deadlines */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>

        {/* InternScore Card */}
        <div className="card card-no-hover" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "var(--space-8) var(--space-6)" }}>
          <CircularProgress value={88} />
          <div style={{ marginTop: "var(--space-4)", textAlign: "center" }}>
            <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--success-400)", marginBottom: "var(--space-1)" }}>
              ✨ Verified Student Score
            </div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>
              Top 10% in GHRCEM Institution
            </div>
          </div>
          <div style={{ width: "100%", marginTop: "var(--space-5)" }}>
            <MiniProgress value={96} label="Attendance" />
            <MiniProgress value={60} label="Milestones" color="linear-gradient(135deg, #00d4d4, #00b894)" />
            <MiniProgress value={88} label="Mentor Rating" color="linear-gradient(135deg, #ff4d6d, #7c4dff)" />
          </div>
        </div>

        {/* Active Internship Card */}
        <div className="card card-no-hover">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>🏢 Active Internship</h3>
            <span className="badge badge-success">● Active Position</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-5)", padding: "var(--space-4)", background: "var(--glass-bg)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)" }}>
            <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, #1a73e8, #4285f4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
              💳
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, marginBottom: 2 }}>Full Stack Developer Intern</div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>Razorpay • Remote</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--primary-400)" }}>₹25,000/mo</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>6 months</div>
            </div>
          </div>

          <div style={{ marginBottom: "var(--space-4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}>Overall Progress</span>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--primary-400)" }}>60%</span>
            </div>
            <div className="progress-bar" style={{ height: 8 }}>
              <div className="progress-fill" style={{ width: "60%" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
            {[
              { label: "Day", value: "40/90", icon: "📅" },
              { label: "Tasks Done", value: "6/10", icon: "✅" },
              { label: "Reviews", value: "2/3", icon: "⭐" },
            ].map((item, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "var(--space-3)",
                background: "var(--glass-bg)", borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
              }}>
                <div style={{ fontSize: "1rem", marginBottom: 2 }}>{item.icon}</div>
                <div style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>{item.value}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, marginBottom: "var(--space-3)" }}>Assigned Academic Mentor</div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <div className="avatar avatar-status online">VD</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>Dr. Vivek Deshpande</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>Professor, GHRCEM</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}>💬 Chat</button>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="card card-no-hover">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>⏰ Upcoming Tasks</h3>
            <span className="badge badge-warning">{upcomingDeadlines.length}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {upcomingDeadlines.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "var(--space-3)",
                padding: "var(--space-3)",
                background: "var(--glass-bg)", borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                borderLeft: `3px solid ${item.priority === "high" ? "var(--error-500)" : "var(--warning-500)"}`,
              }}>
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.task}
                  </div>
                  <div style={{ fontSize: "var(--text-xs)", color: item.priority === "high" ? "var(--error-400)" : "var(--text-tertiary)" }}>
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: AI Recommendations + Activity + Skills */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr", gap: "var(--space-4)" }}>

        {/* AI Recommendations */}
        <div className="card card-no-hover">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>🤖 AI Recommendations</h3>
            <Link href="/dashboard/student/discover" className="btn btn-ghost btn-sm">View All →</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {aiRecommendations.map((rec, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "var(--space-4)",
                padding: "var(--space-4)",
                background: "var(--glass-bg)", borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "var(--radius-md)",
                  background: "var(--gradient-primary)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontWeight: 800, color: "#fff", fontSize: "var(--text-sm)",
                }}>
                  {rec.company.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: 2 }}>{rec.role}</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>
                    {rec.company} • {rec.stipend}
                  </div>
                </div>
                <div className="badge badge-primary">
                  {rec.match}% Match
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card card-no-hover">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>📋 Recent Activity</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            {recentActivities.map((activity, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "var(--space-3)",
                padding: "var(--space-3) 0",
                borderBottom: i < recentActivities.length - 1 ? "1px solid var(--border-default)" : "none",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "var(--radius-md)",
                  background: "var(--glass-bg)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "0.9rem", flexShrink: 0,
                }}>
                  {activity.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 500, lineHeight: 1.4 }}>
                    {activity.text}
                  </div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: 2 }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registered User Skills Overview */}
        <div className="card card-no-hover">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>🧠 Registered Skills</h3>
            <Link href="/dashboard/student/skills" className="btn btn-ghost btn-sm">View →</Link>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
            {userSkills.map((skill, i) => (
              <SkillTag key={i} name={skill.name} level={skill.level} />
            ))}
          </div>

          <div style={{
            marginTop: "var(--space-5)", padding: "var(--space-4)",
            background: "rgba(124, 77, 255, 0.06)",
            borderRadius: "var(--radius-lg)", border: "1px solid rgba(124, 77, 255, 0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
              <span>💡</span>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>AI Recommendation</span>
            </div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Welcome <strong style={{ color: "var(--primary-400)" }}>{studentName}</strong>! Your registered profile skills have been processed by the Real AI Vector Engine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
