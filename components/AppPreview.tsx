"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BatteryFull,
  Camera,
  ChevronLeft,
  MoreVertical,
  Paperclip,
  Phone,
  Signal,
  Smile,
  Video,
  Wifi,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

const WALLPAPER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640" viewBox="0 0 360 640">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b141a"/>
      <stop offset="1" stop-color="#100a1a"/>
    </linearGradient>
    <pattern id="p" width="90" height="90" patternUnits="userSpaceOnUse">
      <path d="M18 20c10-10 22-10 32 0" fill="none" stroke="rgba(216,180,254,0.10)" stroke-width="2" stroke-linecap="round"/>
      <path d="M60 68c-10 10-22 10-32 0" fill="none" stroke="rgba(139,92,246,0.10)" stroke-width="2" stroke-linecap="round"/>
      <circle cx="20" cy="68" r="3" fill="rgba(37,211,102,0.16)"/>
      <circle cx="68" cy="22" r="2.5" fill="rgba(216,180,254,0.14)"/>
      <path d="M12 44h18" stroke="rgba(255,255,255,0.06)" stroke-width="2" stroke-linecap="round"/>
      <path d="M60 44h18" stroke="rgba(255,255,255,0.06)" stroke-width="2" stroke-linecap="round"/>
    </pattern>
  </defs>
  <rect width="360" height="640" fill="url(#g)"/>
  <rect width="360" height="640" fill="url(#p)"/>
