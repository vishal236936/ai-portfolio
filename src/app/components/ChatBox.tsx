"use client";

import { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function ChatBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  const bottomRef = useRef<any>(null);
  const { transcript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) setQuestion(transcript);
  }, [transcript]);

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const ask = async (q?: string) => {
    const finalQ = q || question;
    if (!finalQ) return;

    setMessages((prev) => [...prev, { role: "user", text: finalQ }]);
    setQuestion("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ question: finalQ }),
    });

    const data = await res.json();
    const answer = data.answer;

    setMessages((prev) => [...prev, { role: "ai", text: answer }]);
    setTypingIndex(0);

    speak(answer);
  };

  // 🔥 FIXED EVENT LISTENER
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
  }, [messages, typingIndex]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 btn-primary z-50"
        >
          🤖 Ask Vishal
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[520px] card flex flex-col z-50">

          <div className="flex justify-between mb-2">
            <span>Ask Vishal</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;

              return (
                <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : ""}`}>
                  <span className="bg-gray-700 px-3 py-2 rounded">
                    {m.role === "ai" && isLast
                      ? m.text.slice(0, typingIndex)
                      : m.text}
                  </span>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <div className="flex gap-2 mt-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 p-2 bg-gray-800 rounded"
            />
            <button onClick={() => SpeechRecognition.startListening()}>
              🎤
            </button>
            <button onClick={() => ask()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}