// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, MapPin, Users, ChevronDown, Sparkles } from "lucide-react";
// import { useCallback, useRef, useEffect } from "react";
// import PlanetLoader from "./PlanetLoader"; 

// export default function Hero() {
//   const [loading, setLoading] = useState(true);
//   const observerRef = useRef(null);
//   const timeoutRef = useRef(null);

//   // When loader completes
//   const handleLoaderComplete = () => {
//     setLoading(false);
//   };

//   const findEventsElement = () =>
//     document.getElementById("events") ||
//     document.querySelector('[id*="events" i]') ||
//     document.querySelector('[id*="event" i]') ||
//     document.querySelector('[data-section="events"]') ||
//     document.querySelector('[data-section*="event" i]') ||
//     document.querySelector(".events") ||
//     document.querySelector("[data-events]");

//   const scrollToEvents = useCallback(() => {
//     const el = findEventsElement();
//     const offset = Math.round(window.innerHeight * 0.04);

//     const scrollEl = (element) => {
//       if (!element) return;
//       const elTop = element.getBoundingClientRect().top + window.scrollY;
//       const target = Math.max(0, elTop - offset);
//       window.scrollTo({ top: target, behavior: "smooth" });
//     };

//     if (el) {
//       scrollEl(el);
//       return;
//     }

//     if (observerRef.current) return;

//     const observer = new MutationObserver(() => {
//       const found = findEventsElement();
//       if (found) {
//         scrollEl(found);
//         if (observerRef.current) {
//           observerRef.current.disconnect();
//           observerRef.current = null;
//         }
//         if (timeoutRef.current) {
//           clearTimeout(timeoutRef.current);
//           timeoutRef.current = null;
//         }
//       }
//     });

//     observerRef.current = observer;
//     observer.observe(document.body, { childList: true, subtree: true });

//     timeoutRef.current = setTimeout(() => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//         observerRef.current = null;
//       }
//       timeoutRef.current = null;
//     }, 3000);
//   }, []);

//   const scrollToNextSection = useCallback(() => {
//     const hero =
//       document.getElementById("home") || document.querySelector("section");
//     if (!hero) {
//       window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
//       return;
//     }

//     let next = hero.nextElementSibling;
//     while (next && !(next instanceof HTMLElement))
//       next = next.nextElementSibling;

//     if (next) {
//       next.scrollIntoView({ behavior: "smooth", block: "start" });
//       return;
//     }

//     window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//         observerRef.current = null;
//       }
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//         timeoutRef.current = null;
//       }
//     };
//   }, []);

//     if (loading) {
//     return <PlanetLoader onComplete={handleLoaderComplete} />;
//   }

//   return (
//     <motion.section
//       id="home"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1.2, ease: "easeOut" }}
//       className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
//     >
//       {/* Animated background gradient orbs */}
//       <motion.div
//         className="absolute inset-0 z-0"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5 }}
//       >
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             x: [0, 50, 0],
//             y: [0, 30, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             x: [0, -50, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.1, 1],
//             x: [0, 30, 0],
//             y: [0, 40, 0],
//           }}
//           transition={{
//             duration: 9,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       </motion.div>

//       {/* Floating particles */}
//       {[...Array(20)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 bg-cyan-300 rounded-full"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -30, 0],
//             opacity: [0, 1, 0],
//           }}
//           transition={{
//             duration: 3 + Math.random() * 2,
//             repeat: Infinity,
//             delay: Math.random() * 2,
//           }}
//         />
//       ))}

//       <div className="container mx-auto px-4 z-10 relative">
//         <div className="text-center flex flex-col items-center justify-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="mb-8"
//           >
//             <Sparkles className="w-12 h-12 text-cyan-300 mx-auto drop-shadow-[0_0_20px_rgba(34,211,238,1)]" />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="mb-2 relative"
//           >
//             <motion.div
//               className="absolute inset-0 blur-3xl opacity-60"
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//             >
//               <h1 className="text-6xl md:text-8xl font-bold">
//                 <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text">
//                   ADVITIYA'26
//                 </span>
//               </h1>
//             </motion.div>

//             <motion.h1
//               className="text-6xl md:text-8xl font-bold mb-2 relative"
//               animate={{
//                 textShadow: [
//                   "0 0 40px rgba(34,211,238,0.8)",
//                   "0 0 60px rgba(168,85,247,0.8)",
//                   "0 0 40px rgba(34,211,238,0.8)",
//                 ],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text">
//                 ADVITIYA'26
//               </span>
//             </motion.h1>

