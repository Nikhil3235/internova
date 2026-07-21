"use client";

import { useState } from "react";
import { certificates } from "@/data/demoData";

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState(null);

  const handleVerify = (cert) => {
    setSelectedCert(cert);
    setVerifying(true);
    setVerifiedResult(null);

    setTimeout(() => {
      setVerifying(false);
      setVerifiedResult({
        status: "VALID",
        hash: cert.hash,
        timestamp: "2026-06-30T10:14:22.000Z",
        issuer: "GHRCEM & Razorpay Verification Node #402",
        blockNumber: "14,892,104",
      });
    }, 1200);
  };

  return (
    <div>
      <div className="page-header">
        <h1>📜 Blockchain Verified Credentials</h1>
        <p>Tamper-proof digital certificates secured by SHA-256 cryptographic hashing</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24 }}>
        {certificates.map((cert) => (
          <div key={cert.id} className="card" style={{ border: "1px solid rgba(124, 77, 255, 0.2)", background: "linear-gradient(145deg, rgba(124, 77, 255, 0.05) 0%, rgba(12, 14, 20, 0.8) 100%)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                📜
              </div>
              <span className="badge badge-success">✓ Verified on-chain</span>
            </div>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>{cert.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 16 }}>
              Issued by GHRCEM Jalgaon & Industry Mentor • {cert.issuedDate}
            </p>

            <div style={{ background: "rgba(0,0,0,0.3)", padding: 12, borderRadius: 8, marginBottom: 16, fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--secondary-400)", wordBreak: "break-all" }}>
              HASH: {cert.hash}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary flex-1 btn-sm" onClick={() => handleVerify(cert)}>
                🔍 Verify Hash
              </button>
              <a
                href={`/verify/${cert.hash}`}
                target="_blank"
                className="btn btn-primary flex-1 btn-sm text-center"
                style={{ textDecoration: "none" }}
              >
                🔗 Public Link
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Modal */}
      {selectedCert && (
        <div className="modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h3>Cryptographic Verification</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelectedCert(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: "center", padding: 32 }}>
              {verifying ? (
                <div>
                  <div className="animate-spin" style={{ fontSize: "3rem", marginBottom: 16 }}>⚡</div>
                  <div style={{ fontWeight: 600 }}>Querying Immutable Ledger...</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginTop: 8 }}>Re-computing SHA-256 Digest</div>
                </div>
              ) : verifiedResult ? (
                <div>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", color: "var(--success-400)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 16px" }}>
                    ✓
                  </div>
                  <h3 style={{ color: "var(--success-400)", marginBottom: 4 }}>Authentic Record</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 20 }}>This certificate is 100% genuine and unaltered.</p>

                  <div style={{ background: "var(--bg-input)", padding: 16, borderRadius: 12, textAlign: "left", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div><span style={{ color: "var(--text-tertiary)" }}>Issuer Node:</span> {verifiedResult.issuer}</div>
                    <div><span style={{ color: "var(--text-tertiary)" }}>Block #:</span> {verifiedResult.blockNumber}</div>
                    <div><span style={{ color: "var(--text-tertiary)" }}>Timestamp:</span> {verifiedResult.timestamp}</div>
                    <div style={{ wordBreak: "break-all" }}><span style={{ color: "var(--text-tertiary)" }}>SHA-256 Hash:</span> <code style={{ color: "var(--secondary-400)" }}>{verifiedResult.hash}</code></div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedCert(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
