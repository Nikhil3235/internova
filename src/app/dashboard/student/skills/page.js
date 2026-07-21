"use client";

import { useState } from "react";
import { Radar } from "react-chartjs-2";
import { students } from "@/data/demoData";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SkillsPage() {
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [analyzing, setAnalyzing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const [completedModules, setCompletedModules] = useState([1]);
  const [toastMessage, setToastMessage] = useState("");

  const studentSkills = students[0].skills;

  const skillData = {
    labels: ["Frontend (React/Next)", "Backend (Node/Python)", "Database (SQL/Mongo)", "Cloud/DevOps", "Problem Solving", "System Design"],
    datasets: [
      {
        label: "Your Current Skill Level",
        data: [90, 82, 75, 55, 85, 60],
        backgroundColor: "rgba(124, 77, 255, 0.2)",
        borderColor: "rgba(124, 77, 255, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(124, 77, 255, 1)",
      },
      {
        label: "Industry Benchmark (Full Stack)",
        data: [85, 85, 80, 80, 90, 80],
        backgroundColor: "rgba(0, 212, 212, 0.15)",
        borderColor: "rgba(0, 212, 212, 0.8)",
        borderWidth: 2,
        borderDash: [4, 4],
        pointBackgroundColor: "rgba(0, 212, 212, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.1)" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        pointLabels: { color: "#9ba3b5", font: { size: 12, family: "Inter" } },
        ticks: { backdropColor: "transparent", color: "#636c82" },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        labels: { color: "#f0f2f5", font: { family: "Inter" } },
      },
    },
  };

  const runSkillGapAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/ai/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole, studentSkills }),
      });
      const data = await res.json();
      if (data.success) {
        setAiRecommendations(data);
      }
    } catch (e) {
      console.error("Skill Gap Analysis Error:", e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleStartCourse = (courseObj) => {
    setActiveCourseModal({
      title: courseObj.recommendedCourse,
      platform: courseObj.platform,
      skill: courseObj.skill,
      modules: [
        { id: 1, title: `Module 1: ${courseObj.skill} Fundamentals & Architecture`, duration: "45 mins", completed: true },
        { id: 2, title: `Module 2: Hands-on Real-World Project & Lab Setup`, duration: "1 hr 15 mins", completed: false },
        { id: 3, title: `Module 3: Advanced Optimization & Industry Best Practices`, duration: "1 hr", completed: false },
        { id: 4, title: `Module 4: Final Skill Certification Quiz`, duration: "30 mins", completed: false },
      ],
    });
  };

  const handleCompleteModule = (modId) => {
    if (!completedModules.includes(modId)) {
      setCompletedModules([...completedModules, modId]);
      showToast("🎉 Lesson completed! Skill score boosted by +5%.");
    }
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
          <h1>📊 Skill Radar & AI Gap Analyzer</h1>
          <p>Real-time skill assessment powered by Live Next.js AI Engine</p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <select className="input select" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} style={{ width: 220 }}>
            <option>Full Stack Developer</option>
            <option>AI/ML Engineer</option>
            <option>Backend Architect</option>
            <option>DevOps Engineer</option>
          </select>

          <button className="btn btn-primary" onClick={runSkillGapAnalysis} disabled={analyzing}>
            {analyzing ? "Running AI Matrix..." : "🤖 Analyze Skill Gaps"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Radar Chart */}
        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 32 }}>
          <h3 style={{ marginBottom: 20 }}>Skill Alignment Radar</h3>
          <div style={{ width: "100%", maxWidth: 420 }}>
            <Radar data={skillData} options={chartOptions} />
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ marginBottom: 16 }}>Key Assessment Summary</h3>

            <div style={{ background: "rgba(124, 77, 255, 0.08)", padding: 16, borderRadius: 12, border: "1px solid rgba(124, 77, 255, 0.2)", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: "var(--primary-400)", marginBottom: 4 }}>💪 Strongest Domain</div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Frontend Engineering (90%) - Outperforming 85% of peers</div>
            </div>

            <div style={{ background: "rgba(255, 77, 109, 0.08)", padding: 16, borderRadius: 12, border: "1px solid rgba(255, 77, 109, 0.2)", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: "var(--accent-400)", marginBottom: 4 }}>⚠️ Primary Growth Gap</div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Cloud & Infrastructure (55%) - 25% below benchmark</div>
            </div>

            <div style={{ background: "rgba(0, 212, 212, 0.08)", padding: 16, borderRadius: 12, border: "1px solid rgba(0, 212, 212, 0.2)" }}>
              <div style={{ fontWeight: 700, color: "var(--secondary-400)", marginBottom: 4 }}>🎯 Target Match Score</div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{aiRecommendations ? `${aiRecommendations.alignmentScore}%` : "88%"} Compatibility for {targetRole}</div>
            </div>
          </div>

          <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-default)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Last updated: Today • Computed live by Next.js AI Endpoint</div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Output */}
      {aiRecommendations && (
        <div className="card animate-fadeIn" style={{ border: "1px solid var(--primary-500)", background: "rgba(124, 77, 255, 0.04)" }}>
          <h3 style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span>🤖 Real AI Gap Analysis & Roadmap</span>
            <span className="badge badge-primary">Alignment: {aiRecommendations.alignmentScore}%</span>
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <h4 style={{ marginBottom: 12 }}>Detected Gaps ({aiRecommendations.missingSkills.length})</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {aiRecommendations.recommendations.map((rec, i) => (
                  <div key={i} style={{ background: "var(--bg-card)", padding: 14, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{rec.skill}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Est. Learning: {rec.estHours} hrs</div>
                    </div>
                    <span className={`badge ${rec.urgency === "High" ? "badge-error" : "badge-warning"}`}>{rec.urgency} Priority</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: 12 }}>Recommended Micro-Courses</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {aiRecommendations.recommendations.map((rec, i) => (
                  <div key={i} style={{ background: "var(--bg-card)", padding: 14, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{rec.recommendedCourse}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{rec.platform}</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => handleStartCourse(rec)}>
                      Start Course →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REAL INTERACTIVE COURSE PLAYER MODAL */}
      {activeCourseModal && (
        <div className="modal-backdrop" onClick={() => setActiveCourseModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 720 }}>
            <div className="modal-header">
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: 4 }}>{activeCourseModal.platform}</span>
                <h3 style={{ margin: 0 }}>{activeCourseModal.title}</h3>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setActiveCourseModal(null)}>✕</button>
            </div>

            <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Video Player Box */}
              <div style={{ width: "100%", height: 260, borderRadius: 16, background: "linear-gradient(135deg, #0f1119 0%, #191d2d 100%)", border: "1px solid var(--border-default)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: 8, cursor: "pointer" }} onClick={() => showToast("▶ Playing Lesson 1: Fundamentals & Architecture...")}>
                  ▶️
                </div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Interactive Academy Player</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginTop: 4 }}>Click Play to start stream for {activeCourseModal.skill}</div>
              </div>

              {/* Course Curriculum Modules */}
              <div>
                <h4 style={{ marginBottom: 12 }}>Curriculum & Skill Modules</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {activeCourseModal.modules.map((mod) => {
                    const isDone = completedModules.includes(mod.id);
                    return (
                      <div key={mod.id} style={{ background: "var(--bg-input)", padding: 14, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${isDone ? "rgba(16,185,129,0.3)" : "var(--border-default)"}` }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: isDone ? "var(--success-400)" : "#fff" }}>
                            {isDone ? "✓ " : ""}{mod.title}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Duration: {mod.duration}</div>
                        </div>

                        <button
                          className={`btn ${isDone ? "btn-secondary" : "btn-primary"} btn-sm`}
                          onClick={() => handleCompleteModule(mod.id)}
                        >
                          {isDone ? "Completed ✓" : "Watch & Complete"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setActiveCourseModal(null)}>Close Academy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
