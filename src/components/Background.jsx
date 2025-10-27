// "use client";

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import createGlobe from "cobe";

// // Shooting Stars Component
// const ShootingStars = ({
//   minSpeed = 20,
//   maxSpeed = 50,
//   minDelay = 500,
//   maxDelay = 2000,
//   starColor = "#22d3ee",
//   trailColor = "#a78bfa",
//   starWidth = 10,
//   starHeight = 1,
//   className = "",
// }) => {
//   const [star, setStar] = useState(null);
//   const svgRef = useRef(null);

//   const getRandomStartPoint = () => {
//     const side = Math.floor(Math.random() * 4);
//     const offset = Math.random() * window.innerWidth;
//     switch (side) {
//       case 0:
//         return { x: offset, y: 0, angle: 45 };
//       case 1:
//         return { x: window.innerWidth, y: offset, angle: 135 };
//       case 2:
//         return { x: offset, y: window.innerHeight, angle: 225 };
//       case 3:
//         return { x: 0, y: offset, angle: 315 };
//       default:
//         return { x: 0, y: 0, angle: 45 };
//     }
//   };

//   useEffect(() => {
//     const createStar = () => {
//       const { x, y, angle } = getRandomStartPoint();
//       const newStar = {
//         id: Date.now(),
//         x,
//         y,
//         angle,
//         scale: 1,
//         speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
//         distance: 0,
//       };
//       setStar(newStar);

//       const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
//       setTimeout(createStar, randomDelay);
//     };

//     createStar();
//     return () => {};
//   }, [minSpeed, maxSpeed, minDelay, maxDelay]);

//   useEffect(() => {
//     const moveStar = () => {
//       if (star) {
//         setStar((prevStar) => {
//           if (!prevStar) return null;
//           const newX =
//             prevStar.x +
//             prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
//           const newY =
//             prevStar.y +
//             prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
//           const newDistance = prevStar.distance + prevStar.speed;
//           const newScale = 1 + newDistance / 100;

//           if (
//             newX < -20 ||
//             newX > window.innerWidth + 20 ||
//             newY < -20 ||
//             newY > window.innerHeight + 20
//           ) {
//             return null;
//           }

//           return {
//             ...prevStar,
//             x: newX,
//             y: newY,
//             distance: newDistance,
//             scale: newScale,
//           };
//         });
//       }
//     };

//     const animationFrame = requestAnimationFrame(moveStar);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [star]);

//   return (
//     <svg ref={svgRef} className={`w-full h-full absolute inset-0 ${className}`}>
//       {star && (
//         <rect
//           key={star.id}
//           x={star.x}
//           y={star.y}
//           width={starWidth * star.scale}
//           height={starHeight}
//           fill="url(#gradient)"
//           transform={`rotate(${star.angle}, ${
//             star.x + (starWidth * star.scale) / 2
//           }, ${star.y + starHeight / 2})`}
//         />
//       )}
//       <defs>
//         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
//           <stop
//             offset="100%"
//             style={{ stopColor: starColor, stopOpacity: 1 }}
//           />
//         </linearGradient>
//       </defs>
//     </svg>
//   );
// };

// // Stars Background Component
// const StarsBackground = ({
//   starDensity = 0.00015,
//   allStarsTwinkle = true,
//   twinkleProbability = 0.7,
//   minTwinkleSpeed = 0.5,
//   maxTwinkleSpeed = 1,
//   className = "",
// }) => {
//   const [stars, setStars] = useState([]);
//   const canvasRef = useRef(null);

