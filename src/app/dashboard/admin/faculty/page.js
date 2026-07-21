"use client";

import { facultyMentors } from "@/data/demoData";

export default function AdminFacultyPage() {
  return (
    <div>
      <div className="page-header">
        <h1>👨‍🏫 Faculty Mentors Directory</h1>
        <p>Assigned academic mentors and mentorship evaluation workloads</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Faculty Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Specialization</th>
                <th>Assigned Mentees</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {facultyMentors.map((f) => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 600 }}>{f.name}</td>
                  <td>{f.department}</td>
                  <td>{f.designation}</td>
                  <td>{f.specialization}</td>
                  <td><span className="badge badge-primary">{f.studentsAssigned.length} Students</span></td>
                  <td style={{ fontWeight: 700, color: "var(--warning-400)" }}>⭐ {f.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
