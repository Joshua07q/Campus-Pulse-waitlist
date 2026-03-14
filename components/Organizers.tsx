"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, CalendarRange, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import OrganizerDemoModal from "./OrganizerDemoModal";

export default function Organizers() {
    const statuses = [
        { label: "Coming Soon", className: "bg-yellow-500/20 text-yellow-300" },
        { label: "Live", className: "bg-green-500/20 text-green-400" },
        { label: "Completed", className: "bg-blue-500/20 text-blue-300" },
    ] as const;
    const [statusIndex, setStatusIndex] = useState(0);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statuses.length);
        }, 2200);

        return () => clearInterval(interval);
    }, [statuses.length]);

    const currentStatus = statuses[statusIndex];

    return (
        <>
        <section id="organizers" className="py-24 bg-gradient-to-br from-[#1a0b2e] to-night relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lavender/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.9 }}
                        className="lg:w-1/2"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <CalendarRange className="text-lavender w-6 h-6" />
                            <span className="text-lavender font-bold uppercase tracking-wider text-sm">For Organizers</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-tight">
                            For Event Organizers & Clubs
                        </h2>
                        <p className="text-xl text-white/70 font-inter mb-8">
                            Reach more students. Boost attendance. Track engagement.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Create events in minutes (4-step form)",
                                "Automatic promotion to interested students",
                                "Real-time RSVP tracking & analytics",
                                "WhatsApp-first reminders and updates for attendees",
                                "Verified attendance proofs",
                                "Coming soon: Spark Groups + paid events (Q3 2026)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/80 font-inter">
                                    <div className="min-w-[24px] h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                                        <Check className="w-4 h-4 text-green-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => setIsDemoModalOpen(true)}
                                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple to-lavender text-night font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                Schedule a Demo
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <a
                                href="#organizers"
                                className="px-8 py-4 rounded-lg cp-outline text-white font-bold text-lg transition-colors text-center"
                            >
                                Learn More
                            </a>
                        </div>
                    </motion.div>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 80, damping: 18, mass: 0.9 }}
                        className="lg:w-1/2 relative"
                    >
                        {/* Card Stack Effect */}
                        <div className="relative z-10 cp-surface rounded-xl p-8 backdrop-blur-md md:backdrop-blur-xl">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">Neon Night 2026</h3>
                                    <p className="text-white/50 text-sm">Hosted by Student Union</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${currentStatus.className}`}>
                                    {currentStatus.label}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-night/50 p-4 rounded-xl border border-lavender/10">
                                    <div className="text-3xl font-bold text-lavender mb-1">1,240</div>
                                    <div className="text-xs text-white/50 uppercase">Views</div>
                                </div>
                                <div className="bg-night/50 p-4 rounded-xl border border-lavender/10">
                                    <div className="text-3xl font-bold text-green-400 mb-1">856</div>
                                    <div className="text-xs text-white/50 uppercase">RSVPs</div>
                                </div>
                            </div>

                            <div className="h-40 bg-night/40 rounded-xl flex items-center justify-center border border-dashed border-lavender/15">
                                <div className="flex flex-col items-center">
                                    <Logo className="w-12 h-12 text-lavender mb-3" />
                                    <p className="text-white/50 text-sm">CampusPulse Demo Dashboard</p>
                                </div>
                            </div>
                        </div>

                        {/* Decoration behind card */}
                        <div className="absolute top-10 -right-4 w-full h-full bg-lavender/5 rounded-xl -z-10 rotate-3" />
                        <div className="absolute top-20 -right-8 w-full h-full bg-purple/10 rounded-xl -z-20 rotate-6" />
                    </motion.div>
                </div>
            </div>
        </section>
        <AnimatePresence>
            {isDemoModalOpen && (
                <OrganizerDemoModal onClose={() => setIsDemoModalOpen(false)} />
            )}
        </AnimatePresence>
        </>
    );
}
