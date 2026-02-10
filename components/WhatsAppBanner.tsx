"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, MessageCircle, Smartphone } from "lucide-react";

const phases = [
    {
        icon: MessageCircle,
        title: "Phase 1 (March 2026): WhatsApp-first access",
        description: "Discover events, RSVP, and get reminders all in your favorite messaging app.",
        accent: "whatsapp",
    },
    {
        icon: Smartphone,
        title: "Phase 2 (Q2 2026): Full mobile app + AI features",
        description: "Enhanced discovery, personalized recommendations, and more.",
        accent: "lavender",
    },
];

export default function WhatsAppBanner() {
    return (
        <section className="py-16 bg-night relative overflow-hidden">
            {/* Blend Seam: helps the transition from the Hero into this section */}
            <div className="absolute -top-20 left-0 right-0 h-28 bg-gradient-to-b from-night/0 via-night to-night pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-purple/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple/20 blur-[140px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <Rocket className="w-5 h-5 text-lavender" />
                        <span className="text-white font-bold uppercase tracking-wide text-sm">Launching in Phases</span>
                        <Rocket className="w-5 h-5 text-lavender" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        WhatsApp-first, then everything else
                    </h2>

                    <p className="text-lg text-white/70 font-inter mb-8 leading-relaxed">
                        We are starting with the fastest way for students to get value: WhatsApp. A full mobile app and AI features follow next.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        {phases.map((p) => (
                            <motion.div
                                key={p.title}
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                                className="p-7 rounded-xl cp-surface transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            p.accent === "whatsapp" ? "bg-whatsapp/20" : "bg-purple/20"
                                        }`}
                                    >
                                        <p.icon className={`w-5 h-5 ${p.accent === "whatsapp" ? "text-whatsapp" : "text-lavender"}`} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {p.accent === "whatsapp" && (
                                            <Image src="/whatsapp.png" alt="WhatsApp" width={18} height={18} />
                                        )}
                                        <div className="text-white font-bold font-inter">{p.title}</div>
                                    </div>
                                </div>
                                <p className="text-white/65 text-sm font-inter leading-relaxed">{p.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
