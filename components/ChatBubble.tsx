"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const SLANG_PHRASES = [
    "Dey play! 😂",
    "We move! 🚀",
    "It's giving main character ✨",
    "No gree for anybody! 😤",
    "Omo! This event choke! 🔥",
    "Shey you dey wine me? 🍷",
    "E restrict my airflow! 😆",
    "Vibes on vibes! 🎵",
    "Sap turn me to philosopher 💀",
    "Lets cook! 🍳",
    "Standing on business 💼",
    "Who dey breet? 😮‍💨"
];

export default function ChatBubble({ isHovered }: { isHovered: boolean }) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isHovered) {
            // Pick a random message ensuring variety
            const randomMsg = SLANG_PHRASES[Math.floor(Math.random() * SLANG_PHRASES.length)];
            setMessage(randomMsg);
        }
    }, [isHovered]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
                y: isHovered ? -120 : 10
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none select-none"
        >
            <div className="relative bg-white text-night px-4 py-2 rounded-2xl shadow-xl font-bold font-inter text-sm md:text-base border-2 border-purple">
                {message}
                {/* Triangle Pointer */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-purple rotate-45 transform translate-y-[-50%]"></div>
            </div>
        </motion.div>
    );
}
