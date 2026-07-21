"use client";

import { useState } from "react";
import { startupIdeas } from "@/data/demoData";

export default function LaunchpadPage() {
  const [ideas, setIdeas] = useState(startupIdeas);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDomain, setNewDomain] = useState("EdTech");
  const [newDesc, setNewDesc] = useState("");

  const handleCreateIdea = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const newIdea = {
      id: `idea_${Date.now()}`,
      studentId: "s1",
      title: newTitle,
      description: newDesc,
      stage: "idea",
      mentorId: "f1",
      domain: newDomain,
      createdDate: new Date().toISOString().split("T")[0],
    };

    setIdeas([newIdea, ...ideas]);
    setShowModal(false);
    setNewTitle("");
    setNewDesc("");
  };

  return (
    <div>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>🚀 Startup Launchpad</h1>
          <p>Transform your internship projects into viable startups with academic & industry incubation</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          ➕ Submit Startup Idea
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
        {ideas.map((idea) => (
          <div key={idea.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span className="badge badge-cyan">{idea.domain}</span>
                <span className={`badge ${idea.stage === "mvp" ? "badge-success" : idea.stage === "prototype" ? "badge-warning" : "badge-primary"}`}>
                  Stage: {idea.stage.toUpperCase()}
                </span>
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>{idea.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
                {idea.description}
              </p>
            </div>

            <div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 10, marginBottom: 16, fontSize: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Incubation Mentor:</span>
                <span style={{ fontWeight: 600, color: "var(--primary-400)" }}>Dr. Vivek Deshpande</span>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-secondary flex-1 btn-sm">Mentor Notes</button>
                <button className="btn btn-primary flex-1 btn-sm">Pitch Deck</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Idea Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h3>🚀 Submit Startup Venture</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateIdea}>
              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="input-group">
                  <label>Startup Title</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g. AgriSense IoT Solutions"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Domain / Industry</label>
                  <select className="input select" value={newDomain} onChange={(e) => setNewDomain(e.target.value)}>
                    <option>EdTech</option>
                    <option>Fintech</option>
                    <option>AgriTech</option>
                    <option>HealthTech</option>
                    <option>CleanTech / EV</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Problem Statement & Solution Pitch</label>
                  <textarea
                    className="input textarea"
                    placeholder="Briefly describe what problem your venture solves..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit for Mentorship</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
