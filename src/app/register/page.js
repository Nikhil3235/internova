"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, user, getDashboardPath } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    college: "", branch: "", year: "",
    department: "", designation: "", specialization: "",
    companyName: "", industryType: "", companySize: "",
    institution: "",
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");

  // Redirect if logged in
  useEffect(() => {
    if (user) router.push(getDashboardPath());
  }, [user, router, getDashboardPath]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const validateStep = () => {
    if (step === 1 && !selectedRole) { setError("Please select a role"); return false; }
    if (step === 2) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill all fields"); return false;
      }
      if (formData.password.length < 6) { setError("Password must be at least 6 characters"); return false; }
      if (formData.password !== formData.confirmPassword) { setError("Passwords don't match"); return false; }
      if (!/\S+@\S+\.\S+/.test(formData.email)) { setError("Please enter a valid email"); return false; }
    }
    return true;
  };

  const handleNext = () => { if (validateStep()) { setError(""); setStep(step + 1); } };
  const handleBack = () => { setError(""); setStep(step - 1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1200));

    const result = await register({
      ...formData, role: selectedRole, password: formData.password,
    });

    if (result.success) {
      const path = selectedRole === "student" ? "/dashboard/student" :
        selectedRole === "faculty" ? "/dashboard/faculty" :
        selectedRole === "industry" ? "/dashboard/industry" : "/dashboard/admin";
      router.push(path);
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const roles = [
    { id: "student", icon: "👨‍🎓", title: "Student", desc: "Track internships, build skills, earn certificates", gradient: "linear-gradient(135deg, rgba(124,77,255,0.15), rgba(124,77,255,0.05))", border: "rgba(124,77,255,0.3)" },
    { id: "faculty", icon: "👨‍🏫", title: "Faculty Mentor", desc: "Guide students, evaluate progress, generate reports", gradient: "linear-gradient(135deg, rgba(0,212,212,0.15), rgba(0,212,212,0.05))", border: "rgba(0,212,212,0.3)" },
    { id: "industry", icon: "🏢", title: "Industry Partner", desc: "Post internships, manage interns, hire talent", gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))", border: "rgba(16,185,129,0.3)" },
    { id: "admin", icon: "🔑", title: "Admin / TPO", desc: "Full control: analytics, users, audit, settings", gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))", border: "rgba(245,158,11,0.3)" },
  ];

  const suggestedSkills = ["React", "Node.js", "Python", "Java", "Machine Learning", "SQL", "AWS", "Docker", "Next.js", "TypeScript", "MongoDB", "Git"];

  return (
    <div className="auth-page">
      <div style={{
        position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(0,212,212,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="auth-card" style={{ maxWidth: step === 1 ? 540 : 480, width: "100%", position: "relative", transition: "max-width var(--transition-base)" }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "var(--space-3)" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "var(--gradient-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "1.2rem", color: "#fff",
            }}>N</div>
            <span style={{
              fontSize: "1.35rem", fontWeight: 800,
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Internova</span>
          </Link>
        </div>

        {/* Progress Bar */}
        <div style={{
          display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-6)",
        }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 99,
              background: s <= step ? "var(--gradient-primary)" : "rgba(255,255,255,0.06)",
              transition: "all var(--transition-base)",
            }} />
          ))}
        </div>

        <div className="auth-header">
          <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-1)" }}>
            {step === 1 ? "Choose your role" :
             step === 2 ? "Create your account" :
             step === 3 ? "Tell us more" : "Review & confirm"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>
            Step {step} of 4
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: "var(--space-3) var(--space-4)",
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "var(--radius-md)", color: "var(--error-400)",
            fontSize: "var(--text-sm)", marginBottom: "var(--space-4)",
            animation: "fadeInUp 300ms ease",
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Role Selection */}
          {step === 1 && (
            <div className="role-selector" style={{ marginBottom: "var(--space-6)" }}>
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`role-option ${selectedRole === role.id ? "selected" : ""}`}
                  onClick={() => { setSelectedRole(role.id); setError(""); }}
                  style={{
                    background: selectedRole === role.id ? role.gradient : "var(--bg-input)",
                    borderColor: selectedRole === role.id ? role.border : "var(--border-default)",
                  }}
                >
                  <div className="role-icon">{role.icon}</div>
                  <div className="role-name">{role.title}</div>
                  <div className="role-desc">{role.desc}</div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: Basic Info */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
              <div className="input-group">
                <label>Full Name</label>
                <input className="input" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" autoFocus />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                <div className="input-group">
                  <label>Password</label>
                  <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min 6 characters" />
                </div>
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input className="input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Role-specific Details */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
              {selectedRole === "student" && (
                <>
                  <div className="input-group">
                    <label>College / University</label>
                    <input className="input" name="college" value={formData.college} onChange={handleChange} placeholder="e.g., GHRCEM Jalgaon" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                    <div className="input-group">
                      <label>Branch</label>
                      <select className="input select" name="branch" value={formData.branch} onChange={handleChange}>
                        <option value="">Select Branch</option>
                        <option>Computer Science</option>
                        <option>Information Technology</option>
                        <option>AI & ML</option>
                        <option>Data Science</option>
                        <option>E&TC</option>
                        <option>Mechanical</option>
                        <option>Civil</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Year</label>
                      <select className="input select" name="year" value={formData.year} onChange={handleChange}>
                        <option value="">Select Year</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Skills (add your top skills)</label>
                    <div style={{ display: "flex", gap: "var(--space-2)" }}>
                      <input
                        className="input" value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                        placeholder="Type a skill and press Enter"
                        style={{ flex: 1 }}
                      />
                      <button type="button" onClick={addSkill} className="btn btn-secondary btn-sm">Add</button>
                    </div>
                    {formData.skills.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
                        {formData.skills.map((s) => (
                          <span key={s} className="badge badge-primary" style={{ cursor: "pointer" }} onClick={() => removeSkill(s)}>
                            {s} ✕
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1)", marginTop: "var(--space-2)" }}>
                      {suggestedSkills.filter((s) => !formData.skills.includes(s)).slice(0, 6).map((s) => (
                        <button key={s} type="button" onClick={() => setFormData((p) => ({ ...p, skills: [...p.skills, s] }))}
                          style={{
                            padding: "2px 8px", fontSize: "0.7rem", borderRadius: 99,
                            background: "var(--glass-bg)", border: "1px solid var(--border-default)",
                            color: "var(--text-tertiary)", cursor: "pointer",
                          }}
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedRole === "faculty" && (
                <>
                  <div className="input-group">
                    <label>Department</label>
                    <select className="input select" name="department" value={formData.department} onChange={handleChange}>
                      <option value="">Select Department</option>
                      <option>Computer Engineering</option>
                      <option>Information Technology</option>
                      <option>AI & ML</option>
                      <option>E&TC</option>
                      <option>Mechanical</option>
                      <option>Civil</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Designation</label>
                    <input className="input" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g., Assistant Professor" />
                  </div>
                  <div className="input-group">
                    <label>Specialization</label>
                    <input className="input" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g., Machine Learning, Cloud Computing" />
                  </div>
                </>
              )}

              {selectedRole === "industry" && (
                <>
                  <div className="input-group">
                    <label>Company Name</label>
                    <input className="input" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g., Razorpay" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                    <div className="input-group">
                      <label>Industry Type</label>
                      <select className="input select" name="industryType" value={formData.industryType} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option>IT Services</option>
                        <option>Fintech</option>
                        <option>E-commerce</option>
                        <option>EdTech</option>
                        <option>Healthcare</option>
                        <option>Manufacturing</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Company Size</label>
                      <select className="input select" name="companySize" value={formData.companySize} onChange={handleChange}>
                        <option value="">Select Size</option>
                        <option>1-50</option>
                        <option>51-200</option>
                        <option>201-1000</option>
                        <option>1000+</option>
                        <option>10,000+</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {selectedRole === "admin" && (
                <>
                  <div className="input-group">
                    <label>Institution Name</label>
                    <input className="input" name="institution" value={formData.institution} onChange={handleChange} placeholder="e.g., GHRCEM Jalgaon" />
                  </div>
                  <div className="input-group">
                    <label>Designation</label>
                    <input className="input" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g., Training & Placement Officer" />
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div style={{
              background: "var(--glass-bg)", border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)", padding: "var(--space-5)",
              marginBottom: "var(--space-6)",
            }}>
              {[
                { label: "Role", value: roles.find((r) => r.id === selectedRole)?.title },
                { label: "Name", value: formData.name },
                { label: "Email", value: formData.email },
                selectedRole === "student" && { label: "College", value: formData.college },
                selectedRole === "student" && { label: "Branch", value: formData.branch },
                selectedRole === "student" && { label: "Year", value: formData.year },
                selectedRole === "faculty" && { label: "Department", value: formData.department },
                selectedRole === "faculty" && { label: "Designation", value: formData.designation },
                selectedRole === "industry" && { label: "Company", value: formData.companyName },
                selectedRole === "admin" && { label: "Institution", value: formData.institution },
              ]
                .filter(Boolean)
                .map((item, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", padding: "var(--space-3) 0",
                    borderBottom: "1px solid var(--border-default)", fontSize: "var(--text-sm)",
                  }}>
                    <span style={{ color: "var(--text-tertiary)" }}>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.value || "—"}</span>
                  </div>
                ))}

              {selectedRole === "student" && formData.skills.length > 0 && (
                <div style={{ marginTop: "var(--space-3)", display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                  {formData.skills.map((s) => (
                    <span key={s} className="badge badge-primary">{s}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            {step > 1 && (
              <button type="button" onClick={handleBack} className="btn btn-secondary" style={{ flex: 1 }}>
                ← Back
              </button>
            )}
            {step < 4 ? (
              <button type="button" onClick={handleNext} className="btn btn-primary" style={{ flex: step === 1 ? "1" : "1" }}>
                Continue →
              </button>
            ) : (
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isLoading}>
                {isLoading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <span style={{
                      width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff", borderRadius: "50%",
                      animation: "spin 0.7s linear infinite", display: "inline-block",
                    }} />
                    Creating account...
                  </span>
                ) : "🚀 Create Account"}
              </button>
            )}
          </div>
        </form>

        <div className="auth-footer" style={{ marginTop: "var(--space-5)" }}>
          <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-sm)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--primary-400)", fontWeight: 600 }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
