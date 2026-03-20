import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: process.env.PINECONE_ENVIRONMENT!, // ✅ add this
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

let isIndexed = false;

// 🔥 Get PDF dynamically
function getPdfPath() {
  const dir = path.join(process.cwd(), "src/data");
  const files = fs.readdirSync(dir);

  const pdf = files.find((f) => f.endsWith(".pdf"));
  if (!pdf) throw new Error("No PDF found");

  return path.join(dir, pdf);
}

// 🔥 Create embeddings + upload to Pinecone
export async function initRAG() {
  if (isIndexed) return;

  const pdfPath = getPdfPath();
  const buffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(buffer);

  const text = data.text;

  const chunks = text.match(/(.|[\r\n]){1,500}/g) || [];

  console.log("📄 Total chunks:", chunks.length);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk,
    });

    await index.upsert([
      {
        id: `chunk-${i}`,
        values: embedding.data[0].embedding,
        metadata: { text: chunk },
      },
    ]);
  }

  isIndexed = true;

  console.log("✅ Indexed into Pinecone");
}

// 🔥 Retrieve relevant context
async function retrieveContext(question: string) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  const queryResult = await index.query({
    vector: embedding.data[0].embedding,
    topK: 4,
    includeMetadata: true,
  });

  return queryResult.matches?.map((m) => m.metadata?.text as string).join("\n");
}

// 🔥 Gemini Answer
async function generateAnswer(context: string, question: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
You are an AI assistant answering questions about the RAG based USER.

Only answer from this context:

${context}

Question:
${question}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// 🔥 MAIN FUNCTION
export async function askAI(question: string) {
  await initRAG();

  const context = await retrieveContext(question);

  return await generateAnswer(context || "", question);
}
