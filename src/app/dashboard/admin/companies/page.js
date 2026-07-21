"use client";

import { companies } from "@/data/demoData";

export default function AdminCompaniesPage() {
  return (
    <div>
      <div className="page-header">
        <h1>🏢 Industry Partners ({companies.length})</h1>
        <p>Verified corporate partners offering internships & PPO conversions</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Industry Sector</th>
                <th>Size</th>
                <th>Location</th>
                <th>Active Interns</th>
                <th>PPO Rate</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "1.3rem" }}>{c.logo}</span>
                      <span style={{ fontWeight: 600 }}>{c.name}</span>
                    </div>
                  </td>
                  <td>{c.industry}</td>
                  <td>{c.size}</td>
                  <td>{c.location}</td>
                  <td><span className="badge badge-cyan">{c.internsCount} Interns</span></td>
                  <td style={{ fontWeight: 700, color: "var(--success-400)" }}>{c.ppoRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
