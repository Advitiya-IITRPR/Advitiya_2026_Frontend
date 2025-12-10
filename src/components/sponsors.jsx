// import { useState, useEffect, useRef } from "react";
// import { Code, Award, Briefcase, Palette, Users, Trophy } from "lucide-react";

// const sponsors = [
//   {
//     name: "NexaSoft",
//     sector: "Cloud & AI",
//     icon: Code,
//     color: "from-cyan-500 to-blue-500",
//   },
//   {
//     name: "GreenLeaf Energy",
//     sector: "Renewables",
//     icon: Award,
//     color: "from-green-500 to-emerald-500",
//   },
//   {
//     name: "Finova Capital",
//     sector: "Fintech",
//     icon: Briefcase,
//     color: "from-yellow-500 to-orange-500",
//   },
//   {
//     name: "PixelForge Studios",
//     sector: "Design & Media",
//     icon: Palette,
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     name: "SkyLoop Networks",
//     sector: "Networking",
//     icon: Users,
//     color: "from-indigo-500 to-blue-500",
//   },
//   {
//     name: "MediSync Health",
//     sector: "HealthTech",
//     icon: Trophy,
//     color: "from-red-500 to-rose-500",
//   },
// ];

// function generateCode(width, height) {
//   const lib = [
//     "// sponsor card system",
//     "const SCAN_WIDTH = 8;",
//     "const FADE_ZONE = 35;",
//     "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
//     "function lerp(a, b, t) { return a + (b - a) * t; }",
//     "const scanner = { x: window.innerWidth / 2, glow: 3.5 };",
//     "function drawParticle(ctx, p) { ctx.globalAlpha = p.a; }",
//     "const state = { intensity: 1.2, particles: 2500 };",
//     "ctx.globalCompositeOperation = 'lighter';",
//     "for (let i = 0; i < count; i++) { update(particles[i]); }",
//   ];
//   const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
//   let flow = lib.join(" ");
//   while (flow.length < width * height) flow += " " + pick(lib);
//   let out = "";
//   for (let row = 0; row < height; row++) {
//     let line = flow.slice(row * width, (row + 1) * width);
//     if (line.length < width) line += " ".repeat(width - line.length);
//     out += line + (row < height - 1 ? "\n" : "");
//   }
//   return out;
// }

// export default function SponsorsBeam() {
//   const scannerCanvasRef = useRef(null);
//   const [position, setPosition] = useState(0);
//   const [velocity, setVelocity] = useState(120);
//   const [direction, setDirection] = useState(-1);
//   const [isAnimating, setIsAnimating] = useState(true);
//   const [isDragging, setIsDragging] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const lastTimeRef = useRef(0);
//   const lastMouseRef = useRef(0);
//   const mouseVelRef = useRef(0);
//   const animRef = useRef(null);
//   const particlesRef = useRef([]);
//   const scanningRef = useRef(false);
//   const [winWidth, setWinWidth] = useState(1200);

//   const dup = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

//   useEffect(() => {
//     setWinWidth(window.innerWidth);
//     const handle = () => setWinWidth(window.innerWidth);
//     window.addEventListener("resize", handle);
//     return () => window.removeEventListener("resize", handle);
//   }, []);

//   useEffect(() => {
//     const total = (400 + 60) * sponsors.length;
//     setPosition(winWidth);

//     const anim = (t) => {
//       const dt = (t - lastTimeRef.current) / 1000;
//       lastTimeRef.current = t;

//       if (isAnimating && !isDragging && !paused) {
//         setVelocity((v) => (v > 30 ? v * 0.95 : v));
//         setPosition((p) => {
//           let np = p + velocity * direction * dt;
//           if (np < -total) np = winWidth;
//           else if (np > winWidth) np = -total;
//           return np;
//         });
//       }

