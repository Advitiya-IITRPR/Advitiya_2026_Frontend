"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground as StarsBackgroundUI } from "@/components/ui/stars-background";

export function StarsBackground({
  children="",
  className = "",
  showShootingStars = true,
}) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Stars background layer */}
      <StarsBackgroundUI
        starDensity={0.0005}
        allStarsTwinkle={true}
        minTwinkleSpeed={0.3}
        maxTwinkleSpeed={0.8}
        className="absolute inset-0 z-0 brightness-125 contrast-125"
      />

      {/* Optional shooting stars */}
      {showShootingStars && (
        <ShootingStars
          minSpeed={10}
          maxSpeed={20}
          minDelay={1000}
          maxDelay={4000}
          starWidth={14}
          starHeight={2}
          trailColor="#00C8FF"
          starColor="#D400FF"
          className="opacity-90 drop-shadow-[0_0_4px_#00C8FF]absolute inset-0 z-0"
        />
      )}

      {/* Content layer */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
