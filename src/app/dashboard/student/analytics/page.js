"use client";

import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function StudentAnalyticsPage() {
  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Weekly Performance Trend",
        data: [75, 82, 85, 88, 92, 94],
        borderColor: "#7c4dff",
        backgroundColor: "rgba(124,77,255,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <div className="page-header">
        <h1>📈 Personal Learning Analytics</h1>
        <p>Track your weekly growth velocity and productivity metrics</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 20 }}>Performance Growth Index</h3>
        <div style={{ height: 300 }}>
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}
