"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Compass, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
    {
        icon: MessageCircle,
        title: "Message Our WhatsApp Bot",
        description: 'Send "Hi" to our WhatsApp number to get started. Verify with your university email.',
    },
    {
        icon: Compass,
        title: "Discover Events",
        description: "Browse categories (Parties, Concerts, Academic, Sports) and see who&apos;s going.",
    },
    {
        icon: CheckCircle,
        title: "RSVP in Seconds",
        description: "One tap to RSVP. Get reminders, check-in codes, and verified attendance proofs.",
    },
];

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const icons = gsap.utils.toArray<HTMLElement>(".step-icon");

            icons.forEach((icon) => {
                gsap.fromTo(icon,
                    { rotation: -180, scale: 0.5 },
                    {
                        rotation: 0,
                        scale: 1,
                        scrollTrigger: {
                            trigger: icon,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: 1,
                        },
                        ease: "back.out(1.7)"
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="how-it-works" className="py-24 bg-gradient-to-b from-night to-purple/10 text-white relative overflow-hidden">
            {/* Purple Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display mb-4">Get Started in 3 Simple Steps</h2>
                    <p className="text-white/60 font-inter">Join the community in seconds.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative" ref={containerRef}>
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-0 w-full h-1 bg-gradient-to-r from-transparent via-lavender/30 to-transparent" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
                            className="relative flex flex-col items-center text-center z-10"
                        >
                            <div className="step-icon w-32 h-32 rounded-2xl bg-night border-4 border-lavender/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(227,176,255,0.2)]">
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
