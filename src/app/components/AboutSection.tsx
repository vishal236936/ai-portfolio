"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel>About</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 leading-tight">
          I build the backend that makes <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF]">
            AI actually work in production.
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Story */}
          <div className="space-y-5 text-gray-400 text-lg leading-relaxed">
            <p>
              I'm a Backend Engineer based in{" "}
              <span className="text-white">Greater Noida, India</span> — building
              systems that don't just demo well, they run at scale.
            </p>
            <p>
              Most recently I was embedded at{" "}
              <span className="text-[#00D4FF] font-semibold">Arm Holdings</span>, the
              semiconductor company powering 99% of the world's smartphones. I designed
              their enterprise RAG system from scratch — document chunking, Pinecone
              vector embeddings, LangChain orchestration, Azure OpenAI response
              generation, and all the AWS Lambda serverless infrastructure underneath.
            </p>
            <p>
              In my own time I built{" "}
              <a
                href="https://vishal-portfolio-neon.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-[#00D4FF] hover:underline"
              >
                this very portfolio
              </a>{" "}
              — an AI-powered site with a RAG chatbot backed by Pinecone, LangChain,
              OpenAI and Gemini. Because I don't just integrate GenAI — I{" "}
              <span className="text-white italic">build</span> it.
            </p>
          </div>

          {/* Detail cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "📍", label: "Location", value: "Greater Noida, India" },
              { icon: "🌐", label: "Timezone", value: "IST (UTC+5:30)" },
              { icon: "💼", label: "Open to", value: "Remote/WFO Roles" },
              { icon: "🎂", label: "Born", value: "1 September 1996" },
              { icon: "📧", label: "Email", value: "vishalyadav7171@gmail.com", small: true },
              { icon: "📱", label: "Phone", value: "+91 857 600 8579" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#00D4FF]/20 hover:bg-white/[0.04] transition-all duration-200"
              >
                <div className="text-xl mb-2">{item.icon}</div>
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">{item.label}</div>
                <div className={`text-white font-medium ${item.small ? "text-xs" : "text-sm"}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client logos strip */}
        <div className="mt-20 pt-12 border-t border-white/5">
          <p className="text-gray-600 text-sm uppercase tracking-widest mb-8 text-center">
            Clients &amp; companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {["Arm Holdings", "Lunajoy Health", "Under Armour", "PVH Corp", "GXP"].map((name) => (
              <span
                key={name}
                className="text-gray-500 font-semibold text-lg hover:text-white transition-colors duration-200"
              >
                {name}
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
