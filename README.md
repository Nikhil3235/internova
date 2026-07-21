# 🚀 Internova — Digital Internship Ecosystem

> **Building Smarter Internship Ecosystems — Innovate • Validate • Elevate**  
> Developed for **GHR Intern-Track Hackathon 2026** (GHRCEM, Jalgaon)

---

## 🌟 Overview

**Internova** is an enterprise-grade, AI-powered digital platform that revolutionizes the entire internship lifecycle — from discovery to pre-placement offer (PPO) conversion and startup incubation.

It connects **Students**, **Faculty Mentors**, **Industry Partners**, and **TPO Admins** on a unified digital platform featuring:
- 🤖 **AI Smart Matcher & Skill Gap Analyzer** (Google Gemini API integration)
- 🔗 **Blockchain-Verified Credentials** (SHA-256 cryptographic hashes & public QR verify)
- 📍 **GPS Geofence & QR Attendance Verification**
- 🏆 **InternScore™** (Proprietary 0-100 composite performance index)
- 🚀 **Startup Launchpad** (Translating internship projects into viable ventures - Objective 4)

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Custom Glassmorphic CSS Design System (`globals.css`)
- **State & Auth:** React Context + Local Storage Persistence (`AuthContext.js`)
- **Data & Charts:** Chart.js, React-Chartjs-2
- **Deployment:** Vercel Ready (Zero-cost setup)

---

## 🚀 Quick Start Guide

### 1. Installation

```bash
# Clone repository
git clone https://github.com/your-username/internova.git

# Navigate to directory
cd internova

# Install dependencies
npm install
```

### 2. Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Quick Demo Login Credentials

Try the pre-configured accounts on the login screen ([http://localhost:3000/login](http://localhost:3000/login)):

| Role | Email | Password |
|---|---|---|
| 👨‍🎓 **Student** | `student@internova.in` | `demo123` |
| 👨‍🏫 **Faculty** | `faculty@internova.in` | `demo123` |
| 🏢 **Industry** | `industry@internova.in` | `demo123` |
| 🔑 **Admin / TPO** | `admin@internova.in` | `demo123` |

---

## 📂 Project Structure

```
internova/
├── src/
│   ├── app/
│   │   ├── page.js                    # Animated Landing Page
│   │   ├── login/page.js              # Auth Login with Demo Buttons
│   │   ├── register/page.js           # 4-Step Onboarding Wizard
│   │   ├── verify/[hash]/page.js      # Public Blockchain Verification Link
│   │   ├── dashboard/
│   │   │   ├── layout.js              # Universal Shell (Sidebar + Topbar)
│   │   │   ├── student/               # Student Features (Discover, Skills, Passport, Launchpad...)
│   │   │   ├── faculty/               # Faculty Mentorship & Rubric Evaluations
│   │   │   ├── industry/              # Industry Applicants & PPO Manager
│   │   │   └── admin/                 # TPO Command Center & Audit Logs
│   ├── data/
│   │   └── demoData.js                # Relational demo dataset (GHRCEM context)
│   └── lib/
│       └── auth/
│           └── AuthContext.js          # Auth Provider & LocalStorage State
```

---

## 🌐 Deploy to Vercel (1-Click)

1. Push this code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Select Next.js template and click **Deploy**.
4. Your platform will be live at `https://internova.vercel.app` in under 60 seconds!

---

## 📜 License

Created with 💜 by Team Internova for GHR Intern-Track Hackathon 2026. All rights reserved.
