"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "Finally, an app that actually shows me what's happening TONIGHT. No more FOMO.",
        author: "Alex M.",
        uni: "NYU '26",
    },
    {
        quote: "I love that it's verified students only. Feels way safer than random group chats.",
        author: "Sarah K.",
        uni: "UCLA '25",
    },
    {
        quote: "The interactive map is insane. Found a hidden jazz night I would've never known about.",
        author: "Jordan T.",
        uni: "UT Austin '24",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-night relative overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-display text-white text-center mb-16">
                    Student Vibes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-lavender/30 transition-all relative overflow-hidden group"
                        >
                            {/* Neon Glow behind card */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple via-lavender to-purple opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

                            <div className="relative z-10">
                                <p className="text-lg text-white/90 italic font-inter mb-6">"{t.quote}"</p>
                                <div>
                                    <div className="font-bold text-lavender">{t.author}</div>
                                    <div className="text-sm text-white/50">{t.uni}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
