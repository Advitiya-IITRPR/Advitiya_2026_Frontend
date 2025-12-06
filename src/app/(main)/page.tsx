"use client";


import Hero from "@/components/Hero";
import OurTeam from "@/components/sponsors"
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";
import Teaser from "@/components/Teaser";
import Highlights from "@/components/Highlights";
import Background from "@/components/Background";


export default function Home() {
  return (
    <main className="relative min-h-screen">

      {/* Navigation */}
      
      <Background />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <Teaser />
        <EventsSection />
        <OurTeam />

        <Highlights />
      </div>
    </main>
  );
}
