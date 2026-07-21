"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, getDashboardPath } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(getDashboardPath());
    }
  }, [user, router, getDashboardPath]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 800));

    const result = await login(email, password);
    if (result.success) {
      setSuccess(`Welcome back, ${result.user.name}! Redirecting...`);
      setTimeout(() => {
        const path =
          result.user.role === "student" ? "/dashboard/student" :
          result.user.role === "faculty" ? "/dashboard/faculty" :
          result.user.role === "industry" ? "/dashboard/industry" :
          "/dashboard/admin";
        router.push(path);
      }, 1000);
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword("demo123");
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = await login(demoEmail, "demo123");
    if (result.success) {
      setSuccess(`Welcome, ${result.user.name}!`);
      setTimeout(() => {
        const path =
          result.user.role === "student" ? "/dashboard/student" :
          result.user.role === "faculty" ? "/dashboard/faculty" :
          result.user.role === "industry" ? "/dashboard/industry" :
          "/dashboard/admin";
        router.push(path);
      }, 800);
    }
  };

  return (
    <div className="auth-page">
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(124,77,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="auth-card" style={{ maxWidth: 460, width: "100%", position: "relative" }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "var(--space-3)" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "var(--gradient-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "1.3rem", color: "#fff",
              boxShadow: "0 0 25px rgba(124,77,255,0.4)",
            }}>N</div>
            <span style={{
              fontSize: "1.5rem", fontWeight: 800,
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Internova</span>
          </Link>
        </div>

        <div className="auth-header">
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>
            Welcome back
          </h1>
          <p>Sign in to continue your internship journey</p>
        </div>

        {/* Error / Success Messages */}
        {error && (
          <div style={{
            padding: "var(--space-3) var(--space-4)",
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "var(--radius-md)", color: "var(--error-400)",
            fontSize: "var(--text-sm)", marginBottom: "var(--space-4)",
            display: "flex", alignItems: "center", gap: "var(--space-2)",
            animation: "fadeInUp 300ms ease",
          }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div style={{
            padding: "var(--space-3) var(--space-4)",
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "var(--radius-md)", color: "var(--success-400)",
            fontSize: "var(--text-sm)", marginBottom: "var(--space-4)",
            display: "flex", alignItems: "center", gap: "var(--space-2)",
            animation: "fadeInUp 300ms ease",
          }}>
            ✅ {success}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="auth-form" style={{ marginBottom: "var(--space-6)" }}>
          <div className="input-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              type="email" id="login-email" className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              required autoFocus
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="login-password" className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                required
                style={{ paddingRight: 60 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "var(--text-tertiary)",
                  fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer",
                  padding: "4px 8px", borderRadius: "var(--radius-sm)",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: "var(--text-sm)",
          }}>
            <label style={{
              display: "flex", alignItems: "center", gap: "var(--space-2)",
              cursor: "pointer", color: "var(--text-secondary)",
            }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: 16, height: 16, accentColor: "var(--primary-500)",
                  cursor: "pointer",
                }}
              />
              Remember me
            </label>
            <span style={{ color: "var(--primary-400)", cursor: "pointer", fontWeight: 500 }}>
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isLoading}
            style={{ width: "100%", marginTop: "var(--space-2)" }}
          >
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <span style={{
                  width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff", borderRadius: "50%",
                  animation: "spin 0.7s linear infinite", display: "inline-block",
                }} />
                Signing in...
              </span>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider" style={{ marginBottom: "var(--space-5)" }}>
          <span>Quick demo access</span>
        </div>

        {/* Demo Account Quick Login */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
          {[
            { emoji: "👨‍🎓", label: "Student", email: "student@internova.in", color: "rgba(124,77,255,0.1)", border: "rgba(124,77,255,0.2)" },
            { emoji: "👨‍🏫", label: "Faculty", email: "faculty@internova.in", color: "rgba(0,212,212,0.1)", border: "rgba(0,212,212,0.2)" },
            { emoji: "🏢", label: "Industry", email: "industry@internova.in", color: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
            { emoji: "🔑", label: "Admin", email: "admin@internova.in", color: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
          ].map((demo) => (
            <button
              key={demo.email}
              onClick={() => handleDemoLogin(demo.email)}
              disabled={isLoading}
              style={{
                display: "flex", alignItems: "center", gap: "var(--space-2)",
                padding: "var(--space-3) var(--space-3)",
                background: demo.color, border: `1px solid ${demo.border}`,
                borderRadius: "var(--radius-md)", cursor: "pointer",
                transition: "all var(--transition-fast)",
                fontSize: "var(--text-sm)", fontWeight: 500,
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <span style={{ fontSize: "1.2rem" }}>{demo.emoji}</span>
              {demo.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--primary-400)", fontWeight: 600 }}>
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
