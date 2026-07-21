"use client";

import { useState } from "react";

export default function JournalPage() {
  const [logs, setLogs] = useState([
    { week: "Week 4", date: "Jul 18, 2026", text: "Implemented RESTful API endpoints for user authentication and integrated Supabase RLS policies. Fixed CORS issues during testing.", status: "Reviewed by Mentor", rating: "5/5" },
    { week: "Week 3", date: "Jul 11, 2026", text: "Designed responsive UI components using Next.js App Router and Tailwind CSS. Participated in sprint planning meetings.", status: "Reviewed by Mentor", rating: "4.8/5" },
  ]);

  const [entry, setEntry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry) return;

    const newLog = {
      week: `Week ${logs.length + 3}`,
      date: new Date().toLocaleDateString(),
      text: entry,
      status: "Submitted (Pending Review)",
      rating: "—",
    };

    setLogs([newLog, ...logs]);
    setEntry("");
    alert("Weekly log submitted successfully for mentor review!");
  };

  return (
    <div>
      <div className="page-header">
        <h1>📝 Weekly Learning Journal</h1>
        <p>Log your weekly work, achievements, and technical learnings for faculty review</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24 }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Submit Weekly Report</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="input-group">
              <label>Work Summary & Key Learnings</label>
              <textarea
                className="input textarea"
                rows={6}
                placeholder="Describe what tasks you completed this week, challenges faced, and skills applied..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit Report to Mentor
            </button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Previous Journal Entries</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {logs.map((log, i) => (
              <div key={i} style={{ background: "var(--bg-input)", padding: 16, borderRadius: 12, border: "1px solid var(--border-default)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700 }}>{log.week} ({log.date})</span>
                  <span className="badge badge-primary">{log.status}</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: 8 }}>{log.text}</p>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Mentor Rating: <strong style={{ color: "var(--warning-400)" }}>{log.rating}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
