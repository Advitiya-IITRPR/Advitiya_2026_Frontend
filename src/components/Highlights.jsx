// "use client";

// import React, { useRef } from "react";
// import { motion, useInView } from "framer-motion";

// const TextGenerateEffect = ({ words, className = "", isInView = false }) => {
//   const normalized = words.replace(/([.,;:!?])(?=\S)/g, "$1 ");
//   const wordsArray = normalized.split(/\s+/).filter(Boolean);

//   return (
//     <div className={className}>
//       <div className="text-base md:text-lg lg:text-xl leading-loose text-center tracking-wide whitespace-normal break-words">
//         <motion.div className="text-center inline">
//           {wordsArray.map((word, idx) => (
//             <motion.span
//               key={`${word}-${idx}`}
//               initial={{ opacity: 0, filter: "blur(10px)", y: 6 }}
//               animate={
//                 isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}
//               }
//               transition={{ duration: 0.45, delay: idx * 0.03 }}
//               className="inline"
//               style={{
//                 display: "inline",
//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",
//               }}
//             >
//               {word}
//               {idx !== wordsArray.length - 1 ? " " : ""}
//             </motion.span>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default function Highlights() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, amount: 0.1 });

//   const content =
//     "Advitiya 2024, IIT Ropar's flagship technical fest, showcased an impressive lineup of events and activities that attracted thousands of participants. Highlights included thrilling competitions like Drone Racing, RC Car Racing, and Hackathons, alongside intellectually stimulating challenges such as Coding Competitions, Fin-Tech Challenges, and the Maths Arena. Workshops on cutting-edge technologies like Artificial Intelligence, Machine Learning, and Rocket Building provided hands-on learning opportunities. Esteemed professionals shared their insights during panel discussions, while the Inter-School Conclave fostered creativity among young minds with quizzes, exhibitions, and robotic showcases. The festival was inaugurated by Director Prof. Rajiv Ahuja and graced by Mr. Soarabh Pathak, VP of Maruti Suzuki, emphasizing its scale and significance.";

//   return (
//     <section
//       id="highlights"
//       className="min-h-screen w-full flex items-center justify-center py-12 md:py-16 relative overflow-hidden"
//     >
//       <div className="relative z-10 w-full flex justify-center items-center">
//         <div className="max-w-6xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
//           {/* Section Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12 md:mb-16"
//           >
//             <motion.h2
//               className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]"
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={inView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ duration: 0.8 }}
//             >
//               Highlights
//             </motion.h2>
//           </motion.div>

//           {/* Main Content */}
//           <motion.div
//             ref={ref}
//             initial={{ opacity: 0, y: 50 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="backdrop-blur-lg bg-gradient-to-br from-black/70 via-purple-900/50 to-black/70 rounded-2xl p-6 md:p-10 lg:p-12 border border-purple-400/40 shadow-[0_0_50px_rgba(168,85,247,0.3)]"
//           >
//             <TextGenerateEffect
//               words={content}
//               className="text-cyan-50 leading-relaxed text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
//               isInView={inView}
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const galleryRef = useRef(null);
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      alt: "Drone Racing Competition",
      span: "col-span-2 row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
      alt: "Coding Competition",
      span: "col-span-1 row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
      alt: "Tech Workshop",
      span: "col-span-1 row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600",
      alt: "Panel Discussion",
      span: "col-span-1 row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1561489396-888724a1543d?w=600",
      alt: "RC Car Racing",
      span: "col-span-1 row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
      alt: "Robotics Competition",
      span: "col-span-2 row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
      alt: "Hackathon Event",
      span: "col-span-1 row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600",
      alt: "AI Workshop",
      span: "col-span-1 row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      alt: "Participants",
      span: "col-span-2 row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
      alt: "Team Collaboration",
      span: "col-span-1 row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
      alt: "Innovation Showcase",
      span: "col-span-2 row-span-1", // Increased size similar to Participants
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
      alt: "Opening Ceremony",
      span: "col-span-1 row-span-1",
    },
  ];

  return (
    <section
      id="highlights"
      className="min-h-screen w-full flex flex-col items-center justify-center py-16 md:py-20 relative overflow-hidden"
    >
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col justify-center items-center">
        <div className="max-w-7xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
          {/* Section Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{ fontFamily: "monospace" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                HIGHLIGHTS
              </span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 w-44 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"
            />
          </motion.div>

          {/* Brief Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <p className="text-gray-300 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              Advitiya 2024 showcased thrilling competitions including Drone
              Racing, RC Car Racing, and Hackathons. The fest featured
              cutting-edge workshops on AI, ML, and Rocket Building, with
              insights from industry professionals and the Inter-School Conclave
              fostering young innovation.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            ref={galleryRef}
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px]">
              {" "}
              {/* Reduced gap */}
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                  className={`${image.span} relative group overflow-hidden rounded-xl cursor-pointer`}
                >
                  {/* Glowing border */}
                  <div className="absolute -inset-0.5 bg-white rounded-xl opacity-60 group-hover:opacity-90 blur-sm transition-opacity duration-300" />

                  <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/90 bg-black/20">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <p className="text-white text-sm md:text-base font-semibold text-center">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-16"
          >
            <p className="text-cyan-400 text-sm md:text-base font-semibold">
              Relive the moments that made Advitiya 2025 unforgettable
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}