"use client";

import { students } from "@/data/demoData";

export default function InternScorePage() {
  const student = students[0];

  return (
    <div>
      <div className="page-header">
        <h1>🏆 InternScore™ Rating Algorithm</h1>
        <p>Proprietary 0-100 composite index mapping your overall employability & performance</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        <div className="card" style={{ textAlign: "center", padding: 32 }}>
          <div style={{ fontSize: "3.5rem", fontWeight: 800, background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {student.internScore}
          </div>
          <div style={{ fontWeight: 600, color: "var(--success-400)", marginBottom: 8 }}>Tier 1: Exceptional</div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Ranked Top 5% in North Maharashtra Region</p>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Score Breakdown Factors</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span>Attendance & Punctuality (30% Weight)</span>
                <strong style={{ color: "var(--success-400)" }}>95 / 100</strong>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: "95%" }}></div></div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span>Mentor Evaluation Rubric (30% Weight)</span>
                <strong style={{ color: "var(--primary-400)" }}>90 / 100</strong>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: "90%" }}></div></div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span>Milestones & Code Quality (25% Weight)</span>
                <strong style={{ color: "var(--secondary-400)" }}>85 / 100</strong>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: "85%" }}></div></div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span>Peer Feedback & Initiative (15% Weight)</span>
                <strong style={{ color: "var(--warning-400)" }}>80 / 100</strong>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: "80%" }}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
