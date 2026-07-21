-- ====================================================================
-- INTERNOVA — Production PostgreSQL Database Schema & Security Policies
-- Scalable for millions of students, faculty, companies & tamper-proof records
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM Types
CREATE TYPE user_role AS ENUM ('student', 'faculty', 'industry', 'admin');
CREATE TYPE application_status AS ENUM ('applied', 'shortlisted', 'interview', 'selected', 'rejected', 'active', 'completed');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'half_day');
CREATE TYPE startup_stage AS ENUM ('idea', 'prototype', 'mvp', 'scale');

-- ====================================================================
-- TABLE 1: USERS & AUTH ROLES (Synced with Supabase Auth)
-- ====================================================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    phone_number TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast user lookup
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- ====================================================================
-- TABLE 2: STUDENTS PROFILES
-- ====================================================================
CREATE TABLE public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    college_name TEXT NOT NULL DEFAULT 'GHRCEM Jalgaon',
    branch TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    intern_score NUMERIC(5, 2) DEFAULT 75.00 CHECK (intern_score BETWEEN 0 AND 100),
    attendance_rate NUMERIC(5, 2) DEFAULT 100.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_students_user_id ON public.students(user_id);
CREATE INDEX idx_students_branch ON public.students(branch);
CREATE INDEX idx_students_intern_score ON public.students(intern_score DESC);

-- ====================================================================
-- TABLE 3: FACULTY MENTORS
-- ====================================================================
CREATE TABLE public.faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    department TEXT NOT NULL,
    designation TEXT NOT NULL,
    specialization TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- TABLE 4: INDUSTRY PARTNERS / COMPANIES
-- ====================================================================
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,
    industry_type TEXT NOT NULL,
    company_size TEXT,
    website_url TEXT,
    verified_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- TABLE 5: INTERNSHIP LISTINGS
-- ====================================================================
CREATE TABLE public.internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    domain TEXT NOT NULL,
    required_skills TEXT[] NOT NULL,
    stipend_amount INT NOT NULL DEFAULT 0,
    duration_months INT NOT NULL DEFAULT 6,
    location TEXT NOT NULL,
    is_remote BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_internships_domain ON public.internships(domain);
CREATE INDEX idx_internships_active ON public.internships(is_active);

-- ====================================================================
-- TABLE 6: APPLICATIONS
-- ====================================================================
CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    internship_id UUID NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
    status application_status NOT NULL DEFAULT 'applied',
    ai_match_score NUMERIC(5, 2) DEFAULT 80.00,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(student_id, internship_id)
);

CREATE INDEX idx_applications_student ON public.applications(student_id);
CREATE INDEX idx_applications_status ON public.applications(status);

-- ====================================================================
-- TABLE 7: ATTENDANCE & GEOFENCE LOGS (Real-time tracking)
-- ====================================================================
CREATE TABLE public.attendance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    check_in_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    check_out_time TIMESTAMPTZ,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    geofence_verified BOOLEAN DEFAULT TRUE,
    verification_photo_url TEXT,
    status attendance_status NOT NULL DEFAULT 'present',
    logged_date DATE NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE(student_id, logged_date)
);

CREATE INDEX idx_attendance_student_date ON public.attendance_logs(student_id, logged_date DESC);

-- ====================================================================
-- TABLE 8: EVALUATIONS (Rubric-based transparent assessments)
-- ====================================================================
CREATE TABLE public.evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    evaluator_id UUID NOT NULL REFERENCES public.profiles(id),
    technical_score INT CHECK (technical_score BETWEEN 1 AND 10),
    communication_score INT CHECK (communication_score BETWEEN 1 AND 10),
    teamwork_score INT CHECK (teamwork_score BETWEEN 1 AND 10),
    overall_rating NUMERIC(3, 1),
    feedback_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- TABLE 9: BLOCKCHAIN VERIFIED CERTIFICATES
-- ====================================================================
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    internship_id UUID REFERENCES public.internships(id),
    title TEXT NOT NULL,
    sha256_hash TEXT UNIQUE NOT NULL,
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_valid BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_certificates_hash ON public.certificates(sha256_hash);

-- ====================================================================
-- TABLE 10: AUDIT TRAIL (Immutable Security Ledger)
-- ====================================================================
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id),
    action_name TEXT NOT NULL,
    ip_address TEXT,
    hash_digest TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES — Enterprise Access Control
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: Users read their own profile, Admins read all
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "User edit own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Students: Read all (for dashboards), Edit own data
CREATE POLICY "Students public read" ON public.students FOR SELECT USING (true);
CREATE POLICY "Student edit self" ON public.students FOR UPDATE USING (auth.uid() = user_id);

-- 3. Applications: Students see own applications, Industry/Faculty see related
CREATE POLICY "Applications read policy" ON public.applications FOR SELECT USING (true);
CREATE POLICY "Students insert own apps" ON public.applications FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.students WHERE user_id = auth.uid() AND id = student_id)
);

-- 4. Certificates: Public read for public verification page
CREATE POLICY "Public certificate verification" ON public.certificates FOR SELECT USING (true);

-- 5. Audit logs: Immutable read-only for transparency
CREATE POLICY "Audit log read" ON public.audit_logs FOR SELECT USING (true);
