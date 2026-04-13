"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlight?: boolean;
  color: string;
  bullets: string[];
  tags: string[];
  projects?: string[];
}

const EXPERIENCES: Experience[] = [
  {
    company: "Innovify · Client: Arm Holdings",
    role: "Software Engineer – Backend & GenAI",
    period: "Feb 2025 – Present",
    location: "Remote",
    highlight: true,
    color: "#00D4FF",
    bullets: [
      "Architected full RAG pipeline for Arm's enterprise knowledge retrieval: document chunking → Pinecone embeddings → LangChain orchestration → Azure OpenAI response generation",
      "Built and deployed production serverless microservices on AWS Lambda, API Gateway, S3, and RDS powering Arm's backend workflows",
      "Designed AI-powered prediction scoring microservice using GPT models for automated decision pipelines — live in production",
      "Integrated Azure AI services and multiple LLM APIs (OpenAI + Gemini) beyond chatbot use cases",
    ],
    tags: [
      "Node.js",
      "TypeScript",
      "RAG",
      "Pinecone",
      "LangChain",
      "Serverless",
      "AWS SQS",
      "AWS Lambda",
      "API Gateway",
      "Azure OpenAI",
      "Microservices",
      "OpenAI",
    ],
  },
  {
    company: "Kratin Software · Client: Lunajoy Health",
    role: "Technologist – Backend Engineer",
    period: "Apr 2024 – Feb 2025",
    location: "Remote",
    color: "#7B2FFF",
    bullets: [
      "Led end-to-end backend of Lunajoy Health's appointment booking platform — improved booking efficiency by 30%",
      "Deployed serverless workflows on AWS Lambda + Amazon RDS + PostgreSQL, cutting data retrieval time by 25%",
      "Delivered Stripe tokenization + HIPAA-compliant payment flows — lifted payment completion by 20%",
    ],
    tags: [
      "AWS Lambda",
      "PostgreSQL",
      "MongoDB",
      "Stripe",
      "HIPAA",
      "AWS SQS",
      "Node.js",
      "TypeScript",
      "Serverless",
      "Microservices",
    ],
  },
  {
    company: "Mobiloitte Technology",
    role: "Technology Lead – Node.js",
    period: "Oct 2023 – Apr 2024",
    location: "Delhi",
    color: "#FF6B6B",
    bullets: [
      "Led backend team of 5 engineers — task allocation, architecture decisions, code reviews, and conflict resolution",
      "Built HOVR NFT Marketplace — full backend with Web3 blockchain integration, NFT minting/trading APIs, and Stripe payment processing",
      "Developed Crypto E-wallet backend with real-time balance sync and secure transaction APIs",
      "Built Thabo Event Management platform backend and a real-time social media sync service",
      "Delivered PayPal-integrated Restaurant App with order management and real-time kitchen sync",
    ],
    tags: [
      "Web3",
      "Blockchain",
      "NFT",
      "Stripe",
      "PayPal",
      "Node.js",
      "TypeScript",
      "Leadership",
    ],
    projects: [
      "HOVR NFT Marketplace",
      "Crypto E-wallet",
      "Thabo Events",
      "Restaurant App",
    ],
  },
  {
    company: "Mckinsol Consulting",
    role: "Sr. Software Developer",
    period: "Feb 2021 – Aug 2023",
    location: "Noida",
    color: "#FFB347",
    bullets: [
      "GXP · Under Armour — built a high-performance article processing system that ingested thousands of purchase order files from an SFTP server, processed them concurrently using Node.js Worker Threads, stored structured data in MongoDB, and served a UI for selecting articles and checking details for printing hang tags — deployed on SAP BTP Cloud",
      "SpotYourDeal — built full backend for an e-commerce platform (spotyourdeal.com) including product catalogue, order management, and Razorpay payment gateway integration",
      "PVH Corp — delivered SAP Request Management portal and HR Portal backend APIs",
      "SmileADay — built crowdfunding platform backend with campaign management and payment flows",
      "Deployed applications across SAP BTP Cloud, DigitalOcean, and Firebase; managed SQL & PostgreSQL database validation",
    ],
    tags: [
      "Node.js",
      "Worker Threads",
      "MongoDB",
      "SFTP",
      "SAP BTP",
      "Razorpay",
      "PostgreSQL",
      "PHP",
    ],
    projects: [
      "GXP / Under Armour Tag System",
      "SpotYourDeal E-commerce",
      "PVH HR Portal",
      "SmileADay Crowdfunding",
    ],
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <section id="experience" ref={ref} className="relative py-20 px-6 max-w-5xl mx-auto overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel>Experience</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16">
          6+ years,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF]">
            real production systems.
          </span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF]/40 via-[#7B2FFF]/40 to-transparent hidden md:block" />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`relative md:pl-16 p-6 rounded-2xl border transition-all duration-300 group h-auto overflow-visible ${exp.highlight
                    ? "border-[#00D4FF]/30 bg-[#00D4FF]/[0.04] hover:border-[#00D4FF]/50"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 top-8 w-4 h-4 rounded-full border-2 hidden md:block"
                  style={{ borderColor: exp.color, background: "#050A0F" }}
                />

                {exp.highlight && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-xs font-mono mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                    Current Role
                  </div>
                )}

                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-white font-bold text-xl">{exp.role}</h3>
                    <p style={{ color: exp.color }} className="font-medium mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm font-mono">{exp.period}</div>
                    <div className="text-gray-600 text-xs mt-0.5">{exp.location}</div>
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                      <span style={{ color: exp.color }} className="mt-1 shrink-0 text-xs">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Key Projects strip */}
                {exp.projects && (
                  <div className="mb-4">
                    <p className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-2">Key Projects</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.projects.map((proj) => (
                        <span
                          key={proj}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold border"
                          style={{
                            color: exp.color,
                            borderColor: `${exp.color}40`,
                            background: `${exp.color}10`,
                          }}
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono border border-white/10 bg-white/5 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
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
