"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { certificates } from "@/data/demoData";

export default function PassportPage() {
  const { user } = useAuth();

  const studentName = user?.name || "Priya Sharma";
  const studentCollege = user?.college || "GHRCEM Jalgaon";
  const studentBranch = user?.branch || "Computer Engineering";
  const studentAvatar = user?.avatar || "PS";

  return (
    <div>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>🪪 Digital Internship Passport</h1>
          <p>Your unified, shareable professional portfolio verified by GHRCEM</p>
        </div>

        <button className="btn btn-primary" onClick={() => alert(`Sharable Link copied for ${studentName}! \nhttps://internova.in/passport/${user?.id || 's1'}`)}>
          🔗 Share Passport Link
        </button>
      </div>

      <div className="card" style={{ maxWidth: 840, margin: "0 auto", padding: 40, border: "1px solid var(--primary-500)", background: "linear-gradient(180deg, rgba(19, 22, 34, 0.9) 0%, rgba(6, 7, 10, 0.95) 100%)" }}>
        {/* Profile Header */}
        <div style={{ display: "flex", gap: 24, alignItems: "center", borderBottom: "1px solid var(--border-default)", paddingBottom: 32, marginBottom: 32 }}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", fontWeight: 800, color: "#fff", flexShrink: 0 }}>
            {studentAvatar}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>{studentName}</h2>
                <div style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: 4 }}>
                  {studentBranch} • {studentCollege}
                </div>
              </div>
              <div className="badge badge-success" style={{ padding: "6px 14px", fontSize: "0.85rem" }}>
                ✓ Official Verified Passport
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", padding: "8px 16px", borderRadius: 10 }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>InternScore™</span>
                <div style={{ fontWeight: 800, color: "var(--primary-400)", fontSize: "1.1rem" }}>92/100</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", padding: "8px 16px", borderRadius: 10 }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Attendance Rate</span>
                <div style={{ fontWeight: 800, color: "var(--success-400)", fontSize: "1.1rem" }}>96%</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", padding: "8px 16px", borderRadius: 10 }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Verified Badges</span>
                <div style={{ fontWeight: 800, color: "var(--secondary-400)", fontSize: "1.1rem" }}>4 Earned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Skills */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: 16 }}>Verified Skill Proficiency</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {(user?.skills && user.skills.length > 0 ? user.skills : ["React", "Node.js", "Python", "SQL", "Next.js"]).map((skill) => (
              <span key={skill} className="badge badge-primary" style={{ padding: "8px 16px", fontSize: "0.875rem" }}>
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certified Achievements */}
        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: 16 }}>Verified Internship Record</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {certificates.map((cert) => (
              <div key={cert.id} style={{ background: "var(--bg-input)", padding: 20, borderRadius: 14, border: "1px solid var(--border-default)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>{cert.title}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Issued: {cert.issuedDate} to {studentName}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--secondary-400)", fontFamily: "var(--font-mono)", marginTop: 6 }}>SHA-256: {cert.hash}</div>
                </div>
                <span className="badge badge-success">Authentic ✓</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