//       const sx = winWidth / 2,
//         sw = 8,
//         sl = sx - sw / 2,
//         sr = sx + sw / 2;
//       let any = false;
//       document.querySelectorAll(".sponsor-card-wrapper").forEach((w) => {
//         const r = w.getBoundingClientRect();
//         const n = w.querySelector(".sponsor-card-normal");
//         const a = w.querySelector(".sponsor-card-ascii");
//         if (!n || !a) return;
//         if (r.left < sr && r.right > sl) {
//           any = true;
//           const l = Math.max(sl - r.left, 0);
//           const rr = Math.min(sr - r.left, r.width);
//           n.style.clipPath = `inset(0 0 0 ${(l / r.width) * 100}%)`;
//           a.style.clipPath = `inset(0 ${100 - (rr / r.width) * 100}% 0 0)`;
//         } else {
//           if (r.right < sl) {
//             n.style.clipPath = `inset(0 0 0 100%)`;
//             a.style.clipPath = `inset(0 0 0 0)`;
//           } else {
//             n.style.clipPath = `inset(0 0 0 0%)`;
//             a.style.clipPath = `inset(0 100% 0 0)`;
//           }
//         }
//       });
//       scanningRef.current = any;
//       animRef.current = requestAnimationFrame(anim);
//     };

//     lastTimeRef.current = performance.now();
//     animRef.current = requestAnimationFrame(anim);
//     return () => animRef.current && cancelAnimationFrame(animRef.current);
//   }, [isAnimating, isDragging, velocity, direction, paused, winWidth]);

//   useEffect(() => {
//     const c = scannerCanvasRef.current;
//     if (!c) return;
//     const ctx = c.getContext("2d");
//     const w = winWidth,
//       h = 300;
//     c.width = w;
//     c.height = h;

//     const gc = document.createElement("canvas");
//     const gctx = gc.getContext("2d");
//     gc.width = 16;
//     gc.height = 16;
//     const gr = gctx.createRadialGradient(8, 8, 0, 8, 8, 8);
//     gr.addColorStop(0, "rgba(255, 255, 255, 1)");
//     gr.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
//     gr.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
//     gr.addColorStop(1, "transparent");
//     gctx.fillStyle = gr;
//     gctx.beginPath();
//     gctx.arc(8, 8, 8, 0, Math.PI * 2);
//     gctx.fill();

//     const max = 800,
//       lx = w / 2,
//       lw = 3,
//       fz = 60;
//     particlesRef.current = [];
//     for (let i = 0; i < max; i++) {
//       particlesRef.current.push({
//         x: lx + (Math.random() - 0.5) * lw,
//         y: Math.random() * h,
//         vx: Math.random() * 0.8 + 0.2,
//         vy: (Math.random() - 0.5) * 0.3,
//         r: Math.random() * 0.6 + 0.4,
//         a: Math.random() * 0.4 + 0.6,
//         oa: 0,
//         life: 1,
//         decay: Math.random() * 0.02 + 0.005,
//         time: 0,
//         ts: Math.random() * 0.06 + 0.02,
//         ta: Math.random() * 0.15 + 0.1,
//       });
//       particlesRef.current[i].oa = particlesRef.current[i].a;
//     }

//     const render = () => {
//       ctx.clearRect(0, 0, w, h);
//       const vg = ctx.createLinearGradient(0, 0, 0, h);
//       vg.addColorStop(0, "rgba(255, 255, 255, 0)");
//       vg.addColorStop(fz / h, "rgba(255, 255, 255, 1)");
//       vg.addColorStop(1 - fz / h, "rgba(255, 255, 255, 1)");
//       vg.addColorStop(1, "rgba(255, 255, 255, 0)");

//       ctx.globalCompositeOperation = "lighter";
//       const gi = scanningRef.current ? 3.5 : 1;

//       const cg = ctx.createLinearGradient(lx - lw / 2, 0, lx + lw / 2, 0);
//       cg.addColorStop(0, "rgba(255, 255, 255, 0)");
//       cg.addColorStop(0.5, `rgba(255, 255, 255, ${gi})`);
//       cg.addColorStop(1, "rgba(255, 255, 255, 0)");
//       ctx.globalAlpha = 1;
//       ctx.fillStyle = cg;
//       ctx.fillRect(lx - lw / 2, 0, lw, h);

