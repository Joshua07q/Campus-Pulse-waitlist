"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Do I need to download an app?",
    answer:
      "No. CampusPulse launches on WhatsApp in Early March 2026. Just message our WhatsApp number and you're in. A full mobile app is coming later.",
  },
  {
    question: "Why WhatsApp?",
    answer:
      "Most UI students already use WhatsApp daily. We're meeting you where you are — no new app to download, no new logins to remember.",
  },
  {
    question: "What is available at launch vs later?",
    answer:
      "At Launch (March 2026): Discover events, RSVP, get reminders, check in with QR codes, earn verified attendance proofs — all in WhatsApp. Coming Later: Spark Groups (auto WhatsApp groups for events), AI recommendations, paid event ticketing, Pulse Wrapped year-end recap.",
  },
  {
    question: "When will CampusPulse launch at my university?",
    answer:
      "We're starting at University of Ibadan in Early March 2026. If you want CampusPulse at your campus, request it and we'll prioritize based on demand.",
  },
  {
    question: "How do you verify I am a student?",
    answer:
      "You'll verify your university email address during signup. This ensures only real students can join your campus network.",
  },
  {
    question: "Is CampusPulse free?",
    answer:
      "Yes! Discovering events, RSVPing, and earning attendance proofs are completely free. Premium features (like paid event ticketing) may be introduced later.",
  },
  {
    question: "Why should I trust CampusPulse with my data?",
    answer:
      "We follow strict data protection standards and only collect what's necessary. Your data stays private and is never shared without your permission. Plus, CampusPulse is built by students, for students — we understand campus privacy concerns.",
  },
  {
    question: "What if my friends aren't on CampusPulse yet?",
    answer:
      "Get your friends on board and move up the waitlist! The more friends you invite, the better your CampusPulse experience. Events are better when your crew is there.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6);

  return (
    <section id="faq" className="py-20 bg-night text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-night via-purple/10 to-night pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[760px] h-[760px] bg-purple/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-lavender/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display mb-3">Frequently Asked Questions</h2>
          <p className="text-white/60 font-inter">Transparent answers. No grey cards.</p>
        </div>

        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={[
                  "relative rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300",
                  isOpen
                    ? "border-lavender/40 bg-[linear-gradient(135deg,rgba(139,92,246,0.34),rgba(216,180,254,0.10),rgba(10,10,15,0.56))] shadow-[0_0_0_1px_rgba(216,180,254,0.16),0_18px_90px_rgba(139,92,246,0.22)]"
                    : "border-lavender/22 bg-[linear-gradient(135deg,rgba(139,92,246,0.26),rgba(216,180,254,0.08),rgba(10,10,15,0.52))] hover:border-lavender/32 hover:shadow-[0_14px_70px_rgba(139,92,246,0.16)]",
                ].join(" ")}
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple/30 via-transparent to-lavender/20 opacity-30" />
                  <div className="absolute -inset-8 bg-[radial-gradient(circle_at_20%_20%,rgba(216,180,254,0.20),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.18),transparent_55%)] opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/7 via-transparent to-transparent opacity-60" />
                </div>

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group relative w-full flex items-center justify-between gap-5 px-6 py-5 md:px-8 md:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/40"
                >
                  <span className="font-display text-lg md:text-xl text-white/95">{faq.question}</span>
                  <Plus
                    className={[
                      "w-5 h-5 flex-shrink-0 transition-transform duration-300",
                      isOpen
                        ? "rotate-45 text-lavender"
                        : "text-lavender/70 group-hover:text-lavender",
                    ].join(" ")}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="relative overflow-hidden"
                    >
                      <div className="px-6 pb-5 md:px-8 md:pb-6">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-lavender/20 to-transparent mb-4" />
                        <div className="text-white/70 font-inter leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {!showAll && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-xl cp-outline border border-lavender/20 hover:border-lavender/30 text-white font-bold transition-all"
            >
              See More ({faqs.length - 6} more questions)
            </button>
          </motion.div>
        )}

        {showAll && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => {
                setShowAll(false);
                setOpenIndex(null);
              }}
              className="px-8 py-3 rounded-xl cp-outline border border-lavender/15 hover:border-lavender/25 text-white font-bold transition-all"
            >
              See Less
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
