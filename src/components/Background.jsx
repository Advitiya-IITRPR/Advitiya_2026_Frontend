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
      animate={{
        rotateZ: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className="absolute rounded-full border-2"
        style={{
          width: "800px",
          height: "800px",
          borderColor: "rgba(217,70,239,0.6)",
          transform: "rotateX(65deg) rotateZ(40deg)",
          boxShadow: "0 0 70px 20px rgba(217,70,239,0.4)",
        }}
      ></div>
      <div
        className="absolute rounded-full border"
        style={{
          width: "680px",
          height: "680px",
          borderColor: "rgba(147,51,234,0.4)",
          transform: "rotateX(65deg) rotateZ(120deg)",
          boxShadow: "0 0 50px 10px rgba(168,85,247,0.3)",
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
      theta: 0,
      dark: 1,
      diffuse: 3.2,
      mapSamples: 25000,
      mapBrightness: 7,
      baseColor: [0.4, 0.1, 0.5],
      markerColor: [0.9, 0.5, 1],
      glowColor: [1.0, 0.4, 0.9],
      markers: [{ location: [28.6139, 77.209], size: 0.07 }],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.008;
      },
    });
    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

/* ------------------------- MAIN BACKGROUND ------------------------- */
export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black">
      {/* Stars */}
      <StarsBackground className="opacity-70" />

      {/* Floating Particles */}
      <FreezingParticles className="opacity-60" />

      {/* Revolving Ring + Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute"
          animate={{
            x: [0, 40, 0, -40, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <RevolvingRing />
        </motion.div>

        <Globe className="absolute z-10 scale-[1.6] md:scale-[1.3] lg:scale-[1.1] opacity-85" />
      </div>

      {/* Overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.15)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
