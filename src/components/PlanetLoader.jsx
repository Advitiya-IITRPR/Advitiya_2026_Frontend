"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PlanetLoader({ onComplete }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    mountRef.current.appendChild(renderer.domElement);

    // Create starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
    });

    const starsVertices = [];
    for (let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Create sun with better material
    const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffa500,
      emissive: 0xffa500,
      emissiveIntensity: 1,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Sun glow layers
    for (let i = 1; i <= 3; i++) {
      const glowGeometry = new THREE.SphereGeometry(5 + i * 0.5, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa500,
        transparent: true,
        opacity: 0.15 / i,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glow);
    }

    // Strong sun light
    const sunLight = new THREE.PointLight(0xffa500, 3, 300);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Ambient light for visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Create planets with textures and better materials
    const planets = [
      { distance: 12, size: 0.8, color: 0xa0522d, speed: 0.047, name: "Mercury" },
      { distance: 18, size: 1.8, color: 0xffd700, speed: 0.035, name: "Venus" },
      { distance: 25, size: 2, color: 0x4169e1, speed: 0.029, name: "Earth" },
      { distance: 32, size: 1.2, color: 0xff4500, speed: 0.024, name: "Mars" },
      { distance: 50, size: 4.5, color: 0xdaa520, speed: 0.013, name: "Jupiter" },
      { distance: 70, size: 4, color: 0xf4a460, speed: 0.009, name: "Saturn" },
      { distance: 90, size: 3, color: 0x4fc3f7, speed: 0.006, name: "Uranus" },
      { distance: 110, size: 2.8, color: 0x1e90ff, speed: 0.005, name: "Neptune" },
    ];

    const planetMeshes = planets.map((planet, index) => {
      // Create planet with better material
      const geometry = new THREE.SphereGeometry(planet.size, 64, 64);
      const material = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.8,
        metalness: 0.2,
        emissive: planet.color,
        emissiveIntensity: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Create orbit ring
      const orbitGeometry = new THREE.RingGeometry(
        planet.distance - 0.1,
        planet.distance + 0.1,
        128
      );
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x555555,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      scene.add(mesh);
      
      // Start planets at different positions
      const startAngle = (index * Math.PI * 2) / planets.length;
      return { 
        mesh, 
        ...planet, 
        angle: startAngle,
        startAngle: 0,
        targetAngle: 0
      };
    });

    // Position camera for better view
    camera.position.set(0, 80, 120);
    camera.lookAt(0, 0, 0);

    let alignmentProgress = 0;
    const alignmentDuration = 240; // frames to align (increased for smoother motion)
    let isAligning = false;
    let alignStartTime = 90; // Start alignment after initial orbit viewing

    // Animation
    let frameCount = 0;
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frameCount++;

      // Rotate sun
      sun.rotation.y += 0.002;

      // Rotate starfield slowly
      starField.rotation.y += 0.0002;

      // Start alignment sequence
      if (frameCount === alignStartTime && !isAligning) {
        isAligning = true;
        // Store starting angles for interpolation
        planetMeshes.forEach((planet) => {
          planet.startAngle = planet.angle;
          // Target angle aligns all planets to the right (0 radians)
          planet.targetAngle = Math.PI * 2; // Full circle to align at 0
        });
      }

      // Move planets with smooth transitions
      planetMeshes.forEach((planet) => {
        if (isAligning && alignmentProgress < 1) {
          // Smooth ease-in-out interpolation
          const t = alignmentProgress;
          const easeProgress = t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2; // Cubic ease-in-out
          
          // Interpolate between start and target angle
          const angleDiff = planet.targetAngle - planet.startAngle;
          planet.angle = planet.startAngle + angleDiff * easeProgress;
        } else if (!isAligning) {
          // Normal orbit before alignment
          planet.angle += planet.speed;
        }
        
        // Update position
        planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
        planet.mesh.rotation.y += 0.01;
      });

      // Update alignment progress with smooth increment
      if (isAligning && alignmentProgress < 1) {
        alignmentProgress += 1 / alignmentDuration;
        
        // When alignment is complete
        if (alignmentProgress >= 1) {
          alignmentProgress = 1; // Clamp to 1
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
        }
      }

      renderer.render(scene, camera);
    };

    animate();


    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}