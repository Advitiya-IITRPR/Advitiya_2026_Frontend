// "use client";

// import { motion, useInView } from "framer-motion";
// import { useEffect, useState, useRef } from "react";

// const TextGenerateEffect = ({ words, className = "" }) => {
//   const wordsArray = words.split(" ");
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.1 });

//   const renderWords = () => {
//     return (
//       <motion.div ref={ref} className="text-center">
//         {wordsArray.map((word, idx) => {
//           return (
//             <motion.span
//               key={word + idx}
//               initial={{ opacity: 0, filter: "blur(10px)" }}
//               animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
//               transition={{
//                 duration: 0.5,
//                 delay: idx * 0.05,
//               }}
//               className="inline-block"
//             >
//               {word}&nbsp;
//             </motion.span>
//           );
//         })}
//       </motion.div>
//     );
//   };

//   return (
//     <div className={className}>
//       <div className="text-base md:text-lg lg:text-xl leading-loose text-center">
//         {renderWords()}
//       </div>
//     </div>
//   );
// };

// export default function AboutSection() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, amount: 0.1 });

//   const content =
//     'Advitiya 2026, IIT Ropar\'s annual tech fest, themed "The Crucible of Tomorrow," is set to be a landmark event showcasing the best of technological innovation and intellectual prowess. The fest will feature a wide range of competitions, including coding marathons, AI challenges, and cybersecurity battles; robotics showcases and aerospace contests; creative design and mathematical problem-solving events; as well as gaming and financial strategy tournaments. Complementing these high-energy contests are captivating talks and panel discussions by renowned technologists, industry leaders, and entrepreneurs, offering fresh insights into cutting-edge advancements and the future of technology. Advitiya 2026 is a stage where talent, ideas, and collaboration converge to shape a brighter tomorrow.';

//   return (
//     <section
//       id="about"
//       className="min-h-screen w-full flex items-center justify-center py-16 md:py-20 relative overflow-hidden"
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
//               About Us
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
//             <motion.h3
//               className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-200 mb-6 md:mb-8 text-center drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]"
//               initial={{ opacity: 0, y: -20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Where Dreams Meet Reality
//             </motion.h3>

//             <TextGenerateEffect
//               words={content}
//               className="text-cyan-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
//             />

//             {/* Stats */}
//             <motion.div
//               className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-10"
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 1 }}
//             >
//               <motion.div
//                 className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-400/40"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
//                 <span className="text-cyan-300 font-semibold text-sm md:text-base drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
//                   50+ Events
//                 </span>
//               </motion.div>
//               <motion.div
//                 className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-400/40"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,1)]" />
//                 <span className="text-purple-300 font-semibold text-sm md:text-base drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
//                   100+ Colleges
//                 </span>
//               </motion.div>
//               <motion.div
//                 className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-pink-400/40"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(236,72,153,1)]" />
//                 <span className="text-pink-300 font-semibold text-sm md:text-base drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
//                   5000+ Participants
//                 </span>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const content =
    'Advitiya 2026, IIT Ropar\'s annual tech fest, themed "The Crucible of Tomorrow," is set to be a landmark event showcasing the best of technological innovation and intellectual prowess. The fest will feature a wide range of competitions, including coding marathons, AI challenges, and cybersecurity battles; robotics showcases and aerospace contests; creative design and mathematical problem-solving events; as well as gaming and financial strategy tournaments. Complementing these high-energy contests are captivating talks and panel discussions by renowned technologists, industry leaders, and entrepreneurs, offering fresh insights into cutting-edge advancements and the future of technology. Advitiya 2026 is a stage where talent, ideas, and collaboration converge to shape a brighter tomorrow.';

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center py-16 md:py-20 relative overflow-hidden"
    >
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex justify-center items-center">
        <div className="max-w-5xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.h2
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{ fontFamily: "monospace" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ABOUT US
              </span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"
            />
          </motion.div>

          {/* Main Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-4xl">
              <div className="relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

                {/* Content card */}
                <div className="relative backdrop-blur-md bg-black/40 border border-cyan-500/20 rounded-2xl p-8 md:p-12 shadow-2xl">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-400/50 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-400/50 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-400/50 rounded-br-2xl" />

                  <motion.h3
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-200 mb-6 md:mb-8 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Where Dreams Meet Reality
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative text-gray-100 text-center text-base md:text-lg leading-relaxed"
                  >
                    {content}
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <motion.div
                      className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-400/40"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                      <span className="text-cyan-300 font-semibold text-sm md:text-base">
                        50+ Events
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-400/40"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                      <span className="text-purple-300 font-semibold text-sm md:text-base">
                        100+ Colleges
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-pink-400/40"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" />
                      <span className="text-pink-300 font-semibold text-sm md:text-base">
                        5000+ Participants
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom spacer */}
          <div style={{ height: 60 }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}