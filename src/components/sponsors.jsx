"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Code,
  Music,
  Gamepad2,
  Briefcase,
  Palette,
  Users,
  Trophy,
  Clock,
  Award,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const sponsors = [
  {
    name: "NexaSoft",
    sector: "Cloud & AI",
    icon: Code,
    color: "from-cyan-500 to-blue-500",
    description: "Building scalable cloud-native platforms.",
    src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    ctaText: "Visit Site",
    ctaLink: "#",
    
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          NexaSoft accelerates digital transformation with secure, serverless stacks and ML ops.
        </p>
      </div>
    ),
  },
  {
    name: "GreenLeaf Energy",
    sector: "Renewables",
    icon: Award,
    color: "from-green-500 to-emerald-500",
    description: "Sustainable solar solutions at scale.",
    src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    ctaText: "Visit Site",
    ctaLink: "#",
    
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Provider of utility-scale solar farms and rooftop microgrids for campuses and SMEs.
        </p>
      </div>
    ),
  },
  {
    name: "Finova Capital",
    sector: "Fintech",
    icon: Briefcase,
    color: "from-yellow-500 to-orange-500",
    description: "Smart payments and lending APIs.",
    src: "https://images.unsplash.com/photo-1556745738-8d76bdb6984b?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    ctaText: "Visit Site",
    ctaLink: "#",
    
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Enabling seamless collections, payouts, and credit scoring with robust compliance.
        </p>
      </div>
    ),
  },
  {
    name: "PixelForge Studios",
    sector: "Design & Media",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    description: "Branding and motion design for startups.",
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    ctaText: "Visit Site",
    ctaLink: "#",
    
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          From visual identities to product videos, PixelForge crafts memorable brand stories.
        </p>
      </div>
    ),
  },
  {
    name: "SkyLoop Networks",
    sector: "Networking",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
    description: "High-availability network solutions.",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    ctaText: "Visit Site",
    ctaLink: "#",
    
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Enterprise Wi‑Fi, SD‑WAN, and edge security with 24/7 managed services.
        </p>
      </div>
    ),
  },
  {
    name: "MediSync Health",
    sector: "HealthTech",
    icon: Trophy,
    color: "from-red-500 to-rose-500",
    description: "Connected devices and telemedicine.",
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    ctaText: "Visit Site",
    ctaLink: "#",
    
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Remote patient monitoring and AI triage helping hospitals scale care access.
        </p>
      </div>
    ),
  },
];

const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path d="m18 6l-12 12" />
    <path d="m6 6l12 12" />
  </motion.svg>
);

// Simple outside click hook
function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function EventsSection() {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const id = useId();
  const [duration, setDuration] = useState(45); // Animation duration in seconds
  const [duplicatedSponsors] = useState([...sponsors, ...sponsors]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Calculate duration based on number of sponsors
    const baseDuration = 20; // Base duration for 6 sponsors
    const calculatedDuration = (baseDuration * sponsors.length) / 3;
    setDuration(calculatedDuration);

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, sponsors.length]);

  useOutsideClick(containerRef, () => setActive(null));

  return (
    <section id="sponsors" className="w-full py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Modal overlay */}
          <AnimatePresence>
            {active && typeof active === "object" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 h-full w-full z-10"
              />
            )}
          </AnimatePresence>

          {/* Modal */}
          <AnimatePresence>
            {active && typeof active === "object" ? (
              <div className="fixed inset-0 grid place-items-center z-[100] p-4">
                <motion.button
                  key={`button-${active.name}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="flex absolute top-6 right-6 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 z-10"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>

                <motion.div
                  layoutId={`card-${active.name}-${id}`}
                  ref={ref}
                  className="w-full max-w-[700px] max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden m-4 shadow-lg"
                >
                  <motion.div
                    layoutId={`image-${active.name}-${id}`}
                    className="flex-none"
                  >
                    <Image
                      priority
                      width={700}
                      height={220}
                      src={active.src}
                      alt={active.name}
                      className="w-full h-44 object-cover"
                    />
                  </motion.div>

                  <div className="p-6 flex-1 flex flex-col min-h-0">
                    <div className="text-center mb-4">
                      <motion.h3
                        layoutId={`title-${active.name}-${id}`}
                        className="font-bold text-neutral-700 dark:text-neutral-200 text-2xl mb-2"
                      >
                        {active.name}
                      </motion.h3>
                    </div>

                    <div className="text-center mb-4 px-4">
                      <motion.a
                        layoutId={`button-${active.name}-${id}`}
                        href={active.ctaLink}
                        className={`inline-block px-8 py-3 text-sm rounded-full font-bold bg-gradient-to-r ${active.color} text-white hover:shadow-lg transition-all`}
                      >
                        {active.ctaText}
                      </motion.a>
                    </div>

                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="overflow-auto flex-1 min-h-0 text-neutral-600 dark:text-neutral-400 space-y-4"
                    >
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center text-center"
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              Our Sponsors
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed px-4 text-center drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-medium">
              Celebrating the partners
            </p>
          </motion.div>

          {/* Infinite Moving Cards */}
          <div className="relative w-full overflow-hidden py-8">
            {/* Gradient overlays for fade effect on sides */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
            
            <div className="relative h-[400px] overflow-hidden">
              <motion.div
                ref={containerRef}
                className="absolute top-0 left-0 flex space-x-8 h-full"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {[...duplicatedSponsors, ...duplicatedSponsors].map((sponsor, index) => (
                  <motion.div
                    key={`${sponsor.name}-${index}`}
                    className="w-[320px] sm:w-[360px] flex-shrink-0 group"
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => setActive(sponsor)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative h-full overflow-hidden rounded-xl backdrop-blur-lg bg-black/60 border border-purple-400/40 p-0 hover:bg-black/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 flex flex-col">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          width={600}
                          height={240}
                          src={sponsor.src}
                          alt={sponsor.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} opacity-50 mix-blend-overlay`}></div>
                      </div>

                      <div className="flex-1 flex flex-col items-center text-center p-4">
                        <div className="flex items-center justify-center mb-3">
                          <div className={`p-2.5 rounded-full bg-gradient-to-r ${sponsor.color} mr-3 shadow-[0_0_20px_rgba(168,85,247,0.6)] transform group-hover:scale-110 transition-transform duration-300`}>
                            <sponsor.icon size={20} className="text-white" />
                          </div>
                          <h3 className="font-bold text-cyan-100 text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:text-white transition-colors">
                            {sponsor.name}
                          </h3>
                        </div>
                        
                        <p className="text-cyan-100 text-sm px-4">
                          {sponsor.description}
                        </p>

                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center justify-center pt-4"
          >
            <div className="text-cyan-400/60 text-sm mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Scroll to explore
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/90 text-center text-sm bg-black/30 px-6 py-4 rounded-full backdrop-blur-sm z-50 max-w-2xl">
        <p className="leading-relaxed">
          Scanner reveals code overlay • Cards infinitely loop
        </p>
      </div>
    </section>
  );
}