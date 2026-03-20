import { NextResponse } from "next/server";
import { askAI } from "@/lib/rag";

// export async function POST(req: Request) {
//   try {
//     const { question } = await req.json();

//     const answer = await askAI(question);

//     return NextResponse.json({ answer });
//   } catch (err) {
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const answer = await askAI(question);

    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error("🔥 ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Error" },
      { status: 500 }
    );
  }
}