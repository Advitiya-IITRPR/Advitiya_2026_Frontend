"use client";
import React, { useContext } from "react";
import ContactCard from "@/components/contactCard";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import { dataContext } from "@/context/dataContext";

const ourTeam = () => {
  const { OCs, teamMembers } = useContext(dataContext);

  return (
    <main className="relative min-h-screen">
      <Background />
      <div className="relative z-10">
        <div className="container mx-auto py-8 min-h-screen pt-24">
          {/* Header Section */}
          <div className="text-center flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-2"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-2">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]">
                  MEET OUR TEAM
                </span>
              </h1>
            </motion.div>
          </div>
          <div className="flex justify-around">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 justify-items-center items-center">
              {OCs.map((member, index) => (
                <ContactCard key={index} member={member} isOC={true} />
              ))}
            </div>
          </div>
          <div className="flex justify-around">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 items-center justify-center auto-rows-max">
              {teamMembers.map((member, index) => (
                <ContactCard key={index} member={member} isOC={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ourTeam;
