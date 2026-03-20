"use client";

import { useState } from "react";
import ChatBox from "./components/ChatBox";

export default function Home() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const ask = (text: string) => {
    window.dispatchEvent(
      new CustomEvent("askVishal", { detail: text })
    );
  };

  const projects = [
    {
      title: "🧠 AI Knowledge Retrieval System (RAG)",
      tech: "Node.js, Azure OpenAI, Vector Embeddings",
      details: [
        "Designed enterprise RAG system for ARM client",
        "Document chunking + embeddings + semantic search",
        "Azure OpenAI for contextual answers",
        "Built APIs for retrieval + response generation",
        "Improved answer accuracy significantly",
      ],
    },
    {
      title: "🤖 AI Scoring & Prediction Engine",
      tech: "Node.js, GPT Models, AWS",
      details: [
        "Built AI-powered scoring microservice",
        "Automated decision workflows",
        "Used GPT models for predictions",
        "Microservices architecture",
      ],
    },
    {
      title: "💳 Healthcare Appointment System",
      tech: "AWS Lambda, PostgreSQL, Stripe",
      details: [
        "Built backend for Lunajoy Health",
        "Doctor-patient appointment booking",
        "Stripe payment integration",
        "Improved booking efficiency by 30%",
      ],
    },
  ];

  return (
    <main className="px-6 md:px-20 py-16 text-white">

      {/* HERO */}
      <section className="text-center mb-20">
        <h1 className="heading">
          🚀 Vishal Yadav — Backend Engineer | AI & Cloud
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Backend Engineer specializing in Generative AI (RAG), scalable backend systems,
          and cloud-native architectures.
        </p>

        <button
          onClick={() => ask("Summarize Vishal profile")}
          className="btn-primary mt-6 relative z-50"
        >
          Ask AI About Me →
        </button>
      </section>

      {/* EXPERIENCE + COMPANIES */}
      <section className="mb-20">
        <h2 className="heading mb-6">💼 Experience & Clients</h2>

        <div className="card space-y-4">

          <div onClick={() => ask("Explain Innovify experience")} className="cursor-pointer">
            <h3 className="font-bold text-lg">Innovify — Software Engineer</h3>
            <p className="text-gray-400">
              Built Generative AI systems using RAG, Azure OpenAI, and AWS.
            </p>
            <p className="text-sm text-blue-400">Client: ARM (Semiconductor)</p>
          </div>

          <div onClick={() => ask("Explain Kratin experience")} className="cursor-pointer">
            <h3 className="font-bold text-lg">Kratin Software — Technologist</h3>
            <p className="text-gray-400">
              Healthcare backend systems, AWS Lambda, PostgreSQL
            </p>
            <p className="text-sm text-blue-400">Client: Lunajoy Health</p>
          </div>

          <div onClick={() => ask("Explain Mobiloitte experience")} className="cursor-pointer">
            <h3 className="font-bold text-lg">Mobiloitte — Tech Lead</h3>
            <p className="text-gray-400">
              Led backend development, Web3, payments, microservices
            </p>
            <p className="text-sm text-blue-400">
              Clients: HOVR, Thabo, Crypto Wallet
            </p>
          </div>

          <div onClick={() => ask("Explain Mckinsol experience")} className="cursor-pointer">
            <h3 className="font-bold text-lg">Mckinsol — Sr Developer</h3>
            <p className="text-gray-400">
              Built enterprise APIs & cloud systems
            </p>
            <p className="text-sm text-blue-400">
              Clients: Under Armour, PVH, GXP
            </p>
          </div>

        </div>
      </section>

      {/* SKILLS */}
      <section className="mb-20">
        <h2 className="heading mb-6">🛠️ Technical Expertise</h2>

        <div className="grid md:grid-cols-3 gap-4">

          {[
            "Node.js, TypeScript, Express",
            "REST APIs, GraphQL, Swagger",
            "Microservices Architecture",
            "MongoDB, PostgreSQL, SQL Server, DynamoDB",
            "AWS (Lambda, API Gateway, S3, RDS)",
            "RAG, Azure OpenAI, GPT Integration",
            "CI/CD, Git, Bitbucket",
            "Stripe, Razorpay, PayPal",
          ].map((skill, i) => (
            <div
              key={i}
              onClick={() => ask(`Explain Vishal's skill in ${skill}`)}
              className="card cursor-pointer"
            >
              {skill}
            </div>
          ))}

        </div>
      </section>

      {/* PROJECTS */}
      <section className="mb-20">
        <h2 className="heading mb-8">🔥 Featured Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">

          {projects.map((p, i) => (
            <div
              key={i}
              onClick={() =>
                setActiveProject(activeProject === i ? null : i)
              }
              className="card cursor-pointer"
            >
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="text-gray-400">{p.tech}</p>

              {activeProject === i && (
                <ul className="mt-3 text-gray-300">
                  {p.details.map((d, idx) => (
                    <li key={idx}>• {d}</li>
                  ))}
                </ul>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  ask(`Explain ${p.title} project in detail`);
                }}
                className="text-blue-400 mt-2"
              >
                Ask AI →
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* CONTACT */}
      <section className="mb-20">
        <h2 className="heading mb-6">📬 Contact</h2>

        <div className="card">
          <p>Email: vishalyadav7171@gmail.com</p>
          <p>Phone: +91-8576008579</p>
          <p>LinkedIn: linkedin.com/in/vishalyadav</p>
        </div>
      </section>

      <ChatBox />
    </main>
  );
}