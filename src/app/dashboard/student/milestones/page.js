"use client";

import { useState } from "react";
import { milestones } from "@/data/demoData";

export default function MilestonesPage() {
  const [msList, setMsList] = useState(milestones);

  const toggleMilestone = (id) => {
    setMsList(msList.map(m => m.id === id ? { ...m, status: m.status === "completed" ? "in-progress" : "completed", progress: m.status === "completed" ? 50 : 100 } : m));
  };

  return (
    <div>
      <div className="page-header">
        <h1>🎯 Internship Milestone Timeline</h1>
        <p>Track structured deliverables and mentor-approved project milestones</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {msList.map((m, index) => (
          <div key={m.id} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: m.status === "completed" ? "rgba(16,185,129,0.2)" : "rgba(124,77,255,0.15)", color: m.status === "completed" ? "var(--success-400)" : "var(--primary-400)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                {index + 1}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{m.title}</h3>
                  <span className={`badge ${m.status === "completed" ? "badge-success" : m.status === "in-progress" ? "badge-cyan" : "badge-warning"}`}>
                    {m.status.toUpperCase()}
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "4px 0 8px 0" }}>{m.description}</p>
                
                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", maxWidth: 300 }}>
                  <div className="progress-bar" style={{ height: 6, flex: 1 }}>
                    <div className="progress-fill" style={{ width: `${m.progress}%` }}></div>
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)" }}>{m.progress}%</span>
                </div>
              </div>
            </div>

            <button
              className={`btn ${m.status === "completed" ? "btn-secondary" : "btn-primary"} btn-sm`}
              onClick={() => toggleMilestone(m.id)}
            >
              {m.status === "completed" ? "Mark Pending" : "Submit Milestone ✓"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
