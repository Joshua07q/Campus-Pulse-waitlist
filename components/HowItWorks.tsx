"use client";

import { motion } from "framer-motion";
import { UserPlus, Mail, Rocket } from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        title: "Join the Waitlist",
        description: "Sign up with your university email. No spam, just the good stuff.",
    },
    {
        icon: Mail,
        title: "Verify Student Status",
        description: "We'll send a magic link to confirm you're a real student on campus.",
    },
    {
        icon: Rocket,
        title: "Get Early Access",
        description: "Be the first to access the exclusive beta when we launch at your school.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-gradient-to-b from-night to-purple/10 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display mb-4">How It Works</h2>
                    <p className="text-white/60 font-inter">Simple, secure, and exclusive.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-0 w-full h-1 bg-gradient-to-r from-transparent via-lavender/30 to-transparent" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative flex flex-col items-center text-center z-10"
                        >
                            <div className="w-32 h-32 rounded-full bg-night border-4 border-lavender/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(227,176,255,0.2)]">
                                <step.icon className="w-12 h-12 text-lavender" />
                            </div>
                            <h3 className="text-2xl font-bold font-display mb-3">{step.title}</h3>
                            <p className="text-white/60 font-inter px-4">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