//       const g1 = ctx.createLinearGradient(lx - lw * 2, 0, lx + lw * 2, 0);
//       g1.addColorStop(0, "rgba(139, 92, 246, 0)");
//       g1.addColorStop(0.5, `rgba(196, 181, 253, ${0.8 * gi})`);
//       g1.addColorStop(1, "rgba(139, 92, 246, 0)");
//       ctx.globalAlpha = 0.8;
//       ctx.fillStyle = g1;
//       ctx.fillRect(lx - lw * 2, 0, lw * 4, h);

//       ctx.globalCompositeOperation = "destination-in";
//       ctx.globalAlpha = 1;
//       ctx.fillStyle = vg;
//       ctx.fillRect(0, 0, w, h);

//       ctx.globalCompositeOperation = "lighter";
//       particlesRef.current.forEach((p) => {
//         p.x += p.vx;
//         p.y += p.vy;
//         p.time++;
//         p.a = p.oa * p.life + Math.sin(p.time * p.ts) * p.ta;
//         p.life -= p.decay;
//         if (p.x > w + 10 || p.life <= 0) {
//           p.x = lx + (Math.random() - 0.5) * lw;
//           p.y = Math.random() * h;
//           p.life = 1;
//           p.time = 0;
//         }
//         let fa = 1;
//         if (p.y < fz) fa = p.y / fz;
//         else if (p.y > h - fz) fa = (h - p.y) / fz;
//         ctx.globalAlpha = p.a * fa;
//         ctx.drawImage(gc, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
//       });
//       requestAnimationFrame(render);
//     };
//     render();
//   }, [winWidth]);

//   const md = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//     setIsAnimating(false);
//     lastMouseRef.current = e.clientX;
//     mouseVelRef.current = 0;
//   };

//   const mm = (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const dx = e.clientX - lastMouseRef.current;
//     setPosition((p) => p + dx);
//     mouseVelRef.current = dx * 60;
//     lastMouseRef.current = e.clientX;
//   };

//   const mu = () => {
//     if (!isDragging) return;
//     setIsDragging(false);
//     if (Math.abs(mouseVelRef.current) > 30) {
//       setVelocity(Math.abs(mouseVelRef.current));
//       setDirection(mouseVelRef.current > 0 ? 1 : -1);
//     } else {
//       setVelocity(120);
//     }
//     setIsAnimating(true);
//   };

//   return (
//     <section className="w-full py-12 sm:py-16 lg:py-20 relative bg-black min-h-screen overflow-hidden">
//       <div className="absolute top-5 left-5 flex gap-2 z-50">
//         <button
//           onClick={() => setIsAnimating(!isAnimating)}
//           className="px-5 py-2 bg-white/20 backdrop-blur-sm border-none rounded-full text-white font-bold cursor-pointer transition-all hover:bg-white/30 hover:-translate-y-0.5"
//         >
//           {isAnimating ? "⏸️ Pause" : "▶️ Play"}
//         </button>
//         <button
//           onClick={() => {
//             setPosition(winWidth);
//             setVelocity(120);
//             setDirection(-1);
//             setIsAnimating(true);
//             setIsDragging(false);
//           }}
//           className="px-5 py-2 bg-white/20 backdrop-blur-sm border-none rounded-full text-white font-bold cursor-pointer transition-all hover:bg-white/30 hover:-translate-y-0.5"
//         >
//           🔄 Reset
//         </button>
//         <button
//           onClick={() => setDirection((d) => d * -1)}
//           className="px-5 py-2 bg-white/20 backdrop-blur-sm border-none rounded-full text-white font-bold cursor-pointer transition-all hover:bg-white/30 hover:-translate-y-0.5"
//         >
//           ↔️ Direction
//         </button>
//       </div>

//       <div className="absolute top-5 right-5 text-white text-base bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm z-50">
//         Speed: <span>{Math.round(velocity)}</span> px/s
//       </div>

