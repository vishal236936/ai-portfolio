"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    title: "AI Portfolio + RAG Chatbot",
    subtitle: "Personal Project · 2024–Present",
    description:
      "Built from scratch in my spare time — a GenAI-powered portfolio with a live RAG chatbot that answers real-time questions about me. Pinecone for vector storage, LangChain for orchestration, OpenAI + Gemini for multi-model responses. Deployed on Vercel.",
    link: "https://vishal-portfolio-neon.vercel.app/",
    tags: ["Pinecone", "LangChain", "OpenAI", "Gemini", "Next.js", "RAG", "Vercel"],
    color: "#00D4FF",
    badge: "Live · Personal",
    metrics: ["Multi-model (OpenAI + Gemini)", "Pinecone vector DB", "Real-time RAG"],
  },
  {
    title: "Enterprise RAG System — Arm Holdings",
    subtitle: "Innovify · Client: Arm Holdings · 2025",
    description:
      "Designed and shipped a production RAG pipeline for Arm's enterprise knowledge base. Document chunking strategy, embedding generation, vector similarity search via Azure OpenAI, and Node.js APIs orchestrating the full retrieval → LLM response flow on AWS serverless infrastructure.",
    link: "https://www.arm.com/",
    tags: ["Azure OpenAI", "RAG", "AWS Lambda", "Node.js", "TypeScript", "S3", "RDS"],
    color: "#7B2FFF",
    badge: "Production · Enterprise",
    metrics: ["Arm Holdings client", "AWS serverless infra", "Azure OpenAI integration"],
  },
  {
    title: "GXP Article Processing System — Under Armour",
    subtitle: "Mckinsol Consulting · Client: GXP / Under Armour · 2020–2023",
    description:
      "Built a high-throughput system that pulled thousands of purchase order files from an SFTP server, processed them concurrently using Node.js Worker Threads to maximize CPU utilisation, stored structured article data in MongoDB, and served a custom UI for warehouse staff to search, select, and verify article details before printing hang tags for Under Armour products. Deployed and hosted on SAP BTP Cloud.",
    tags: ["Node.js", "Worker Threads", "MongoDB", "SFTP", "SAP BTP", "Under Armour", "Express.js"],
    color: "#FF6B6B",
    badge: "Production · Enterprise",
    metrics: ["Thousands of PO files processed", "Worker Threads concurrency", "SAP BTP deployment"],
  },
  {
    title: "HOVR NFT Marketplace",
    subtitle: "Mobiloitte Technology · 2023–2024",
    description:
      "Full-stack NFT marketplace backend with Web3 blockchain integration. Users can mint, list, buy and trade NFTs. Built smart contract interaction APIs in Node.js, integrated Stripe for fiat payments alongside crypto, and implemented real-time ownership and transaction sync.",
    tags: ["Node.js", "Web3", "Blockchain", "NFT", "Stripe", "Smart Contracts", "TypeScript"],
    color: "#FFB347",
    badge: "Production · Web3",
    metrics: ["Full NFT lifecycle APIs", "Web3 + Stripe payments", "Real-time blockchain sync"],
  },
  {
    title: "SpotYourDeal — E-commerce Platform",
    subtitle: "Mckinsol Consulting · spotyourdeal.com · 2020–2023",
    description:
      "Backend for a full e-commerce platform. Built product catalogue management, inventory tracking, order lifecycle APIs, and integrated Razorpay payment gateway for seamless checkout. Deployed on DigitalOcean with PostgreSQL and Node.js.",
    link: "https://spotyourdeal.com",
    tags: ["Node.js", "PostgreSQL", "Razorpay", "DigitalOcean", "REST APIs", "E-commerce"],
    color: "#1D9E75",
    badge: "Production · E-commerce",
    metrics: ["Full e-commerce backend", "Razorpay integration", "DigitalOcean deployment"],
  },
  {
    title: "AI Prediction Scoring Microservice",
    subtitle: "Innovify · Arm Holdings · 2025",
    description:
      "GPT-powered scoring microservice integrated into Arm's automated decision workflows. Not a prototype — a live system making automated decisions in production via serverless AWS architecture.",
    tags: ["GPT-4", "AWS Lambda", "API Gateway", "Node.js", "TypeScript", "Microservices"],
    color: "#A855F7",
    badge: "Production · AI",
    metrics: ["Live decision automation", "Serverless AWS", "GPT-4 integration"],
  },
  {
    title: "Healthcare Booking Platform — Lunajoy",
    subtitle: "Kratin Software · 2024",
    description:
      "End-to-end backend for Lunajoy Health's doctor + patient appointment booking. AWS Lambda + RDS + PostgreSQL under HIPAA compliance. Stripe tokenization boosted payment completion by 20%, AWS optimization cut data retrieval by 25%.",
    tags: ["AWS Lambda", "PostgreSQL", "Stripe", "HIPAA", "Node.js", "RDS"],
    color: "#0EA5E9",
    badge: "Production · Healthcare",
    metrics: ["30% efficiency gain", "25% faster retrieval", "+20% payment success"],
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <section id="projects" ref={ref} className="relative py-20 px-6 max-w-6xl mx-auto overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel>Projects</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Things I've{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF]">
            actually shipped.
          </span>
        </h2>
        <p className="text-gray-500 mb-16 text-lg">Not demos. Not tutorials. Production systems.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 flex flex-col h-auto overflow-visible"
              style={{ "--card-color": project.color } as React.CSSProperties}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: project.color }}
              />

              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full border"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}40`,
                    background: `${project.color}10`,
                  }}
                >
                  {project.badge}
                </span>
                <div className="flex gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-white transition-colors text-sm"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-white font-bold text-xl mb-1">{project.title}</h3>
              <p className="text-xs text-gray-600 font-mono mb-4">{project.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.metrics.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2 py-0.5 rounded font-medium"
                    style={{ color: project.color, background: `${project.color}15` }}
                  >
                    ✓ {m}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded font-mono border border-white/10 bg-white/5 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
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
