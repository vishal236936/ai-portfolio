"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic imports — each component loads after React mounts
// Prevents iOS Safari from crashing on initial JS bundle parse
const NavBar           = dynamic(() => import("./components/NavBar"),           { ssr: false });
const ParticleBackground = dynamic(() => import("./components/ParticleBackground"), { ssr: false });
const HeroSection      = dynamic(() => import("./components/HeroSection"),      { ssr: true });
const AboutSection     = dynamic(() => import("./components/AboutSection"),     { ssr: false });
const ExperienceSection = dynamic(() => import("./components/ExperienceSection"), { ssr: false });
const ProjectsSection  = dynamic(() => import("./components/ProjectsSection"),  { ssr: false });
const SkillsSection    = dynamic(() => import("./components/SkillsSection"),    { ssr: false });
const ContactSection   = dynamic(() => import("./components/ContactSection"),   { ssr: false });
const ChatBot          = dynamic(() => import("./components/ChatBot"),          { ssr: false });

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll on iOS when chatbot is open
  useEffect(() => {
    if (chatOpen) {
      document.body.classList.add("chatbot-open");
    } else {
      document.body.classList.remove("chatbot-open");
    }
    return () => document.body.classList.remove("chatbot-open");
  }, [chatOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050A0F] min-h-screen" style={{ overflowX: "clip" }}>
      <ParticleBackground />
      <NavBar activeSection={activeSection} />

      <HeroSection onOpenChat={() => setChatOpen(true)} />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />

      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.7)] transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring" }}
        aria-label="Open AI Assistant"
      >
        <span className="text-2xl">🤖</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#050A0F] animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}