//   const generateStars = useCallback(
//     (width, height) => {
//       const area = width * height;
//       const numStars = Math.floor(area * starDensity);
//       return Array.from({ length: numStars }, () => {
//         const shouldTwinkle =
//           allStarsTwinkle || Math.random() < twinkleProbability;
//         return {
//           x: Math.random() * width,
//           y: Math.random() * height,
//           radius: Math.random() * 0.05 + 0.5,
//           opacity: Math.random() * 0.5 + 0.5,
//           twinkleSpeed: shouldTwinkle
//             ? minTwinkleSpeed +
//               Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
//             : null,
//         };
//       });
//     },
//     [
//       starDensity,
//       allStarsTwinkle,
//       twinkleProbability,
//       minTwinkleSpeed,
//       maxTwinkleSpeed,
//     ]
//   );

//   useEffect(() => {
//     const updateStars = () => {
//       if (canvasRef.current) {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         const { width, height } = canvas.getBoundingClientRect();
//         canvas.width = width;
//         canvas.height = height;
//         setStars(generateStars(width, height));
//       }
//     };

//     updateStars();

//     const resizeObserver = new ResizeObserver(updateStars);
//     if (canvasRef.current) {
//       resizeObserver.observe(canvasRef.current);
//     }

//     return () => {
//       if (canvasRef.current) {
//         resizeObserver.unobserve(canvasRef.current);
//       }
//     };
//   }, [generateStars]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animationFrameId;

//     const render = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       stars.forEach((star) => {
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
//         ctx.fill();

//         if (star.twinkleSpeed !== null) {
//           star.opacity =
//             0.5 +
//             Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
//         }
//       });

//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [stars]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className={`h-full w-full absolute inset-0 ${className}`}
//     />
//   );
// };

// // Globe Component
// const Globe = ({ className = "" }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     let phi = 0;

//     if (!canvasRef.current) return;

//     const globe = createGlobe(canvasRef.current, {
//       devicePixelRatio: 2,
//       width: 600 * 2,
//       height: 600 * 2,
//       phi: 0,
//       theta: 0,
//       dark: 1,
//       diffuse: 2.5,
//       mapSamples: 20000,
//       mapBrightness: 10,
//       baseColor: [0.4, 0.4, 0.4],
//       markerColor: [0.2, 0.9, 1],
//       glowColor: [1.5, 1.5, 1.5],
//       markers: [
//         { location: [37.7595, -122.4367], size: 0.03 },
//         { location: [40.7128, -74.006], size: 0.1 },
//       ],
//       onRender: (state) => {
//         state.phi = phi;
//         phi += 0.01;
//       },
//     });

//     return () => {
//       globe.destroy();
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
//       className={className}
//     />
//   );
// };

// // Main Background Component
// export default function Background() {
//   return (
//     <div className="fixed inset-0 z-0 bg-black">
//       {/* Stars Background Layer */}
//       <StarsBackground
//         starDensity={0.002}
//         allStarsTwinkle={true}
//         twinkleProbability={0.9}
//         minTwinkleSpeed={0.3}
//         maxTwinkleSpeed={0.8}
//         className="opacity-80"
//       />

//       {/* Globe Layer */}
//       <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
//         <Globe className="absolute scale-[2] md:scale-[1.7] lg:scale-[1.4] opacity-50" />
//       </div>

//       {/* Shooting Stars Layer */}
//       <ShootingStars
//         minSpeed={25}
//         maxSpeed={90}
//         minDelay={300}
//         maxDelay={700}
//         starColor="#22d3ee"
//         trailColor="#a78bfa"
//         starWidth={20}
//         starHeight={3}
//       />

//       {/* Gradient Overlays for depth */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
//       <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
//     </div>
//   );
// }

//-> 2222222222222

// "use client";

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import createGlobe from "cobe";

// // Shooting Stars Component
// const ShootingStars = ({
//   minSpeed = 20,
//   maxSpeed = 50,
//   minDelay = 500,
//   maxDelay = 2000,
//   starColor = "#22d3ee",
//   trailColor = "#a78bfa",
//   starWidth = 10,
//   starHeight = 1,
//   className = "",
// }) => {
//   const [star, setStar] = useState(null);
//   const svgRef = useRef(null);

