"use client";

import { useState } from "react";
import { attendanceRecords } from "@/data/demoData";

export default function AttendancePage() {
  const [records, setRecords] = useState(attendanceRecords);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [activeTab, setActiveTab] = useState("qr");
  const [toastMessage, setToastMessage] = useState("");

  const handleCheckIn = () => {
    setCheckingIn(true);
    setTimeout(() => {
      const newRecord = {
        id: `att_${Date.now()}`,
        studentId: "s1",
        date: new Date().toISOString().split("T")[0],
        checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        checkOutTime: "—",
        status: "present",
        location: "GHRCEM Jalgaon Campus (Geofenced GPS: 21.0078° N, 75.5626° E)",
      };
      setRecords([newRecord, ...records]);
      setIsCheckedIn(true);
      setCheckingIn(false);
      showToast("📍 Geofence Verified Check-in Successful!");
    }, 1500);
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

      <div className="page-header">
        <h1>✅ Attendance & Geo-Verification</h1>
        <p>Real-time location & QR-based attendance tracking system</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24, marginBottom: 24 }}>
        {/* Check-in Box */}
        <div className="card" style={{ textAlign: "center", padding: 32 }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>Daily Check-In</h3>
          <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: 24 }}>
            Verify your location to log attendance for today ({new Date().toLocaleDateString()})
          </p>

          <div className="tabs" style={{ marginBottom: 24, justifyContent: "center" }}>
            <button className={`tab ${activeTab === "qr" ? "active" : ""}`} onClick={() => setActiveTab("qr")}>
              📷 QR Scan
            </button>
            <button className={`tab ${activeTab === "gps" ? "active" : ""}`} onClick={() => setActiveTab("gps")}>
              📍 GPS Geofence
            </button>
          </div>

          {activeTab === "qr" ? (
            <div style={{ background: "rgba(255,255,255,0.03)", padding: 24, borderRadius: 16, border: "1px stroke var(--border-default)", marginBottom: 24 }}>
              <div style={{ fontSize: "4rem", marginBottom: 12 }}>📱</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Scan mentor's QR code or present your digital ID card</div>
            </div>
          ) : (
            <div style={{ background: "rgba(0, 212, 212, 0.05)", padding: 24, borderRadius: 16, border: "1px solid rgba(0, 212, 212, 0.2)", marginBottom: 24 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>📍</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--secondary-400)" }}>Geofence Active</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>GHRCEM Jalgaon • Within 50m radius</div>
            </div>
          )}

          <button
            className={`btn ${isCheckedIn ? "btn-success" : "btn-primary"} btn-lg w-full`}
            disabled={isCheckedIn || checkingIn}
            onClick={handleCheckIn}
          >
            {isCheckedIn ? "Checked In for Today ✓" : checkingIn ? "Verifying GPS & Photo..." : "Mark Attendance Now"}
          </button>
        </div>

        {/* Stats & Heatmap overview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon green">✅</div>
              <div className="stat-value">95%</div>
              <div className="stat-label">Overall Attendance</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon purple">🔥</div>
              <div className="stat-value">18 Days</div>
              <div className="stat-label">Current Streak</div>
            </div>
          </div>

          {/* Calendar Heatmap Simulation */}
          <div className="card">
            <h4 style={{ marginBottom: 16 }}>Attendance Heatmap (July 2026)</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const isWeekend = day % 7 === 0 || day % 7 === 6;
                const isAbsent = day === 12 || day === 19;
                return (
                  <div
                    key={day}
                    style={{
                      height: 36,
                      borderRadius: 8,
                      background: isWeekend ? "rgba(255,255,255,0.03)" : isAbsent ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)",
                      border: `1px solid ${isWeekend ? "transparent" : isAbsent ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.4)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: isAbsent ? "var(--error-400)" : isWeekend ? "var(--text-tertiary)" : "var(--success-400)"
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="card">
        <h3 style={{ marginBottom: 16 }}>Recent Attendance Log</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Location / Verification Method</th>
              </tr>
            </thead>
            <tbody>
              {records.slice(0, 10).map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td style={{ fontWeight: 600 }}>{r.checkInTime}</td>
                  <td>{r.checkOutTime || "17:00 PM"}</td>
                  <td>
                    <span className={`badge ${r.status === "present" ? "badge-success" : "badge-error"}`}>
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{r.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
