"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2, X } from "lucide-react";
import { useState } from "react";

type OrganizerDemoModalProps = {
    onClose: () => void;
};

const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbxbx763RS7VILJVp-4Zz1CoY_u_rFv3eF6n948wO6tcfNKNOp6ZkttZjaK9uRrggZ1U9w/exec";

export default function OrganizerDemoModal({ onClose }: OrganizerDemoModalProps) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const eventTypes = formData.getAll("eventTypes").map(String);
        const promotionChallenges = formData.getAll("promotionChallenges").map(String);
        const currentPromotionMethods = formData.getAll("currentPromotionMethods").map(String);
        const featuresOfInterest = formData.getAll("featuresOfInterest").map(String);

        if (eventTypes.length === 0) {
            setError("Please select at least one event type.");
            setLoading(false);
            return;
        }

        if (featuresOfInterest.length === 0) {
            setError("Please select at least one feature of interest.");
            setLoading(false);
            return;
        }

        const data = {
            formType: "organizer_demo",
            name: formData.get("name"),
            email: formData.get("email"),
            whatsappPhone: formData.get("whatsappPhone"),
            organizerType: formData.get("organizerType"),
            organizationName: formData.get("organizationName"),
            facultyAffiliation: formData.get("facultyAffiliation"),
            eventsPerSemester: formData.get("eventsPerSemester"),
            eventTypes,
            promotionChallenges,
            currentPromotionMethods,
            currentRsvpSystem: formData.get("currentRsvpSystem"),
            featuresOfInterest,
            mustHave: formData.get("mustHave"),
            demoTimingPreference: formData.get("demoTimingPreference"),
            demoFormatPreference: formData.get("demoFormatPreference"),
            specificQuestions: formData.get("specificQuestions"),
        };

        try {
            await fetch(WEB_APP_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 110, damping: 22 }}
                className="relative z-10 w-full max-w-3xl cp-surface p-6 md:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    aria-label="Close organizer demo form"
                >
                    <X className="w-6 h-6" />
                </button>

                {!submitted ? (
                    <>
                        <h2 className="text-3xl font-display text-white mb-2">Schedule Organizer Demo</h2>
                        <p className="text-white/60 font-inter mb-6">
                            Tell us about your events and we will tailor the walkthrough.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5 text-left">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input name="name" type="text" placeholder="Full Name *" required className="input-field" />
                                <input name="email" type="email" placeholder="Email Address *" required className="input-field" />
                                <input name="whatsappPhone" type="tel" placeholder="WhatsApp Phone Number *" required className="input-field" />
                                <select name="organizerType" required className="input-field">
                                    <option value="">Organizer Type *</option>
                                    <option>Student Association</option>
                                    <option>Department/Faculty Body</option>
                                    <option>Religious Group</option>
                                    <option>Event Company</option>
                                    <option>Campus Club</option>
                                    <option>Other</option>
                                </select>
                                <input name="organizationName" type="text" placeholder="Organization Name *" required className="input-field" />
                                <input name="facultyAffiliation" type="text" placeholder="Faculty/Department Affiliation" className="input-field" />
                                <select name="eventsPerSemester" required className="input-field md:col-span-2">
                                    <option value="">Events Per Semester *</option>
                                    <option>1-2 events</option>
                                    <option>3-5 events</option>
                                    <option>6-10 events</option>
                                    <option>10+ events</option>
                                </select>
                            </div>

                            <CheckboxGroup
                                label="Event Types *"
                                name="eventTypes"
                                options={["Parties", "Concerts", "Academic", "Sports", "Shows", "Career", "Workshops", "Other"]}
                            />

                            <CheckboxGroup
                                label="Promotion Challenges"
                                name="promotionChallenges"
                                options={[
                                    "Low turnout",
                                    "Late awareness",
                                    "Spam/noise from group chats",
                                    "No way to track conversion",
                                    "Hard to remind attendees",
                                ]}
                            />

                            <CheckboxGroup
                                label="Current Promotion Methods"
                                name="currentPromotionMethods"
                                options={["WhatsApp groups", "Instagram", "Flyers", "Class reps", "Word of mouth", "Email lists"]}
                            />

                            <textarea
                                name="currentRsvpSystem"
                                placeholder="Current RSVP/Attendance System"
                                rows={2}
                                className="input-field resize-none"
                            />

                            <CheckboxGroup
                                label="Features of Interest *"
                                name="featuresOfInterest"
                                options={[
                                    "WhatsApp-first event distribution",
                                    "Real-time RSVP tracking",
                                    "Fraud-resistant QR check-ins",
                                    "Verified attendance proofs",
                                    "Analytics + exports",
                                ]}
                            />

                            <textarea
                                name="mustHave"
                                placeholder="What would make CampusPulse a must-have for your team?"
                                rows={2}
                                className="input-field resize-none"
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <select name="demoTimingPreference" required className="input-field">
                                    <option value="">Demo Timing Preference *</option>
                                    <option>Morning (9:00 AM - 12:00 PM)</option>
                                    <option>Afternoon (12:00 PM - 4:00 PM)</option>
                                    <option>Evening (4:00 PM - 8:00 PM)</option>
                                    <option>Flexible</option>
                                </select>
                                <div className="space-y-2 rounded-lg border border-lavender/20 bg-night/40 p-3">
                                    <p className="text-sm text-white/75 font-semibold">Demo Format Preference *</p>
                                    {[
                                        "Video call (Zoom/Google Meet) - 30 min",
                                        "In-person meeting on campus - 45 min",
                                        "WhatsApp screen share - 15 min",
                                        "Just send me a demo video",
                                    ].map((option) => (
                                        <label key={option} className="flex items-start gap-2 text-white/80 text-sm">
                                            <input type="radio" name="demoFormatPreference" value={option} required className="mt-0.5" />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/75 font-semibold">
                                    Any specific questions or features you want us to cover in the demo?
                                </label>
                                <textarea
                                    name="specificQuestions"
                                    placeholder="e.g., How does the QR check-in system prevent fraud? Can I export attendance data for reports?"
                                    rows={3}
                                    className="input-field resize-none"
                                />
                            </div>

                            {error && <p className="text-red-300 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-purple to-lavender hover:opacity-90 rounded-lg font-bold text-night text-lg transition-all flex items-center justify-center gap-2 group mt-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : (
                                    <>
                                        Submit Demo Request
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-left py-4">
                        <h3 className="text-3xl font-display text-white mb-3">Demo Request Received! 🚀</h3>
                        <p className="text-white/85 mb-5">Thanks for your interest in CampusPulse for Organizers!</p>
                        <p className="text-white/70 mb-5">
                            We'll reach out within 24 hours to schedule your personalized demo.
                        </p>
                        <p className="text-white/80 mb-3">In the meantime, here's what you can expect:</p>
                        <div className="space-y-2 text-white/70 mb-6">
                            <p>✓ See the organizer dashboard in action</p>
                            <p>✓ Learn how WhatsApp-first distribution boosts turnout</p>
                            <p>✓ Explore QR check-ins and real-time analytics</p>
                            <p>✓ Ask questions about your specific use case</p>
                        </div>

                        <p className="text-white/80 mb-1">Questions before the demo?</p>
                        <p className="text-white/70">Email: organizers@campuspulse.ng</p>
                        <p className="text-white/70 mb-5">WhatsApp: [Coming Soon]</p>

                        <p className="text-white/85 mb-1">Looking forward to helping you level up your events!</p>
                        <p className="text-white/65 mb-6">— The CampusPulse Team<br />Built by students, for students.</p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="#organizers"
                                onClick={onClose}
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple to-lavender text-night font-bold text-center"
                            >
                                Go to Organizer Features
                            </a>
                            <button
                                type="button"
                                className="px-6 py-3 rounded-lg cp-outline text-white font-bold"
                            >
                                Stay on Confirmation Screen
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function CheckboxGroup({ label, name, options }: { label: string; name: string; options: string[] }) {
    return (
        <div className="space-y-2 rounded-lg border border-lavender/20 bg-night/40 p-3">
            <p className="text-sm text-white/75 font-semibold">{label}</p>
            <div className="grid sm:grid-cols-2 gap-2">
                {options.map((option) => (
                    <label key={option} className="flex items-start gap-2 text-white/80 text-sm">
                        <input type="checkbox" name={name} value={option} className="mt-0.5" />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
