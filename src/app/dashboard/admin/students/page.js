"use client";

import { useState } from "react";
import { students } from "@/data/demoData";

export default function AdminStudentsPage() {
  const [list, setList] = useState(students);
  const [search, setSearch] = useState("");

  const filtered = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.branch.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>👨‍🎓 Student Registry ({filtered.length})</h1>
          <p>Full student directory across all departments & academic years</p>
        </div>

        <button className="btn btn-primary" onClick={() => alert("Bulk Add Students Modal Ready")}>
          ➕ Add New Student
        </button>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <input
          className="input"
          placeholder="Filter students by name, branch, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Branch & Year</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>InternScore</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar">{s.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{s.branch} ({s.year})</td>
                  <td><span className="badge badge-success">{s.status.toUpperCase()}</span></td>
                  <td>{s.attendance}%</td>
                  <td style={{ fontWeight: 700, color: "var(--primary-400)" }}>{s.internScore}/100</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => alert(`Viewing profile of ${s.name}`)}>
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
