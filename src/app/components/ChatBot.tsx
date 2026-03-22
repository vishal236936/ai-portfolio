"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What's Vishal's experience with RAG?",
  "Tell me about the Arm Holdings project",
  "What serverless work has he done?",
  "Is he open to remote work?",
  "What's his GenAI tech stack?",
];

const FLOATING_TECHS = [
  "Pinecone", "LangChain", "OpenAI", "Gemini", "RAG",
  "AWS Lambda", "Node.js", "TypeScript", "Azure OpenAI",
  "Vector DB", "Embeddings", "GPT-4", "Next.js", "MongoDB",
  "Serverless", "Worker Threads", "Web3", "SAP BTP", "SFTP",
];

const FUN_RESPONSES = [
  "🤖 Beep boop... computing...",
  "⚡ Querying the knowledge base...",
  "🧠 RAG pipeline activated...",
  "🔍 Searching Vishal's brain...",
  "📡 Connecting to vector space...",
];

const WELCOME = "Hi! I'm Vishal's AI assistant! Ask me anything about his experience, projects, or availability. I can also speak my answers — try the mic!";

// Keywords that trigger the salary email gate
const SALARY_KEYWORDS = [
  "salary", "salari", "ctc", "compensation", "pay", "package",
  "lpa", "lakh", "per annum", "annual", "how much", "cost",
  "rate", "charge", "budget", "remuneration", "stipend", "wages",
];

function isSalaryQuestion(text: string) {
  const lower = text.toLowerCase();
  return SALARY_KEYWORDS.some((k) => lower.includes(k));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// ── Tracking helper ──
async function track(event: string, extra: Record<string, string> = {}) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        userAgent: navigator.userAgent,
        page: window.location.href,
        timestamp: new Date().toISOString(),
        ...extra,
      }),
    });
  } catch {
    // Silent — never block the UI for tracking
  }
}

// ── Floating tech pill ──
function FloatingTech({ text, index }: { text: string; index: number }) {
  const duration = 12 + (index % 7) * 2.5;
  const delay = (index * 1.3) % 8;
  const startX = (index * 47) % 320;
  const startY = (index * 31) % 420;
  return (
    <motion.div
      className="absolute text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#00D4FF]/15 text-[#00D4FF]/25 bg-[#00D4FF]/5 pointer-events-none select-none whitespace-nowrap"
      style={{ left: startX, top: startY }}
      animate={{ x: [0, 30, -20, 40, 0], y: [0, -25, 15, -10, 0], opacity: [0.3, 0.7, 0.4, 0.8, 0.3] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  );
}

// ── Blinking robot face ──
function RobotFace({ isTalking, isListening }: { isTalking: boolean; isListening: boolean }) {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      timer = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
        scheduleBlink();
      }, 2000 + Math.random() * 4000);
    };
    scheduleBlink();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
        isListening ? "bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_12px_rgba(239,68,68,0.7)]"
        : "bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] shadow-[0_0_12px_rgba(0,212,255,0.4)]"
      }`}>
        <div className="flex gap-1.5 items-center">
          <div className={`bg-white rounded-full transition-all duration-100 ${blink ? "w-1.5 h-0.5" : isTalking ? "w-1.5 h-2" : "w-1.5 h-1.5"}`} />
          <div className={`bg-white rounded-full transition-all duration-100 ${blink ? "w-1.5 h-0.5" : isTalking ? "w-1.5 h-2" : "w-1.5 h-1.5"}`} />
        </div>
        <div className={`bg-white transition-all duration-200 ${isTalking ? "w-3 h-1.5 rounded-b-full" : isListening ? "w-2 h-2 rounded-full" : "w-2.5 h-0.5 rounded-full"}`} />
      </div>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isListening ? "bg-red-400 animate-ping" : isTalking ? "bg-[#00D4FF] animate-pulse" : "bg-[#00D4FF]/60"}`} />
        <div className="w-px h-1.5 bg-[#00D4FF]/40" />
      </div>
    </div>
  );
}

