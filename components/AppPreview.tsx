"use client";

import { motion } from "framer-motion";

export default function AppPreview() {
    return (
        <section className="py-24 bg-night relative overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
                        Your Campus in Your Pocket
                    </h2>
                    <p className="text-xl text-white/60 font-inter">
                        Beautiful, dark mode, and designed for late nights.
                    </p>
                </div>

                {/* Mockup Container */}
                <div className="relative flex justify-center items-center">
                    {/* Background Glow */}
                    <div className="absolute w-[500px] h-[500px] bg-purple/30 blur-[100px] rounded-full animate-pulse" />

                    {/* Phone Frame */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 w-[300px] h-[600px] bg-night border-8 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden"
                    >
                        {/* dynamic island / notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20" />

                        {/* Screen Content */}
                        <div className="w-full h-full bg-gradient-to-b from-[#1a0b2e] to-[#0D0221] p-4 pt-12 flex flex-col relative">

                            {/* Fake App UI - Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="w-8 h-8 rounded-full bg-lavender/20" />
                                <div className="text-lavender font-display text-lg">CampusPulse</div>
                                <div className="w-8 h-8 rounded-full bg-white/5" />
                            </div>

                            {/* Stories / Highlights */}
                            <div className="flex gap-3 overflow-x-hidden mb-6 opacity-80">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="min-w-[60px] h-[60px] rounded-full border-2 border-lavender/50 bg-purple/20" />
                                ))}
                            </div>

                            {/* Feed Card 1 */}
                            <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/5">
                                <div className="h-32 rounded-lg bg-gradient-to-br from-purple/50 to-night mb-3 relative overflow-hidden">
                                    {/* Abstract shape */}
                                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-lavender/50 rounded-full blur-xl" />
                                </div>
                                <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
                                <div className="h-3 w-1/2 bg-white/5 rounded" />
                            </div>

                            {/* Feed Card 2 */}
                            <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/5 opacity-50">
                                <div className="h-32 rounded-lg bg-white/5 mb-3" />
                                <div className="h-4 w-1/2 bg-white/10 rounded" />
                            </div>

                            {/* Bottom Nav */}
                            <div className="absolute bottom-0 left-0 w-full h-16 bg-night/80 backdrop-blur-md border-t border-white/5 flex justify-around items-center px-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`w-6 h-6 rounded-md ${i === 3 ? 'bg-lavender scale-110 shadow-[0_0_10px_#E3B0FF]' : 'bg-white/20'}`} />
                                ))}
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
