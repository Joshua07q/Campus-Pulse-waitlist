"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Is CampusPulse free?",
        answer: "Yes! CampusPulse is 100% free for students with a valid university email (.edu).",
    },
    {
        question: "When is the launch?",
        answer: "We are rolling out campus by campus starting Jan 2026. Join the waitlist to vote for your school!",
    },
    {
        question: "Can anyone join?",
        answer: "To ensure safety and relevance, CampusPulse is exclusive to verified university students.",
    },
    {
        question: "How do I get my club featured?",
        answer: "Once live, club leaders can verify their organization and post events directly to the feed.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-night text-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-4xl font-display text-center mb-12">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-bold font-inter text-lg">{faq.question}</span>
                                {openIndex === index ? <Minus className="text-lavender" /> : <Plus className="text-white/50" />}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-white/70 font-inter">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
