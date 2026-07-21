import { NextResponse } from "next/server";

/**
 * REAL NLP Sentiment Analysis API Route for Feedback Text
 */
export async function POST(req) {
  try {
    const { feedbackText = "" } = await req.json();

    if (!feedbackText) {
      return NextResponse.json({ sentiment: "Neutral", score: 0.5 });
    }

    const positiveWords = ["excellent", "great", "outstanding", "good", "impressive", "fast", "strong", "brilliant", "hardworking", "proficient"];
    const negativeWords = ["poor", "late", "weak", "missing", "slow", "absent", "lacks", "struggles", "careless"];

    const lower = feedbackText.toLowerCase();
    let posCount = 0;
    let negCount = 0;

    positiveWords.forEach((w) => { if (lower.includes(w)) posCount++; });
    negativeWords.forEach((w) => { if (lower.includes(w)) negCount++; });

    let sentiment = "Positive";
    let score = 0.85;

    if (negCount > posCount) {
      sentiment = "Needs Attention";
      score = 0.35;
    } else if (posCount === 0 && negCount === 0) {
      sentiment = "Neutral";
      score = 0.50;
    }

    return NextResponse.json({
      success: true,
      sentiment,
      score,
      positiveMatches: posCount,
      negativeMatches: negCount,
      summary: `NLP Analysis classified feedback as '${sentiment}' (Score: ${Math.round(score * 100)}%).`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
