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
  Sparkles
} from "lucide-react";
import Link from "next/link";
// import CA from "@/components/CA";

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

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Events", href: "#events", icon: Calendar },
    { name: "Our Team", href: "#team", icon: Users },
    { name: "Sponsors", href: "#sponsors", icon: Trophy },
    { name: "Contact Us", href: "#contact", icon: Mail },
    { name: "CA", href: "/ca", icon: MicVocal },
    { name: "Prefest", href: "/prefest", icon: Sparkles },
  ];

  return (
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
            ADVITIYA
          </motion.span>
        </Link>

        {/* --- Desktop Menu with significant spacing --- */}
        <div className="hidden md:flex items-center gap-8 mr-6">
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

          {/* --- Register Now Button with balanced padding --- */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center whitespace-nowrap ml-4"
            style={{ padding: "8px 24px", gap: "10px" }}
          >
            <UserPlus size={22} />
            <span>Register Now</span>
          </motion.button>
        </div>

        {/* --- Mobile Toggle Button --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-6 px-8"
          >
            <div className="flex flex-col space-y-6 glass rounded-lg p-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-cyan-400 transition-colors flex items-center space-x-4 text-xl font-semibold"
                >
                  <item.icon size={22} />
                  <span>{item.name}</span>
                </Link>
              ))}

              <button
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl flex items-center justify-center mt-4"
                style={{ padding: "8px 24px", gap: "10px" }}
              >
                <UserPlus size={22} />
                <span>Register Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}