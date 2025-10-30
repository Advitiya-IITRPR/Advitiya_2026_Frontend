// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu,
//   X,
//   Home,
//   Calendar,
//   Users,
//   Trophy,
//   Mail,
//   MicVocal,
//   UserPlus,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// // import CA from "@/components/CA";

// export default function NavigationBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Scroll listener for glass effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navItems = [
//     { name: "Home", href: "/", icon: Home },
//     { name: "Events", href: "/events", icon: Calendar },
//     { name: "Our Team", href: "/team", icon: Users },
//     { name: "Sponsors", href: "/sponsors", icon: Trophy },
//     { name: "Contact Us", href: "/contact", icon: Mail },
//     { name: "CA", href: "/ca", icon: MicVocal },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         scrolled ? "glass py-4" : "bg-transparent py-6"
//       }`}
//     >
//       {/* --- Centered container --- */}
//       <div className="max-w-[95%] mx-auto flex justify-between items-center px-4">
//         {/* --- Left Logo --- */}
//         <Link href="/" className="flex items-center">
//           <motion.span
//             className="text-3xl md:text-4xl font-bold gradient-text"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* LOGO */}
//             <Image
//               src="/logo.png"
//               alt="Advitiya Logo"
//               width={100}
//               height={100}
//             />
//           </motion.span>
//         </Link>

//         {/* --- Desktop Menu with significant spacing --- */}
//         <div className="hidden md:flex items-center gap-8 mr-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="relative group flex items-center"
//             >
//               <span className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 text-xl font-semibold">
//                 <item.icon size={22} />
//                 <span>{item.name}</span>
//               </span>
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
//             </Link>
//           ))}

//           {/* --- Register Now Button with balanced padding --- */}
//           <Link href="/registration">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center whitespace-nowrap ml-4"
//               style={{ padding: "8px 24px", gap: "10px" }}
//             >
//               <UserPlus size={22} />
//               <span>Register</span>
//             </motion.button>
//           </Link>

//           <Link href="/login">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap flex items-center"
//             style={{ padding: "8px 24px", gap: "10px" }}
//           >
//             <span>Login</span>
//           </motion.button>
//           </Link>
//         </div>

//         {/* --- Mobile Toggle Button --- */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-white p-2"
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* --- Mobile Menu --- */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden mt-6 px-8"
//           >
//             <div className="flex flex-col space-y-6 glass rounded-lg p-6">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   onClick={() => setIsOpen(false)}
//                   className="text-white hover:text-cyan-400 transition-colors flex items-center space-x-4 text-xl font-semibold"
//                 >
//                   <item.icon size={22} />
//                   <span>{item.name}</span>
//                 </Link>
//               ))}

//               <Link
//                 href="/registration"
//                 className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl flex items-center justify-center mt-4"
//                 style={{ padding: "8px 24px", gap: "10px" }}
//               >
//                 <UserPlus size={22} />
//                 <span>Register Now</span>
//               </Link>

//               <Link
//                 href="/login"
//                 className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl flex items-center justify-center mt-4"
//                 style={{ padding: "8px 24px", gap: "10px" }}
//               >
//                 <span>Login</span>
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Calendar,
  Users,
  Trophy,
  Mail,
  MicVocal,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Our Team", href: "/our-team", icon: Users },
    { name: "Sponsors", href: "/sponsors", icon: Trophy },
    { name: "Contact Us", href: "/contact", icon: Mail },
    { name: "CA", href: "/ca", icon: MicVocal },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "glass py-4" : "bg-transparent py-6"
        }`}
      >
        {/* --- Centered container --- */}
        <div className="max-w-[95%] mx-auto flex justify-between items-center px-4">
          {/* --- Left Logo --- */}
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-3xl md:text-4xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/logo.png"
                alt="Advitiya Logo"
                width={100}
                height={100}
              />
            </motion.span>
          </Link>

          {/* --- Desktop Menu with increased spacing from logo --- */}
          <div className="hidden md:flex items-center gap-8 ml-auto mr-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group flex items-center"
              >
                <span className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 text-xl font-semibold">
                  <item.icon size={22} />
                  <span>{item.name}</span>
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* --- Register Now Button --- */}
            <Link href="/registration">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center whitespace-nowrap ml-4"
                style={{ padding: "8px 24px", gap: "10px" }}
              >
                <UserPlus size={22} />
                <span>Register</span>
              </motion.button>
            </Link>

            {/* --- Login Button --- */}
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap flex items-center"
                style={{ padding: "8px 24px", gap: "10px" }}
              >
                <span>Login</span>
              </motion.button>
            </Link>
          </div>

          {/* --- Mobile Toggle Button --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 z-50 relative"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* --- Mobile Menu Backdrop and Slide-in Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu - Slide from right */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm z-40 md:hidden"
            >
              <div className="h-full glass rounded-l-2xl p-8 pt-24 flex flex-col space-y-6 overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:text-cyan-400 transition-colors flex items-center space-x-4 text-xl font-semibold py-3 border-b border-white/10"
                    >
                      <item.icon size={22} />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Register Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/registration"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl flex items-center justify-center mt-6"
                    style={{ padding: "12px 24px", gap: "10px" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus size={22} />
                    <span>Register Now</span>
                  </Link>
                </motion.div>

                {/* Login Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href="/login"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-xl flex items-center justify-center"
                    style={{ padding: "12px 24px", gap: "10px" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Login</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}