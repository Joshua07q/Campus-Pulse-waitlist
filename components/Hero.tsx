"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Loader2, ChevronDown, ChevronUp, Mail, X } from "lucide-react";
import Logo from "./Logo";

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Dynamic import to avoid SSR issues with canvas/window if needed, 
    // though lottie-react usually handles it well. 
    // Standard import matches plan.
    const Lottie = require("lottie-react").default;
    const crowdAnimation = require("../public/animations/crowd.json");
    const ChatBubble = require("./ChatBubble").default;

    const [showBubble1, setShowBubble1] = useState(false);
    const [showBubble2, setShowBubble2] = useState(false);
    const [showBubble3, setShowBubble3] = useState(false);

    const toggleBubble = (id: number) => {
        if (id === 1) setShowBubble1(!showBubble1);
        if (id === 2) setShowBubble2(!showBubble2);
        if (id === 3) setShowBubble3(!showBubble3);
    };

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-night overflow-hidden">
            {/* Navbar / Logo Area */}
            <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-3">
                    <Logo className="w-10 h-10 text-white" />
                    <span className="font-display text-xl text-white tracking-wide">CampusPulse</span>
                </div>
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg-clean.jpg"
                    alt="Campus Pulse Venue"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-purple/30 via-night/50 to-night/90" />
            </div>

            {/* Main Content */}
            <div className="relative z-40 container mx-auto px-4 text-center flex flex-col items-center mt-[-50px] pointer-events-none">

                {/* Animated Text Entrance */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-lavender to-white drop-shadow-neon leading-tight">
                        What's Happening<br />on Campus?
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl text-lavender/80 font-inter max-w-2xl mx-auto">
                        Find out instantly with CampusPulse — the heartbeat of student life.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6 pointer-events-auto"
                >
                    {/* Get a Demo Button */}
                    <a
                        href="mailto:demo@campuspulse.com?subject=Requesting a Demo"
                        className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-lg backdrop-blur-sm transition-all flex items-center gap-3 group"
                    >
                        <Mail className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        Get a Demo
                    </a>

                    {/* Join Waitlist Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-purple to-lavender hover:opacity-90 text-night font-bold text-lg shadow-[0_0_20px_rgba(100,24,189,0.5)] hover:shadow-[0_0_30px_rgba(227,176,255,0.6)] transition-all flex items-center gap-3 group"
                    >
                        Join the Waitlist
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>

            {/* Silhouette Overlay - Lottie Animation */}
            <div className="absolute bottom-0 w-full z-10 select-none overflow-hidden h-[300px] md:h-[500px]">

                <div className="absolute bottom-0 w-full flex justify-center items-end opacity-90 mix-blend-screen">
                </div>

                {/* Instance 1 */}
                <div
                    className="absolute bottom-[-20px] left-[-2%] w-[220px] md:w-[310px] cursor-pointer"
                    onClick={() => toggleBubble(1)}
                >
                    <ChatBubble isHovered={showBubble1} />
                    <Lottie animationData={crowdAnimation} loop={true} />
                </div>

                {/* Instance 2 - Flipped or Offset */}
                <div
                    className="absolute bottom-[-30px] left-[35%] w-[210px] md:w-[270px] opacity-80 cursor-pointer"
                    onClick={() => toggleBubble(2)}
                >
                    <ChatBubble isHovered={showBubble2} />
                    <Lottie animationData={crowdAnimation} loop={true} />
                </div>

                {/* Instance 3 */}
                <div
                    className="absolute bottom-[-15px] right-[-5%] w-[230px] md:w-[340px] cursor-pointer"
                    onClick={() => toggleBubble(3)}
                >
                    <ChatBubble isHovered={showBubble3} />
                    <Lottie animationData={crowdAnimation} loop={true} />
                </div>

                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-night to-transparent pointer-events-none" />
            </div>

            {/* Waitlist Modal */}
            <AnimatePresence>
                {isModalOpen && <WaitlistModal onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>

            {/* CSS styles for sprites are no longer needed, assuming we fully removed them */}
        </section>
    );
}

function WaitlistModal({ onClose }: { onClose: () => void }) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showOptional, setShowOptional] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            university: formData.get("university"),
            year: formData.get("year"),
            reason: formData.get("reason"),
            phone: formData.get("phone"),
            source: formData.get("source"),
            role: formData.get("role"),
        };

        try {
            const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxbx763RS7VILJVp-4Zz1CoY_u_rFv3eF6n948wO6tcfNKNOp6ZkttZjaK9uRrggZ1U9w/exec";

            await fetch(WEB_APP_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            setSubmitted(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-10 w-full max-w-lg bg-[#1a0b2e] border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {!submitted ? (
                    <>
                        <h2 className="text-3xl font-display text-white mb-2">Join the Waitlist</h2>
                        <p className="text-white/60 font-inter mb-6">Get early access when CampusPulse launches.</p>

                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            {/* Mandatory Fields */}
                            <div className="space-y-4">
                                <input name="name" type="text" placeholder="Full Name *" required className="input-field" />
                                <input name="email" type="email" placeholder="University Email *" required className="input-field" />
                                <input name="university" type="text" placeholder="University *" required className="input-field" />
                            </div>

                            {/* Optional Fields Toggle */}
                            <button
                                type="button"
                                onClick={() => setShowOptional(!showOptional)}
                                className="text-xs text-lavender/70 flex items-center gap-1 hover:text-white transition-colors mx-auto mt-2"
                            >
                                {showOptional ? "Show Less" : "Add More Info (Optional)"}
                                {showOptional ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            <AnimatePresence>
                                {showOptional && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="space-y-3 overflow-hidden"
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <input name="year" type="text" placeholder="Year" className="input-field" />
                                            <input name="role" type="text" placeholder="Role (e.g. Student)" className="input-field" />
                                        </div>
                                        <input name="phone" type="tel" placeholder="Phone Number" className="input-field" />
                                        <input name="source" type="text" placeholder="How did you hear about us?" className="input-field" />
                                        <textarea name="reason" placeholder="Why are you joining?" rows={2} className="input-field resize-none" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-purple to-lavender hover:opacity-90 rounded-lg font-bold text-night text-lg transition-all flex items-center justify-center gap-2 group mt-4"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : (
                                    <>
                                        Join the Waitlist
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ArrowRight className="w-8 h-8 text-green-400 rotate-[-45deg]" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">You're In! 🚀</h3>
                        <p className="text-white/70 mb-6">We've added you to the exclusive list.</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-white transition-colors"
                        >
                            Close
                        </button>
                    </div>
                )}

                <style jsx global>{`
            .input-field {
              width: 100%;
              padding: 0.75rem 1rem;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 0.5rem;
              color: white;
              font-family: var(--font-inter);
              outline: none;
              transition: all 0.2s;
            }
            .input-field:focus {
              border-color: rgba(227, 176, 255, 0.5);
              background: rgba(255, 255, 255, 0.1);
            }
            .input-field::placeholder {
              color: rgba(255, 255, 255, 0.4);
            }
          `}</style>
            </motion.div>
        </div>
    )
}