//       <div className="w-full flex flex-col items-center text-center mb-12 relative z-10">
//         <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
//           Our Sponsors
//         </h1>
//         <p className="text-lg sm:text-xl lg:text-2xl text-cyan-100 max-w-4xl leading-relaxed px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-medium">
//           Celebrating the partners powering innovation
//         </p>
//       </div>

//       <canvas
//         ref={scannerCanvasRef}
//         className="absolute left-0 pointer-events-none z-20"
//         style={{
//           top: "50%",
//           transform: "translateY(-50%)",
//           width: "100vw",
//           height: "300px",
//         }}
//       />

//       <div
//         className="relative w-full h-[250px] flex items-center overflow-visible"
//         style={{ top: "calc(50% - 125px)" }}
//         onMouseEnter={() => setPaused(true)}
//         onMouseLeave={() => setPaused(false)}
//       >
//         <div
//           className="flex items-center gap-[60px] whitespace-nowrap select-none"
//           style={{
//             transform: `translateX(${position}px)`,
//             cursor: isDragging ? "grabbing" : "grab",
//           }}
//           onMouseDown={md}
//           onMouseMove={mm}
//           onMouseUp={mu}
//           onMouseLeave={mu}
//         >
//           {dup.map((s, i) => (
//             <div
//               key={i}
//               className="sponsor-card-wrapper relative w-[400px] h-[250px] flex-shrink-0"
//             >
//               <div className="sponsor-card-normal absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-10 transition-[clip-path] duration-[50ms] ease-linear">
//                 <div
//                   className={`w-full h-full bg-gradient-to-br ${s.color} flex flex-col items-center justify-center p-8`}
//                 >
//                   <div className="p-6 rounded-full bg-white/20 backdrop-blur-sm mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
//                     <s.icon size={64} className="text-white" />
//                   </div>
//                   <h3 className="text-3xl font-bold text-white mb-3 text-center drop-shadow-lg">
//                     {s.name}
//                   </h3>
//                   <p className="text-xl text-white/90 text-center font-medium">
//                     {s.sector}
//                   </p>
//                 </div>
//               </div>
//               <div className="sponsor-card-ascii absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden z-20 pointer-events-none transition-[clip-path] duration-[50ms] ease-linear">
//                 <pre
//                   className="absolute top-0 left-0 w-full h-full text-[rgba(220,210,255,0.6)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-0"
//                   style={{
//                     WebkitMaskImage:
//                       "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%)",
//                     maskImage:
//                       "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%)",
//                   }}
//                 >
//                   {generateCode(67, 19)}
//                 </pre>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/90 text-center text-sm bg-black/30 px-6 py-4 rounded-full backdrop-blur-sm z-50 max-w-2xl">
//         <p className="leading-relaxed">
//           Drag cards to explore • Scanner reveals code overlay • Cards
//           infinitely loop
//         </p>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Code, Award, Briefcase, Palette, Users, Trophy } from "lucide-react";

const sponsors = [
  {
    name: "NexaSoft",
    sector: "Cloud & AI",
    icon: Code,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "GreenLeaf Energy",
    sector: "Renewables",
    icon: Award,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Finova Capital",
    sector: "Fintech",
    icon: Briefcase,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "PixelForge Studios",
    sector: "Design & Media",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "SkyLoop Networks",
    sector: "Networking",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
  },
  {
    name: "MediSync Health",
    sector: "HealthTech",
    icon: Trophy,
    color: "from-red-500 to-rose-500",
  },
];

function generateCode(width, height) {
  const lib = [
    "// sponsor card system",
    "const SCAN_WIDTH = 8;",
    "const FADE_ZONE = 35;",
    "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
    "function lerp(a, b, t) { return a + (b - a) * t; }",
    "const scanner = { x: window.innerWidth / 2, glow: 3.5 };",
    "function drawParticle(ctx, p) { ctx.globalAlpha = p.a; }",
    "const state = { intensity: 1.2, particles: 2500 };",
    "ctx.globalCompositeOperation = 'lighter';",
    "for (let i = 0; i < count; i++) { update(particles[i]); }",
  ];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  let flow = lib.join(" ");
  while (flow.length < width * height) flow += " " + pick(lib);
  let out = "";
  for (let row = 0; row < height; row++) {
    let line = flow.slice(row * width, (row + 1) * width);
    if (line.length < width) line += " ".repeat(width - line.length);
    out += line + (row < height - 1 ? "\n" : "");
  }
  return out;
}

