"use client";

import { useState } from "react";
import { applications, students } from "@/data/demoData";

export default function IndustryDashboard() {
  const [apps, setApps] = useState(applications);
  const [activeTab, setActiveTab] = useState("applicants");
  const [toastMessage, setToastMessage] = useState("");

  const handleUpdateStatus = (appId, newStatus) => {
    setApps(apps.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    showToast(`✨ Application status updated to ${newStatus.toUpperCase()}`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div>
      {toastMessage && (
        <div className="toast success" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>🏢 Industry Partner Portal</h1>
          <p>Razorpay Tech Campus Hiring & Internship Management Panel</p>
        </div>

        <button className="btn btn-primary" onClick={() => alert("Redirecting to New Internship Posting Wizard...")}>
          ➕ Post New Internship
        </button>
      </div>

      {/* Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">📋</div>
          <div className="stat-value">4 Listings</div>
          <div className="stat-label">Active Openings</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cyan">👥</div>
          <div className="stat-value">120</div>
          <div className="stat-label">Total Applicants</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">👨‍💻</div>
          <div className="stat-value">5 Active</div>
          <div className="stat-label">Current Interns</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon coral">🎯</div>
          <div className="stat-value">95%</div>
          <div className="stat-label">PPO Conversion Rate</div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="tabs" style={{ marginBottom: 20 }}>
          <button className={`tab ${activeTab === "applicants" ? "active" : ""}`} onClick={() => setActiveTab("applicants")}>
            👥 Applicants Pipeline ({apps.length})
          </button>
          <button className={`tab ${activeTab === "ppo" ? "active" : ""}`} onClick={() => setActiveTab("ppo")}>
            🎯 Pre-Placement Offers (PPO)
          </button>
        </div>

        {activeTab === "applicants" ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student Candidate</th>
                  <th>College & Branch</th>
                  <th>AI Match Score</th>
                  <th>Application Date</th>
                  <th>Pipeline Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.slice(0, 10).map((app) => {
                  const student = students.find((s) => s.id === app.studentId) || { name: "Candidate", college: "GHRCEM", branch: "CS", avatar: "CN" };
                  return (
                    <tr key={app.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div className="avatar">{student.avatar}</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{student.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{student.college} • {student.branch}</td>
                      <td>
                        <span className="badge badge-primary" style={{ fontWeight: 700 }}>
                          🤖 {app.matchScore}%
                        </span>
                      </td>
                      <td>{app.appliedDate}</td>
                      <td>
                        <span className={`badge ${app.status === "selected" ? "badge-success" : app.status === "shortlisted" ? "badge-cyan" : "badge-warning"}`}>
                          {app.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn btn-secondary btn-sm" onClick={() => handleUpdateStatus(app.id, "shortlisted")}>
                            Shortlist
                          </button>
                          <button className="btn btn-primary btn-sm" onClick={() => handleUpdateStatus(app.id, "selected")}>
                            Hire / Select
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h4 style={{ marginBottom: 16 }}>Pre-Placement Offer (PPO) Candidates</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 20 }}>
              Top performing interns eligible for direct full-time employment offers based on high InternScore™ & mentor ratings.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "var(--bg-input)", padding: 20, borderRadius: 14, border: "1px solid var(--success-500)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontWeight: 700 }}>Priya Sharma</div>
                  <span className="badge badge-success">PPO Recommended</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 16 }}>
                  Role: Full Stack Developer • Stipend Offered: ₹8,00,000 LPA
                </div>
                <button className="btn btn-success w-full btn-sm">Issue Formal PPO Letter</button>
              </div>

              <div style={{ background: "var(--bg-input)", padding: 20, borderRadius: 14, border: "1px solid var(--border-default)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontWeight: 700 }}>Sneha Deshmukh</div>
                  <span className="badge badge-cyan">Under Evaluation</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 16 }}>
                  Role: Backend Engineer • Target LPA: ₹7,50,000 LPA
                </div>
                <button className="btn btn-secondary w-full btn-sm">Review Final Appraisal</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
