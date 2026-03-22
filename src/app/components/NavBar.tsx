"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 1v7M4 6l2.5 2.5L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 10.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function NavBar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#050A0F]/90 backdrop-blur-xl border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-white font-black text-lg tracking-tight hover:text-[#00D4FF] transition-colors"
        >
          VY<span className="text-[#00D4FF]">.</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? "text-[#00D4FF] bg-[#00D4FF]/10"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <motion.a
            href="/data/Vishal_Yadav_Resume.pdf"
            download="Vishal_Yadav_Resume.pdf"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#00D4FF]/20 to-[#7B2FFF]/20 border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-medium hover:from-[#00D4FF]/30 hover:to-[#7B2FFF]/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.25)] transition-all duration-200"
          >
            <DownloadIcon />
            Resume
          </motion.a>
          <a
            href="mailto:vishalyadav7171@gmail.com"
            className="px-4 py-2 rounded-full border border-white/15 text-white text-sm font-medium hover:bg-white/10 transition-all duration-200"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-white/5 bg-[#050A0F]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                <a
                  href="/data/Vishal_Yadav_Resume.pdf"
                  download="Vishal_Yadav_Resume.pdf"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#7B2FFF]/20 border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-medium"
                >
                  <DownloadIcon />
                  Download Resume
                </a>
                <a
                  href="mailto:vishalyadav7171@gmail.com"
                  className="flex items-center justify-center px-4 py-3 rounded-xl border border-white/15 text-white text-sm font-medium"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
