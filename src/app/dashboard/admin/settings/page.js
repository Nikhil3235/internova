"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    autoVerifyGeofence: true,
    requireMentorApproval: true,
    sha256CertificateChain: true,
    minAttendancePercent: 75,
  });

  return (
    <div>
      <div className="page-header">
        <h1>⚙️ System Settings & Governance</h1>
        <p>Institution-wide parameters, evaluation rubrics, and security policies</p>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <h3 style={{ marginBottom: 20 }}>Security & Evaluation Policies</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>Automatic GPS Geofence Verification</span>
            <input type="checkbox" checked={settings.autoVerifyGeofence} onChange={e => setSettings({...settings, autoVerifyGeofence: e.target.checked})} />
          </label>

          <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>Require Mentor Approval for Milestones</span>
            <input type="checkbox" checked={settings.requireMentorApproval} onChange={e => setSettings({...settings, requireMentorApproval: e.target.checked})} />
          </label>

          <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>Enable SHA-256 Certificate Hash Chain</span>
            <input type="checkbox" checked={settings.sha256CertificateChain} onChange={e => setSettings({...settings, sha256CertificateChain: e.target.checked})} />
          </label>

          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: "0.875rem" }}>Minimum Attendance Required for PPO (%)</label>
            <input className="input" type="number" value={settings.minAttendancePercent} onChange={e => setSettings({...settings, minAttendancePercent: e.target.value})} style={{ marginTop: 4 }} />
          </div>

          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => alert("System settings updated successfully!")}>
            Save System Settings
          </button>
        </div>
      </div>
    </div>
  );
}
