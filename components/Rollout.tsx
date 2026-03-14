"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Rollout() {
    return (
        <section className="py-24 bg-gradient-to-t from-[#1a0b2e] to-night relative overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-lavender/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Launching at Your Campus</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 95, damping: 18 }}
                    className="max-w-2xl mx-auto cp-surface p-8 md:p-10 rounded-2xl text-center mb-14"
                >
                    <div className="text-2xl font-display text-white mb-3">Early March 2026</div>
                    <div className="text-lavender font-bold mb-2">University of Ibadan</div>
                    <div className="text-white/60 font-inter">Pilot launch starting with UI students</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-white font-display text-2xl mb-8">Want CampusPulse at your campus?</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a
                            href="mailto:hello@campuspulse.ng?subject=Request%20CampusPulse%20at%20My%20Campus"
                            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple to-lavender text-night font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            Request Your Campus via Email
                            <MapPin className="w-5 h-5" />
                        </a>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="px-8 py-4 rounded-lg cp-outline text-white font-bold text-lg transition-colors"
                        >
                            Request Beta Access
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
