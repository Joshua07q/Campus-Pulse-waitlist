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
    "Who dey breet? 😮‍💨",
    "Activvvvvv ",
    "Campus Pulse!!!!!!!",
    "Get in Jor",
    "Your body na meatpie!"
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
            transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                mass: 0.8
            }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none select-none"
        >
            {/* Neon Glow Background Layers */}
            <motion.div
                animate={{
                    scale: isHovered ? [1, 1.05, 1] : 0.8,
                    opacity: isHovered ? [0.4, 0.6, 0.4] : 0
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple via-lavender to-purple rounded-3xl blur-xl"
            />
            
            <motion.div
                animate={{
                    scale: isHovered ? [1, 1.08, 1] : 0.8,
                    opacity: isHovered ? [0.3, 0.5, 0.3] : 0
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
                className="absolute inset-0 bg-gradient-to-l from-purple via-lavender to-purple rounded-3xl blur-2xl"
            />

            {/* Main Bubble with Glass Morphism */}
            <motion.div 
                className="relative bg-gradient-to-br from-white/95 via-lavender/90 to-purple/85 backdrop-blur-md text-night px-5 py-3 rounded-3xl font-bold font-inter text-sm md:text-base border-2 border-lavender/50 shadow-[0_0_30px_rgba(227,176,255,0.6),0_0_60px_rgba(100,24,189,0.4)]"
                animate={{
                    boxShadow: isHovered 
                        ? [
                            "0 0 30px rgba(227,176,255,0.6), 0 0 60px rgba(100,24,189,0.4)",
                            "0 0 40px rgba(227,176,255,0.8), 0 0 80px rgba(100,24,189,0.6)",
                            "0 0 30px rgba(227,176,255,0.6), 0 0 60px rgba(100,24,189,0.4)"
                        ]
                        : "0 0 0px rgba(227,176,255,0), 0 0 0px rgba(100,24,189,0)"
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Floating Particles/Stars */}
                <motion.div
                    animate={{
                        y: isHovered ? [-2, 2, -2] : 0,
                        opacity: isHovered ? [0.6, 1, 0.6] : 0
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-lavender rounded-full blur-[1px]"
                />
                <motion.div
                    animate={{
                        y: isHovered ? [2, -2, 2] : 0,
                        opacity: isHovered ? [0.6, 1, 0.6] : 0
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    className="absolute -top-2 left-3 w-1.5 h-1.5 bg-purple rounded-full blur-[1px]"
                />
                <motion.div
                    animate={{
                        y: isHovered ? [-1, 3, -1] : 0,
                        opacity: isHovered ? [0.6, 1, 0.6] : 0
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute -bottom-1 -left-1 w-2 h-2 bg-lavender rounded-full blur-[1px]"
                />

                {/* Message Text with Gradient */}
                <span className="relative z-10 bg-gradient-to-r from-night via-purple to-night bg-clip-text text-transparent">
                    {message}
                </span>

                {/* Triangle Pointer with Neon Glow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-white/95 to-lavender/90 border-b-2 border-r-2 border-lavender/50 rotate-45 transform translate-y-[-50%] shadow-[0_0_15px_rgba(227,176,255,0.5)]"></div>
            </motion.div>

            {/* Cloud-like Wisps */}
            <motion.div
                animate={{
                    x: isHovered ? [-5, 5, -5] : 0,
                    opacity: isHovered ? [0.2, 0.4, 0.2] : 0,
                    scale: isHovered ? [1, 1.1, 1] : 0.8
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-lavender/30 rounded-full blur-md"
            />
            <motion.div
                animate={{
                    x: isHovered ? [5, -5, 5] : 0,
                    opacity: isHovered ? [0.2, 0.4, 0.2] : 0,
                    scale: isHovered ? [1, 1.1, 1] : 0.8
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-purple/30 rounded-full blur-md"
            />
        </motion.div>
    );
}
