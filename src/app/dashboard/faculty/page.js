"use client";

import { useState } from "react";
import { students } from "@/data/demoData";

export default function FacultyDashboard() {
  const [studentList, setStudentList] = useState(students);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [evaluationModal, setEvaluationModal] = useState(false);
  const [scores, setScores] = useState({ technical: 9, communication: 8, teamwork: 9 });
  const [feedbackText, setFeedbackText] = useState("");
  const [nlpAnalysis, setNlpAnalysis] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleOpenEvaluation = (student) => {
    setSelectedStudent(student);
    setEvaluationModal(true);
    setNlpAnalysis(null);
  };

  const handleAnalyzeSentiment = async () => {
    if (!feedbackText) return;
    try {
      const res = await fetch("/api/ai/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackText }),
      });
      const data = await res.json();
      if (data.success) {
        setNlpAnalysis(data);
      }
    } catch (e) {
      console.error("NLP Error:", e);
    }
  };

  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    setEvaluationModal(false);
    showToast(`✅ Evaluation & Real NLP Analysis saved for ${selectedStudent.name}!`);
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

      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>👨‍🏫 Faculty Mentor Dashboard</h1>
          <p>Supervise assigned students, track real-time attendance & submit NLP-analyzed evaluations</p>
        </div>

        <button className="btn btn-secondary" onClick={() => alert("Downloading Batch Performance PDF Report...")}>
          📄 Export Department PDF Report
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">👨‍🎓</div>
          <div className="stat-value">15</div>
          <div className="stat-label">Assigned Mentees</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">🟢</div>
          <div className="stat-value">12 Active</div>
          <div className="stat-label">Currently On-Site</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cyan">📊</div>
          <div className="stat-value">93.5%</div>
          <div className="stat-label">Avg Mentee Attendance</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon coral">⭐</div>
          <div className="stat-value">88.4</div>
          <div className="stat-label">Average InternScore™</div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3>My Assigned Students</h3>
          <span className="badge badge-primary">Academic Year 2025-26</span>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Branch & Year</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>InternScore</th>
                <th>Milestones</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div className="avatar">{s.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{s.branch} ({s.year})</td>
                  <td>
                    <span className={`badge ${s.status === "active" ? "badge-success" : s.status === "completed" ? "badge-cyan" : "badge-warning"}`}>
                      ● {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{s.attendance}%</td>
                  <td style={{ fontWeight: 700, color: "var(--primary-400)" }}>{s.internScore}/100</td>
                  <td>{s.milestonesCompleted}/{s.totalMilestones} Completed</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => handleOpenEvaluation(s)}>
                      Evaluate & NLP
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rubric Evaluation Modal with NLP */}
      {evaluationModal && selectedStudent && (
        <div className="modal-backdrop" onClick={() => setEvaluationModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className="modal-header">
              <h3>Evaluation & NLP Sentiment: {selectedStudent.name}</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setEvaluationModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveEvaluation}>
              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>Technical Performance (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={scores.technical}
                    onChange={(e) => setScores({ ...scores, technical: parseInt(e.target.value) })}
                    style={{ width: "100%", accentColor: "var(--primary-500)" }}
                  />
                  <div style={{ textAlign: "right", fontSize: "0.85rem", fontWeight: 700 }}>{scores.technical} / 10</div>
                </div>

                <div className="input-group">
                  <label>Qualitative Feedback Text</label>
                  <textarea
                    className="input textarea"
                    placeholder="Enter mentor remarks (e.g. 'Priya has shown outstanding problem solving skills and great teamwork...')"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    onBlur={handleAnalyzeSentiment}
                    required
                  />
                </div>

                {nlpAnalysis && (
                  <div style={{ background: "rgba(0, 212, 212, 0.08)", padding: 14, borderRadius: 10, border: "1px solid var(--secondary-400)" }}>
                    <div style={{ fontWeight: 700, color: "var(--secondary-400)", fontSize: "0.85rem", marginBottom: 2 }}>
                      🤖 Live NLP Sentiment Result: {nlpAnalysis.sentiment} ({Math.round(nlpAnalysis.score * 100)}%)
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{nlpAnalysis.summary}</div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEvaluationModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