// ── Email gate modal for salary questions ──
function EmailGate({
  question,
  onSubmit,
  onCancel,
}: {
  question: string;
  onSubmit: (email: string) => void;
  onCancel: () => void;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError("");
    await track("salary_email_submitted", { visitorEmail: email.trim(), question });
    onSubmit(email.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-20 flex items-center justify-center p-5 bg-[#07101A]/90 backdrop-blur-sm rounded-2xl"
    >
      <div className="w-full max-w-sm bg-[#0D1B2A] border border-[#00D4FF]/25 rounded-2xl p-5 shadow-[0_0_40px_rgba(0,212,255,0.15)]">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFB347] to-[#FF6B6B] flex items-center justify-center text-2xl mx-auto mb-4">
          💰
        </div>

        <h3 className="text-white font-bold text-base text-center mb-1">Salary details are gated</h3>
        <p className="text-gray-400 text-xs text-center mb-5 leading-relaxed">
          Enter your work email to unlock Vishal's expected salary &amp; package details.
          <br />
          <span className="text-gray-600">He'll also be notified of your interest.</span>
        </p>

        <div className="space-y-3">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="your@company.com"
              autoFocus
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all ${
                error ? "border-red-400/60 focus:border-red-400" : "border-white/10 focus:border-[#00D4FF]/50"
              }`}
            />
            {error && <p className="text-red-400 text-xs mt-1.5 px-1">{error}</p>}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-white font-semibold text-sm hover:shadow-[0_0_24px_rgba(0,212,255,0.4)] transition-all disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Unlock Salary Details →"}
          </motion.button>

          <button
            onClick={onCancel}
            className="w-full py-2 text-gray-600 text-xs hover:text-gray-400 transition-colors"
          >
            Skip — ask something else
          </button>
        </div>

        <p className="text-gray-700 text-[10px] text-center mt-4">
          🔒 Your email is only shared with Vishal, never sold or spammed.
        </p>
      </div>
    </motion.div>
  );
}

export default function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [funStatus, setFunStatus] = useState("");
  const [shake, setShake] = useState(false);

  // Salary gate state
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [gatedQuestion, setGatedQuestion] = useState("");
  const [salaryUnlocked, setSalaryUnlocked] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const dragControls = useDragControls();
  const voiceEnabledRef = useRef(true);
  const sendMessageRef = useRef<(text: string) => void>(() => {});

  useEffect(() => { voiceEnabledRef.current = voiceEnabled; }, [voiceEnabled]);
  useEffect(() => { synthRef.current = window.speechSynthesis; }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  // ── Track chatbot open — once per session ──
  useEffect(() => {
    const OPEN_KEY = "vishal_bot_tracked_open";
    if (!sessionStorage.getItem(OPEN_KEY)) {
      sessionStorage.setItem(OPEN_KEY, "1");
      track("chatbot_opened");
    }
  }, []);

  // ── Speak ──
  const speak = useCallback((text: string) => {
    if (!voiceEnabledRef.current || !synthRef.current) return;
    try { synthRef.current.cancel(); } catch { /* Safari sometimes throws on cancel */ }
    const clean = text.replace(/\p{Emoji}/gu, "").trim() || text.replace(/[\uD800-\uDFFF]/g, "").trim();
    if (!clean) return;
    const utt = new SpeechSynthesisUtterance(clean);
    utt.rate = 1.05; utt.pitch = 1.1; utt.volume = 1.0;
    utt.onstart = () => setIsTalking(true);
    utt.onend = () => setIsTalking(false);
    utt.onerror = () => setIsTalking(false);
    const doSpeak = () => {
      const voices = synthRef.current!.getVoices();
      const preferred = voices.find((v) => v.name.includes("Google UK") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel"));
      if (preferred) utt.voice = preferred;
      synthRef.current!.speak(utt);
    };
    synthRef.current.getVoices().length > 0 ? doSpeak() : synthRef.current.addEventListener("voiceschanged", doSpeak, { once: true });
  }, []);

  // ── Welcome speaks only once per session; skip on iOS (requires user gesture) ──
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) return; // iOS Safari blocks TTS without a direct user tap
    const WELCOMED_KEY = "vishal_bot_welcomed";
    if (sessionStorage.getItem(WELCOMED_KEY)) return;
    sessionStorage.setItem(WELCOMED_KEY, "1");
    const t = setTimeout(() => speak(WELCOME), 600);
    return () => clearTimeout(t);
  }, [speak]);

  // ── Send message ──
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Salary gate — intercept if not yet unlocked
    if (isSalaryQuestion(trimmed) && !salaryUnlocked) {
      setGatedQuestion(trimmed);
      setShowEmailGate(true);
      track("salary_query", { question: trimmed });
      setInput("");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    setFunStatus(FUN_RESPONSES[Math.floor(Math.random() * FUN_RESPONSES.length)]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't get a response. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
      setFunStatus("");
    }
  }, [loading, speak, salaryUnlocked]);

  useEffect(() => { sendMessageRef.current = sendMessage; }, [sendMessage]);

  // ── Handle email gate submit ──
  const handleEmailSubmit = (email: string) => {
    setSalaryUnlocked(true);
    setShowEmailGate(false);
    // Show confirmation message then answer the question
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: `✅ Thanks! Your email (${email}) has been noted. Now answering your salary question...` },
    ]);
    // Answer the original salary question after a brief delay
    setTimeout(() => sendMessageRef.current(gatedQuestion), 800);
  };

  // ── Voice input ──
  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition not supported. Please use Chrome."); return; }
    if (recognitionRef.current) recognitionRef.current.abort();
    const rec = new SR();
    rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 1;
    recognitionRef.current = rec;
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      setTimeout(() => sendMessageRef.current(transcript), 300);
    };
    rec.onerror = (e: any) => {
      setIsListening(false);
      if (e?.error === "not-allowed") {
        alert("Mic access denied. Allow microphone in Safari Settings > Privacy > Microphone.");
      }
    };
    rec.onend = () => setIsListening(false);
    rec.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.abort();
    setIsListening(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim()) { setShake(true); setTimeout(() => setShake(false), 400); return; }
      sendMessage(input);
    }
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.92 }}
      transition={{ type: "spring", damping: 22, stiffness: 280 }}
      className="fixed z-50 rounded-2xl border border-[#00D4FF]/20 bg-[#07101A]/96 backdrop-blur-2xl [-webkit-backdrop-filter:blur(24px)] shadow-[0_0_60px_rgba(0,212,255,0.18),0_0_120px_rgba(123,47,255,0.1)] flex flex-col overflow-hidden w-[95vw] md:w-[400px] left-[2.5vw] md:left-auto md:right-6 bottom-20 md:bottom-28"
      style={{ maxHeight: "min(78dvh, 78vh)", minHeight: "min(520px, 70dvh)", cursor: "auto" }}
    >
      {/* ── Animated tech background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
        {FLOATING_TECHS.map((tech, i) => <FloatingTech key={tech} text={tech} index={i} />)}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00D4FF] rounded-full blur-[60px] opacity-5" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#7B2FFF] rounded-full blur-[60px] opacity-5" />
      </div>

      {/* ── Email Gate overlay ── */}
      <AnimatePresence>
        {showEmailGate && (
          <EmailGate
            question={gatedQuestion}
            onSubmit={handleEmailSubmit}
            onCancel={() => { setShowEmailGate(false); setGatedQuestion(""); }}
          />
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div
        className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.03] cursor-grab active:cursor-grabbing select-none touch-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-3">
          <RobotFace isTalking={isTalking} isListening={isListening} />
          <div>
            <div className="text-white font-semibold text-sm flex items-center gap-1.5">
              Vishal's AI Assistant
              {isTalking && <span className="text-[10px] font-mono text-[#00D4FF] animate-pulse">speaking...</span>}
              {isListening && <span className="text-[10px] font-mono text-red-400 animate-pulse">listening...</span>}
            </div>
            <div className="text-[#00D4FF] text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Pinecone · LangChain · OpenAI · Gemini
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { const next = !voiceEnabled; setVoiceEnabled(next); if (!next) synthRef.current?.cancel(); }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${voiceEnabled ? "bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30" : "bg-white/5 text-gray-600 border border-white/10"}`}
            title={voiceEnabled ? "Mute voice" : "Enable voice"}
          >
            {voiceEnabled ? "🔊" : "🔇"}
          </motion.button>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 text-sm" title="Drag to move">⠿</div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all text-lg">×</button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22 }}
              className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center text-[10px] flex-shrink-0 mb-0.5">🤖</div>
              )}
              <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] text-white rounded-br-sm"
                  : "bg-white/[0.07] text-gray-100 border border-white/[0.08] rounded-bl-sm"
              }`}>
                {msg.content}
              </div>
              {msg.role === "assistant" && (
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => speak(msg.content)}
                  className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-gray-500 hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all flex-shrink-0 mb-0.5"
                  title="Speak this message"
                >▶</motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-2 justify-start">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center text-[10px] flex-shrink-0">🤖</div>
              <div className="bg-white/[0.07] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((j) => <div key={j} className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce" style={{ animationDelay: `${j * 0.15}s` }} />)}
                  </div>
                  {funStatus && <span className="text-[10px] font-mono text-[#00D4FF]/60 mt-0.5">{funStatus}</span>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Suggested questions — pinned above input ── */}
      <AnimatePresence>
        {messages.length === 1 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 px-3 pb-2 border-t border-white/5 bg-white/[0.02]"
          >
            <p className="text-gray-600 text-[10px] font-mono px-1 pt-2 pb-1.5">✨ Try asking</p>
            <div className="flex flex-col gap-1">
              {SUGGESTED.map((q) => (
                <motion.button
                  key={q}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left text-xs px-3 py-2 rounded-xl border border-white/5 bg-white/[0.02] text-gray-400 hover:border-[#00D4FF]/30 hover:text-[#00D4FF] hover:bg-[#00D4FF]/5 transition-all duration-150"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input bar ── */}
      <div className="relative z-10 p-3 border-t border-white/5 bg-white/[0.02]">
        <motion.div
          animate={shake ? { x: [-6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.35 }}
          className="flex gap-2 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening... speak now 🎤" : "Ask about Vishal..."}
            disabled={isListening}
            className={`flex-1 rounded-xl px-4 py-2.5 text-base md:text-sm text-white placeholder-gray-600 focus:outline-none transition-all border ${
              isListening ? "bg-red-500/10 border-red-400/40 placeholder-red-300/60" : "bg-white/5 border-white/10 focus:border-[#00D4FF]/40"
            }`}
          />
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={isListening ? stopListening : startListening}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all flex-shrink-0 ${
              isListening ? "bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.6)] animate-pulse"
              : "bg-white/[0.08] border border-white/10 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/10 text-gray-400 hover:text-[#00D4FF]"
            }`}
            title={isListening ? "Stop listening" : "Voice input"}
          >🎤</motion.button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center text-white text-base disabled:opacity-35 hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all flex-shrink-0"
          >↑</motion.button>
        </motion.div>
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[10px] text-gray-700 font-mono">
            {isListening ? "🔴 Recording — click mic to stop" : "drag header to move · enter to send"}
          </span>
          <span className="text-[10px] text-gray-700 font-mono">{voiceEnabled ? "🔊 voice on" : "🔇 voice off"}</span>
        </div>
      </div>
    </motion.div>
  );
}
