"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ChevronDown } from "lucide-react";
import { useCallback, useRef, useEffect } from "react";

export default function Hero() {
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);

  const findEventsElement = () =>
    document.getElementById("events") ||
    document.querySelector('[id*="events" i]') ||
    document.querySelector('[id*="event" i]') ||
    document.querySelector('[data-section="events"]') ||
    document.querySelector('[data-section*="event" i]') ||
    document.querySelector(".events") ||
    document.querySelector("[data-events]");

  const scrollToEvents = useCallback(() => {
    const el = findEventsElement();
    const offset = Math.round(window.innerHeight * 0.04);

    const scrollEl = (element) => {
      if (!element) return;
      const elTop = element.getBoundingClientRect().top + window.scrollY;
      const target = Math.max(0, elTop - offset);
      window.scrollTo({ top: target, behavior: "smooth" });
    };

    if (el) {
      scrollEl(el);
      return;
    }

    if (observerRef.current) return;

    const observer = new MutationObserver(() => {
      const found = findEventsElement();
      if (found) {
        scrollEl(found);
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    });

    observerRef.current = observer;
    observer.observe(document.body, { childList: true, subtree: true });

    timeoutRef.current = setTimeout(() => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      timeoutRef.current = null;
    }, 3000);
  }, []);

  const scrollToNextSection = useCallback(() => {
    const hero =
      document.getElementById("home") || document.querySelector("section");
    if (!hero) {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      return;
    }

    let next = hero.nextElementSibling;
    while (next && !(next instanceof HTMLElement))
      next = next.nextElementSibling;

    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center flex flex-col items-center justify-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]">
                ADVITIYA'26
              </span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]">
              TECHFEST
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-cyan-100 mt-6 mb-10 drop-shadow-[0_2px_15px_rgba(0,0,0,1)] font-medium"
          >
            Innovate • Create • Celebrate
          </motion.p>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            <div className="flex items-center space-x-3 text-cyan-200 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Calendar
                size={24}
                className="drop-shadow-[0_0_8px_rgba(34,211,238,1)]"
              />
              <span className="text-lg font-semibold">March 15-17, 2026</span>
            </div>
            <div className="flex items-center space-x-3 text-purple-200 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <MapPin
                size={24}
                className="drop-shadow-[0_0_8px_rgba(168,85,247,1)]"
              />
              <span className="text-lg font-semibold">IIT Ropar</span>
            </div>
            <div className="flex items-center space-x-3 text-pink-200 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <Users
                size={24}
                className="drop-shadow-[0_0_8px_rgba(236,72,153,1)]"
              />
              <span className="text-lg font-semibold">1000+ Participants</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToEvents}
              className="border-2 border-cyan-400 rounded-full text-cyan-200 font-semibold text-2xl hover:bg-cyan-400 hover:text-black transition-all duration-300 inline-block bg-black/50 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:shadow-[0_0_60px_rgba(34,211,238,0.8)]"
              style={{
                padding: "16px 40px",
                minWidth: "220px",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              View Events
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          onClick={scrollToNextSection}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToNextSection();
            }
          }}
          aria-label="Scroll to next section"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown
              size={32}
              className="text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,1)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
