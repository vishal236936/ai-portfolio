"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function ChatBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  // 👀 eye tracking state
  const [eye, setEye] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<any>(null);
  const { transcript } = useSpeechRecognition();

  const baseSuggestions = [
    "How many years of experience does Vishal have?",
    "What is Vishal's current location?",
    "Explain Vishal's RAG project",
    "What companies has Vishal worked with?",
    "What are Vishal's strongest skills?",
  ];

  const dynamicSuggestions = useMemo(() => {
    const last = messages[messages.length - 1];
    if (!last || last.role !== "ai") return baseSuggestions;

    const text = last.text.toLowerCase();
    const sug: string[] = [];

    if (text.includes("aws")) sug.push("Explain Vishal's AWS projects");
    if (text.includes("ai") || text.includes("rag")) sug.push("How did Vishal build his AI systems?");
    if (text.includes("experience")) sug.push("Which company did Vishal learn the most from?");
    if (text.includes("project")) sug.push("What was the biggest challenge Vishal solved?");

    return sug.length ? sug : baseSuggestions;
  }, [messages]);

  useEffect(() => {
    if (transcript) setQuestion(transcript);
  }, [transcript]);

  // 👀 track cursor inside chat for eye movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setEye({ x: x * 6, y: y * 6 }); // movement strength
  };

  const ask = async (q?: string) => {
    const finalQ = q || question;
    if (!finalQ) return;

    setMessages((prev) => [...prev, { role: "user", text: finalQ }]);
    setQuestion("");
    setIsThinking(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ question: finalQ }),
    });

    const data = await res.json();
    const answer = data.answer;

    setIsThinking(false);
    setMessages((prev) => [...prev, { role: "ai", text: answer }]);
    setTypingIndex(0);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ask();
    }
  };

  useEffect(() => {
    const handler = (e: any) => {
      setOpen(true);
      ask(e.detail);
    };

    window.addEventListener("askVishal", handler);
    return () => window.removeEventListener("askVishal", handler);
  }, []);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || last.role !== "ai") return;

    const interval = setInterval(() => {
      setTypingIndex((prev) => {
        if (prev >= last.text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingIndex, isThinking]);

  return (
    <>
      {!open && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 px-5 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 shadow-xl z-50"
        >
          🤖 Ask Vishal
        </motion.button>
      )}

      {open && (
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          drag
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 w-[380px] h-[560px] bg-gradient-to-br from-[#0f172a]/90 via-[#1e1b4b]/80 to-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col z-50 shadow-2xl overflow-hidden cursor-grab"
        >

          {/* Header with interactive eyes */}
          <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5 cursor-move">
            <div className="flex items-center gap-2">

              {/* 👀 Robot eyes (interactive) */}
              <div className="flex items-center gap-1">
                <motion.span
                  animate={{ scaleY: [1, 0.15, 1] }}
                  style={{ transform: `translate(${eye.x}px, ${eye.y}px)` }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.9)]"
                />
                <motion.span
                  animate={{ scaleY: [1, 0.15, 1] }}
                  style={{ transform: `translate(${eye.x}px, ${eye.y}px)` }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }}
                  className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.9)]"
                />
              </div>

              <span className="font-semibold tracking-wide">Vishal AI</span>

              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-xs text-green-400"
              >
                ● Online
              </motion.span>
            </div>

            <button onClick={() => setOpen(false)} className="hover:text-red-400 transition">✖</button>
          </div>

          {/* Floating Background */}
          <div className="absolute inset-0 pointer-events-none opacity-10 text-xs text-white">
            {Array.from({ length: 25 }).map((_, i) => {
              const words = [
                "Node.js","JavaScript","AWS","RAG","OpenAI","Pinecone","LangChain","JavaScript","socket.io","Tech Lead","Backend-Developer",
                "Microservices","Azure","WebSockets","TypeScript","API","Node.js","Cloud","AI","Chai","JEST","Docker","REST","GraphQL","Serverless","BTP"
              ];
              return (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: -150, opacity: [0, 1, 0] }}
                  transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute"
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                >
                  {words[Math.floor(Math.random() * words.length)]}
                </motion.span>
              );
            })}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 relative z-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              return (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-4 py-2 rounded-xl text-sm max-w-[75%] ${
                      m.role === "user" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-200"
                    }`}
                  >
                    {m.role === "ai" && isLast ? m.text.slice(0, typingIndex) : m.text}
                  </div>
                </div>
              );
            })}

            <AnimatePresence>
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-400 text-sm"
                >
                  AI is thinking...
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {dynamicSuggestions.length > 0 && (
            <div className="px-3 py-2 border-t border-white/10 bg-white/5 overflow-x-auto whitespace-nowrap flex gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {dynamicSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => ask(s)}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-purple-500/30 transition shrink-0 hover:scale-105"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-white/10 bg-white/5">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Vishal..."
              className="flex-1 p-2 bg-white/10 rounded-lg outline-none placeholder:text-gray-400"
            />

            <button onClick={() => SpeechRecognition.startListening()}>🎤</button>

            <button onClick={() => ask()} className="px-3 rounded-lg bg-purple-600 hover:bg-purple-700">➤</button>
          </div>
        </motion.div>
      )}
    </>
  );
}