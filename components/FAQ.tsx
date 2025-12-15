"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Is CampusPulse free?",
        answer: "Yes! CampusPulse is free for students. We charge a small commission (5-7%) on paid event tickets to keep the platform running. Most events are completely free to discover and RSVP.",
    },
    {
        question: "When will CampusPulse launch at my university?",
        answer: "We're launching at University of Ibadan in March 2025, followed by University of Lagos and other Nigerian campuses. If you want CampusPulse at your campus, join our waitlist and request your school — we prioritize based on demand.",
    },
    {
        question: "How do you verify I'm a student?",
        answer: "During signup, we send a verification link to your university email address. You'll need to click the link to confirm your student status. No university email = no access (keeps the community authentic).",
    },
    {
        question: "What makes CampusPulse different from WhatsApp groups or Instagram?",
        answer: "WhatsApp and IG scatter event info across dozens of chats and pages — CampusPulse brings it all to one place. Plus, you get AI recommendations, friend visibility, secure ticketing, and temporary Spark Groups that auto-disband after events.",
    },
    {
        question: "How do Spark Groups work?",
        answer: "When you RSVP to an event, you can opt into a WhatsApp Spark Group with other attendees. It's a great way to coordinate plans, ask questions, and make friends before the event. Groups automatically close 1-2 weeks after the event to keep your chats clean.",
    },
    {
        question: "Can I create events as a student?",
        answer: "Absolutely! Any verified student can create events. Verified organizers (clubs, student unions, faculties) get instant approval. New organizers go through a quick review to prevent spam.",
    },
    {
        question: "Is my data safe?",
        answer: "Yes. We follow strict data protection regulations (including GDPR and Nigerian data laws). Your info is encrypted, never sold, and only used to personalize your experience. You control your privacy settings.",
    },
    {
        question: "What if there's a fake or inappropriate event?",
        answer: "Report it. Our team reviews flagged content within hours and removes anything that violates our community guidelines. Verified organizers are held to high standards.",
    },
    {
        question: "Do you support paid events?",
        answer: "Yes! Organizers can sell tickets directly through CampusPulse. We use secure, blockchain-backed ticketing to prevent fraud. Students get instant verified tickets, and organizers get real-time analytics.",
    },
    {
        question: "Will CampusPulse come to [my country/campus]?",
        answer: "We're starting in Nigeria and expanding across Africa in 2025-2026. US and international campuses are on the roadmap for late 2026. Join the waitlist and request your campus to move up the priority list.",
    },
    {
        question: "How does the 'See Who's Going' feature work?",
        answer: "Once you connect with friends on CampusPulse, you'll see which events they've RSVP'd to. This makes it easy to coordinate plans and avoid showing up alone. Your RSVP status is only visible to your friends (unless you change privacy settings).",
    },
    {
        question: "What if I can't attend an event after RSVPing?",
        answer: "No problem! You can cancel your RSVP anytime before the event. For paid events, refund policies are set by the organizer and shown clearly when you purchase. Your ticket can also be transferred or resold through our marketplace.",
    },
    {
        question: "Can I invite friends who aren't on CampusPulse?",
        answer: "Yes! You can share event links via WhatsApp, Instagram, SMS, or any messaging app. Your friends will see the event details and can join the waitlist to get access to CampusPulse.",
    },
    {
        question: "How accurate are event recommendations?",
        answer: "Our AI learns from your behavior: which events you browse, RSVP to, and attend. The more you use CampusPulse, the better recommendations get. You can also manually select interests during onboarding to jumpstart personalization.",
    },
    {
        question: "What happens if an event gets canceled or rescheduled?",
        answer: "You'll get an instant push notification and email if any event you RSVP'd to changes. Organizers can update event details in real-time, and all attendees are automatically notified. For paid events, refunds are processed immediately.",
    },
    {
        question: "Can I filter events by price?",
        answer: "Yes! In the Discover tab, you can filter by: Free Events, Under ₦500, Under ₦1000, Under ₦2000, or any custom price range. We know student budgets matter.",
    },
    {
        question: "How do I know if an event is legit?",
        answer: "Look for the verified badge next to organizer names. Verified organizers (clubs, faculties, established groups) have been vetted by our team. You can also check past events they've hosted and read reviews from attendees.",
    },
    {
        question: "Will this drain my phone battery?",
        answer: "Nope! CampusPulse is optimized for efficiency. We use smart background syncing, so the app only updates when necessary. You can also enable 'Low Data Mode' in settings to reduce bandwidth usage.",
    },
    {
        question: "Can I use CampusPulse offline?",
        answer: "Partially. Events you've already viewed are cached, so you can see details and your RSVPs without internet. You'll need connection to RSVP, browse new events, or join Spark Groups.",
    },
    {
        question: "What if my university already has an events app?",
        answer: "CampusPulse works alongside existing tools. We're not trying to replace everything — just make event discovery social, personalized, and effortless. Many students use us to find events they'd miss on bulletin boards or Instagram.",
    },
    {
        question: "How do I report a bug or suggest a feature?",
        answer: "Tap the 'Feedback' button in Settings, or email us at hello@campuspulse.ng. We read every message and prioritize features based on student demand. Early adopters shape what we build!",
    },
    {
        question: "Can clubs and organizers promote events?",
        answer: "Yes! Basic promotion is free (your event appears in feeds based on relevance). Premium organizers can access boosted promotions, advanced analytics, and featured placements for ₦5,000/month. Email organizers@campuspulse.ng for details.",
    },
    {
        question: "What's the difference between 'Going' and 'Interested'?",
        answer: "Going: You're committed to attending. Your friends see this, you get tickets, and you join Spark Groups. Interested: You're considering it. This saves the event to your list and notifies you of updates, but doesn't count you as attending.",
    },
    {
        question: "How does the resale marketplace work?",
        answer: "If you can't attend a paid event, you can resell your ticket directly in the app. Set your price (up to the original price — we don't allow scalping), and another student can buy it instantly. The blockchain ensures the ticket transfers securely.",
    },
    {
        question: "Do I need to download WhatsApp for Spark Groups?",
        answer: "Yes, Spark Groups integrate with WhatsApp since 99% of Nigerian students already use it. If you don't have WhatsApp, you can skip this feature — RSVP and ticketing work without it.",
    },
    {
        question: "Can I block someone on CampusPulse?",
        answer: "Yes. Go to their profile, tap the menu, and select 'Block User'. They won't be able to see your activity, message you, or interact with your content.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    
    const visibleFaqs = showAll ? faqs : faqs.slice(0, 6);

    return (
        <section className="py-24 bg-gradient-to-b from-purple/10 via-night to-night text-white relative overflow-hidden">
            {/* Purple Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple/20 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-lavender/15 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-4 max-w-3xl relative z-10">
                <h2 className="text-4xl font-display text-center mb-12">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {visibleFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl overflow-hidden transition-all duration-500 ${openIndex === index ? 'bg-white/10 border-lavender/50 shadow-[0_0_60px_rgba(168,85,247,0.6)] scale-[1.02]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-bold font-inter text-lg ${openIndex === index ? 'text-lavender' : 'text-white'}`}>{faq.question}</span>
                                {openIndex === index ? <Minus className="text-lavender transition-transform rotate-0" /> : <Plus className="text-white/50 transition-transform rotate-90" />}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-white/80 font-inter leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                {!showAll && (
                    <motion.div 
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-8 py-3 rounded-full border border-lavender/30 bg-lavender/10 hover:bg-lavender/20 text-lavender font-bold transition-all hover:shadow-[0_0_20px_rgba(227,176,255,0.4)]"
                        >
                            See More ({faqs.length - 6} more questions)
                        </button>
                    </motion.div>
                )}

                {/* See Less Button */}
                {showAll && (
                    <motion.div 
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <button
                            onClick={() => {
                                setShowAll(false);
                                setOpenIndex(null);
                            }}
                            className="px-8 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                        >
                            See Less
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
