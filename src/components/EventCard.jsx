

"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "@/hooks/use-outside-click";

const getPreviewLink = (url) => {
  if (!url) return "";

  // convert google drive .../file/d/<id>/view -> .../file/d/<id>/preview
  if (url.includes("/file/d/") && url.includes("/view")) {
    return url.replace("/view", "/preview");
  }

  return url;
};

export default function ExpandableEventCards({ events }) {
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);

  // ✅ RULEBOOK MODAL state
  const [selectedRulebook, setSelectedRulebook] = useState(null);

  const id = useId();
  const ref = useRef(null);
  const router = useRouter();

  useOutsideClick(ref, () => setActive(null));

  /* ✅ ENSURE CLIENT ONLY */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* 🔒 LOCK SCROLL */
  useEffect(() => {
    if (!mounted) return;

    if (active || selectedRulebook) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    const esc = (e) => {
      if (e.key === "Escape") {
        // close rulebook first, then main modal
        if (selectedRulebook) setSelectedRulebook(null);
        else setActive(null);
      }
    };

    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [active, mounted, selectedRulebook]);

  const handleOpenRulebook = (rulebookUrl) => {
    if (!rulebookUrl) return;
    setSelectedRulebook(getPreviewLink(rulebookUrl));
  };

  const handleCloseRulebook = () => {
    setSelectedRulebook(null);
  };

  return (
    <>
      {/* ================= EVENT DETAILS MODAL ================= */}
      {mounted &&
        active &&
        createPortal(
          <AnimatePresence>
            <>
              {/* BACKDROP */}
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* MODAL */}
              <div className="fixed inset-0 z-[9999] grid place-items-center p-4">
                <motion.div
                  layoutId={`card-${active.eventName}-${id}`}
                  ref={ref}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className="
                    w-full max-w-4xl max-h-[90vh] overflow-hidden
                    rounded-[2rem]
                    bg-gradient-to-br from-[#0a1540]/95 via-[#050b2c]/95 to-[#020617]/95
                    border border-cyan-400/20
                    shadow-[0_0_80px_rgba(34,211,238,0.35)]
                    backdrop-blur-xl
                    flex flex-col
                  "
                >
                  {/* IMAGE */}
                  <motion.div
                    layoutId={`image-${active.eventName}-${id}`}
                    className="relative h-64 w-full overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050b2c]/90 z-10" />
                    <Image
                      src={active.eventImage}
                      alt={active.eventName}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>

                  {/* CONTENT */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-8 text-blue-100">
                    <motion.h2
                      layoutId={`title-${active.eventName}-${id}`}
                      className="text-4xl font-bold text-center bg-gradient-to-r
                        from-cyan-300 via-blue-300 to-cyan-300
                        bg-clip-text text-transparent"
                    >
                      {active.eventName}
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <Info icon={<Clock size={16} />} text={active.eventTime} />
                      <Info icon={<Calendar size={16} />} text={active.eventDate} />
                      <Info
                        icon={<Users size={16} />}
                        text={
                          active.minSize === active.maxSize
                            ? `${active.minSize} Members`
                            : `${active.minSize}-${active.maxSize} Members`
                        }
                      />

                      <div
                        className={`rounded-xl px-4 py-2 text-xs font-semibold border ${
                          active.isRegistrationOpen
                            ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/30"
                            : "bg-red-500/10 text-red-300 border-red-400/30"
                        }`}
                      >
                        {active.isRegistrationOpen
                          ? "✓ Registration Open"
                          : "✕ Registration Closed"}
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {active.description}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="p-6 flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between border-t border-cyan-400/10 bg-black/60">
                    {/* LEFT BUTTONS */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setActive(null)}
                        className="px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                      >
                        Close
                      </button>

                      {/* ✅ RULEBOOK BUTTON */}
                      {active.eventRuleBook && active.eventRuleBook.trim() !== "" && (
                        <button
                          onClick={() => handleOpenRulebook(active.eventRuleBook)}
                          className="px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                        >
                          Rulebook 📘
                        </button>
                      )}
                    </div>

                    {/* RIGHT BUTTON */}
                    <button
                      disabled={!active.isRegistrationOpen}
                      onClick={() => router.push(active.registrationLink)}
                      className="px-10 py-3 rounded-xl font-bold text-white
                        bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500
                        disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Register Now
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          </AnimatePresence>,
          document.getElementById("modal-root")
        )}

      {/* ================= RULEBOOK MODAL ================= */}
      {mounted &&
        selectedRulebook &&
        createPortal(
          <AnimatePresence>
            <>
              {/* BACKDROP */}
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseRulebook}
              />

              {/* MODAL */}
              <motion.div
                className="fixed inset-0 z-[10001] flex justify-center items-center px-4"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl w-full md:w-[75%] h-[80%] relative overflow-hidden border border-white/20 shadow-2xl"
                >
                  {/* Top Bar */}
                  <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
                    <h2 className="text-white font-semibold text-lg">
                      Rulebook
                    </h2>

                    <div className="flex gap-3">
                      {/* Open in New Tab */}
                      <a
                        href={selectedRulebook}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition text-sm"
                      >
                        Open ↗
                      </a>

                      {/* Download */}
                      <a
                        href={selectedRulebook}
                        download
                        className="px-4 py-2 rounded-xl bg-blue-500/30 text-white hover:bg-blue-500/50 transition text-sm"
                      >
                        Download ⬇
                      </a>

                      {/* Close */}
                      <button
                        onClick={handleCloseRulebook}
                        className="px-4 py-2 rounded-xl bg-red-500/30 text-white hover:bg-red-500/50 transition text-sm"
                      >
                        Close ✕
                      </button>
                    </div>
                  </div>

                  {/* PDF Preview */}
                  <iframe
                    src={selectedRulebook}
                    className="w-full h-full"
                    title="Rulebook Preview"
                  />
                </div>
              </motion.div>
            </>
          </AnimatePresence>,
          document.getElementById("modal-root")
        )}

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.eventName}
            layoutId={`card-${event.eventName}-${id}`}
            onClick={() => setActive(event)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="cursor-pointer"
          >
            <div className="rounded-2xl overflow-hidden bg-black/60 border border-cyan-400/20 hover:scale-[1.03] transition">
              <Image
                src={event.eventImage}
                alt={event.eventName}
                width={600}
                height={240}
                className="h-44 w-full object-cover"
              />

              <div className="p-5 text-center space-y-2">
                <h3 className="text-xl font-bold text-cyan-300">
                  {event.eventName}
                </h3>
                <p className="text-sm text-blue-200">{event.eventDate}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Info({ icon, text }) {
  return (
    <div
      className="flex items-center justify-center gap-2 px-4 py-2
      bg-white/5 rounded-xl border border-cyan-400/10"
    >
      <span className="text-cyan-400">{icon}</span>
      <span className="text-xs">{text}</span>
    </div>
  );
}
