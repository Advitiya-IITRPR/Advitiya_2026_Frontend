"use client";
import React, { useContext } from "react";
import ContactCard from "@/components/contactCard";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import { dataContext } from "@/context/dataContext";

const ourTeam = () => {
  const { OCs, teamMembers } = useContext(dataContext);

  // Group team members by their team/department
  const groupedTeamMembers = teamMembers.reduce((acc, member) => {
      const team = member.team || "Other";
    if (!acc[team]) {
      acc[team] = [];
    }
    acc[team].push(member);
    return acc;
  }, {});

  // Sort team names alphabetically
  const sortedTeamNames = Object.keys(groupedTeamMembers).sort();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="relative min-h-screen">
      <Background />
      <div className="relative z-10">
        <div className="container mx-auto py-8 min-h-screen pt-24 px-4">
          {/* Header Section */}
          <div className="text-center flex flex-col items-center justify-center mb-16">
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

          {/* Organizing Committee Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <motion.div
              className="relative inline-block mb-10 mx-auto w-full text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold inline-block relative">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                  Organizing Committee
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </h2>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center items-center max-w-4xl">
                {OCs.map((member, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      z: 50,
                      transition: { duration: 0.3 }
                    }}
                    className="w-full"
                  >
                    <ContactCard member={member} isOC={true} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Team Sections */}
          {sortedTeamNames.map((teamName, idx) => (
            <motion.div
              key={teamName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="mb-20"
            >
              <motion.div
                className="relative inline-block mb-10 mx-auto w-full text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold inline-block relative">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]">
                    {teamName}
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </h2>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex justify-center"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
                  {groupedTeamMembers[teamName].map((member, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.08,
                        rotateY: 5,
                        z: 50,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full"
                    >
                      <ContactCard member={member} isOC={false} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ourTeam;