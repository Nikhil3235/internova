"use client";

import { useState } from "react";
import { analyticsData } from "@/data/demoData";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [auditLog, setAuditLog] = useState([
    { time: "10 mins ago", user: "Dr. Swati Patil", action: "Approved Milestone 8 for Priya Sharma", hash: "a8f9...4b12" },
    { time: "25 mins ago", user: "Razorpay HR", action: "Issued PPO to Priya Sharma", hash: "c7e2...9d31" },
    { time: "1 hour ago", user: "System Guard", action: "SHA-256 Verified Certificate #402 Issued", hash: "f3b1...81a0" },
    { time: "3 hours ago", user: "Arjun Patil", action: "Geofence Check-in Verified (GHRCEM Campus)", hash: "b2d5...11e9" },
  ]);

  const placementFunnelData = {
    labels: ["Total Registered", "Applied", "Shortlisted", "Interviewed", "Internships Active", "PPO / Placed"],
    datasets: [
      {
        label: "Students Funnel 2026",
        data: [2547, 2100, 1450, 890, 342, 321],
        backgroundColor: [
          "rgba(124, 77, 255, 0.8)",
          "rgba(0, 212, 212, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(255, 77, 109, 0.8)",
        ],
        borderRadius: 8,
      },
    ],
  };

  const departmentData = {
    labels: ["Computer Engg", "IT", "AI & ML", "Data Science", "E&TC", "Mechanical", "Civil"],
    datasets: [
      {
        data: [420, 310, 280, 190, 230, 180, 140],
        backgroundColor: [
          "#7c4dff",
          "#00d4d4",
          "#3b82f6",
          "#f59e0b",
          "#10b981",
          "#ff4d6d",
          "#636c82"
        ],
      },
    ],
  };

  return (
    <div>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>🔑 TPO Command Center</h1>
          <p>Institution-wide real-time monitoring, audit trails & placement statistics</p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => alert("Generating NAAC / AICTE Accreditation Compliance Report...")}>
            📄 Accreditation Report
          </button>
          <button className="btn btn-primary" onClick={() => alert("Bulk CSV Import Modal Ready")}>
            📥 Bulk Import Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">👨‍🎓</div>
          <div className="stat-value">{analyticsData.totalStudents}</div>
          <div className="stat-label">Total Registered Students</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cyan">🏢</div>
          <div className="stat-value">{analyticsData.totalCompanies}</div>
          <div className="stat-label">Industry Partners</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">🎯</div>
          <div className="stat-value">{analyticsData.placementRate}%</div>
          <div className="stat-label">Internship Conversion Rate</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon coral">🏆</div>
          <div className="stat-value">{analyticsData.avgInternScore}</div>
          <div className="stat-label">Avg Institution InternScore™</div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 24, margin: "24px 0" }}>
        {/* Placement Funnel */}
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Placement & Internship Conversion Funnel</h3>
          <div style={{ height: 300 }}>
            <Bar
              data={placementFunnelData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#9ba3b5" } },
                  y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#9ba3b5" } },
                },
              }}
            />
          </div>
        </div>

        {/* Department Share */}
        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 style={{ marginBottom: 20 }}>Department-Wise Interns</h3>
          <div style={{ width: 240, height: 240 }}>
            <Doughnut
              data={departmentData}
              options={{
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      </div>

      {/* Immutable Audit Log */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3>🔗 Immutable System Audit Trail</h3>
          <span className="badge badge-success">✓ Cryptographically Hashed Log</span>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>User / Actor</th>
                <th>Action Recorded</th>
                <th>SHA-256 Audit Hash</th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((log, i) => (
                <tr key={i}>
                  <td>{log.time}</td>
                  <td style={{ fontWeight: 600 }}>{log.user}</td>
                  <td>{log.action}</td>
                  <td><code style={{ color: "var(--secondary-400)", fontSize: "0.8rem" }}>{log.hash}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
