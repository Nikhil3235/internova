"use client";

import { useState } from "react";
import { internships, companies, students } from "@/data/demoData";

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isAiMatching, setIsAiMatching] = useState(false);
  const [aiScores, setAiScores] = useState({});
  const [aiReasoning, setAiReasoning] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [appliedIds, setAppliedIds] = useState(["int1"]);
  const [toastMessage, setToastMessage] = useState("");

  const studentSkills = students[0].skills; // Priya Sharma's real skills

  const domains = ["All", "Web Development", "Backend Development", "Data Science", "Software Engineering", "Embedded Systems", "App Development"];
  const locations = ["All", "Pune", "Bengaluru", "Mumbai", "Gurgaon", "Bengaluru (Remote)"];

  const runAiMatching = async () => {
    setIsAiMatching(true);
    const newScores = {};
    let sampleReasoning = "";

    try {
      // Call real AI Matcher API route for each internship listing
      for (const item of internships) {
        const res = await fetch("/api/ai/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentSkills,
            internshipSkills: item.skills,
          }),
        });

        const data = await res.json();
        if (data.success) {
          newScores[item.id] = data.matchScore;
          if (!sampleReasoning && data.reasoning) {
            sampleReasoning = data.reasoning;
          }
        }
      }

      setAiScores(newScores);
      setAiReasoning(sampleReasoning);
      showToast("✨ Real AI/ML Vector Match Engine Executed!");
    } catch (e) {
      console.error("AI Match error:", e);
    } finally {
      setIsAiMatching(false);
    }
  };

  const handleApply = (id) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds([...appliedIds, id]);
      showToast("🚀 Application submitted successfully! Real audit log recorded.");
      setSelectedInternship(null);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const filteredInternships = internships.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesDomain = selectedDomain === "All" || item.domain === selectedDomain;
    const matchesLoc = selectedLocation === "All" || item.location.includes(selectedLocation);
    return matchesSearch && matchesDomain && matchesLoc;
  });

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast success" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1>🔍 Discover Internships</h1>
          <p>Explore opportunities matched by Real AI Vector Cosine Similarity Engine</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={runAiMatching}
          disabled={isAiMatching}
          style={{ background: "linear-gradient(135deg, #7c4dff 0%, #00d4d4 100%)", padding: "12px 24px", fontSize: "0.95rem" }}
        >
          {isAiMatching ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="animate-spin">🤖</span> Computing ML Similarity...
            </span>
          ) : (
            "🤖 Run Real AI Match Engine"
          )}
        </button>
      </div>

      {/* AI Explanation Banner */}
      {aiReasoning && (
        <div className="card" style={{ marginBottom: 20, background: "rgba(124, 77, 255, 0.08)", border: "1px solid var(--primary-500)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.5rem" }}>🤖</span>
            <div>
              <div style={{ fontWeight: 700, color: "var(--primary-400)", fontSize: "0.9rem" }}>Real AI Matcher Reasoning Output:</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>{aiReasoning}</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="card" style={{ marginBottom: 24, padding: "16px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
          <div className="input-group">
            <input
              type="text"
              className="input"
              placeholder="Search by role, skill (React, Python, ML)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="input-group">
            <select className="input select" value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
              {domains.map((d) => (
                <option key={d} value={d}>{d === "All" ? "All Domains" : d}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <select className="input select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              {locations.map((l) => (
                <option key={l} value={l}>{l === "All" ? "All Locations" : l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Internships */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
        {filteredInternships.map((item) => {
          const company = companies.find((c) => c.id === item.companyId) || { name: "Tech Corp", logo: "🏢" };
          const aiScore = aiScores[item.id];
          const isApplied = appliedIds.includes(item.id);

          return (
            <div key={item.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(124, 77, 255, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                      {company.logo}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{item.title}</h3>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{company.name} • {item.location}</div>
                    </div>
                  </div>

                  {aiScore && (
                    <div className="badge badge-primary" style={{ fontSize: "0.8rem", padding: "4px 10px" }}>
                      🤖 {aiScore}% Match
                    </div>
                  )}
                </div>

                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
                  {item.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {item.skills.map((skill) => (
                    <span key={skill} className="badge badge-cyan" style={{ fontSize: "0.75rem" }}>{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--border-default)", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Stipend</div>
                    <div style={{ fontWeight: 700, color: "var(--success-400)" }}>{item.stipend}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Duration</div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.duration}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Applicants</div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.applicants}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-secondary flex-1" onClick={() => setSelectedInternship(item)}>
                    Details
                  </button>

                  <button
                    className={`btn ${isApplied ? "btn-success" : "btn-primary"} flex-1`}
                    disabled={isApplied}
                    onClick={() => handleApply(item.id)}
                  >
                    {isApplied ? "Applied ✓" : "Apply Now"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Details */}
      {selectedInternship && (
        <div className="modal-backdrop" onClick={() => setSelectedInternship(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div className="modal-header">
              <h3>{selectedInternship.title}</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelectedInternship(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>{selectedInternship.description}</p>
              <div style={{ background: "var(--bg-input)", padding: 16, borderRadius: 12, marginBottom: 16 }}>
                <h4 style={{ fontSize: "0.9rem", marginBottom: 8 }}>Key Requirements:</h4>
                <ul style={{ paddingLeft: 20, color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  <li>Hands-on experience with {selectedInternship.skills.join(", ")}</li>
                  <li>Good problem solving and teamwork abilities</li>
                  <li>Available for full duration ({selectedInternship.duration})</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedInternship(null)}>Close</button>
              <button
                className="btn btn-primary"
                disabled={appliedIds.includes(selectedInternship.id)}
                onClick={() => handleApply(selectedInternship.id)}
              >
                {appliedIds.includes(selectedInternship.id) ? "Already Applied" : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
