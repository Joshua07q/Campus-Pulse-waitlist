"use client";

import { motion } from "framer-motion";
import { Calendar, TrendingUp, Users, Martini, ShieldCheck, Zap } from "lucide-react";

const features = [
    {
        icon: Calendar,
        title: "Discover Events Instantly",
        description: "Never miss out. See what's happening on your campus right now, from workshops to house parties.",
    },
    {
        icon: TrendingUp,
        title: "Real-Time Campus Trends",
        description: "Know the pulse of the crowd. See which locations are heating up in real-time.",
    },
    {
        icon: Users,
        title: "Clubs & Communities",
        description: "Find your tribe. Connect with student organizations and specialized communities.",
    },
    {
        icon: Martini,
        title: "Nightlife & Hangouts",
        description: "The best spots for after-hours fun, rated by students for students.",
    },
    {
        icon: ShieldCheck,
        title: "Secure & Student-Only",
        description: "A verified network. Only students with valid .edu emails can join the conversation.",
    },
    {
        icon: Zap,
        title: "Interactive Live Feed",
        description: "Share your moments and see what others are up to with a localized campus feed.",
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-night relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Why CampusPulse?</h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto font-inter">
                        Everything you need to navigate your social life, all in one app.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-lavender/50 hover:bg-white/10 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6 text-lavender" />
                            </div>
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
