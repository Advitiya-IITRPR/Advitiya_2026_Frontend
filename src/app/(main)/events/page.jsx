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

const eventList = [
  {
    clubName: "Aeromodelling Club",
    events: [
      {
        id: 1,
        eventName: "Flight fury - FPV drone racing",
        eventImage: "https://drive.google.com/uc?export=view&id=1Oh74Y1xaUNCkVrgMpCo44dxQ92dHgwE3",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Event:

Build and pilot an FPV drone capable of navigating a dynamic race track at high speed.
The drone must fly through gates, loops, and sharp turns without collisions.
The path includes pillars and loops (85 cm diameter) arranged in a random sequence.
Loops are positioned at varying heights and distances, requiring precise navigation.
The drone must fit strictly within a 45cm x 45cm x 45cm volume limit.
Batteries must be between 3S and 6S.
Propellers must be between 3 inches and 6 inches.
Rules:

Each team is given a specific slot and a maximum flight time of 10 minutes to complete the circuit.
A mandatory technical inspection (Dimension, Equipment, and Safety) is required before entry.
Touching or missing obstacles will result in penalty time.
Flying in the no-fly zone (outside the arena) will result in disqualification.
Sharing drones between teams is strictly prohibited.
Net Time = Total time taken + penalty time.
The team with the lowest net time wins.
Pilots must carry their own battery chargers and at least 2 batteries.`,
        registrationLink: "https://unstop.com/events/flight-fury-advitiya26-indian-institute-of-technology-iit-ropar-1619505",
        minSize: 3,
        maxSize: 4,
        eventRuleBook: "https://drive.google.com/file/d/1PJvKJorVJ13O7u-ABc0TYp_qKRifbUUV/view"
      },
    ]
  },
//   {
//     clubName: "Automotive Club",
//     events: [
//       {
//         id: 1,
//         eventName: "Full Throttle",
//         eventImage: "",
//         isRegistrationOpen: true,
//         eventDate: "06/02/2026",
//         eventTime: "03:00 PM",
//         description: `Full Throttle, the ultimate showdown of power, precision, and performance in the world of RC ATV racing! This high-octane event brings together enthusiasts, innovators, and thrill-seekers to test their skills and push the limits of their remote-controlled vehicles.

// In this action-packed competition, participants will navigate their RC ATVs through challenging terrains, obstacle-filled tracks, and adrenaline-pumping straightaways. From sharp turns to rugged climbs, every second counts as racers battle for supremacy, showcasing their vehicle’s engineering excellence and their own mastery of the controls.

// Track Information:

// This will be a racing tournament where cars from different teams will compete with each other to win.
// Cars should not leave loose parts on the track. Any team found doing so will be penalized .
// Teams starting before the whistle or the referee’s signal will receive a penalty.
// If any team is found damaging another team’s vehicle, it will be penalized.`,
//         registrationLink: "https://unstop.com/competitions/full-throttle-advitiya26-indian-institute-of-technology-iit-ropar-1618954",
//         minSize: 2,
//         maxSize: 4,
//         eventRuleBook: "https://drive.google.com/file/d/1KsuuOLEG9F67kvLYtqWVBgpC9FO30BuN/view"
//       },
//       {
//         id: 2,
//         eventName: "Gripbot Gauntlet",
//         eventImage: "",
//         isRegistrationOpen: true,
//         eventDate: "06/02/2026",
//         eventTime: "03:00 PM",
//         description: `GripBot Gauntlet is a flagship robotics competition organized as part of ADVITIYA – IIT Ropar’s Techfest 2026. This event challenges participants to design, build, and operate a manually controlled gripping robot capable of completing a demanding arena course by performing object-handling tasks with precision and control. The competition is designed to test participants’ mechanical design skills, control strategies, and real-time decision-making under competitive conditions .

// Event Overview:

// Participants must build a manually controlled bot that can grip objects and place them into designated target zones while navigating through an arena filled with hurdles. The objective is to successfully complete the route by overcoming obstacles and executing tasks accurately.

// Venue: IIT Ropar
// Mode: Offline
// Entry Fee: Free
// This tournament is conducted exclusively as an offline event at IIT Ropar. There are no online qualifiers. All rounds, from the qualifying stages to the finals, will be held on campus during ADVITIYA .

// Team Specifications:

// A team may consist of a maximum of 4 members.
// Team members may belong to different educational institutes.
// During gameplay, only 2 members from each team are allowed inside the arena.
// Registration Rules:

// GripBot Gauntlet is an offline, team-based event conducted at the IIT Ropar Main Campus during ADVITIYA.
// All participating teams must register online through the official ADVITIYA website prior to the event .
// Bot Specifications:

// The bot’s dimensions must be less than or equal to 300 mm × 200 mm × 300 mm (L × B × H).
// This size constraint excludes the gripper but includes the tires.
// A tolerance of ±5% is permitted.
// If the bot exceeds these dimensions, the team will be disqualified.
// The bot may extend its dimensions after the run starts.
// The bot must be manually controlled at all times.
// Control Mechanism:

// Both wired and wireless control mechanisms are allowed.
// For wired bots, the wire must be at least 3 meters long and must remain slack during operation.
// For wireless bots, only dual-frequency remote, Bluetooth, or Wi-Fi control is permitted.
// The dimensions of the remote are not included in the bot size constraints.
// Only one person is allowed to control the bot.
// Construction Rules:

// Use of ready-made LEGO components or ready-made gripping mechanisms is strictly prohibited.
// Use of ready-made gear assemblies is allowed.
// The bot must have an onboard power supply.
// Failure to comply with any of the above specifications will result in immediate disqualification
// Power Supply Rules:

// The power source must be onboard and can be either electric or non-electric.
// The power supply must be non-polluting and comply with all safety constraints specified by the organizers.
// If a non-electric power source is used, prior approval from the organizers via email is mandatory.
// The organizers are not responsible for inconvenience if approval is not obtained.
// For electric power supplies, the voltage between any two points must be ≤ 24V DC at all times during the run.
// AC power supply will not be provided and is strictly prohibited during the competition .
// Arena Description:

// The arena has outer dimensions of 3000 mm × 3000 mm (L × B).
// The course is designed to test bot agility, control, and task execution through complex obstacles and precision-based challenges.
// Arena Elements:

// Cuboidal Blocks (2):
// Material: Thermocol or equivalent
// Dimensions: 120 mm × 120 mm × 120 mm
// Cylindrical Blocks (2):
// Material: Thermocol or equivalent
// Height: 100 mm
// Diameter: 100 mm .
// Fair Play and Conduct:

// All participants must maintain sportsman-like behavior.
// Abusive language, threatening behavior, or intentional disruption is strictly prohibited.
// The organizing team reserves the right to issue warnings, deduct points, or disqualify teams.
// The organizing team’s decision will be final and binding.
// Details regarding penalties will be disclosed during gameplay .
// Prizes:

// The total prize pool for GripBot Gauntlet 2026 is ₹25,000, awarded as cash prizes:

// First Prize: ₹12,000
// Second Prize: ₹8,000
// Third Prize: ₹5,000 .`,
//         registrationLink: "https://unstop.com/competitions/gripbot-gauntlet-advitiya26-indian-institute-of-technology-iit-ropar-1620114",
//         minSize: 2,
//         maxSize: 4,
//         eventRuleBook: "https://drive.google.com/file/d/14U_5pD7a-dY5T0hRe06QRb87rPXGUFK6/view"
//       },
//     ]
//   },
//   {
//     clubName: "CIM",
//     events: [
//       {
//         id: 1,
//         eventName: "CADvergence",
//         eventImage: "",
//         isRegistrationOpen: true,
//         eventDate: "06/02/2026",
//         eventTime: "03:00 PM",
//         description: `Guidelines:
// Open to all undergraduate and postgraduate students.
// Participants from different colleges are allowed (inter-college participation is allowed).
// Inter-specialization team members are allowed.
// Each participant can be part of only one team.
// Team Details:

// Team size: 1–2 members.

// Event Format:

// The event consists of a single round.
// Participants will be provided with one design problem statement on the spot.
// The problem statement will include functional requirements, constraints, and expected outputs.
// Participants must model the design using SolidWorks (or organiser-designated CAD software).
// All modelling must be done during the event duration; pre-made models are not allowed.
// Final CAD files must be submitted before the time limit ends.
// Rules:

// Participants must strictly follow all rules, instructions, and time limits provided by the organisers.
// Any form of plagiarism, copying others’ files, or sharing work between teams will result in immediate disqualification.
// Participants must ensure their systems and software are working properly before the event begins.
// Misbehaviour or disturbance during the competition will lead to disqualification.
// Late or incomplete submissions may be penalised or rejected.
// Judges’ decisions will be final and non-negotiable.
// `,
//         registrationLink: "https://unstop.com/events/cadvergence-advitiya26-indian-institute-of-technology-iit-ropar-1619475",
//         minSize: 1,
//         maxSize: 2,
//         eventRuleBook: "https://drive.google.com/file/d/10S5hTxGeOSQjW5UYmSih5IG7H7hspty2/view"
//       },
//       {
//         id: 2,
//         eventName: "Cyber Forge",
//         eventImage: "",
//         isRegistrationOpen: true,
//         eventDate: "06/02/2026",
//         eventTime: "03:00 PM",
//         description: "This is the event we have created",
//         registrationLink: "https://advitiya-2025.vercel.app/",
//         minSize: 1,
//         maxSize: 4,
//         eventRuleBook: "https://drive.google.com/file/d/1PJvKJorVJ13O7u-ABc0TYp_qKRifbUUV/view"
//       },
//     ]
//   },
  // {
  //   clubName: "Coding Club",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "COD-COM",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "Codehunt",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 3,
  //       eventName: "Algo -Unlock",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 4,
  //       eventName: "CODECHEF",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "ESportZ ",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Treasure Hunt",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "BGMI",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 4,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 3,
  //       eventName: "Clash Royale ",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 1,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "ESportZ ",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Treasure Hunt",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "BGMI",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 4,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 3,
  //       eventName: "Clash Royale ",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 1,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "FinCOM",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Case Study",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "Trader's Arena",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 4,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Monochrome",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "CineCanvas",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 2,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "Colour pallette ",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 1,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Robotics Club",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Robosoccer",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "Fastest line follower",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Softcom",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Hackathon",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 3,
  //       maxSize: 5,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "GameJam",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Zenith",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Beyond Zenith- An E class model rocketry competition",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 4,
  //       maxSize: 6,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "Cosmoquest- A story based quiz competition with questions related to Astronomy and Astrophysics",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 3,
  //       maxSize: 5,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Iota Cluster",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "PromptForge ",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Chemical Engineering ",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Process Wars- Teams engineer solutions and then clash head to head to justify why their process is the smartest and most scalable  ",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Civil Engineering ",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "The Bridge Off",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "Blueprint battle",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 4,
  //       maxSize: 6,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Electrical Engineering",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Circuit Chase",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 2,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Mathematics and Computing",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Maths Arena",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "CSE",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "AI Fusion",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 4,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //     {
  //       id: 2,
  //       eventName: "AI Magination",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 3,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Mechanical",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "CoasterX",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 2,
  //       maxSize: 4,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  // {
  //   clubName: "Meta",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "Materialize: A materials related quiz based on a short film which will be shown.",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 1,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
  //   {
  //   clubName: "Enigma",
  //   events: [
  //     {
  //       id: 1,
  //       eventName: "SBT Quiz: sci biz tech quiz",
  //       eventImage: "",
  //       isRegistrationOpen: true,
  //       eventDate: "06/02/2026",
  //       eventTime: "03:00 PM",
  //       description: "This is the event we have created",
  //       registrationLink: "https://advitiya-2025.vercel.app/",
  //       minSize: 1,
  //       maxSize: 3,
  //       eventRuleBook: ""
  //     },
  //   ]
  // },
]


const page = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);


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


  // if (loading) {
  //   return (
  //     <main className="relative min-h-screen">
  //       <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
  //         <StarsBackground className="w-full h-full" showShootingStars={true} />
  //       </div>
  //       <div className="relative z-10 min-h-screen flex items-center justify-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div className="pt-20">
      <Background />
      {/* Header Section */}
      <div className="text-center flex flex-col items-center justify-center mt-20">
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
        eventList.length > 0 ? eventList.map((event) => (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-white font-bold relative text-center text-3xl p-4">{event.clubName}</h1>
            <EventCard events={event.events} />
          </div>
        )) : (
          <h3 className="text-6xl md:text-7xl font-bold mb-6 py-10">
            <span className="bg-linear-to-r from-green-400 via-green-400 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.8)] text-center justify-center mx-auto flex">
              Coming Soon...
            </span>
          </h3>
        )
      }
      {/* <EventRegistrationModal
        event={selectedEvent}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      /> */}
    </div>
  );
};

export default page;
