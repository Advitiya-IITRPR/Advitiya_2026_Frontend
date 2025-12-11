// "use client";

// import { motion } from "framer-motion";
// import {
//   Mail,
//   Phone,
//   Facebook,
//   Instagram,
//   Linkedin,
//   Youtube,
//   Heart,
// } from "lucide-react";

// export default function Footer() {
//   const socialLinks = [
//     { icon: Facebook, href: "#", color: "hover:text-blue-400" },
//     { icon: Instagram, href: "#", color: "hover:text-pink-400" },
//     { icon: Linkedin, href: "#", color: "hover:text-cyan-400" },
//     { icon: Youtube, href: "#", color: "hover:text-red-400" },
//   ];

//   return (
//     <footer
//       id="contact"
//       className="relative min-h-[80vh] overflow-hidden flex items-center justify-center"
//     >
//       {/* Centered content column */}
//       <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-16 flex flex-col items-center justify-center gap-12 py-16 z-10">
//         {/* Title block */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full text-center"
//         >
//           <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-wide leading-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
//             Contact The Organizing Committee
//           </h2>
//         </motion.div>

//         {/* Cards area */}
//         <div className="w-full flex justify-center">
//           <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 place-items-center">
//             {/* Card - Chaitanya */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="max-w-md w-full bg-black/60 backdrop-blur-lg rounded-2xl p-10 md:p-14 border border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] transition-all flex flex-col items-center text-center"
//             >
//               <h3 className="text-2xl md:text-3xl font-semibold text-cyan-200 mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
//                 Chaitanya Kalme
//               </h3>

//               <div className="space-y-4 text-cyan-50">
//                 <div className="flex items-center justify-center space-x-3">
//                   <Mail
//                     className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,1)]"
//                     size={22}
//                   />
//                   <span className="text-sm md:text-base break-words">
//                     chaitanya.kalme@advitiya.in
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-center space-x-3">
//                   <Phone
//                     className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,1)]"
//                     size={22}
//                   />
//                   <span className="text-sm md:text-base">+91 98765 XXXXX</span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Card - Aryan */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.08 }}
//               className="max-w-md w-full bg-black/60 backdrop-blur-lg rounded-2xl p-10 md:p-14 border border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] transition-all flex flex-col items-center text-center"
//             >
//               <h3 className="text-2xl md:text-3xl font-semibold text-purple-200 mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
//                 Aryan
//               </h3>

//               <div className="space-y-4 text-cyan-50">
//                 <div className="flex items-center justify-center space-x-3">
//                   <Mail
//                     className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,1)]"
//                     size={22}
//                   />
//                   <span className="text-sm md:text-base break-words">
//                     aryan.contact@advitiya.in
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-center space-x-3">
//                   <Phone
//                     className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,1)]"
//                     size={22}
//                   />
//                   <span className="text-sm md:text-base">+91 91234 XXXXX</span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Social Icons */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="flex items-center justify-center gap-12 md:gap-16 pt-2"
//         >
//           {socialLinks.map((s, i) => (
//             <motion.a
//               key={i}
//               href={s.href}
//               whileHover={{ scale: 1.15, rotate: 6 }}
//               whileTap={{ scale: 0.95 }}
//               className={`text-cyan-200 ${s.color} transition-colors flex items-center drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]`}
//               aria-label={`social-${i}`}
//             >
//               <s.icon size={44} />
//             </motion.a>
//           ))}
//         </motion.div>

//         {/* Bottom Bar */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.15 }}
//           className="w-full border-t border-purple-400/30 pt-6 text-center text-cyan-100"
//         >
//           <p className="text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
//             © 2026 ADVITIYA. All Rights Reserved | Made with{" "}
//             <Heart
//               size={14}
//               className="inline mx-1 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,1)]"
//             />{" "}
//             by Team ADVITIYA
//           </p>
//         </motion.div>
//       </div>
//     </footer>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { icon: Linkedin, href: "#", color: "hover:text-cyan-400" },
    { icon: Youtube, href: "#", color: "hover:text-red-400" },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black"
    >
      {/* Main footer content */}
      <div className="relative w-full px-6 lg:px-16 py-8 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left - Contact Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-cyan-300 mb-1">
              Campus Ambassador Program
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-2">
              For any queries contact us at:
            </p>
            <a
              href="mailto:advitiya@iitrpr.ac.in"
              className="flex items-center space-x-3 text-cyan-100 hover:text-cyan-400 transition-colors group"
            >
              <Mail
                className="text-cyan-400 group-hover:text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                size={20}
              />
              <span className="text-sm md:text-base">
                advitiya@iitrpr.ac.in
              </span>
            </a>
          </motion.div>

          {/* Center - Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 relative">
              <img
                src="/logo.png"
                alt="Advitiya Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
              />
            </div>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                ADVITIYA'26
              </h2>
              <p className="text-gray-400 text-sm md:text-base mt-2">
                @ADVITIYA IIT Ropar
              </p>
            </div>
          </motion.div>

          {/* Right - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-end space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-purple-300">
              Follow Us!
            </h3>
            <div className="flex items-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-cyan-200 ${social.color} transition-colors drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]`}
                  aria-label={`social-${index}`}
                >
                  <social.icon size={32} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full border-t border-purple-400/30 py-6 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-center text-cyan-100 text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            © 2026 ADVITIYA. All Rights Reserved | IIT Ropar
          </p>
        </div>
      </motion.div>
    </footer>
  );
}