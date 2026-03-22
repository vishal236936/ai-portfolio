"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D4FF] rounded-full blur-[200px] opacity-5 pointer-events-none" />

        <SectionLabel>Contact</SectionLabel>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
          Let's build something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF]">
            remarkable.
          </span>
        </h2>
        <p className="text-gray-400 text-xl mb-12 leading-relaxed">
          I'm actively looking for remote Node.js Backend / GenAI engineering roles with companies.
          If you're hiring — or just want to talk about my professional journey — let's connect.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <a
            href="mailto:vishalyadav7171@gmail.com"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-white font-semibold text-base hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300 hover:scale-105"
          >
            ✉️ vishalyadav7171@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/vishalyadav0001/"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300"
          >
            LinkedIn →
          </a>
          <a
            href="tel:+918576008579"
            className="px-8 py-4 rounded-full border border-[#00D4FF]/30 text-[#00D4FF] font-semibold text-base hover:bg-[#00D4FF]/10 transition-all duration-300"
          >
            📱 +91 8576008579
          </a>
        </div>

        {/* Info row */}
        <div className="flex flex-wrap justify-center gap-8 pt-10 border-t border-white/5 text-sm text-gray-500">
          <span>📍 Noida, India</span>
          <span>🌐 Open to Remote/WFO</span>
          <span>⏰ IST (UTC+5:30) — flexible overlap</span>
        </div>

        {/* Footer */}
        <p className="mt-12 text-gray-700 text-xs font-mono">
          Built by Vishal Yadav · Next.js · Pinecone · LangChain · OpenAI · Gemini · Vercel
        </p>
      </motion.div>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#00D4FF]" />
      <span className="text-[#00D4FF] text-sm font-mono uppercase tracking-widest">{children}</span>
      <div className="w-6 h-px bg-[#00D4FF]" />
    </div>
  );
}
