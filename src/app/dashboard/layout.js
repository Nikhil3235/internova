"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

const NAV_CONFIG = {
  student: [
    { section: "MAIN" },
    { name: "Dashboard", icon: "🏠", path: "/dashboard/student" },
    { name: "Discover Internships", icon: "🔍", path: "/dashboard/student/discover" },
    { name: "My Applications", icon: "📋", path: "/dashboard/student/applications" },
    { section: "TRACKING" },
    { name: "Attendance", icon: "✅", path: "/dashboard/student/attendance" },
    { name: "Milestones", icon: "🎯", path: "/dashboard/student/milestones" },
    { name: "Weekly Journal", icon: "📝", path: "/dashboard/student/journal" },
    { section: "INSIGHTS" },
    { name: "Skill Radar", icon: "📊", path: "/dashboard/student/skills" },
    { name: "InternScore™", icon: "🏆", path: "/dashboard/student/internscore" },
    { name: "Analytics", icon: "📈", path: "/dashboard/student/analytics" },
    { section: "CREDENTIALS" },
    { name: "Certificates", icon: "📜", path: "/dashboard/student/certificates" },
    { name: "Digital Passport", icon: "🪪", path: "/dashboard/student/passport" },
    { section: "INNOVATION" },
    { name: "Startup Launchpad", icon: "🚀", path: "/dashboard/student/launchpad" },
  ],
  faculty: [
    { section: "MAIN" },
    { name: "Dashboard", icon: "🏠", path: "/dashboard/faculty" },
    { name: "My Students", icon: "👨‍🎓", path: "/dashboard/faculty/students" },
    { section: "MONITORING" },
    { name: "Attendance Monitor", icon: "✅", path: "/dashboard/faculty/attendance" },
    { name: "Progress Tracker", icon: "📊", path: "/dashboard/faculty/progress" },
    { section: "EVALUATION" },
    { name: "Evaluations", icon: "📝", path: "/dashboard/faculty/evaluations" },
    { name: "Feedback Hub", icon: "💬", path: "/dashboard/faculty/feedback" },
    { name: "Reports", icon: "📄", path: "/dashboard/faculty/reports" },
  ],
  industry: [
    { section: "MAIN" },
    { name: "Dashboard", icon: "🏠", path: "/dashboard/industry" },
    { name: "Post Internship", icon: "➕", path: "/dashboard/industry/post" },
    { section: "MANAGEMENT" },
    { name: "Applicants", icon: "👥", path: "/dashboard/industry/applicants" },
    { name: "My Interns", icon: "📋", path: "/dashboard/industry/interns" },
    { name: "Evaluations", icon: "📝", path: "/dashboard/industry/evaluations" },
    { section: "CONVERSION" },
    { name: "PPO Pipeline", icon: "🎯", path: "/dashboard/industry/ppo" },
    { name: "Analytics", icon: "📈", path: "/dashboard/industry/analytics" },
  ],
  admin: [
    { section: "MAIN" },
    { name: "Command Center", icon: "🏠", path: "/dashboard/admin" },
    { name: "Analytics Suite", icon: "📈", path: "/dashboard/admin/analytics" },
    { section: "MANAGE" },
    { name: "Students", icon: "👨‍🎓", path: "/dashboard/admin/students" },
    { name: "Faculty", icon: "👨‍🏫", path: "/dashboard/admin/faculty" },
    { name: "Companies", icon: "🏢", path: "/dashboard/admin/companies" },
    { name: "Internships", icon: "📋", path: "/dashboard/admin/internships" },
    { section: "SYSTEM" },
    { name: "Audit Trail", icon: "🔍", path: "/dashboard/admin/audit" },
    { name: "Settings", icon: "⚙️", path: "/dashboard/admin/settings" },
  ],
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const pathname = usePathname() || "";
  const router = useRouter();
  const { user, logout, loading, login, DEMO_USERS } = useAuth();

  // Shortcut key (Ctrl+K or Cmd+K) listener for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--bg-primary)",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 54, height: 54, borderRadius: 16,
            background: "var(--gradient-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "1.7rem", color: "#fff",
            margin: "0 auto var(--space-4)",
            boxShadow: "0 0 30px rgba(124, 77, 255, 0.4)",
            animation: "glow-pulse 1.8s ease infinite",
          }}>N</div>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>Initializing Internova Intelligence...</p>
        </div>
      </div>
    );
  }

  const navItems = NAV_CONFIG[user.role] || NAV_CONFIG.student;
  const notifications = [
    { id: 1, text: "New internship match: 94% at Razorpay", time: "2 min ago", icon: "🤖", unread: true },
    { id: 2, text: "Milestone 8 approved by mentor", time: "1 hour ago", icon: "✅", unread: true },
    { id: 3, text: "Attendance verified (GHRCEM Geofence)", time: "Today 9:00 AM", icon: "📍", unread: false },
  ];

  const quickSwitchRole = (newRole) => {
    const emailMap = {
      student: "student@internova.in",
      faculty: "faculty@internova.in",
      industry: "industry@internova.in",
      admin: "admin@internova.in",
    };
    const targetEmail = emailMap[newRole];
    login(targetEmail, "demo123");
    router.push(`/dashboard/${newRole}`);
  };

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (!last || last === user.role) return "Dashboard";
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)", zIndex: 400,
            animation: "fadeIn 200ms ease",
          }}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar" style={{
        transform: sidebarOpen ? "translateX(0)" : undefined,
      }}>
        {/* Brand */}
        <div className="sidebar-brand">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", textDecoration: "none" }}>
            <div className="brand-logo">N</div>
            <span className="brand-name">Internova</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item, i) => {
            if (item.section) {
              return (
                <div className="nav-section" key={`section-${i}`}>
                  <div className="nav-section-title">{item.section}</div>
                </div>
              );
            }

            const isActive = pathname === item.path || (item.path !== `/dashboard/${user.role}` && pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Card & Quick Role Switcher */}
        <div style={{
          padding: "var(--space-4) var(--space-3)",
          borderTop: "1px solid var(--border-default)",
        }}>
          {/* Quick Role Switcher Pill */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, fontWeight: 700 }}>
              ⚡ Presenter Role Switcher
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: "var(--bg-input)", padding: 4, borderRadius: 8 }}>
              {[
                { r: "student", label: "👨‍🎓" },
                { r: "faculty", label: "👨‍🏫" },
                { r: "industry", label: "🏢" },
                { r: "admin", label: "🔑" },
              ].map((roleObj) => (
                <button
                  key={roleObj.r}
                  onClick={() => quickSwitchRole(roleObj.r)}
                  title={`Switch to ${roleObj.r} view`}
                  style={{
                    padding: "4px 0", textAlign: "center", border: "none", borderRadius: 6,
                    background: user.role === roleObj.r ? "var(--primary-500)" : "transparent",
                    color: user.role === roleObj.r ? "#fff" : "var(--text-tertiary)",
                    cursor: "pointer", fontSize: "0.9rem", transition: "all 150ms ease",
                  }}
                >
                  {roleObj.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: "var(--space-3)",
            padding: "var(--space-3)",
            background: "var(--glass-bg)", borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-default)",
          }}>
            <div className="avatar">{user.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.name}
              </div>
              <span className={`badge ${
                user.role === "student" ? "badge-primary" :
                user.role === "faculty" ? "badge-cyan" :
                user.role === "industry" ? "badge-success" :
                "badge-warning"
              }`} style={{ marginTop: 2 }}>
                {user.role.toUpperCase()}
              </span>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              style={{
                width: 32, height: 32, borderRadius: "var(--radius-md)",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: "none",
                color: "var(--text-tertiary)", cursor: "pointer",
                transition: "all var(--transition-fast)", fontSize: "1rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "var(--error-400)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-tertiary)"; }}
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* ===== TOPBAR ===== */}
      <header className="topbar">
        <div className="topbar-left">
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              display: "none", width: 40, height: 40,
              borderRadius: "var(--radius-md)", background: "var(--glass-bg)",
              border: "1px solid var(--border-default)",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "1.2rem", color: "var(--text-primary)",
            }}
            className="mobile-hamburger"
          >
            ☰
          </button>
          <div>
            <h1 style={{
              fontSize: "var(--text-lg)", fontWeight: 700,
              lineHeight: "var(--leading-tight)",
            }}>
              {getPageTitle()}
            </h1>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: 2 }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        <div className="topbar-right">
          {/* Search / Command Palette Trigger */}
          <div
            className="topbar-search"
            onClick={() => setCmdOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <span style={{ color: "var(--text-muted)" }}>🔍</span>
            <span style={{ flex: 1, fontSize: "var(--text-sm)", color: "var(--text-tertiary)" }}>Search or jump to...</span>
            <kbd style={{
              padding: "2px 6px", fontSize: "0.65rem", fontFamily: "var(--font-mono)",
              background: "var(--glass-bg)", border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-sm)", color: "var(--text-muted)",
            }}>Ctrl K</kbd>
          </div>

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <div
              className="notification-bell"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              🔔
              <span className="bell-count">
                {notifications.filter((n) => n.unread).length}
              </span>
            </div>

            {notifOpen && (
              <>
                <div onClick={() => setNotifOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
                <div style={{
                  position: "absolute", top: "100%", right: 0, marginTop: 8,
                  width: 340, background: "var(--bg-elevated)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-xl)", overflow: "hidden",
                  boxShadow: "var(--shadow-xl)", zIndex: 100,
                  animation: "slideUp 200ms ease",
                }}>
                  <div style={{
                    padding: "var(--space-4) var(--space-5)",
                    borderBottom: "1px solid var(--border-default)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <span style={{ fontWeight: 700, fontSize: "var(--text-sm)" }}>Live Alerts</span>
                    <span className="badge badge-primary">{notifications.filter((n) => n.unread).length} new</span>
                  </div>
                  {notifications.map((notif) => (
                    <div key={notif.id} style={{
                      padding: "var(--space-3) var(--space-5)",
                      borderBottom: "1px solid var(--border-default)",
                      display: "flex", alignItems: "flex-start", gap: "var(--space-3)",
                      background: notif.unread ? "rgba(124,77,255,0.03)" : "transparent",
                    }}>
                      <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 2 }}>{notif.icon}</span>
                      <div>
                        <div style={{ fontSize: "var(--text-sm)", fontWeight: notif.unread ? 600 : 400, lineHeight: 1.4 }}>
                          {notif.text}
                        </div>
                        <div style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: 2 }}>
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="avatar" title={user.name}>
            {user.avatar}
          </div>
        </div>
      </header>

      {/* ===== COMMAND PALETTE MODAL (Ctrl + K) ===== */}
      {cmdOpen && (
        <div className="modal-backdrop" onClick={() => setCmdOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div style={{ padding: 16, borderBottom: "1px solid var(--border-default)", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: "1.2rem" }}>🔍</span>
              <input
                type="text"
                placeholder="Type a command or page name..."
                autoFocus
                style={{ flex: 1, background: "none", border: "none", color: "#fff", outline: "none", fontSize: "1rem" }}
              />
              <kbd style={{ fontSize: "0.7rem", padding: "2px 6px", background: "var(--glass-bg)", border: "1px solid var(--border-default)", borderRadius: 4 }}>ESC</kbd>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase" }}>Quick Jump</div>
              {[
                { title: "🔍 Discover Internships", path: "/dashboard/student/discover" },
                { title: "✅ Attendance & Geo-Checkin", path: "/dashboard/student/attendance" },
                { title: "📊 Skill Radar & AI Analyzer", path: "/dashboard/student/skills" },
                { title: "📜 Blockchain Certificates", path: "/dashboard/student/certificates" },
                { title: "🚀 Startup Incubation Launchpad", path: "/dashboard/student/launchpad" },
              ].map((cmd, i) => (
                <div
                  key={i}
                  onClick={() => { router.push(cmd.path); setCmdOpen(false); }}
                  style={{
                    padding: "10px 14px", borderRadius: 8, background: "var(--glass-bg)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    cursor: "pointer", transition: "all 150ms ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(124, 77, 255, 0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "var(--glass-bg)"}
                >
                  <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{cmd.title}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Jump →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 1024px) {
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
