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

const teamMembers = [
  {
    name: "Aarav Sharma",
    role: "Overall Coordinator",
    icon: Users,
    color: "from-cyan-500 to-blue-500",
    description: "Leads the fest operations and coordination.",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&h=440&fit=crop&crop=faces&auto=format",
    ctaText: "Connect",
    ctaLink: "#",
    details: {
      department: "CSE",
      year: "4th Year",
      location: "Main Campus",
    },
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Oversees team workflows, planning, and cross-department syncs to keep the fest running smoothly.
        </p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Users size={16} className="text-cyan-400" />
            <span>{"CSE"}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award size={16} className="text-yellow-400" />
            <span>{"4th Year"}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin size={16} className="text-red-400" />
            <span>{"Main Campus"}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Isha Patel",
    role: "Cultural Lead",
    icon: Music,
    color: "from-purple-500 to-pink-500",
    description: "Curates cultural showcases and performances.",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&h=440&fit=crop&crop=faces&auto=format",
    ctaText: "Connect",
    ctaLink: "#",
    details: { department: "ECE", year: "3rd Year", location: "Auditorium" },
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Manages auditions, stage setups, and performance schedules for cultural nights.
        </p>
      </div>
    ),
  },
  {
    name: "Kabir Mehta",
    role: "Gaming Head",
    icon: Gamepad2,
    color: "from-green-500 to-emerald-500",
    description: "Leads esports tournaments and LAN setups.",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&h=440&fit=crop&crop=faces&auto=format",
    ctaText: "Connect",
    ctaLink: "#",
    details: { department: "IT", year: "3rd Year", location: "Gaming Arena" },
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Coordinates brackets, streaming, and fair play checks for all gaming events.
        </p>
      </div>
    ),
  },
  {
    name: "Meera Nair",
    role: "Sponsorships Lead",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    description: "Drives partnerships and sponsorships.",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&h=440&fit=crop&crop=faces&auto=format",
    ctaText: "Connect",
    ctaLink: "#",
    details: { department: "MBA", year: "2nd Year", location: "Conf. Hall" },
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Handles outreach, proposals, and branding deliverables with sponsors.
        </p>
      </div>
    ),
  },
  {
    name: "Riya Kapoor",
    role: "Design Lead",
    icon: Palette,
    color: "from-indigo-500 to-purple-500",
    description: "Owns brand, posters, and UI/UX.",
    src: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=700&h=440&fit=crop&crop=faces&auto=format",
    ctaText: "Connect",
    ctaLink: "#",
    details: { department: "Design", year: "3rd Year", location: "Studio" },
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Crafts visual systems and ensures high-quality creative outputs.
        </p>
      </div>
    ),
  },
  {
    name: "Devika Rao",
    role: "Literary & PR",
    icon: Users,
    color: "from-yellow-500 to-orange-500",
    description: "Manages press, content, and debates.",
    src: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=700&h=440&fit=crop&crop=faces&auto=format",
    ctaText: "Connect",
    ctaLink: "#",
    details: { department: "ENGLISH", year: "2nd Year", location: "Media Room" },
    content: () => (
      <div className="space-y-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Handles write-ups, anchors communication, and conducts literary meets.
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
    <section id="events" className="w-full py-12 sm:py-16 lg:py-20 relative">
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
              Our Team
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed px-4 text-center drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-medium">
              The faces behind the fest.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-none items-stretch">
              {teamMembers.map((member, index) => (
                <motion.div
                  layoutId={`card-${member.name}-${id}`}
                  key={`card-${member.name}-${id}`}
                  onClick={() => setActive(member)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group cursor-pointer w-full h-full"
                >
                  <div
                    className={`relative overflow-hidden rounded-xl backdrop-blur-lg bg-black/60 border border-purple-400/40 p-0 hover:bg-black/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 flex flex-col h-full`}
                  >
                    <motion.div
                      layoutId={`image-${member.name}-${id}`}
                      className="flex-none"
                    >
                      <Image
                        width={600}
                        height={240}
                        src={member.src}
                        alt={member.name}
                        className="w-full h-44 rounded-t-lg object-cover object-top group-hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>

                    <div className="flex-1 flex flex-col items-center text-center justify-between p-4 min-h-0">
                      <div className="w-full">
                        <div className="flex items-center justify-center mb-2">
                          <div
                            className={`p-3 rounded-full bg-gradient-to-r ${member.color} mr-3 shadow-[0_0_20px_rgba(168,85,247,0.6)]`}
                          >
                            <member.icon size={24} className="text-white" />
                          </div>
                          <motion.h3
                            layoutId={`title-${member.name}-${id}`}
                            className="font-bold text-cyan-100 text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                          >
                            {member.name}
                          </motion.h3>
                        </div>

                        <motion.p
                          layoutId={`description-${member.description}-${id}`}
                          className="text-cyan-50 mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                        >
                          {member.role}
                        </motion.p>
                        <div className="w-full flex-1 overflow-auto space-y-2 px-2 min-h-0">
                          <div className="flex items-center justify-center gap-2 text-cyan-100">
                            <Users size={16} className="text-cyan-400" />
                            <span className="text-sm">{member.description}</span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full mt-3">
                        <div className="grid grid-cols-2 gap-3 w-full mb-2 text-sm">
                          <div className="text-center p-3 rounded bg-black/40 border border-cyan-400/30">
                            <div className="text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                              {member.details.department}
                            </div>
                            <div className="text-cyan-100 text-xs">Department</div>
                          </div>
                          <div className="text-center p-3 rounded bg-black/40 border border-yellow-400/30">
                            <div className="text-yellow-300 font-semibold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                              {member.details.year}
                            </div>
                            <div className="text-cyan-100 text-xs">Year</div>
                          </div>
                        </div>
                        <p className="text-cyan-200 text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                          Click to view details
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="w-full flex flex-col items-center text-center"
          >
            <div className="max-w-4xl mx-auto px-4 text-center">
              
IY
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
