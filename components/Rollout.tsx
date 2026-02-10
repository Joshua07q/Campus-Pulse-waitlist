"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

const timeline = [
    {
        date: "March 2026",
        title: "University of Ibadan",
        description: "Pilot launch with 5,000+ students",
        status: "active"
    },
    {
        date: "Q2 2026",
        title: "Nigeria Expansion",
        description: "University of Lagos, Obafemi Awolowo University, Covenant University",
        status: "upcoming"
    },
    {
        date: "Q3-Q4 2026",
        title: "National Scale",
        description: "10 campuses across Nigeria, 100,000+ students",
        status: "upcoming"
    },
    {
        date: "2026",
        title: "Pan-African & Beyond",
        description: "Ghana, Kenya, South Africa, and select US campuses",
        status: "planning"
    }
];

export default function Rollout() {
    const whatsappNumber = "2340000000000"; // TODO: replace with live bot number
    const whatsappMessage = "Hi CampusPulse - bring it to my campus";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <section className="py-24 bg-gradient-to-t from-[#1a0b2e] to-night relative overflow-hidden">
            {/* Purple Glow */}
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-lavender/15 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Launching at Your Campus</h2>
                    <p className="text-xl text-white/60 font-inter max-w-2xl mx-auto">
                        We&apos;re moving fast. Don&apos;t see your school? Request it below.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-lavender/15 md:-translate-x-1/2 rounded-full" />

                    <div className="space-y-12">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Dot */}
                                <div
                                    className={[
                                        "absolute left-[16px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full border-2 z-10",
                                        item.status === "active"
                                            ? "bg-lavender border-lavender shadow-[0_0_10px_rgba(227,176,255,0.55)]"
                                            : "bg-night border-lavender/25",
                                    ].join(" ")}
                                />

                                {/* Content */}
                                <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                                    <div
                                        className={[
                                            "p-6 rounded-xl cp-surface transition-all",
                                            item.status === "active" ? "ring-1 ring-lavender/25" : "hover:ring-1 hover:ring-lavender/15",
                                        ].join(" ")}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span
                                                className={[
                                                    "text-sm font-bold uppercase tracking-wider",
                                                    item.status === "active" ? "text-lavender" : "text-white/55",
                                                ].join(" ")}
                                            >
                                                {item.date}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1 font-display">{item.title}</h3>
                                        <p className="text-white/60 font-inter text-sm">{item.description}</p>
                                    </div>
                                </div>

                                {/* Spacer for the other side */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <p className="text-white font-display text-2xl mb-8">Want CampusPulse at your campus?</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a
                            href="mailto:hello@campuspulse.ng?subject=Request%20CampusPulse%20at%20My%20Campus"
                            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple to-lavender text-night font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            Request Your Campus
                            <MapPin className="w-5 h-5" />
                        </a>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-lg cp-outline border-2 border-black/60 text-white font-bold text-lg transition-colors flex items-center justify-center gap-3"
                            onClick={(e) => {
                                const ua = navigator.userAgent.toLowerCase();
                                const isMobile = /android|iphone|ipad|ipod|mobile/.test(ua);
                                if (isMobile) return;
                                e.preventDefault();
                                window.open(
                                    `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`,
                                    "_blank",
                                    "noopener,noreferrer"
                                );
                            }}
                        >
                            <span className="inline-flex w-7 h-7 rounded-md border border-black/60 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.55)] overflow-hidden">
                                <WhatsAppIcon className="w-full h-full" width={28} height={28} />
                            </span>
                            Chat on WhatsApp
                        </a>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-8 py-4 rounded-lg cp-outline text-white font-bold text-lg transition-colors"
                        >
                            Join the Movement
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
