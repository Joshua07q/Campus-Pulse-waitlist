"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SLANG_PHRASES = [
  "We move.",
  "No dulling.",
  "Main character energy.",
  "This event is loud.",
  "Vibes on vibes.",
  "Standing on business.",
  "Get in.",
  "CampusPulse!",
];

export default function ChatBubble({ isHovered }: { isHovered: boolean }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isHovered) return;
    const randomMsg = SLANG_PHRASES[Math.floor(Math.random() * SLANG_PHRASES.length)];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(randomMsg);
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{
        opacity: isHovered ? 1 : 0,
        scale: isHovered ? 1 : 0.8,
        y: isHovered ? -120 : 10,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 0.8,
      }}
      className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none select-none"
    >
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.05, 1] : 0.8,
          opacity: isHovered ? [0.35, 0.55, 0.35] : 0,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-purple via-lavender to-purple rounded-3xl blur-xl"
      />

      <motion.div
        animate={{
          scale: isHovered ? [1, 1.08, 1] : 0.8,
          opacity: isHovered ? [0.25, 0.45, 0.25] : 0,
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-l from-purple via-lavender to-purple rounded-3xl blur-2xl"
      />

      <motion.div
        className="relative bg-gradient-to-br from-white/95 via-lavender/90 to-purple/85 backdrop-blur-md text-night px-5 py-3 rounded-3xl font-bold font-inter text-sm md:text-base border-2 border-lavender/50 shadow-[0_0_30px_rgba(227,176,255,0.6),0_0_60px_rgba(100,24,189,0.4)]"
        animate={{
          boxShadow: isHovered
            ? [
                "0 0 30px rgba(227,176,255,0.6), 0 0 60px rgba(100,24,189,0.4)",
                "0 0 40px rgba(227,176,255,0.8), 0 0 80px rgba(100,24,189,0.6)",
                "0 0 30px rgba(227,176,255,0.6), 0 0 60px rgba(100,24,189,0.4)",
              ]
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="relative z-10 bg-gradient-to-r from-night via-purple to-night bg-clip-text text-transparent">
          {message}
        </span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-white/95 to-lavender/90 border-b-2 border-r-2 border-lavender/50 rotate-45 transform translate-y-[-50%] shadow-[0_0_15px_rgba(227,176,255,0.5)]" />
      </motion.div>
    </motion.div>
  );
}
