"use client";

import { motion } from "framer-motion";
import { PartyPopper, Music, Trophy, Ticket, BookOpen, Palette, Utensils, Briefcase } from "lucide-react";

const categories = [
    {
        icon: PartyPopper,
        title: "Parties & Socials",
        description: "House parties, hostel hangouts, beach trips, end-of-semester bashes"
    },
    {
        icon: Music,
        title: "Concerts & Music",
        description: "Live performances, DJ nights, battle of the bands, music festivals"
    },
    {
        icon: Trophy,
        title: "Sports & Fitness",
        description: "Inter-faculty games, fitness classes, tournaments, sports viewing parties"
    },
    {
        icon: Ticket,
        title: "Shows & Entertainment",
        description: "Comedy nights, fashion shows, talent showcases, drama performances"
    },
    {
        icon: BookOpen,
        title: "Academic & Conferences",
        description: "Guest lectures, seminars, workshops, career fairs, research symposiums"
    },
    {
        icon: Palette,
        title: "Arts & Culture",
        description: "Art exhibitions, poetry slams, cultural nights, film screenings"
    },
    {
        icon: Utensils,
        title: "Food & Dining",
        description: "Food festivals, restaurant pop-ups, cooking competitions, tasting events"
    },
    {
        icon: Briefcase,
        title: "Professional Development",
        description: "Networking events, pitch competitions, skill-building workshops, internship fairs"
    }
];

export default function Categories() {
    return (
        <section className="py-24 bg-night relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple/5 to-night pointer-events-none" />
            {/* Purple Glow */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-lavender/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Whatever You're Into, We've Got It</h2>
                    <p className="text-white/60 font-inter max-w-2xl mx-auto mb-8">
                        From academic workshops to the biggest campus concerts, find your scene.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-lavender/30 p-6 rounded-2xl transition-all group cursor-default"
                        >
                            <div className="w-10 h-10 rounded-full bg-lavender/10 flex items-center justify-center mb-4 group-hover:bg-lavender/20 transition-colors">
                                <cat.icon className="w-5 h-5 text-lavender" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-display">{cat.title}</h3>
                            <p className="text-sm text-white/50 font-inter leading-relaxed">
                                {cat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-white/40 text-sm font-inter bg-white/5 inline-block px-6 py-3 rounded-full border border-white/5">
                        <span className="text-lavender font-bold">Smart Filters:</span> Combine categories with date, time, location, price, and who's attending to find exactly what you want.
                    </p>
                </div>
            </div>
        </section>
    );
}
