"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type CountdownState = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
};

const launchDate = new Date("2026-03-10T00:00:00+01:00");

const getCountdown = (): CountdownState => {
    const diff = launchDate.getTime() - Date.now();
    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
    }
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isLive: false,
    };
};

export default function Countdown() {
    const [countdown, setCountdown] = useState<CountdownState | null>(null);

    useEffect(() => {
        setCountdown(getCountdown());
        const timer = setInterval(() => setCountdown(getCountdown()), 1000);
        return () => clearInterval(timer);
    }, []);

    const units = useMemo(
        () => [
            { label: "Days", value: countdown?.days ?? 0 },
            { label: "Hours", value: countdown?.hours ?? 0 },
            { label: "Minutes", value: countdown?.minutes ?? 0 },
            { label: "Seconds", value: countdown?.seconds ?? 0 },
        ],
        [countdown?.days, countdown?.hours, countdown?.minutes, countdown?.seconds]
    );

    return (
        <section className="py-20 bg-night relative overflow-hidden border-t border-lavender/10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
                        {countdown?.isLive ? "CampusPulse is Live!" : "The pulse starts at UI in..."}
                    </h2>
                    <p className="text-white/60 font-inter">Early March 2026 | University of Ibadan</p>
                </motion.div>

                {!countdown?.isLive && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
                        {units.map((unit) => (
                            <motion.div
                                key={unit.label}
                                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-night/50 border border-lavender/15 rounded-xl p-5 text-center"
                            >
                                <div className="text-3xl md:text-4xl font-display text-white leading-none">
                                    {String(unit.value).padStart(2, "0")}
                                </div>
                                <div className="text-xs text-white/55 uppercase tracking-wider mt-2">{unit.label}</div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {countdown?.isLive && (
                    <div className="text-center mb-10">
                        <span className="inline-block px-6 py-3 rounded-full text-lg font-bold uppercase tracking-wider bg-[rgba(16,185,129,0.15)] text-[#10B981] border border-[rgba(16,185,129,0.25)] animate-pulse">
                            Live Now
                        </span>
                    </div>
                )}

                <div className="text-center">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple to-lavender hover:opacity-90 text-night font-bold text-lg shadow-[0_0_20px_rgba(100,24,189,0.5)] transition-all"
                    >
                        Request Beta Access
                    </button>
                </div>
            </div>
        </section>
    );
}
