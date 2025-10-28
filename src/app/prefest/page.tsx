"use client";

import { motion } from "framer-motion";
import Background from "@/components/Background";
import { Calendar, MapPin, Users } from "lucide-react";

export default function PrefestHome() {
  return (
    <main className="relative min-h-screen">
      <Background />
      <div className="relative z-10">

      <section className="pt-28 md:pt-36 pb-10 px-6 max-w-6xl mx-auto text-center">
        <motion.div className="text-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mt-25 mb-10 gradient-text text-3xl md:text-8xl font-extrabold tracking-tight">Prefest</div>
          <motion.a href="#details" className="gradient-button" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }}>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/10">
            <span className="text-sm font-semibold tracking-wide">TECHFEST</span>
            <span className="text-sm opacity-70">×</span>
            <span className="text-sm font-semibold tracking-wide">ADVITIYA</span>
          </div>
          </motion.a>
          
          <p className="mt-10 mb-15 text-3xl text-cyan-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Asia's largest Science & Technology festival meets North India's premier technical fest. A first look at what’s coming — energy, innovation, and creativity.</p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 mb-4">
            <div className="flex items-center space-x-3 text-cyan-200 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Calendar size={40} className="drop-shadow-[0_0_8px_rgba(34,211,238,1)]" />
              <span className="text-sm md:text-base font-semibold">November 2, 2025</span>
            </div>
            <div className="flex items-center space-x-3 text-purple-200 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <MapPin size={20} className="drop-shadow-[0_0_8px_rgba(168,85,247,1)]" />
              <span className="text-sm md:text-base font-semibold">IIT Ropar (Zonals)</span>
            </div>
            <div className="flex items-center space-x-3 text-pink-200 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <Users size={20} className="drop-shadow-[0_0_8px_rgba(236,72,153,1)]" />
              <span className="text-sm md:text-base font-semibold">Open to all colleges</span>
            </div>
          </div>
        </motion.div>

        
      </section>

      <motion.section id="details" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
        <motion.h2 className="gradient-text mt-65 mb-15 text-4xl md:text-5xl font-bold mb-6" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>Featured Events</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {[{
            color:'from-cyan-500 to-blue-500',
            title:'Cozmoclench — Robotics Pick & Place',
            desc:'Manual or wireless bots transport and deposit blocks across a precision arena with ramps, bridges, and pits — a true test of control under pressure.',
            venue:'Rose Garden',
            details:['Team size: 2–4','Manual/Wireless control','Points for accuracy & speed']
          },{
            color:'from-purple-500 to-pink-500',
            title:'CodeDecode — Programming Championship',
            desc:'Learn with an online course by IITB faculty, compete in an offline zonal, and advance to the IIT Bombay finale.',
            venue:'M5–M6 (Hackathon Hall)',
            details:['Round 1: Online prep course','Round 2: Zonal onsite contest','Finale: IIT Bombay']
          },{
            color:'from-emerald-500 to-teal-500',
            title:'Techfest Olympiad — Multidisciplinary Quiz',
            desc:'Platform for students to showcase scientific and problem‑solving skills by answering the maximum questions in time. Eligibility: Classes 8–10. Finals: direct entry to IIT Bombay.',
            venue:'M3–M4',
            details:['Eligibility: Classes 8–10','Time-bound objective quiz','Direct finals entry at IITB']
          },{
            color:'from-indigo-500 to-violet-500',
            title:'MeshMerize — Engineering Design Innovation',
            desc:'Autonomous line‑following bots map and navigate a maze using stored paths and sensor integration for optimal runs.',
            venue:'LHC & Common Area',
            details:['Autonomous LFR','Memory-based optimization','Sensors integration']
          }].map((card, i)=> (
            <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i*0.06 }} className="group relative overflow-hidden rounded-xl backdrop-blur-lg bg-black/60 border p-0 hover:bg-black/70 transition-all duration-300 hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] hover:scale-105 border-purple-400/40">
              <div className="p-6 flex flex-col items-center text-center gap-3">
                <div className={`p-3 rounded-full bg-gradient-to-r ${card.color} shadow-[0_0_20px_rgba(168,85,247,0.6)]`} />
                <h3 className="text-cyan-100 font-bold text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">{card.title}</h3>
                <p className="text-cyan-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{card.desc}</p>
                <div className="grid grid-cols-1 gap-2 w-full max-w-md mx-auto text-sm">
                  <div className="text-center p-3 rounded bg-black/40 border border-cyan-400/30">
                    <div className="text-cyan-300 font-semibold">Venue</div>
                    <div className="text-cyan-100">{card.venue}</div>
                  </div>
                  <div className="text-center p-3 rounded bg-black/40 border border-purple-400/30">
                    <div className="text-purple-300 font-semibold">Details</div>
                    <ul className="text-cyan-100 space-y-1">
                      {card.details.map(d=> <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="mt-30 mb-15 py-10 px-6 max-w-6xl mx-auto text-center">
        <motion.h2 className="gradient-text text-3xl md:text-5xl font-bold" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>The Ultimate Tech Extravaganza</motion.h2>
        <motion.p className="mt-10 text-white/85 max-w-5xl text-2xl" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          Experience the unprecedented fusion of Techfest, IIT Bombay – Asia's largest science and technology festival – with Advitiya, IIT Ropar – North India's premier technical fest. This collaboration unites a 28-year legacy with a rising star for an unforgettable celebration of technology, innovation, and creativity.
        </motion.p>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.h2 className="gradient-text text-2xl md:text-3xl font-bold" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>What Makes This Collaboration Special?</motion.h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <motion.div className="relative overflow-hidden rounded-xl backdrop-blur-lg bg-black/60 border border-cyan-400/40 p-6 hover:bg-black/70 transition-all duration-300 hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] hover:scale-105" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-lg font-semibold mb-2 text-cyan-100">Advitiya's Rising Star</div>
            <ul className="space-y-2 text-cyan-50 list-disc pl-5">
              <li>15,000+ student footfall from 200+ regional colleges.</li>
              <li>North India's largest technical festival hosted at IIT Ropar.</li>
            </ul>
          </motion.div>
          <motion.div className="relative overflow-hidden rounded-xl backdrop-blur-lg bg-black/60 border border-purple-400/40 p-6 hover:bg-black/70 transition-all duration-300 hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] hover:scale-105" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            <div className="text-lg font-semibold mb-2 text-purple-100">Techfest Legacy Meets Northern Innovation</div>
            <ul className="space-y-2 text-cyan-50 list-disc pl-5">
              <li>28-year journey as Asia's largest science and technology festival.</li>
              <li>180,000+ annual footfall, global recognition, and world records.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      
      


      </div>
    </main>
  );
}
