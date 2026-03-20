"use client";

import { useState } from "react";
import ChatBox from "./components/ChatBox";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [modalProject, setModalProject] = useState<number | null>(null);

  const ask = (text: string) => {
    let finalText = text;

    // 👉 If user asks for contact details, make AI ask for name/company first
    if (/contact|email|phone/i.test(text)) {
      finalText = `${text}. Before sharing contact details, politely ask for the user's name and company.`;
    }

    window.dispatchEvent(new CustomEvent("askVishal", { detail: finalText }));
  };

  const projects = [
    {
      title: "🧠 AI Knowledge Retrieval System (RAG)",
      tech: "Node.js • Azure OpenAI • Pinecone • LangChain",
      details: [
        "Enterprise RAG system for ARM",
        "LangChain orchestration for retrieval + generation",
        "Pinecone vector DB for semantic search",
        "Chunking + embeddings + context injection",
        "Improved accuracy & reduced manual effort",
      ],
    },
    {
      title: "🤖 AI Scoring & Prediction Engine",
      tech: "Node.js • GPT • AWS Lambda",
      details: [
        "AI scoring microservice",
        "Automated workflows",
        "Prediction using GPT",
        "Serverless deployment",
      ],
    },
    {
      title: "💳 Healthcare Appointment Platform",
      tech: "AWS • PostgreSQL • Stripe • MongoDB",
      details: [
        "Appointment booking system",
        "Payment integration",
        "Optimized DB performance",
        "HIPAA compliant backend",
      ],
    },
    {
      title: "🛒 E-commerce Platform",
      tech: "Node.js • MongoDB • Razorpay • REST APIs",
      details: [
        "Built scalable e-commerce backend",
        "Product catalog, cart, and order management",
        "Integrated Razorpay payments",
        "Handled high concurrency and transactions",
      ],
    },
    {
      title: "🎟 Event Booking System",
      tech: "Node.js • PostgreSQL • Stripe",
      details: [
        "Event creation and ticket booking system",
        "Payment integration with Stripe",
        "Real-time booking updates",
      ],
    },
    {
      title: "🚕 Taxi Booking (Uber-like)",
      tech: "Node.js • WebSockets • Maps API",
      details: [
        "Real-time ride booking system",
        "Driver-user matching logic",
        "Live location tracking using WebSockets",
      ],
    },
    {
      title: "🔗 Web3 NFT Marketplace (HOVR)",
      tech: "Node.js • Web3 • Blockchain",
      details: [
        "NFT listing and trading platform",
        "Wallet integration and transactions",
        "Backend APIs for blockchain interaction",
      ],
    },
  ];

  const skillCategories = {
    "⚙️ Backend": [
      "Node.js",
      "Express.js",
      "Javascript",
      "TypeScript",
      "REST APIs",
      "GraphQL",
      "Microservices",
    ],
    "🧠 AI / GenAI": [
      "RAG",
      "LangChain",
      "Pinecone",
      "Azure OpenAI",
      "OpenAI APIs",
      "Prompt Engineering",
      "Vector Embeddings",
      "Semantic Search",
      "GPT Integration",
    ],
    "☁️ Cloud": ["AWS Lambda", "API Gateway", "S3", "RDS", "Firebase"],
    "🗄️ Databases": ["MongoDB", "PostgreSQL", "DynamoDB", "SQL Server"],
    "⚡ Real-time & Testing": [
      "WebSockets",
      "Socket.IO",
      "Unit Testing",
      "Integration Testing",
      "Jest",
    ],
    "💳 Payments": ["Stripe", "Razorpay", "PayPal", "Webhooks"],
    "🛠 DevOps": ["Git", "CI/CD", "Docker"],
  };

  return (
    <main className="px-6 md:px-20 py-16 text-white min-h-screen bg-black relative overflow-hidden font-sans tracking-wide">
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/30 blur-[140px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] bottom-[-100px] right-[-100px]" />
      </div>

      {/* HERO */}
      <section className="text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text"
        >
          Vishal Yadav
        </motion.h1>

        <p className="text-gray-300 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
          Backend Engineer • AI Systems • Cloud Architecture
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {/* 🔥 AI BUTTON */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(168,85,247,0)",
                "0 0 25px rgba(168,85,247,0.6)",
                "0 0 0px rgba(168,85,247,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => ask("Summarize Vishal profile")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 flex items-center gap-3"
          >
            {/* 👀 Eyes */}
            <div className="flex gap-1">
              <motion.span
                animate={{ scaleY: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <motion.span
                animate={{ scaleY: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </div>

            <span>Ask AI About Me</span>

            {/* Pulse */}
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="/data/Vishal_YadavResume.pdf"
            download
            className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20"
          >
            ⬇ Download Resume
          </motion.a>
        </div>

        {/* AI Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            "Summarize Vishal profile",
            "Explain Vishal's RAG project",
            "Show Vishal's AWS experience",
            "Highlight Vishal's key achievements",
          ].map((q, i) => (
            <button
              key={i}
              onClick={() => ask(q)}
              className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 hover:scale-105 transition"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mb-24">
        <h2 className="text-3xl font-extrabold mb-8 tracking-tight">
          🛠 Technical Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div
              key={category}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400 transition"
            >
              <h3 className="font-semibold mb-3 text-white tracking-wide">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    onClick={() => ask(`Explain ${skill}`)}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs cursor-pointer hover:bg-purple-500/30 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="mb-24">
        <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
          🔥 Projects
        </h2>

        {/* 👇 Hint for users */}
        <p className="text-gray-400 mb-6 text-sm flex items-center justify-center gap-2">
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            👉
          </motion.span>
          Click any project to explore details
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModalProject(i)}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden group"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

              {/* Content */}
              <h3 className="font-semibold text-lg tracking-wide relative z-10">
                {p.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1 relative z-10">
                {p.tech}
              </p>

              {/* 👇 Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition"
              >
                🔍 Click to view details
              </motion.div>

              {/* 👇 Bottom indicator */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute bottom-3 right-3 text-xs text-purple-400 opacity-70"
              >
                View →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="mb-24">
        <h2 className="text-3xl font-extrabold mb-8 tracking-tight">
          🏢 Clients & Work
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400 transition">
            <h3 className="font-semibold text-lg tracking-wide">
              ARM (Semiconductor)
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Global leader in semiconductor and CPU architecture design
              powering billions of devices.
            </p>
            <p className="text-gray-300 text-sm mt-3">
              Built an enterprise RAG-based AI system for knowledge retrieval,
              enabling intelligent search across internal documentation using
              Azure OpenAI and vector embeddings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400 transition">
            <h3 className="font-semibold text-lg tracking-wide">
              Lunajoy Health
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              US-based healthcare platform focused on women’s mental health and
              wellness services.
            </p>
            <p className="text-gray-300 text-sm mt-3">
              Led backend development for appointment booking, payments, and
              patient management systems using AWS, PostgreSQL, and Stripe.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400 transition">
            <h3 className="font-semibold text-lg tracking-wide">
              Under Armour
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Global sportswear brand known for performance apparel and digital
              innovation.
            </p>
            <p className="text-gray-300 text-sm mt-3">
              Worked on backend API systems and integrations supporting
              enterprise-level applications and data workflows.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400 transition">
            <h3 className="font-semibold text-lg tracking-wide">
              HOVR (NFT Platform)
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Web3-based NFT marketplace platform enabling digital asset
              trading.
            </p>
            <p className="text-gray-300 text-sm mt-3">
              Built backend services integrating blockchain logic, payments, and
              scalable Node.js architecture.
            </p>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {modalProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 p-6 rounded-2xl max-w-lg w-full border border-white/10"
            >
              <h3 className="text-xl font-bold mb-2">
                {projects[modalProject].title}
              </h3>
              <p className="text-gray-400 mb-4">
                {projects[modalProject].tech}
              </p>

              {projects[modalProject].details.map((d, i) => (
                <p key={i} className="text-sm text-gray-300 mb-1">
                  • {d}
                </p>
              ))}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => ask(`Explain ${projects[modalProject].title}`)}
                  className="text-purple-400 text-sm"
                >
                  Ask AI →
                </button>

                <button
                  onClick={() => setModalProject(null)}
                  className="text-red-400 text-sm"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">📬 Contact</h2>
        <a
          href="mailto:vishalyadav7171@gmail.com"
          className="text-gray-400 hover:text-purple-400 transition"
        >
          vishalyadav7171@gmail.com
        </a>
      </section>

      <ChatBox />
    </main>
  );
}
