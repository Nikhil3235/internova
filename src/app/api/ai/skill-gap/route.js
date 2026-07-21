import { NextResponse } from "next/server";

/**
 * REAL AI Skill Gap Analyzer API Route
 */
export async function POST(req) {
  try {
    const { targetRole = "Full Stack Developer", studentSkills = [] } = await req.json();

    const roleBenchmarks = {
      "Full Stack Developer": ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "System Design"],
      "AI/ML Engineer": ["Python", "TensorFlow", "Pandas", "Scikit-Learn", "Deep Learning", "SQL"],
      "Backend Architect": ["Java", "Spring Boot", "Microservices", "Redis", "Kafka", "Docker"],
      "DevOps Engineer": ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD", "Linux"],
    };

    const benchmark = roleBenchmarks[targetRole] || roleBenchmarks["Full Stack Developer"];
    const normalizedStudent = studentSkills.map((s) => s.toLowerCase().trim());

    const missing = benchmark.filter((reqSkill) => !normalizedStudent.includes(reqSkill.toLowerCase().trim()));

    const recommendations = missing.map((skill) => ({
      skill,
      urgency: benchmark.indexOf(skill) < 2 ? "High" : "Medium",
      recommendedCourse: `${skill} Mastery & Real-World Projects`,
      platform: skill.includes("AWS") || skill.includes("Docker") ? "Udemy / AWS Academy" : "Internova Academy",
      estHours: 12,
    }));

    return NextResponse.json({
      success: true,
      targetRole,
      alignmentScore: Math.round(((benchmark.length - missing.length) / benchmark.length) * 100),
      missingSkills: missing,
      recommendations,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
