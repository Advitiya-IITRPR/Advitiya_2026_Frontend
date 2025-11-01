"use client";

import React, { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { motion } from "motion/react";

/* ------------------------- STARFIELD BACKGROUND ------------------------- */
const StarsBackground = ({
  starDensity = 0.001,
  twinkleProbability = 0.8,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const numStars = Math.floor(
        window.innerWidth * window.innerHeight * starDensity
      );
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random(),
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of starsRef.current) {
        s.o += (Math.random() - 0.5) * 0.03;
        s.o = Math.min(1, Math.max(0.3, s.o));
        ctx.globalAlpha = s.o;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fill();
      }
      requestAnimationFrame(render);
    };
    render();

    return () => window.removeEventListener("resize", resize);
  }, [starDensity, twinkleProbability]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
};

/* ------------------------- FREEZING PARTICLES ------------------------- */
const FreezingParticles = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  const generateParticles = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const numParticles = 50;
    return Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = generateParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        const op = p.opacity * (0.7 + Math.sin(Date.now() * 0.002) * 0.3);
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3
        );
        grad.addColorStop(0, `rgba(216,180,254,${op})`);
        grad.addColorStop(0.5, `rgba(232,121,249,${op * 0.5})`);
        grad.addColorStop(1, `rgba(232,121,249,0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, 2 * Math.PI);
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > canvas.height + 10) p.y = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [generateParticles]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
};

/* ------------------------- SATURN RING (REVOLVING) ------------------------- */
const RevolvingRing = () => {
  return (
    <motion.div
      className="absolute flex items-center justify-center"
      animate={{ rotateZ: [0, 360] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      {/* Outer golden ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "850px",
          height: "850px",
          border: "2px solid rgba(255, 230, 180, 0.5)", // pale yellow-gold
          transform: "rotateX(70deg) rotateZ(45deg)",
          filter:
            "blur(2px) drop-shadow(0 0 40px rgba(255, 230, 180, 0.6)) brightness(1.1)",
        }}
      ></div>

      {/* Middle amber ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "720px",
          height: "720px",
          border: "2px solid rgba(240, 200, 120, 0.4)", // warm golden hue
          transform: "rotateX(70deg) rotateZ(120deg)",
          filter:
            "blur(3px) drop-shadow(0 0 30px rgba(240, 200, 120, 0.5))",
        }}
      ></div>

      {/* Inner dusty ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          border: "1px solid rgba(220, 180, 100, 0.3)", // dusty yellow
          transform: "rotateX(70deg) rotateZ(200deg)",
          filter: "blur(4px) drop-shadow(0 0 20px rgba(220, 180, 100, 0.4))",
        }}
      ></div>
    </motion.div>
  );
};


/* ------------------------- GLOBE ------------------------- */
const Globe = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.0,
      mapSamples: 0,
      mapBrightness: 1.0,
      baseColor: [0.2, 0.4, 0.6],  // ocean blue
      glowColor: [0.2, 0.4, 0.6],  // same as ocean
      markerColor: [1.0, 0.2, 0.2],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005; // slow rotation
        state.theta = 0.3;

        // Optional: subtle shading for continents
        state.baseColor = [0.2, 0.4, 0.6]; // ocean blue
        state.glowColor = [0.2, 0.4, 0.6];
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 600,
        height: 600,
        maxWidth: "100%",
        aspectRatio: 1,
      }}
      className={className}
    />
  );
};




/* ------------------------- MAIN BACKGROUND ------------------------- */
export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Stars (bright white, subtle density) */}
      <StarsBackground className="opacity-90" starDensity={0.0008} />

      {/* Floating cosmic particles (very faint glow) */}
      <FreezingParticles className="opacity-30" />

      {/* Revolving Ring + Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute"
          animate={{
            x: [0, 40, 0, -40, 0],
            y: [0, -20, 0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <RevolvingRing />
        </motion.div>

        {/* Globe (purple glow) */}
        <Globe className="absolute z-10 scale-[1.5] md:scale-[1.2] lg:scale-[1.1] opacity-90" />
      </div>

      {/* Subtle radial glow — simulates distant starlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_80%)] pointer-events-none" />

      {/* Faint nebula hue for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}