//   const getRandomStartPoint = () => {
//     const side = Math.floor(Math.random() * 4);
//     const offset = Math.random() * window.innerWidth;
//     switch (side) {
//       case 0:
//         return { x: offset, y: 0, angle: 45 };
//       case 1:
//         return { x: window.innerWidth, y: offset, angle: 135 };
//       case 2:
//         return { x: offset, y: window.innerHeight, angle: 225 };
//       case 3:
//         return { x: 0, y: offset, angle: 315 };
//       default:
//         return { x: 0, y: 0, angle: 45 };
//     }
//   };

//   useEffect(() => {
//     const createStar = () => {
//       const { x, y, angle } = getRandomStartPoint();
//       const newStar = {
//         id: Date.now(),
//         x,
//         y,
//         angle,
//         scale: 1,
//         speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
//         distance: 0,
//       };
//       setStar(newStar);

//       const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
//       setTimeout(createStar, randomDelay);
//     };

//     createStar();
//     return () => {};
//   }, [minSpeed, maxSpeed, minDelay, maxDelay]);

//   useEffect(() => {
//     const moveStar = () => {
//       if (star) {
//         setStar((prevStar) => {
//           if (!prevStar) return null;
//           const newX =
//             prevStar.x +
//             prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
//           const newY =
//             prevStar.y +
//             prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
//           const newDistance = prevStar.distance + prevStar.speed;
//           const newScale = 1 + newDistance / 100;

//           if (
//             newX < -20 ||
//             newX > window.innerWidth + 20 ||
//             newY < -20 ||
//             newY > window.innerHeight + 20
//           ) {
//             return null;
//           }

//           return {
//             ...prevStar,
//             x: newX,
//             y: newY,
//             distance: newDistance,
//             scale: newScale,
//           };
//         });
//       }
//     };

//     const animationFrame = requestAnimationFrame(moveStar);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [star]);

//   return (
//     <svg ref={svgRef} className={`w-full h-full absolute inset-0 ${className}`}>
//       {star && (
//         <rect
//           key={star.id}
//           x={star.x}
//           y={star.y}
//           width={starWidth * star.scale}
//           height={starHeight}
//           fill="url(#gradient)"
//           transform={`rotate(${star.angle}, ${
//             star.x + (starWidth * star.scale) / 2
//           }, ${star.y + starHeight / 2})`}
//         />
//       )}
//       <defs>
//         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
//           <stop
//             offset="100%"
//             style={{ stopColor: starColor, stopOpacity: 1 }}
//           />
//         </linearGradient>
//       </defs>
//     </svg>
//   );
// };

// // Stars Background Component
// const StarsBackground = ({
//   starDensity = 0.00015,
//   allStarsTwinkle = true,
//   twinkleProbability = 0.7,
//   minTwinkleSpeed = 0.5,
//   maxTwinkleSpeed = 1,
//   className = "",
// }) => {
//   const [stars, setStars] = useState([]);
//   const canvasRef = useRef(null);

//   const generateStars = useCallback(
//     (width, height) => {
//       const area = width * height;
//       const numStars = Math.floor(area * starDensity);
//       return Array.from({ length: numStars }, () => {
//         const shouldTwinkle =
//           allStarsTwinkle || Math.random() < twinkleProbability;
//         return {
//           x: Math.random() * width,
//           y: Math.random() * height,
//           radius: Math.random() * 0.05 + 0.5,
//           opacity: Math.random() * 0.5 + 0.5,
//           twinkleSpeed: shouldTwinkle
//             ? minTwinkleSpeed +
//               Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
//             : null,
//         };
//       });
//     },
//     [
//       starDensity,
//       allStarsTwinkle,
//       twinkleProbability,
//       minTwinkleSpeed,
//       maxTwinkleSpeed,
//     ]
//   );

