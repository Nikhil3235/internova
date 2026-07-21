"use client";

export default function AdminAuditPage() {
  const logs = [
    { time: "2026-07-21 00:45:12", actor: "Dr. Swati Patil", action: "Approved Milestone 8 for Priya Sharma", ip: "192.168.1.45", hash: "a8f93e2b109c4d5e6f7a8b9c0d1e2f3a" },
    { time: "2026-07-21 00:30:04", actor: "Razorpay HR", action: "Issued PPO to Priya Sharma", ip: "103.21.12.90", hash: "c7e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8" },
    { time: "2026-07-20 23:58:19", actor: "System Guard", action: "SHA-256 Certificate Generated for #402", ip: "127.0.0.1", hash: "f3b1a09876543210fedcba9876543210" },
    { time: "2026-07-20 22:14:55", actor: "Arjun Patil", action: "GPS Geofence Verified Check-in", ip: "192.168.1.102", hash: "b2d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3" },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>🔍 Cryptographic Audit Trail</h1>
        <p>Immutable log of every platform action protected by HMAC-SHA256 signatures</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor / User</th>
                <th>Action Description</th>
                <th>IP Address</th>
                <th>HMAC SHA-256 Signature</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i}>
                  <td>{l.time}</td>
                  <td style={{ fontWeight: 600 }}>{l.actor}</td>
                  <td>{l.action}</td>
                  <td>{l.ip}</td>
                  <td><code style={{ color: "var(--secondary-400)", fontSize: "0.8rem" }}>{l.hash}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