//             <motion.h2
//               className="text-3xl md:text-5xl font-bold text-white tracking-widest"
//               initial={{ opacity: 0, letterSpacing: "0.5em" }}
//               animate={{ opacity: 1, letterSpacing: "0.3em" }}
//               transition={{ duration: 1, delay: 0.3 }}
//               style={{
//                 textShadow:
//                   "0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(34,211,238,0.5)",
//               }}
//             >
//               TECHFEST
//             </motion.h2>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="mt-6 mb-10"
//           >
//             <div className="flex items-center justify-center gap-3 text-xl md:text-2xl font-medium">
//               {["Innovate", "Create", "Celebrate"].map((word, i) => (
//                 <motion.span
//                   key={word}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
//                   className="text-cyan-100"
//                   style={{
//                     textShadow:
//                       "0 2px 15px rgba(0,0,0,1), 0 0 30px rgba(34,211,238,0.5)",
//                   }}
//                 >
//                   {word}
//                   {i < 2 && (
//                     <span className="text-purple-400 mx-2 inline-block">•</span>
//                   )}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10"
//           >
//             {[
//               { icon: Calendar, text: "March 15-17, 2026", color: "cyan" },
//               { icon: MapPin, text: "IIT Ropar", color: "purple" },
//               { icon: Users, text: "1000+ Participants", color: "pink" },
//             ].map(({ icon: Icon, text, color }, i) => (
//               <motion.div
//                 key={text}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 className={`flex items-center space-x-3 text-${color}-200 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-${color}-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300 cursor-default`}
//               >
//                 <Icon
//                   size={24}
//                   className={`drop-shadow-[0_0_8px_rgba(34,211,238,1)]`}
//                 />
//                 <span className="text-base md:text-lg font-semibold">
//                   {text}
//                 </span>
//               </motion.div>
//             ))}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="flex justify-center mb-8 relative"
//           >
//             <motion.div
//               className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.5, 0.8, 0.5],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow:
//                   "0 0 60px rgba(34,211,238,0.8), 0 0 100px rgba(168,85,247,0.4)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               onClick={scrollToEvents}
//               className="relative border-2 border-cyan-400 rounded-full text-cyan-200 font-bold text-xl md:text-2xl hover:bg-cyan-400 hover:text-black transition-all duration-300 bg-black/50 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.5)] overflow-hidden group"
//               style={{
//                 padding: "16px 48px",
//                 minWidth: "240px",
//                 minHeight: "64px",
//               }}
//             >
//               <span className="relative z-10">View Events</span>

//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: "100%" }}
//                 transition={{ duration: 0.6 }}
//               />
//             </motion.button>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 1 }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
//           onClick={scrollToNextSection}
//           role="button"
//           tabIndex={0}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") scrollToNextSection();
//           }}
//           aria-label="Scroll to next section"
//           whileHover={{ scale: 1.2 }}
//         >
//           <motion.div
//             animate={{ y: [0, 12, 0] }}
//             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//             className="flex flex-col items-center gap-2"
//           >
//             <span className="text-cyan-300 text-sm font-medium tracking-wider">
//               SCROLL
//             </span>
//             <ChevronDown
//               size={32}
//               className="text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,1)]"
//             />
//           </motion.div>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ChevronDown, Sparkles } from "lucide-react";
import { useCallback, useRef, useEffect } from "react";
import PlanetLoader from "./PlanetLoader";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);

  // When loader completes
  const handleLoaderComplete = () => {
    setLoading(false);
  };

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

  if (loading) {
    return <PlanetLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated background gradient orbs */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Sparkles className="w-12 h-12 text-cyan-300 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2 relative"
          >
            {/* Main title */}
            <motion.h1
              className="text-6xl md:text-9xl font-extrabold mb-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(to right, #22d3ee, #a78bfa, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: "900",
                  letterSpacing: "-0.02em",
                }}
              >
                ADVITIYA'26
              </span>
            </motion.h1>

            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white tracking-widest"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              TECHFEST
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 mb-12"
          >
            <div className="flex items-center justify-center gap-3 text-xl md:text-2xl font-medium">
              {["Innovate", "Create", "Celebrate"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="text-cyan-100"
                >
                  {word}
                  {i < 2 && (
                    <span className="text-purple-400 mx-2 sm:inline-block hidden">•</span>
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 mt-2"
          >
            {[
              { icon: Calendar, text: "February 6-8, 2026", color: "cyan" },
              { icon: MapPin, text: "IIT Ropar", color: "purple" },
              { icon: Users, text: "1000+ Participants", color: "pink" },
            ].map(({ icon: Icon, text, color }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`flex items-center space-x-3 text-${color}-200 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-${color}-400/50 transition-all duration-300 cursor-default`}
              >
                <Icon size={24} />
                <span className="text-base md:text-lg font-semibold">
                  {text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          onClick={scrollToNextSection}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") scrollToNextSection();
          }}
          aria-label="Scroll to next section"
          whileHover={{ scale: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={40} className="text-cyan-300" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}