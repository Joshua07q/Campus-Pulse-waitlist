"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, Ticket, Calendar } from "lucide-react";

const items = [
    {
        icon: Users,
        title: "Spark Groups",
        date: "Q3 2026",
        description:
            "Auto WhatsApp groups for attendees. Build the hype, coordinate plans, make friends — all before the event.",
    },
    {
        icon: Ticket,
        title: "Paid Events",
        date: "May 2026",
        description:
            "Secure ticketing for premium events with fraud-proof verification.",
    },
    {
        icon: Sparkles,
        title: "AI Recommendations",
        date: "June 2026",
        description:
            "Smart suggestions based on your interests, past events, and what friends are attending.",
    },
    {
        icon: Calendar,
        title: "Pulse Wrapped",
        date: "December 2026",
        description:
            "Your personalized year-end recap of your best campus experiences.",
    },
];

export default function ComingSoon() {
    return (
        <section className="py-20 bg-night relative overflow-hidden border-t border-lavender/10">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-3">Coming Soon</h2>
                    <p className="text-white/60 font-inter max-w-2xl mx-auto">
                        We're constantly improving. Next up:
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            whileHover={{ y: -4 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06, type: "spring", stiffness: 120, damping: 22, mass: 0.9 }}
                            className="p-7 rounded-xl cp-surface transition-all"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-lg bg-purple/20 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-lavender" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-display">{item.title}</h3>
                                        <p className="text-white/60 font-inter text-sm mt-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wider uppercase whitespace-nowrap bg-[rgba(156,163,175,0.15)] text-[#9CA3AF] border border-[rgba(156,163,175,0.25)]">
                                    {item.date}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
