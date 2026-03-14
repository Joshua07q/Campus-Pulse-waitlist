"use client";

import Logo from "./Logo";
import { Mail, ArrowRight } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
    const miniNav = [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Organizers", href: "#organizers" },
        { label: "FAQ", href: "#faq" },
    ];

    return (
        <footer className="py-14 bg-night border-t border-lavender/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Logo className="w-8 h-8 text-lavender" />
                            <h3 className="text-2xl font-display text-white">
                                CampusPulse
                            </h3>
                        </div>
                        <p className="text-white/50 text-sm font-inter mb-6">
                            The heartbeat of campus life.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-white/55 font-inter mb-6">
                            <WhatsAppIcon className="w-4 h-4" width={16} height={16} />
                            <span>Launching on WhatsApp | Early March 2026</span>
                        </div>
                    </div>

                    {/* Mini Nav */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-display">Explore</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {miniNav.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    className="px-4 py-2.5 rounded-xl bg-night/60 border border-lavender/10 text-[15px] text-white/75 font-inter transition-colors hover:bg-night/70 hover:border-lavender/25 hover:text-white no-underline"
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>

                        <div className="text-xs text-white/40 font-inter mb-2 uppercase tracking-wider">Legal</div>
                        <div className="flex flex-col gap-2 text-sm text-white/55 font-inter">
                            <a href="#" className="hover:text-lavender transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-lavender transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-lavender transition-colors">Press Kit</a>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-display">Contact</h4>
                        <ul className="space-y-3 text-sm text-white/50 font-inter">
                            <li>
                                <a href="mailto:hello@campuspulse.ng" className="flex items-center gap-2 hover:text-lavender transition-colors">
                                    <Mail className="w-4 h-4" />
                                    hello@campuspulse.ng
                                </a>
                            </li>
                            <li>
                                <a href="mailto:organizers@campuspulse.ng" className="flex items-center gap-2 hover:text-lavender transition-colors">
                                    <Mail className="w-4 h-4" />
                                    organizers@campuspulse.ng
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-display">Stay Updated</h4>
                        <p className="text-white/50 text-sm mb-4 font-inter">
                            Launch dates, feature drops, and campus news.
                        </p>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                const email = (e.target as HTMLFormElement).email.value;
                                window.location.href = `mailto:hello@campuspulse.ng?subject=Newsletter%20Signup&body=Please%20add%20${email}%20to%20the%20newsletter`;
                            }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <div className="flex-1 rounded-2xl p-[1px] bg-gradient-to-r from-lavender/25 via-purple/20 to-whatsapp/20">
                                <div className="flex items-center gap-2 bg-[#07070c]/70 border border-lavender/15 rounded-2xl px-3 py-2 backdrop-blur-md">
                                    <Mail className="w-4 h-4 text-white/40" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        required
                                        className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none font-inter"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="rounded-2xl bg-lavender text-night px-4 py-2 font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                Request Beta Access
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-lavender/10 text-center text-white/30 text-xs font-inter">
                    &copy; 2026 CampusPulse. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
