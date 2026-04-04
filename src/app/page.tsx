"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Loading fallback — shows nothing (invisible) while component loads
// This means iOS always sees SOMETHING even if JS is slow
const Loader = () => null;

const NavBar            = dynamic(() => import("./components/NavBar"),            { ssr: false, loading: Loader });
const ThreeDScene       = dynamic(() => import("./components/ThreeDScene"),       { ssr: false, loading: Loader });
const HeroSection       = dynamic(() => import("./components/HeroSection"),       { ssr: false, loading: Loader });
const AboutSection      = dynamic(() => import("./components/AboutSection"),      { ssr: false, loading: Loader });
const ExperienceSection = dynamic(() => import("./components/ExperienceSection"), { ssr: false, loading: Loader });
const ProjectsSection   = dynamic(() => import("./components/ProjectsSection"),   { ssr: false, loading: Loader });
const SkillsSection     = dynamic(() => import("./components/SkillsSection"),     { ssr: false, loading: Loader });
const ContactSection    = dynamic(() => import("./components/ContactSection"),    { ssr: false, loading: Loader });
const ChatBot           = dynamic(() => import("./components/ChatBot"),           { ssr: false, loading: Loader });

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only render dynamic content after mount — prevents hydration mismatch on iOS
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (chatOpen) {
      document.body.classList.add("chatbot-open");
    } else {
      document.body.classList.remove("chatbot-open");
    }
    return () => document.body.classList.remove("chatbot-open");
  }, [chatOpen]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen"
      style={{ overflowX: "clip" }}
      suppressHydrationWarning
    >
      {mounted && (
        <>
          <ThreeDScene />
          <NavBar activeSection={activeSection} />
          <HeroSection onOpenChat={() => setChatOpen(true)} />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />

          {/* Floating chat button */}
          <motion.button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300"
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
        </>
      )}
    </main>
  );
}
