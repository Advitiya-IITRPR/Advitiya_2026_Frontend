import AboutSection from '@/components/AboutSection'
import AdminNavbar from '@/components/adminNavBar'
import EventsSection from '@/components/EventsSection'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Highlights from '@/components/Highlights'
import Teaser from '@/components/Teaser'
import React from 'react'

export default function AdminHomePage() {
  return (

    <div className="text-black dark:text-white">
      <AdminNavbar />
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <Teaser />
        <EventsSection />
        <Highlights />
      </div>
      <Footer />
    </div>
  )
}