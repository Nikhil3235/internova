"use client";

import { internships, companies } from "@/data/demoData";

export default function AdminInternshipsPage() {
  return (
    <div>
      <div className="page-header">
        <h1>📋 All Active Internship Listings ({internships.length})</h1>
        <p>Comprehensive overview of open and filled internship positions</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Domain</th>
                <th>Stipend</th>
                <th>Location</th>
                <th>Applicants</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((i) => {
                const comp = companies.find(c => c.id === i.companyId) || { name: "Company", logo: "🏢" };
                return (
                  <tr key={i.id}>
                    <td style={{ fontWeight: 600 }}>{i.title}</td>
                    <td>{comp.name}</td>
                    <td><span className="badge badge-primary">{i.domain}</span></td>
                    <td style={{ color: "var(--success-400)", fontWeight: 600 }}>{i.stipend}</td>
                    <td>{i.location}</td>
                    <td>{i.applicants} Candidates</td>
                    <td><span className="badge badge-success">{i.status.toUpperCase()}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