</svg>`;

const WALLPAPER_DATA_URL = "data:image/svg+xml;utf8," + encodeURIComponent(WALLPAPER_SVG);

type ChatMsg = {
  id: string;
  side: "in" | "out";
  text: string;
  time: string;
};

const SCRIPT: ChatMsg[] = [
  { id: "m1", side: "in", text: "Welcome to CampusPulse. Reply with a category:", time: "9:41 PM" },
  { id: "m2", side: "in", text: "1) Parties  2) Concerts  3) Academic  4) Sports", time: "9:41 PM" },
  { id: "m3", side: "out", text: "1", time: "9:41 PM" },
  { id: "m4", side: "in", text: "Top picks near you:", time: "9:41 PM" },
  { id: "m5", side: "in", text: "Neon Night 2026  |  Fri 9:00 PM  |  Trench Club", time: "9:42 PM" },
  { id: "m6", side: "in", text: "Freshers Bash  |  Sat 7:00 PM  |  Main Hall", time: "9:42 PM" },
  { id: "m7", side: "in", text: "Afrobeats Live  |  Sun 6:00 PM  |  Union Arena", time: "9:42 PM" },
  { id: "m8", side: "out", text: "RSVP me for Neon Night.", time: "9:42 PM" },
  { id: "m9", side: "in", text: "Done. Want a reminder 2 hours before?", time: "9:42 PM" },
  { id: "m10", side: "out", text: "Yes please.", time: "9:42 PM" },
];

export default function AppPreview() {
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    let interval: ReturnType<typeof setInterval> | null = null;
    let restart: ReturnType<typeof setTimeout> | null = null;

    const start = () => {
      let count = 1;

      // Avoid synchronous setState in an effect body (eslint rule).
      setTimeout(() => {
        if (!alive) return;
        setShown(1);
        setTyping(true);
      }, 0);

      interval = setInterval(() => {
        count = Math.min(count + 1, SCRIPT.length);
        setShown(count);

        const nextMsg = SCRIPT[count]; // "up next" (0-based)
        if (!nextMsg) {
          setTyping(false);
          if (interval) clearInterval(interval);
          interval = null;
          restart = setTimeout(() => {
            if (!alive) return;
            start();
          }, 2400);
          return;
        }

        // Show typing indicator right before the next incoming (bot) message.
        setTyping(nextMsg.side === "in");
      }, 1550);
    };

    start();

    return () => {
      alive = false;
      if (interval) clearInterval(interval);
      if (restart) clearTimeout(restart);
    };
  }, []);

  const visible = useMemo(() => SCRIPT.slice(0, Math.min(shown, SCRIPT.length)), [shown]);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Keep scrolling contained to the phone mock; never scroll the page.
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [shown, typing]);

  return (
    <section className="py-24 bg-night relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-lavender/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Looks and feels like WhatsApp</h2>
          <p className="text-xl text-white/65 font-inter max-w-2xl mx-auto">
            Discover events, RSVP, and get reminders directly in WhatsApp. Full mobile app + AI features follow in Q2 2026.
          </p>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="absolute w-[560px] h-[560px] bg-purple/30 blur-[120px] rounded-full animate-pulse" />

          <motion.div
            initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 18, mass: 1.1 }}
            className="relative z-10"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ type: "tween", duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[330px] h-[660px] rounded-[2.6rem] overflow-hidden bg-[#05050a] shadow-[0_30px_80px_rgba(0,0,0,0.55)] pointer-events-none select-none"
            >
              <div className="absolute inset-0 rounded-[2.6rem] border border-lavender/15 pointer-events-none" />
              <div className="absolute inset-[10px] rounded-[2.25rem] overflow-hidden bg-[#0b141a] ring-1 ring-black/50 flex flex-col">
              <div className="h-9 px-4 flex items-center justify-between text-white/85 text-[11px] bg-black/35 backdrop-blur-md">
                <div className="font-inter tracking-wide">9:41</div>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <BatteryFull className="w-4 h-4" />
                </div>
              </div>

              <div className="h-14 px-3 flex items-center gap-3 bg-[#0f1a20]/90 backdrop-blur-md border-b border-lavender/10">
                <button className="w-8 h-8 rounded-full hover:bg-lavender/10 transition-colors flex items-center justify-center text-white/80">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-full bg-black/25 border border-lavender/15 flex items-center justify-center overflow-hidden">
                  <Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0 text-left leading-tight">
                  <div className="text-white font-bold text-sm truncate">CampusPulse Bot</div>
                  <div className="text-white/55 text-[11px] truncate">{typing ? "typing..." : "online"}</div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="w-8 h-8 rounded-full hover:bg-lavender/10 transition-colors flex items-center justify-center text-white/75">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full hover:bg-lavender/10 transition-colors flex items-center justify-center text-white/75">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full hover:bg-lavender/10 transition-colors flex items-center justify-center text-white/75">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="relative flex-1 px-3 pt-3 pb-28 overflow-y-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ backgroundImage: `url(${WALLPAPER_DATA_URL})`, backgroundSize: "cover" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

                <div className="relative z-10 min-h-full flex flex-col justify-start">
                  <AnimatePresence initial={false}>
                    <div className="flex flex-col gap-2">
                      {visible.map((m) => (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
                          className={(m.side === "out" ? "flex justify-end" : "flex justify-start") + " shrink-0"}
                        >
                          <div
                            className={[
                              "min-w-0 max-w-[86%] rounded-2xl px-3 py-2 text-left shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
                              m.side === "out"
                                ? "bg-[#1f3b2a] border border-[#2f6b44]"
                                : "bg-black/35 border border-lavender/15 backdrop-blur-sm",
                            ].join(" ")}
                          >
                            <div className="text-white/92 text-[12px] leading-relaxed font-inter break-words">{m.text}</div>
                            <div className="mt-1 text-[10px] text-white/45 text-right font-inter">{m.time}</div>
                          </div>
                        </motion.div>
                      ))}

                      {typing && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                          <div className="bg-black/35 border border-lavender/15 backdrop-blur-sm rounded-2xl px-3 py-2">
                            <div className="flex items-center gap-1">
                              <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-lavender/75"
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                              />
                              <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-lavender/75"
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.18, ease: "easeInOut" }}
                              />
                              <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-lavender/75"
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.36, ease: "easeInOut" }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2 bg-black/45 backdrop-blur-md border-t border-lavender/10">
                <div className="flex items-end gap-2">
                  <button className="w-9 h-9 rounded-full bg-lavender/10 hover:bg-lavender/15 border border-lavender/15 flex items-center justify-center text-white/70 transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>

                  <div className="flex-1 rounded-2xl bg-lavender/10 border border-lavender/15 px-3 py-2 flex items-center gap-2">
                    <div className="flex-1 text-left text-[12px] text-white/45 font-inter">Message</div>
                    <button className="w-8 h-8 rounded-full hover:bg-lavender/10 transition-colors flex items-center justify-center text-white/70">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full hover:bg-lavender/10 transition-colors flex items-center justify-center text-white/70">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>

                  <button className="w-11 h-11 rounded-full bg-whatsapp border-2 border-black/70 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.55)] flex items-center justify-center">
                    <WhatsAppIcon variant="glyph" className="w-5 h-5 text-white" width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
