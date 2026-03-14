"use client";

import { motion } from "framer-motion";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppBanner() {
    return (
        <section className="py-16 bg-night relative overflow-hidden">
            {/* Blend Seam: helps the transition from the Hero into this section */}
            <div className="absolute -top-20 left-0 right-0 h-28 bg-gradient-to-b from-night/0 via-night to-night pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-purple/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple/20 blur-[140px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-whatsapp border border-whatsapp/30 px-3 py-1 rounded-full">
                            <WhatsAppIcon variant="glyph" className="w-3.5 h-3.5 text-whatsapp" width={14} height={14} />
                            Launching on WhatsApp
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        Launching on WhatsApp
                    </h2>
                    <p className="text-white/65 font-inter mb-4">
                        Access everything through your favorite messaging app
                    </p>
                    <p className="text-white/50 font-inter text-sm">
                        Early March 2026 at University of Ibadan
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
