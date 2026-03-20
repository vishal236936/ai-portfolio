"use client";

import { motion } from "framer-motion";

export default function Car({ x, rotate }: any) {
  return (
    <motion.div
      animate={{ left: x, rotate }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute bottom-12 text-4xl z-20"
    >
      🚗
    </motion.div>
  );
}