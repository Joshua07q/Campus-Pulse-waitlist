"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "I used to miss so many events because I didn't know they existed. Now I just check my WhatsApp and I'm at everything. CampusPulse is a game-changer.",
        author: "Adebayo M.",
        uni: "University of Ibadan, Nigeria",
    },
    {
        quote: "I love how fast it is. I see events, RSVP, and get reminders without jumping between apps.",
        author: "Chioma O.",
        uni: "University of Lagos, Nigeria",
    },
    {
        quote: "Finally found out about the startup pitch competition before it was too late. Won 2nd place. This app literally changed my semester.",
        author: "Marcus T.",
        uni: "Obafemi Awolowo University, Nigeria",
    },
    {
        quote: "Love that it shows me which events my friends are going to. Makes deciding so much easier.",
        author: "Jordan K.",
        uni: "Campus Beta Tester",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-night relative overflow-hidden">
            {/* Purple Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple/20 blur-[140px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-display text-white text-center mb-16">
                    What Students Are Saying
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            whileHover={{ y: -6, scale: 1.01 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
                            className="p-8 rounded-xl cp-surface hover:ring-1 hover:ring-lavender/20 transition-all relative overflow-hidden group flex flex-col justify-between"
                        >
                            {/* Neon Glow behind card */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple via-lavender to-purple opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

                            <div className="relative z-10">
                                <p className="text-[15px] text-white/90 italic font-inter mb-6 leading-relaxed break-words">{t.quote}</p>
                                <div>
                                    <div className="font-bold text-lavender font-display tracking-wide">{t.author}</div>
                                    <div className="text-xs text-white/50 font-inter mt-1">{t.uni}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