//   useEffect(() => {
//     const updateStars = () => {
//       if (canvasRef.current) {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         const { width, height } = canvas.getBoundingClientRect();
//         canvas.width = width;
//         canvas.height = height;
//         setStars(generateStars(width, height));
//       }
//     };

//     updateStars();

//     const resizeObserver = new ResizeObserver(updateStars);
//     if (canvasRef.current) {
//       resizeObserver.observe(canvasRef.current);
//     }

//     return () => {
//       if (canvasRef.current) {
//         resizeObserver.unobserve(canvasRef.current);
//       }
//     };
//   }, [generateStars]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animationFrameId;

//     const render = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       stars.forEach((star) => {
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
//         ctx.fill();

//         if (star.twinkleSpeed !== null) {
//           star.opacity =
//             0.5 +
//             Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
//         }
//       });

//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [stars]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className={`h-full w-full absolute inset-0 ${className}`}
//     />
//   );
// };

// // Globe Component with Multi-Color Theme
// const Globe = ({ className = "" }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     let phi = 0;

//     if (!canvasRef.current) return;

//     const globe = createGlobe(canvasRef.current, {
//       devicePixelRatio: 2,
//       width: 600 * 2,
//       height: 600 * 2,
//       phi: 0,
//       theta: 0,
//       dark: 1,
//       diffuse: 3.2,
//       mapSamples: 25000,
//       mapBrightness: 7,
//       baseColor: [0.2, 0.3, 0.6], // Deep blue-purple base
//       markerColor: [0, 0.95, 1], // Bright cyan for markers
//       glowColor: [0.4, 0.6, 1.5], // Purple-blue glow
//       markers: [
//         { location: [37.7595, -122.4367], size: 0.04 },
//         { location: [40.7128, -74.006], size: 0.08 },
//         { location: [28.6139, 77.209], size: 0.07 },
//         { location: [51.5074, -0.1278], size: 0.06 },
//         { location: [35.6762, 139.6503], size: 0.05 },
//         { location: [-33.8688, 151.2093], size: 0.04 },
//         { location: [1.3521, 103.8198], size: 0.05 },
//         { location: [55.7558, 37.6173], size: 0.04 },
//       ],
//       onRender: (state) => {
//         state.phi = phi;
//         phi += 0.008;
//       },
//     });

//     return () => {
//       globe.destroy();
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
//       className={className}
//     />
//   );
// };

// // Main Background Component with Enhanced Multi-Color Theme
// export default function Background() {
//   return (
//     <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black">
//       {/* Stars Background Layer */}
//       <StarsBackground
//         starDensity={0.002}
//         allStarsTwinkle={true}
//         twinkleProbability={0.9}
//         minTwinkleSpeed={0.3}
//         maxTwinkleSpeed={0.8}
//         className="opacity-80"
//       />

//       {/* Globe Layer */}
//       <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
//         <Globe className="absolute scale-[2] md:scale-[1.7] lg:scale-[1.4] opacity-65" />
//       </div>

//       {/* Shooting Stars Layer */}
//       <ShootingStars
//         minSpeed={25}
//         maxSpeed={90}
//         minDelay={300}
//         maxDelay={700}
//         starColor="#22d3ee"
//         trailColor="#a78bfa"
//         starWidth={20}
//         starHeight={3}
//       />

//       {/* Multi-layered Gradient Overlays for Vibrant Multi-Color Effect */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

//       {/* Cyan to Purple gradient - top to bottom */}
//       <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/8 via-purple-500/10 to-transparent pointer-events-none" />

//       {/* Purple to Pink gradient - left to right */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/8 via-transparent to-pink-500/8 pointer-events-none" />

//       {/* Radial gradient for globe highlighting - cyan center */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,rgba(168,85,247,0.08)_40%,transparent_70%)] pointer-events-none" />

//       {/* Additional corner accents */}
//       <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none blur-3xl" />
//       <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-pink-500/10 to-transparent pointer-events-none blur-3xl" />
//     </div>
//   );
// }

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
