"use client";

import dynamic from "next/dynamic";
import NavigationBar from "@/components/NavigationBar";
import Hero from "@/components/Hero";
import OurTeam from "@/components/OurTeam"
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
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
