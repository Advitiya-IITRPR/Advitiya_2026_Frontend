"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Calendar,
  Users,
  LogOut,
  Moon,
  Sun,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const isDark = resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  if (!mounted) return null;

  const logOutAdmin = async () => {
    try {
      await axios.post("/api/admin/logout");
      toast.success("Admin Logout Successfully");
      router.replace("/admin/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      {/* ---------- Styles ---------- */}
      <style>{`
  .glass-admin {
    background: rgba(10, 10, 30, 0.75);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(99, 102, 241, 0.25);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.35);
  }
`}</style>


      {/* ---------- Navbar ---------- */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 glass-admin h-16"
      >
        <div className="max-w-[98%] mx-auto flex items-center px-4 h-full">
            {/* Logo */}
            <div
              className="cursor-pointer"
              onClick={() => router.replace("/admin")}
            >
              <img
                src="/logo.png"
                alt="Admin Logo"
                width={46}
                height={46}
                className="rounded-xl"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center ml-auto gap-6">
              <button
                onClick={() => router.replace("/admin")}
                className="text-white flex items-center gap-2 font-semibold hover:text-cyan-400 transition"
              >
                <Home size={20} /> Home
              </button>

              <button
                onClick={() => router.replace("/admin/participants")}
                className="text-white flex items-center gap-2 font-semibold hover:text-cyan-400 transition"
              >
                <Users size={20} /> Participants
              </button>

              <MenuItem setActive={setActive} active={active} item="Events">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/admin/createEvent">
                    Create Event
                  </HoveredLink>
                  <HoveredLink href="/admin/eventList">
                    Event List
                  </HoveredLink>
                </div>
              </MenuItem>
            </div>

            {/* Right Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="border-white/20 bg-white/10 hover:bg-white/20"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </Button>

              <button
                onClick={logOutAdmin}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold
                bg-gradient-to-r from-cyan-500 to-purple-500"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-white ml-auto"
            >
              <MenuIcon size={28} />
            </button>
          </div>
      </motion.nav>

      {/* ---------- Mobile Menu ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm z-50
              bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900
              p-6 pt-20 flex flex-col gap-4"
            >
              {/* Close */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 text-white"
              >
                <X size={26} />
              </button>

              <button
                onClick={() => {
                  router.replace("/admin");
                  setMobileOpen(false);
                }}
                className="text-white flex items-center gap-4 text-lg font-semibold"
              >
                <Home /> Home
              </button>

              <button
                onClick={() => {
                  router.replace("/admin/participants");
                  setMobileOpen(false);
                }}
                className="text-white flex items-center gap-4 text-lg font-semibold"
              >
                <Users /> Participants
              </button>

              <div className="border-t border-white/20 pt-4 space-y-3">
                <p className="text-purple-300 font-semibold">Events</p>
                <button
                  onClick={() => {
                    router.replace("/admin/createEvent");
                    setMobileOpen(false);
                  }}
                  className="text-white flex items-center gap-3"
                >
                  <Calendar size={18} /> Create Event
                </button>
                <button
                  onClick={() => {
                    router.replace("/admin/eventList");
                    setMobileOpen(false);
                  }}
                  className="text-white flex items-center gap-3"
                >
                  <Calendar size={18} /> Event List
                </button>
              </div>

              <div className="border-t border-white/20 pt-4 flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </Button>

                <button
                  onClick={logOutAdmin}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white font-semibold
                  bg-gradient-to-r from-cyan-500 to-purple-500"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
