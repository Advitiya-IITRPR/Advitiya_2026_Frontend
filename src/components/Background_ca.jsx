"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { motion } from "motion/react";

// Freezing Particles Component
const FreezingParticles = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  const generateParticles = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const numParticles = 50;

    return Array.from({ length: numParticles }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 2 + 1,
    }));
  }, []);

  useEffect(() => {
    particlesRef.current = generateParticles();
  }, [generateParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = generateParticles();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.map((particle) => {
        // Draw the particle as a blue-white crystal
        const twinkle =
          Math.sin(Date.now() * 0.001 * particle.twinkleSpeed) * 0.3 + 0.7;
        const currentOpacity = particle.opacity * twinkle;

        // Draw a small glowing circle
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `rgba(134, 239, 255, ${currentOpacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(56, 189, 248, ${currentOpacity * 0.5})`
        );
        gradient.addColorStop(1, `rgba(56, 189, 248, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw center bright point
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        let newY = particle.y + particle.speedY;
        let newX = particle.x + particle.speedX;

        // Reset if out of bounds
        if (newY > canvas.height + 10) {
          newY = -10;
          newX = Math.random() * canvas.width;
        }
        if (newX < -10) newX = canvas.width + 10;
        if (newX > canvas.width + 10) newX = -10;

        return { ...particle, x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [generateParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

// Saturn Ring Component
const SaturnRing = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: "900px",
          height: "900px",
          maxWidth: "150vw",
          maxHeight: "150vw",
        }}
      >
        <svg
          viewBox="0 0 900 900"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 0 30px rgba(34, 211, 238, 0.6))" }}
        >
          {/* Main ring with gradient */}
          <defs>
            <linearGradient
              id="ringGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#0891b2", stopOpacity: 0.2 }}
              />
              <stop
                offset="20%"
                style={{ stopColor: "#06b6d4", stopOpacity: 0.9 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
              />
              <stop
                offset="80%"
                style={{ stopColor: "#db2777", stopOpacity: 0.9 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#db2777", stopOpacity: 0.2 }}
              />
            </linearGradient>
            <linearGradient
              id="ringGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#db2777", stopOpacity: 0.2 }}
              />
              <stop
                offset="20%"
                style={{ stopColor: "#c026d3", stopOpacity: 0.8 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#7c3aed", stopOpacity: 1 }}
              />
              <stop
                offset="80%"
                style={{ stopColor: "#0891b2", stopOpacity: 0.8 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#0891b2", stopOpacity: 0.2 }}
              />
            </linearGradient>
          </defs>

          {/* Outer ring */}
          <ellipse
            cx="450"
            cy="450"
            rx="380"
            ry="80"
            fill="none"
            stroke="url(#ringGradient1)"
            strokeWidth="5"
            opacity="0.95"
          />

          {/* Middle ring */}
          <ellipse
            cx="450"
            cy="450"
            rx="360"
            ry="70"
            fill="none"
            stroke="url(#ringGradient2)"
            strokeWidth="12"
            opacity="0.85"
          />

          {/* Inner ring */}
          <ellipse
            cx="450"
            cy="450"
            rx="340"
            ry="60"
            fill="none"
            stroke="url(#ringGradient1)"
            strokeWidth="4"
            opacity="0.9"
          />

          {/* Add some sparkle points on the ring */}
          <circle cx="830" cy="450" r="4" fill="#06b6d4" opacity="1">
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="70" cy="450" r="4" fill="#db2777" opacity="1">
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="450" cy="370" r="3.5" fill="#8b5cf6" opacity="0.95">
            <animate
              attributeName="opacity"
              values="0.95;0.3;0.95"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="450" cy="530" r="3.5" fill="#7c3aed" opacity="0.95">
            <animate
              attributeName="opacity"
              values="0.95;0.3;0.95"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </motion.div>

      {/* Counter-rotating inner ring for more dynamic effect */}
      <motion.div
        className="absolute"
        animate={{ rotate: -360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: "750px",
          height: "750px",
          maxWidth: "125vw",
          maxHeight: "125vw",
        }}
      >
        <svg
          viewBox="0 0 750 750"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 0 25px rgba(139, 92, 246, 0.5))" }}
        >
          <defs>
            <linearGradient
              id="innerRingGradient1"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#7c3aed", stopOpacity: 0.2 }}
              />
              <stop
                offset="25%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 0.85 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
              />
              <stop
                offset="75%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 0.85 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#7c3aed", stopOpacity: 0.2 }}
              />
            </linearGradient>
            <linearGradient
              id="innerRingGradient2"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#db2777", stopOpacity: 0.2 }}
              />
              <stop
                offset="25%"
                style={{ stopColor: "#c026d3", stopOpacity: 0.75 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 0.9 }}
              />
              <stop
                offset="75%"
                style={{ stopColor: "#c026d3", stopOpacity: 0.75 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#db2777", stopOpacity: 0.2 }}
              />
            </linearGradient>
          </defs>

          {/* Outer layer */}
          <ellipse
            cx="375"
            cy="375"
            rx="320"
            ry="55"
            fill="none"
            stroke="url(#innerRingGradient1)"
            strokeWidth="4"
            opacity="0.9"
            transform="rotate(15 375 375)"
          />

          {/* Middle layer */}
          <ellipse
            cx="375"
            cy="375"
            rx="305"
            ry="48"
            fill="none"
            stroke="url(#innerRingGradient2)"
            strokeWidth="9"
            opacity="0.8"
            transform="rotate(15 375 375)"
          />

          {/* Inner layer */}
          <ellipse
            cx="375"
            cy="375"
            rx="290"
            ry="42"
            fill="none"
            stroke="url(#innerRingGradient1)"
            strokeWidth="3"
            opacity="0.85"
            transform="rotate(15 375 375)"
          />

          {/* Sparkle points on the tilted ring */}
          <g transform="rotate(15 375 375)">
            <circle cx="695" cy="375" r="3.5" fill="#06b6d4" opacity="0.95">
              <animate
                attributeName="opacity"
                values="0.95;0.3;0.95"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="55" cy="375" r="3.5" fill="#c026d3" opacity="0.95">
              <animate
                attributeName="opacity"
                values="0.95;0.3;0.95"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="375" cy="320" r="3" fill="#8b5cf6" opacity="0.9">
              <animate
                attributeName="opacity"
                values="0.9;0.25;0.9"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="375" cy="430" r="3" fill="#7c3aed" opacity="0.9">
              <animate
                attributeName="opacity"
                values="0.9;0.25;0.9"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

// Shooting Stars Component
const ShootingStars = ({
  minSpeed = 20,
  maxSpeed = 50,
  minDelay = 500,
  maxDelay = 2000,
  starColor = "#22d3ee",
  trailColor = "#a78bfa",
  starWidth = 10,
  starHeight = 1,
  className = "",
}) => {
  const [star, setStar] = useState(null);
  const svgRef = useRef(null);

  const getRandomStartPoint = () => {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;
    switch (side) {
      case 0:
        return { x: offset, y: 0, angle: 45 };
      case 1:
        return { x: window.innerWidth, y: offset, angle: 135 };
      case 2:
        return { x: offset, y: window.innerHeight, angle: 225 };
      case 3:
        return { x: 0, y: offset, angle: 315 };
      default:
        return { x: 0, y: 0, angle: 45 };
    }
  };

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const newStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      setStar(newStar);

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();
    return () => {};
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    const moveStar = () => {
      if (star) {
        setStar((prevStar) => {
          if (!prevStar) return null;
          const newX =
            prevStar.x +
            prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
          const newY =
            prevStar.y +
            prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
          const newDistance = prevStar.distance + prevStar.speed;
          const newScale = 1 + newDistance / 100;

          if (
            newX < -20 ||
            newX > window.innerWidth + 20 ||
            newY < -20 ||
            newY > window.innerHeight + 20
          ) {
            return null;
          }

          return {
            ...prevStar,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
        });
      }
    };

    const animationFrame = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animationFrame);
  }, [star]);

  return (
    <svg ref={svgRef} className={`w-full h-full absolute inset-0 ${className}`}>
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Stars Background Component
const StarsBackground = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className = "",
}) => {
  const [stars, setStars] = useState([]);
  const canvasRef = useRef(null);

  const generateStars = useCallback(
    (width, height) => {
      const area = width * height;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle =
          allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.05 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
        };
      });
    },
    [
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed,
    ]
  );

  useEffect(() => {
    const updateStars = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        setStars(generateStars(width, height));
      }
    };

    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current);
      }
    };
  }, [generateStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        if (star.twinkleSpeed !== null) {
          star.opacity =
            0.5 +
            Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full absolute inset-0 ${className}`}
    />
  );
};

// Globe Component with Multi-Color Theme
const Globe = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

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
      baseColor: [0.2, 0.3, 0.6], // Deep blue-purple base
      markerColor: [0, 0.95, 1], // Bright cyan for markers
      glowColor: [0.4, 0.6, 1.5], // Purple-blue glow
      markers: [
        { location: [37.7595, -122.4367], size: 0.04 },
        { location: [40.7128, -74.006], size: 0.08 },
        { location: [28.6139, 77.209], size: 0.07 },
        { location: [51.5074, -0.1278], size: 0.06 },
        { location: [35.6762, 139.6503], size: 0.05 },
        { location: [-33.8688, 151.2093], size: 0.04 },
        { location: [1.3521, 103.8198], size: 0.05 },
        { location: [55.7558, 37.6173], size: 0.04 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.008;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

// Main Background Component with Enhanced Multi-Color Theme
export default function Background() {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Stars Background Layer */}
      <StarsBackground
        starDensity={0.002}
        allStarsTwinkle={true}
        twinkleProbability={0.9}
        minTwinkleSpeed={0.3}
        maxTwinkleSpeed={0.8}
        className="opacity-80"
      />

      {/* Freezing Particles Layer */}
      <FreezingParticles className="opacity-60" />

      {/* Globe and Ring Layer */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Saturn Ring - positioned behind and around globe */}
        <SaturnRing className="scale-[2] md:scale-[1.7] lg:scale-[1.4] opacity-85" />

        {/* Globe */}
        <Globe className="absolute scale-[2] md:scale-[1.7] lg:scale-[1.4] opacity-65 z-10" />
      </div>

      {/* Shooting Stars Layer */}
      <ShootingStars
        minSpeed={25}
        maxSpeed={90}
        minDelay={300}
        maxDelay={700}
        starColor="#22d3ee"
        trailColor="#a78bfa"
        starWidth={20}
        starHeight={3}
      />

      {/* Multi-layered Gradient Overlays for Vibrant Multi-Color Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

      {/* Cyan to Purple gradient - top to bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/8 via-purple-500/10 to-transparent pointer-events-none" />

      {/* Purple to Pink gradient - left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/8 via-transparent to-pink-500/8 pointer-events-none" />

      {/* Radial gradient for globe highlighting - cyan center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,rgba(168,85,247,0.08)_40%,transparent_70%)] pointer-events-none" />

      {/* Additional corner accents */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-pink-500/10 to-transparent pointer-events-none blur-3xl" />
    </div>
  );
}
