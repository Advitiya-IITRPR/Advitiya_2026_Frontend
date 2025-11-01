"use client";

import React, { useEffect, useState } from "react";
import Background from "@/components/BackgroundEvent";
import { dataContext } from "@/context/dataContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import axios from "axios";
import { toast } from "sonner";
import { StarsBackground } from "@/components/StarsBackground";


const page = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true)
  const [eventList, setEventList] = useState([])


  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleFormSubmit = async (formData) => {
    if (!selectedEvent) return;

    try {
      await axios.post('/api/participant/createParticipant', formData)
        .then((response) => {
          toast.success("Registration Created Successfully");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  };


  useEffect(() => {
    setLoading(true)
    async function getEventList() {
      await axios.get("/api/events/getAllEventList")
        .then((response) => {
          setEventList(response.data.data)
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    getEventList()
  }, [])

  if (loading) {
    return (
      <main className="relative min-h-screen">
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
          <StarsBackground className="w-full h-full" showShootingStars={true} />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </main>
    );
  }

  return (
    <div className="pt-20">
      <Background />
      {/* Header Section */}
      <div className="text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-2">
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]">
              EVENTS
            </span>
          </h1>
        </motion.div>
      </div>
      {
        eventList.length > 0 ? (
          <div className="container mx-auto px-4 py-8">
            <EventCard events={eventList} onRegisterClick={handleRegisterClick} />
          </div>
        ) : (
          <h3 className="text-6xl md:text-8xl font-bold mb-2">
            <span className="bg-linear-to-r from-green-400 via-green-400 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.8)] text-center justify-center mx-auto flex">
              Coming Soon...
            </span>
          </h3>
        )
      }
      <EventRegistrationModal
        event={selectedEvent}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default page;
