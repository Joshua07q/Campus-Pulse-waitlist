"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Do I need to download an app?",
    answer:
      "Not for Phase 1. You can access everything through WhatsApp. A full mobile app launches in Q2 2026, but WhatsApp will always be supported.",
  },
  {
    question: "Why WhatsApp?",
    answer:
      "WhatsApp is where Nigerian students already are. It is fast, works on low data, and requires no app download. We are meeting you where you are.",
  },
  {
    question: "What is available at launch vs later?",
    answer:
      "March 2026 (Launch): Event discovery, RSVP, reminders, check-in codes, verified proofs - all via WhatsApp. Q2-Q4 2026: AI recommendations, Spark Groups, paid events, Pulse Wrapped.",
  },
  {
    question: "When will CampusPulse launch at my university?",
    answer:
      "We start at the University of Ibadan in March 2026, then expand to more Nigerian campuses. Join the waitlist and request your school to increase priority.",
  },
  {
    question: "How do you verify I am a student?",
    answer:
      "We send a verification link to your university email address. No university email, no access.",
  },
  {
    question: "Is CampusPulse free?",
    answer:
      "Yes. Phase 1 is free for students. Paid events and ticketing are coming later (starting Q3 2026).",
  },
  {
    question: "What are verified attendance proofs?",
    answer:
      "After check-in, you can get a cryptographically verified proof of attendance that you can keep or share.",
  },
  {
    question: "How do Spark Groups work?",
    answer:
      "Spark Groups (Q3 2026) can create WhatsApp groups for event attendees so you can coordinate before the event. Groups auto-close after the event.",
  },
  {
    question: "Do you support paid events?",
    answer:
      "Not in Phase 1. Paid events and secure ticketing are planned for Q3 2026.",
  },
  {
    question: "What makes CampusPulse different from WhatsApp groups or Instagram?",
    answer:
      "Groups and IG scatter event info across chats and pages. CampusPulse organizes discovery and friend visibility, then uses WhatsApp for RSVP and reminders.",
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
