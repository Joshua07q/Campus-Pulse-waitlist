"use client";

import Logo from "./Logo";
import { Mail, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-12 bg-night border-t border-white/5">
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
                        <div className="flex gap-4">
                            {/* Social Icons (Placeholders) */}
                            {['Instagram', 'Twitter/X', 'TikTok', 'LinkedIn'].map((social, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-lavender hover:text-night transition-all">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-current rounded-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-display">Links</h4>
                        <ul className="space-y-2 text-sm text-white/50 font-inter">
                            <li><a href="mailto:hello@campuspulse.ng?subject=About%20CampusPulse" className="hover:text-lavender transition-colors">About Us</a></li>
                            <li><a href="#organizers" className="hover:text-lavender transition-colors">For Organizers</a></li>
                            <li><a href="mailto:hello@campuspulse.ng?subject=Privacy%20Policy%20Inquiry" className="hover:text-lavender transition-colors">Privacy Policy</a></li>
                            <li><a href="mailto:hello@campuspulse.ng?subject=Terms%20of%20Service%20Inquiry" className="hover:text-lavender transition-colors">Terms of Service</a></li>
                            <li><a href="mailto:hello@campuspulse.ng?subject=Press%20Kit%20Request" className="hover:text-lavender transition-colors">Press Kit</a></li>
                        </ul>
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
                            Launch dates, feature drops, and campus expansions.
                        </p>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                const email = (e.target as HTMLFormElement).email.value;
                                window.location.href = `mailto:hello@campuspulse.ng?subject=Newsletter%20Signup&body=Please%20add%20${email}%20to%20the%20newsletter`;
                            }}
                            className="flex gap-2"
                        >
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-lavender/50 w-full"
                            />
                            <button type="submit" className="bg-lavender text-night rounded-lg px-3 py-2 hover:opacity-90 transition-opacity">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center text-white/30 text-xs font-inter">
                    &copy; {new Date().getFullYear()} CampusPulse. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
