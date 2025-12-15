"use client";

import { motion } from "framer-motion";
import { Users, LayoutGrid, Ticket, MessageCircle, Sparkles, GraduationCap } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "See Who's Going",
        subtitle: "Never Go Alone",
        description: "Find out which friends are attending before you RSVP. Events are better when you know the vibe.",
    },
    {
        icon: LayoutGrid,
        title: "Discover Events Your Way",
        subtitle: "Every Type of Event",
        description: "Browse by category: Parties, Concerts, Sports, Shows, Conferences, Academic Events, and more.",
    },
    {
        icon: Ticket,
        title: "Get Verified Tickets",
        subtitle: "Fraud-Free Entry",
        description: "Secure, instant tickets for paid events. No more fake screenshots or payment confusion.",
    },
    {
        icon: MessageCircle,
        title: "Spark Groups",
        subtitle: "Connect Before the Event",
        description: "Auto WhatsApp groups for attendees. Build the hype, coordinate plans, make friends — all before you arrive.",
    },
    {
        icon: Sparkles,
        title: "AI Recommendations",
        subtitle: "Events You'll Actually Love",
        description: "Smart suggestions based on your interests, faculty, past events, and what your friends are attending.",
    },
    {
        icon: GraduationCap,
        title: "Built for Students",
        subtitle: "Verified Campus Community",
        description: "University email verification ensures you're connecting with real students, not randoms.",
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-night relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Why Students Love CampusPulse</h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto font-inter">
                        Everything you need to experience campus life to the fullest.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-lavender/50 hover:bg-white/10 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6 text-lavender" />
                            </div>
                            <h4 className="text-lavender font-bold text-sm uppercase tracking-wider mb-2">{feature.subtitle}</h4>
                            <h3 className="text-2xl font-bold text-white mb-3 font-display">{feature.title}</h3>
                            <p className="text-white/60 font-inter leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
