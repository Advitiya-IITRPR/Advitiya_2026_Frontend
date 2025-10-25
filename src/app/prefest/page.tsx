"use client";

import { motion } from "framer-motion";

export default function PrefestHome() {
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(closest-side, var(--primary), transparent)" }} />
        <div className="absolute right-[-10%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(closest-side, var(--accent), transparent)" }} />
      </div>

      <section className="pt-28 md:pt-36 pb-10 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ color: "var(--primary)" }}>Prefest</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/85">The official prelude to Advitiya. Immersive previews, pop-up experiences, and a first look at what’s coming.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            
            
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-3xl">
          {[
            { k: "Days", v: "02" },
            { k: "Events", v: "08+" },
            { k: "Artists", v: "12+" },
          ].map((s, i) => (
            <motion.div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}>
              <div className="text-3xl font-extrabold" style={{ color: "var(--primary)" }}>{s.v}</div>
              <div className="text-sm text-white/80">{s.k}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="details" className="py-10 px-6 max-w-6xl mx-auto">
        <motion.h2 className="text-2xl md:text-3xl font-bold" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>Prefest Details</motion.h2>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">Lineup</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Campus Jam", desc: "High-voltage music and open jam sessions.", tag: "Music" },
                { title: "Open Mic", desc: "Stand-up, poetry, and raw stories.", tag: "Stage" },
                { title: "Workshop", desc: "Quick-hit skill sessions to level up.", tag: "Learn" },
              ].map((card, i) => (
                <motion.div key={card.title} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: i * 0.06 }} whileHover={{ scale: 1.02 }}>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{card.title}</div>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent), var(--primary))" }}>{card.tag}</span>
                  </div>
                  <p className="mt-2 text-white/80">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Venues</h3>
            <div className="grid gap-4">
              {[
                { event: "Olympiad", venues: ["M3", "M4"] },
                { event: "Hackathon", venues: ["M5", "M6"] },
                { event: "MeshMerise", venues: ["LHC", "Common Area"] },
                { event: "CosmoClench", venues: ["Rose Garden"] },
              ].map((v, i) => (
                <motion.div key={v.event} className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="font-medium">{v.event}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {v.venues.map((name) => (
                        <span key={name} className="text-xs px-2 py-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent), var(--primary))" }}>{name}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3">Schedule Teaser</h3>
          <div className="grid gap-4">
            {[
              { label: "Day 1 • 5:00 PM • Campus Jam" },
              { label: "Day 1 • 7:30 PM • Open Mic" },
              { label: "Day 2 • 10:00 AM • Workshop" },
            ].map((row, idx) => (
              <motion.div key={row.label} className="rounded-xl overflow-hidden bg-white/5 border border-white/10" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: idx * 0.08 }}>
                <div className="flex items-center justify-between px-4 py-4">
                  <div className="font-medium">{row.label}</div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



    </main>
  );
}
