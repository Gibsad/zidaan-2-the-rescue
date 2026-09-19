"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SpeechBubble({ children, className = "", delay = 0 }: SpeechBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`relative max-w-xs rounded-3xl border-4 border-navy bg-white px-5 py-4 text-center shadow-lg sm:max-w-sm ${className}`}
    >
      <div className="font-display text-base leading-snug text-navy sm:text-lg">
        {children}
      </div>
      <div
        className="absolute -bottom-3 left-10 h-6 w-6 rotate-45 border-b-4 border-r-4 border-navy bg-white"
        aria-hidden="true"
      />
    </motion.div>
  );
}
