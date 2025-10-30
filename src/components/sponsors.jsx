"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    details: { industry: "Software", founded: "2016", hq: "Bengaluru" },
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
    details: { industry: "Energy", founded: "2012", hq: "Gurugram" },
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
    src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=600&fit=crop&crop=entropy&auto=format",
    ctaText: "Visit Site",
    ctaLink: "#",
    details: { industry: "Finance", founded: "2018", hq: "Mumbai" },
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
    details: { industry: "Creative", founded: "2014", hq: "Pune" },
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
    details: { industry: "Telecom", founded: "2010", hq: "Hyderabad" },
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
    details: { industry: "Healthcare", founded: "2015", hq: "Chennai" },
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
  const ref = useRef(null);
  const id = useId();
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    function compute() {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const maxIndex = Math.max(0, sponsors.length - itemsPerView);

  useEffect(() => {
    setCurrent((i) => Math.min(i, maxIndex));
  }, [itemsPerView, maxIndex]);

  // Autoplay: advance every 3s, pause on hover or when modal is open
  useEffect(() => {
    if (paused || (active && typeof active === "object")) return;
    if (maxIndex === 0) return; // no need to slide if everything fits
    const id = setInterval(() => {
      setCurrent((i) => (i >= maxIndex ? 0 : i + 1));
    }, 1500);
    return () => clearInterval(id);
  }, [paused, maxIndex, active]);

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

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section id="sponsors" className="w-full py-12 sm:py-16 lg:py-20 relative">
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
                      unoptimized
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
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400"
                      >
                        {active.description}
                      </motion.p>
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

          {/* Sponsors Grid */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div
                className="overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <motion.div
                  animate={{ x: `-${(100 / itemsPerView) * current}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex gap-6 sm:gap-8"
                  style={{ width: `${(100 / itemsPerView) * sponsors.length}%` }}
                >
                  {sponsors.map((sponsor, index) => (
                    <div
                      key={`slide-${sponsor.name}-${id}`}
                      className="flex-none"
                      style={{ minWidth: `${100 / itemsPerView}%` }}
                    >
                      <motion.div
                        layoutId={`card-${sponsor.name}-${id}`}
                        onClick={() => setActive(sponsor)}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: index * 0.06 }}
                        className="group cursor-pointer w-full h-full"
                      >
                        <div
                          className={`relative overflow-hidden rounded-xl backdrop-blur-lg bg-black/60 border border-purple-400/40 p-0 hover:bg-black/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 flex flex-col h-full`}
                        >
                          <motion.div
                            layoutId={`image-${sponsor.name}-${id}`}
                            className="flex-none"
                          >
                            <Image
                              unoptimized
                              width={600}
                              height={240}
                              src={sponsor.src}
                              alt={sponsor.name}
                              className="w-full h-44 rounded-t-lg object-cover object-top group-hover:scale-110 transition-transform duration-300"
                            />
                          </motion.div>

                          <div className="flex-1 flex flex-col items-center text-center justify-between p-4 min-h-0">
                            <div className="w-full">
                              <div className="flex items-center justify-center mb-2">
                                <div
                                  className={`p-3 rounded-full bg-gradient-to-r ${sponsor.color} mr-3 shadow-[0_0_20px_rgba(168,85,247,0.6)]`}
                                >
                                  <sponsor.icon size={24} className="text-white" />
                                </div>
                                <motion.h3
                                  layoutId={`title-${sponsor.name}-${id}`}
                                  className="font-bold text-cyan-100 text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                >
                                  {sponsor.name}
                                </motion.h3>
                              </div>

                              <motion.p
                                layoutId={`description-${sponsor.description}-${id}`}
                                className="text-cyan-50 mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                              >
                                {sponsor.sector}
                              </motion.p>
                              <div className="w-full flex-1 overflow-auto space-y-2 px-2 min-h-0">
                                <div className="flex items-center justify-center gap-2 text-cyan-100">
                                  <Users size={16} className="text-cyan-400" />
                                  <span className="text-sm">{sponsor.description}</span>
                                </div>
                              </div>
                            </div>

                            <div className="w-full mt-3">
                              <div className="grid grid-cols-2 gap-3 w-full mb-2 text-sm">
                                <div className="text-center p-3 rounded bg-black/40 border border-cyan-400/30">
                                  <div className="text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                                    {sponsor.details.industry}
                                  </div>
                                  <div className="text-cyan-100 text-xs">Industry</div>
                                </div>
                                <div className="text-center p-3 rounded bg-black/40 border border-yellow-400/30">
                                  <div className="text-yellow-300 font-semibold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                                    {sponsor.details.founded}
                                  </div>
                                  <div className="text-cyan-100 text-xs">Founded</div>
                                </div>
                              </div>
                              <p className="text-cyan-200 text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                                Click to view details
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
