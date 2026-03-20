"use client";

import { motion } from "framer-motion";

const skills = [
  "Node.js",
  "AWS",
  "RAG",
  "GPT",
  "Microservices",
  "MongoDB",
  "PostgreSQL",
  "TypeScript",
];

export default function SkillsGlobe() {
  return (
    <div className="flex justify-center my-20">
      <motion.div
        drag
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="relative w-72 h-72 rounded-full border border-white/20 flex items-center justify-center"
      >
        {skills.map((skill, i) => (
          <div
            key={i}
            className="absolute text-sm text-gray-300"
            style={{
              transform: `rotate(${i * 45}deg) translate(130px) rotate(-${i * 45}deg)`
            }}
          >
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  );
}