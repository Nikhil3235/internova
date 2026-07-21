"use client";

import { useState } from "react";
import { applications, internships, companies } from "@/data/demoData";

export default function ApplicationsPage() {
  const [apps, setApps] = useState(applications);

  const columns = [
    { key: "applied", label: "Applied", badge: "badge-primary" },
    { key: "shortlisted", label: "Shortlisted", badge: "badge-cyan" },
    { key: "interview", label: "Interview Scheduled", badge: "badge-warning" },
    { key: "selected", label: "Selected / Active", badge: "badge-success" },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>📋 Application Tracker</h1>
        <p>Track your internship application lifecycle from submission to offer</p>
      </div>

      <div className="kanban-board" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, overflowX: "auto" }}>
        {columns.map((col) => {
          const colApps = apps.filter((a) => a.status === col.key || (col.key === "selected" && (a.status === "selected" || a.status === "active")));

          return (
            <div key={col.key} className="kanban-column card" style={{ background: "var(--bg-card)", minWidth: 260 }}>
              <div className="kanban-column-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h4 style={{ fontSize: "0.95rem", margin: 0 }}>{col.label}</h4>
                <span className={`badge ${col.badge}`}>{colApps.length}</span>
              </div>

              <div className="kanban-cards" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {colApps.map((app) => {
                  const internship = internships.find((i) => i.id === app.internshipId) || { title: "Software Intern", companyId: "c1", stipend: "₹20,000/mo" };
                  const company = companies.find((c) => c.id === internship.companyId) || { name: "Tech Company", logo: "🏢" };

                  return (
                    <div key={app.id} className="kanban-card card" style={{ padding: 14, background: "var(--bg-input)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: "1.2rem" }}>{company.logo}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{internship.title}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{company.name}</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border-default)" }}>
                        <span>Match: <strong style={{ color: "var(--primary-400)" }}>{app.matchScore}%</strong></span>
                        <span>{app.appliedDate}</span>
                      </div>
                    </div>
                  );
                })}

                {colApps.length === 0 && (
                  <div style={{ textAlign: "center", padding: "20px 10px", color: "var(--text-tertiary)", fontSize: "0.8rem", border: "1px dashed var(--border-default)", borderRadius: 8 }}>
                    No applications in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
