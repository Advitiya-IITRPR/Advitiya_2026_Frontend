// "use client";

// import React, { useEffect, useId, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useOutsideClick } from "@/hooks/use-outside-click";
// import { Calendar, Clock, Users, DollarSign, Trophy } from "lucide-react";
// import Image from "next/image";

// const CloseIcon = () => {
//   return (
//     <motion.svg
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//       }}
//       exit={{
//         opacity: 0,
//         transition: {
//           duration: 0.05,
//         },
//       }}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-4 w-4 text-white"
//     >
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path d="M18 6l-12 12" />
//       <path d="M6 6l12 12" />
//     </motion.svg>
//   );
// };

// export function ExpandableEventCards({ events, onRegisterClick }) {
//   const [active, setActive] = useState(null);
//   const id = useId();
//   const ref = useRef(null);

//   useEffect(() => {
//     function onKeyDown(event) {
//       if (event.key === "Escape") {
//         setActive(false);
//       }
//     }

//     if (active && typeof active === "object") {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [active]);

//   useOutsideClick(ref, () => setActive(null));

//   return (
//     <div className="relative z-10">
//       <AnimatePresence>
//         {active && typeof active === "object" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/20 h-full w-full z-10"
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {active && typeof active === "object" ? (
//           <div className="fixed inset-0 grid place-items-center z-100 p-4">
//             <motion.button
//               key={`button-${active.eventName}-${id}`}
//               layout
//               initial={{
//                 opacity: 0,
//               }}
//               animate={{
//                 opacity: 1,
//               }}
//               exit={{
//                 opacity: 0,
//                 transition: {
//                   duration: 0.05,
//                 },
//               }}
//               className="flex absolute top-6 right-6 lg:hidden items-center justify-center bg-gray-800/90 backdrop-blur-sm rounded-full h-8 w-8 z-10"
//               onClick={() => setActive(null)}
//             >
//               <CloseIcon />
//             </motion.button>

//             <motion.div
//               layoutId={`card-${active.eventName}-${id}`}
//               ref={ref}
//               className="w-full max-w-[700px] max-h-[90vh] flex flex-col bg-[#021334] backdrop-blur-sm border border-blue-300/20 rounded-3xl overflow-hidden m-4 shadow-2xl shadow-blue-500/20"
//             >
//               <motion.div layoutId={`image-${active.eventName}-${id}`} className="flex-none">
//                 <Image
//                   priority
//                   width={700}
//                   height={220}
//                   src={active.eventImage}
//                   alt={active.eventName}
//                   className="w-full h-44 object-cover"
//                 />
//               </motion.div>

//               <div className="p-6 flex-1 flex flex-col min-h-0">
//                 <div className="text-center mb-4">
//                   <motion.h3
//                     layoutId={`title-${active.eventName}-${id}`}
//                     className="font-bold text-white text-2xl mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
//                   >
//                     {active.eventName}
//                   </motion.h3>
//                 </div>

//                 <div className="text-center mb-4 px-4">
//                   <motion.button
//                     layoutId={`button-${active.eventName}-${id}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (onRegisterClick) {
//                         onRegisterClick(active);
//                       }
//                     }}
//                     disabled={!active.isRegistrationOpen}
//                     className="inline-block px-8 py-3 text-sm rounded-full font-bold bg-linear-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-200"
//                   >
//                     Register Now
//                   </motion.button>
//                 </div>

//                 <motion.div
//                   layout
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="overflow-auto flex-1 min-h-0 text-blue-200 space-y-4"
//                 >
//                   <div className="space-y-4 text-center">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="flex items-center justify-center gap-2">
//                         <Clock size={16} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
//                         <span className="text-sm text-cyan-200">{new Date(active.eventDateAndTime).toLocaleDateString()}</span>
//                       </div>
//                       <div className="flex items-center justify-center gap-2">
//                         <Trophy size={16} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
//                         <span className="text-sm text-cyan-200">₹{active.eventFees}</span>
//                       </div>
//                       <div className="flex items-center justify-center gap-2">
//                         <Users size={16} className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
//                         <span className="text-sm text-cyan-200">
//                           {active.minSize === active.maxSize ? active.minSize : `${active.minSize}-${active.maxSize}`} 
//                           {active.maxSize === 1 ? ' person' : ' people'}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-center gap-2">
//                         <Calendar size={16} className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
//                         <span className="text-sm text-cyan-200">{new Date(active.eventDateAndTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
//                       </div>
//                     </div>

//                     <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
//                       active.isRegistrationOpen 
//                         ? 'bg-green-500/20 text-green-300 border border-green-500/30 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]' 
//                         : 'bg-red-500/20 text-red-300 border border-red-500/30 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
//                     }`}>
//                       {active.isRegistrationOpen ? '🟢 Registration Open' : '🔴 Registration Closed'}
//                     </div>

//                     <div className="pt-4 text-left">
//                       <h4 className="font-semibold text-cyan-300 text-lg mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">About This Event</h4>
//                       <div className="text-blue-100 text-sm md:text-base leading-relaxed">
//                         {active.description}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         ) : null}
//       </AnimatePresence>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-none items-stretch">
//         {events.map((event, index) => (
//           <motion.div
//             layoutId={`card-${event.eventName}-${id}`}
//             key={`card-${event.eventName}-${id}`}
//             onClick={() => setActive(event)}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.45, delay: index * 0.06 }}
//             className="group cursor-pointer w-full h-full"
//           >
//             <div className="relative overflow-hidden rounded-xl backdrop-blur-lg bg-black/60 border border-purple-400/40 p-0 hover:bg-black/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 flex flex-col h-full">
//               <motion.div
//                 layoutId={`image-${event.eventName}-${id}`}
//                 className="flex-none"
//               >
//                 <Image
//                   width={600}
//                   height={240}
//                   src={event.eventImage}
//                   alt={event.eventName}
//                   className="w-full h-44 rounded-t-lg object-cover object-top group-hover:scale-110 transition-transform duration-300"
//                 />
//               </motion.div>

//               <div className="flex-1 flex flex-col items-center text-center justify-between p-4 min-h-0">
//                 <div className="w-full">
//                   <div className="flex items-center justify-center mb-2">
//                     <motion.h3
//                       layoutId={`title-${event.eventName}-${id}`}
//                       className="font-bold text-cyan-100 text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
//                     >
//                       {event.eventName}
//                     </motion.h3>
//                   </div>

//                   <motion.p
//                     layoutId={`description-${event.description}-${id}`}
//                     className="text-cyan-50 mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
//                   >
//                     {event.description}
//                   </motion.p>

//                   <div className="w-full flex-1 overflow-auto space-y-3 px-2 min-h-0">
//                     {/* Removed prize display from initial card */}
//                   </div>
//                 </div>

//                 <div className="w-full mt-3">
//                   <div className="grid grid-cols-2 gap-3 w-full mb-2 text-sm">
//                     <div className="text-center p-3 rounded bg-black/40 border border-cyan-400/30">
//                       <div className="text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
//                         {new Date(event.eventDateAndTime).toLocaleDateString()}
//                       </div>
//                       <div className="text-cyan-100 text-xs">
//                         Date
//                       </div>
//                     </div>
//                     <div className="text-center p-3 rounded bg-black/40 border border-yellow-400/30">
//                       <div className="text-yellow-300 font-semibold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
//                         {event.minSize === event.maxSize ? event.minSize : `${event.minSize}-${event.maxSize}`}
//                       </div>
//                       <div className="text-cyan-100 text-xs">Team Size</div>
//                     </div>
//                   </div>
//                   <p className="text-cyan-200 text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
//                     Click to view details
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const EventCard = ({ events, onRegisterClick }) => {
//   return <ExpandableEventCards events={events} onRegisterClick={onRegisterClick} />;
// };

// export default EventCard;
"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableEventCards({ events }) {
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);
  
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

    if (active) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    const esc = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [active, mounted]);

  return (
    <>
      {/* ================= MODAL ================= */}
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
                        text={`${active.minSize}-${active.maxSize} Members`}
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
                  <div className="p-6 flex justify-between border-t border-cyan-400/10 bg-black/60">
                    <button
                      onClick={() => setActive(null)}
                      className="px-6 py-2 rounded-xl bg-white/10"
                    >
                      Close
                    </button>

                    <button
                      disabled={!active.isRegistrationOpen}
                      onClick={() =>
                        router.push(active.registrationLink)
                      }
                      className="px-10 py-3 rounded-xl font-bold text-white
                        bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500
                        disabled:opacity-30"
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
                <p className="text-sm text-blue-200">
                  {event.eventDate}
                </p>
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
    <div className="flex items-center justify-center gap-2 px-4 py-2
      bg-white/5 rounded-xl border border-cyan-400/10">
      <span className="text-cyan-400">{icon}</span>
      <span className="text-xs">{text}</span>
    </div>
  );
}