export default function SponsorsBeam() {
  const scannerCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const [position, setPosition] = useState(0);
  const velocity = 150;
  const direction = -1;
  const lastTimeRef = useRef(0);
  const animRef = useRef(null);
  const renderRef = useRef(null);
  const particlesRef = useRef([]);
  const scanningRef = useRef(false);
  const [winWidth, setWinWidth] = useState(1200);

  const dup = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  useEffect(() => {
    setWinWidth(window.innerWidth);
    const handle = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => {
    const total = (400 + 60) * sponsors.length;
    setPosition(winWidth);

    const anim = (t) => {
      const dt = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      setPosition((p) => {
        let np = p + velocity * direction * dt;
        if (np < -total) np = winWidth;
        else if (np > winWidth) np = -total;
        return np;
      });

      const sx = winWidth / 2,
        sw = 8,
        sl = sx - sw / 2,
        sr = sx + sw / 2;
      let any = false;
      document.querySelectorAll(".sponsor-card-wrapper").forEach((w) => {
        const r = w.getBoundingClientRect();
        const n = w.querySelector(".sponsor-card-normal");
        const a = w.querySelector(".sponsor-card-ascii");
        if (!n || !a) return;
        if (r.left < sr && r.right > sl) {
          any = true;
          const l = Math.max(sl - r.left, 0);
          const rr = Math.min(sr - r.left, r.width);
          n.style.clipPath = `inset(0 0 0 ${(l / r.width) * 100}%)`;
          a.style.clipPath = `inset(0 ${100 - (rr / r.width) * 100}% 0 0)`;
        } else {
          if (r.right < sl) {
            n.style.clipPath = `inset(0 0 0 100%)`;
            a.style.clipPath = `inset(0 0 0 0)`;
          } else {
            n.style.clipPath = `inset(0 0 0 0%)`;
            a.style.clipPath = `inset(0 100% 0 0)`;
          }
        }
      });
      scanningRef.current = any;
      animRef.current = requestAnimationFrame(anim);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(anim);
    return () => animRef.current && cancelAnimationFrame(animRef.current);
  }, [velocity, direction, winWidth]);

  useEffect(() => {
    const c = scannerCanvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const w = winWidth,
      h = 250;
    c.width = w;
    c.height = h;

    const gc = document.createElement("canvas");
    const gctx = gc.getContext("2d");
    gc.width = 16;
    gc.height = 16;
    const gr = gctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gr.addColorStop(0, "rgba(255, 255, 255, 1)");
    gr.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
    gr.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
    gr.addColorStop(1, "transparent");
    gctx.fillStyle = gr;
    gctx.beginPath();
    gctx.arc(8, 8, 8, 0, Math.PI * 2);
    gctx.fill();

    const max = 800,
      lx = w / 2,
      lw = 3,
      fz = 40;
    particlesRef.current = [];
    for (let i = 0; i < max; i++) {
      particlesRef.current.push({
        x: lx + (Math.random() - 0.5) * lw,
        y: Math.random() * h,
        vx: Math.random() * 0.8 + 0.2,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 0.6 + 0.4,
        a: Math.random() * 0.4 + 0.6,
        oa: 0,
        life: 1,
        decay: Math.random() * 0.02 + 0.005,
        time: 0,
        ts: Math.random() * 0.06 + 0.02,
        ta: Math.random() * 0.15 + 0.1,
      });
      particlesRef.current[i].oa = particlesRef.current[i].a;
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const vg = ctx.createLinearGradient(0, 0, 0, h);
      vg.addColorStop(0, "rgba(255, 255, 255, 0)");
      vg.addColorStop(fz / h, "rgba(255, 255, 255, 1)");
      vg.addColorStop(1 - fz / h, "rgba(255, 255, 255, 1)");
      vg.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.globalCompositeOperation = "lighter";
      const gi = scanningRef.current ? 3.5 : 1;

      const cg = ctx.createLinearGradient(lx - lw / 2, 0, lx + lw / 2, 0);
      cg.addColorStop(0, "rgba(255, 255, 255, 0)");
      cg.addColorStop(0.5, `rgba(255, 255, 255, ${gi})`);
      cg.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = cg;
      ctx.fillRect(lx - lw / 2, 0, lw, h);

      const g1 = ctx.createLinearGradient(lx - lw * 2, 0, lx + lw * 2, 0);
      g1.addColorStop(0, "rgba(139, 92, 246, 0)");
      g1.addColorStop(0.5, `rgba(196, 181, 253, ${0.8 * gi})`);
      g1.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = g1;
      ctx.fillRect(lx - lw * 2, 0, lw * 4, h);

      ctx.globalCompositeOperation = "destination-in";
      ctx.globalAlpha = 1;
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.time++;
        p.a = p.oa * p.life + Math.sin(p.time * p.ts) * p.ta;
        p.life -= p.decay;
        if (p.x > w + 10 || p.life <= 0) {
          p.x = lx + (Math.random() - 0.5) * lw;
          p.y = Math.random() * h;
          p.life = 1;
          p.time = 0;
        }
        let fa = 1;
        if (p.y < fz) fa = p.y / fz;
        else if (p.y > h - fz) fa = (h - p.y) / fz;
        ctx.globalAlpha = p.a * fa;
        ctx.drawImage(gc, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      });
      renderRef.current = requestAnimationFrame(render);
    };
    render();
    return () => renderRef.current && cancelAnimationFrame(renderRef.current);
  }, [winWidth]);

  return (
    <section className="w-full py-20 sm:py-24 lg:py-28 relative bg-black min-h-screen overflow-hidden">
      <div className="w-full flex flex-col items-center text-center mb-32 relative z-10">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
          Our Sponsors
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-cyan-100 max-w-4xl leading-relaxed px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-medium">
          Celebrating the partners powering innovation
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[250px] flex items-center overflow-visible"
        style={{ top: "calc(50% - 125px)" }}
      >
        <canvas
          ref={scannerCanvasRef}
          className="absolute left-0 pointer-events-none z-20"
          style={{
            top: "0",
            width: "100vw",
            height: "250px",
          }}
        />

        <div
          className="flex items-center gap-[60px] whitespace-nowrap select-none"
          style={{
            transform: `translateX(${position}px)`,
          }}
        >
          {dup.map((s, i) => (
            <div
              key={i}
              className="sponsor-card-wrapper relative w-[400px] h-[250px] flex-shrink-0"
            >
              <div className="sponsor-card-normal absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-10 transition-none">
                <div
                  className={`w-full h-full bg-gradient-to-br ${s.color} flex flex-col items-center justify-center p-8`}
                >
                  <div className="p-6 rounded-full bg-white/20 backdrop-blur-sm mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <s.icon size={64} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3 text-center drop-shadow-lg">
                    {s.name}
                  </h3>
                  <p className="text-xl text-white/90 text-center font-medium">
                    {s.sector}
                  </p>
                </div>
              </div>
              <div className="sponsor-card-ascii absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden z-20 pointer-events-none transition-none">
                <pre
                  className="absolute top-0 left-0 w-full h-full text-[rgba(220,210,255,0.6)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-0"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%)",
                    maskImage:
                      "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%)",
                  }}
                >
                  {generateCode(67, 19)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/90 text-center text-sm bg-black/30 px-6 py-4 rounded-full backdrop-blur-sm z-50 max-w-2xl">
        <p className="leading-relaxed">
          Scanner reveals code overlay • Cards infinitely loop
        </p>
      </div>
    </section>
  );
}