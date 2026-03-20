import { NextResponse } from "next/server";
import { askAI } from "@/lib/rag";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({
        answer: "⚠️ Please ask a valid question.",
      });
    }

    const answer = await askAI(question);

    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error("🔥 ERROR:", err);

    // ✅ ALWAYS return friendly message (NO 500 crash)
    return NextResponse.json({
      answer:
        "🤖 I'm just warming up… Please try again in a moment 🚀",
      isBuilding: true,
    });
  }
}