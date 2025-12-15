"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Clock } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "University-Only Access",
        description: "Only verified students with university email addresses can join your campus network."
    },
    {
        icon: Lock,
        title: "Secure Ticketing",
        description: "Blockchain-backed tickets prevent fraud and ensure smooth entry at paid events."
    },
    {
        icon: EyeOff,
        title: "Privacy Protected",
        description: "Your data stays private. We follow strict data protection standards and never sell your information."
    },
    {
        icon: Clock,
        title: "Temporary Groups",
        description: "Spark Groups automatically disband 1-2 weeks after events, keeping your contacts organized and clutter-free."
    }
];

export default function Trust() {
    return (
        <section className="py-24 bg-night relative overflow-hidden border-t border-white/5">
            {/* Purple Glow */}
            <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-lavender/15 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Safe, Verified, Trusted</h2>
                    <p className="text-xl text-white/60 font-inter max-w-2xl mx-auto">
                        We prioritize your safety and privacy above all else.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            whileHover={{ y: -6, scale: 1.01 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
                            className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-lavender/30 transition-all text-center group"
                        >
                            <div className="w-16 h-16 bg-night rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:border-lavender/50 transition-colors shadow-lg">
                                <feature.icon className="w-8 h-8 text-lavender" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-display">{feature.title}</h3>
                            <p className="text-white/60 font-inter">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
