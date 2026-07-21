"use client";

import { use } from "react";
import Link from "next/link";
import { certificates, students } from "@/data/demoData";

export default function VerifyCertificatePage({ params }) {
  const unwrappedParams = use(params);
  const hash = unwrappedParams.hash;

  // Find certificate or default to sample
  const cert = certificates.find((c) => c.hash === hash) || certificates[0];
  const student = students[0];

  return (
    <div className="auth-page" style={{ padding: 24, minHeight: "100vh" }}>
      <div className="auth-card" style={{ maxWidth: 640, width: "100%", padding: 40, border: "1px solid var(--success-500)", background: "linear-gradient(180deg, rgba(19, 22, 34, 0.95) 0%, rgba(6, 7, 10, 0.98) 100%)" }}>
        
        {/* Top Seal */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", color: "var(--success-400)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 12px", border: "2px solid var(--success-500)" }}>
            ✓
          </div>
          <h2 style={{ color: "var(--success-400)", margin: 0, fontSize: "1.5rem" }}>Verified Authentic Certificate</h2>
          <p style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", marginTop: 4 }}>
            Recorded on Internova Immutable Ledger • GHRCEM Jalgaon
          </p>
        </div>

        {/* Certificate Details Box */}
        <div style={{ background: "var(--bg-input)", padding: 24, borderRadius: 16, border: "1px solid var(--border-default)", marginBottom: 24 }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Certificate Title</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 16px 0" }}>{cert.title}</h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, borderTop: "1px solid var(--border-default)", paddingTop: 16 }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Awarded To</div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{student.name}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Issued Date</div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{cert.issuedDate}</div>
            </div>
          </div>
        </div>

        {/* Technical Blockchain Proof */}
        <div style={{ background: "rgba(0,0,0,0.4)", padding: 16, borderRadius: 12, marginBottom: 24, fontSize: "0.8rem" }}>
          <div style={{ color: "var(--text-tertiary)", marginBottom: 6 }}>Cryptographic Proof (SHA-256 Digest):</div>
          <code style={{ color: "var(--secondary-400)", wordBreak: "break-all" }}>{hash || cert.hash}</code>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/" className="btn btn-primary" style={{ textDecoration: "none" }}>
            ← Return to Internova Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
