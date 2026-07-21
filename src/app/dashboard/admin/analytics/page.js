"use client";

import { analyticsData } from "@/data/demoData";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminAnalyticsPage() {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Internship Enrollments",
        data: [120, 190, 300, 450, 680, 890],
        borderColor: "#00d4d4",
        backgroundColor: "rgba(0, 212, 212, 0.1)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <div className="page-header">
        <h1>📈 Analytics Suite & AI Reporting</h1>
        <p>Macro-level metrics across departments, industry conversions, and student growth</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h3>Growth Velocity (2026)</h3>
          <div style={{ height: 260, marginTop: 16 }}>
            <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="card">
          <h3>Top Employability Metrics</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: 4 }}>
                <span>PPO Conversion Rate</span>
                <strong style={{ color: "var(--success-400)" }}>{analyticsData.placementRate}%</strong>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${analyticsData.placementRate}%` }}></div></div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: 4 }}>
                <span>Mentor Evaluation Response Speed</span>
                <strong style={{ color: "var(--primary-400)" }}>98%</strong>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: "98%" }}></div></div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: 4 }}>
                <span>Certificate Verification Rate</span>
                <strong style={{ color: "var(--secondary-400)" }}>100%</strong>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: "100%" }}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
