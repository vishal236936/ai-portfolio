"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILL_GROUPS = [
  {
    label: "Generative AI & LLM",
    color: "#00D4FF",
    skills: [
      { name: "RAG Pipelines", level: 98 },
      { name: "LangChain", level: 92 },
      { name: "Pinecone (Vector DB)", level: 90 },
      { name: "OpenAI / GPT-4", level: 95 },
      { name: "Gemini AI", level: 85 },
      { name: "Azure OpenAI", level: 93 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Vector Embeddings", level: 92 },
    ],
  },
  {
    label: "Backend & APIs",
    color: "#7B2FFF",
    skills: [
      { name: "Node.js", level: 97 },
      { name: "TypeScript", level: 94 },
      { name: "Express.js", level: 95 },
      { name: "REST APIs", level: 97 },
      { name: "GraphQL", level: 78 },
      { name: "Microservices", level: 90 },
    ],
  },
  {
    label: "Cloud & Serverless",
    color: "#FF6B6B",
    skills: [
      { name: "AWS Lambda", level: 93 },
      { name: "API Gateway", level: 92 },
      { name: "S3", level: 90 },
      { name: "RDS", level: 88 },
      { name: "DynamoDB", level: 82 },
      { name: "Azure AI Services", level: 85 },
      { name: "Firebase", level: 80 },
    ],
  },
  {
    label: "Databases",
    color: "#FFB347",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 88 },
      { name: "SQL Server", level: 80 },
      { name: "DynamoDB", level: 82 },
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel>Skills</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16">
          The full{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF]">
            technical stack.
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <h3
                className="text-sm font-mono uppercase tracking-widest mb-6 font-semibold"
                style={{ color: group.color }}
              >
                {group.label}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-gray-300 text-sm">{skill.name}</span>
                      <span className="text-gray-600 text-xs font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: group.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: gi * 0.1 + si * 0.04, duration: 0.7, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Also knows row */}
        <div className="mt-10 p-6 rounded-2xl border border-white/5">
          <p className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">Also works with</p>
          <div className="flex flex-wrap gap-2">
            {["Stripe", "Razorpay", "PayPal", "Twilio", "Web3", "Docker", "CI/CD", "Bitbucket", "HIPAA Compliance", "SAP BTP"].map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 text-gray-400 font-mono">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#00D4FF]" />
      <span className="text-[#00D4FF] text-sm font-mono uppercase tracking-widest">{children}</span>
    </div>
  );
}
