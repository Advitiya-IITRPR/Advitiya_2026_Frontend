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
        eventImage:
          "https://drive.google.com/uc?export=view&id=1Oh74Y1xaUNCkVrgMpCo44dxQ92dHgwE3",
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
        registrationLink:
          "https://unstop.com/events/flight-fury-advitiya26-indian-institute-of-technology-iit-ropar-1619505",
        minSize: 3,
        maxSize: 4,
        eventRuleBook:
          "https://drive.google.com/file/d/1PJvKJorVJ13O7u-ABc0TYp_qKRifbUUV/view",
      },
    ],
  },
  {
    clubName: "Automotive Club",
    events: [
      {
        id: 1,
        eventName: "Full Throttle",
        eventImage:
          "https://drive.google.com/uc?export=view&id=13K2kKnj8EquCkZD8c-qGxJYl2nEC1gJq",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Full Throttle, the ultimate showdown of power, precision, and performance in the world of RC ATV racing! This high-octane event brings together enthusiasts, innovators, and thrill-seekers to test their skills and push the limits of their remote-controlled vehicles.

In this action-packed competition, participants will navigate their RC ATVs through challenging terrains, obstacle-filled tracks, and adrenaline-pumping straightaways. From sharp turns to rugged climbs, every second counts as racers battle for supremacy, showcasing their vehicle’s engineering excellence and their own mastery of the controls.

Track Information:

This will be a racing tournament where cars from different teams will compete with each other to win.
Cars should not leave loose parts on the track. Any team found doing so will be penalized .
Teams starting before the whistle or the referee’s signal will receive a penalty.
If any team is found damaging another team’s vehicle, it will be penalized.`,
        registrationLink:
          "https://unstop.com/competitions/full-throttle-advitiya26-indian-institute-of-technology-iit-ropar-1618954",
        minSize: 2,
        maxSize: 4,
        eventRuleBook:
          "https://drive.google.com/file/d/1KsuuOLEG9F67kvLYtqWVBgpC9FO30BuN/view",
      },
      {
        id: 2,
        eventName: "Gripbot Gauntlet",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `GripBot Gauntlet is a flagship robotics competition organized as part of ADVITIYA – IIT Ropar’s Techfest 2026. This event challenges participants to design, build, and operate a manually controlled gripping robot capable of completing a demanding arena course by performing object-handling tasks with precision and control. The competition is designed to test participants’ mechanical design skills, control strategies, and real-time decision-making under competitive conditions .

Event Overview:

Participants must build a manually controlled bot that can grip objects and place them into designated target zones while navigating through an arena filled with hurdles. The objective is to successfully complete the route by overcoming obstacles and executing tasks accurately.

Venue: IIT Ropar
Mode: Offline
Entry Fee: Free
This tournament is conducted exclusively as an offline event at IIT Ropar. There are no online qualifiers. All rounds, from the qualifying stages to the finals, will be held on campus during ADVITIYA .

Team Specifications:

A team may consist of a maximum of 4 members.
Team members may belong to different educational institutes.
During gameplay, only 2 members from each team are allowed inside the arena.
Registration Rules:

GripBot Gauntlet is an offline, team-based event conducted at the IIT Ropar Main Campus during ADVITIYA.
All participating teams must register online through the official ADVITIYA website prior to the event .
Bot Specifications:

The bot’s dimensions must be less than or equal to 300 mm × 200 mm × 300 mm (L × B × H).
This size constraint excludes the gripper but includes the tires.
A tolerance of ±5% is permitted.
If the bot exceeds these dimensions, the team will be disqualified.
The bot may extend its dimensions after the run starts.
The bot must be manually controlled at all times.
Control Mechanism:

Both wired and wireless control mechanisms are allowed.
For wired bots, the wire must be at least 3 meters long and must remain slack during operation.
For wireless bots, only dual-frequency remote, Bluetooth, or Wi-Fi control is permitted.
The dimensions of the remote are not included in the bot size constraints.
Only one person is allowed to control the bot.
Construction Rules:

Use of ready-made LEGO components or ready-made gripping mechanisms is strictly prohibited.
Use of ready-made gear assemblies is allowed.
The bot must have an onboard power supply.
Failure to comply with any of the above specifications will result in immediate disqualification
Power Supply Rules:

The power source must be onboard and can be either electric or non-electric.
The power supply must be non-polluting and comply with all safety constraints specified by the organizers.
If a non-electric power source is used, prior approval from the organizers via email is mandatory.
The organizers are not responsible for inconvenience if approval is not obtained.
For electric power supplies, the voltage between any two points must be ≤ 24V DC at all times during the run.
AC power supply will not be provided and is strictly prohibited during the competition .
Arena Description:

The arena has outer dimensions of 3000 mm × 3000 mm (L × B).
The course is designed to test bot agility, control, and task execution through complex obstacles and precision-based challenges.
Arena Elements:

Cuboidal Blocks (2):
Material: Thermocol or equivalent
Dimensions: 120 mm × 120 mm × 120 mm
Cylindrical Blocks (2):
Material: Thermocol or equivalent
Height: 100 mm
Diameter: 100 mm .
Fair Play and Conduct:

All participants must maintain sportsman-like behavior.
Abusive language, threatening behavior, or intentional disruption is strictly prohibited.
The organizing team reserves the right to issue warnings, deduct points, or disqualify teams.
The organizing team’s decision will be final and binding.
Details regarding penalties will be disclosed during gameplay .
Prizes:

The total prize pool for GripBot Gauntlet 2026 is ₹25,000, awarded as cash prizes:

First Prize: ₹12,000
Second Prize: ₹8,000
Third Prize: ₹5,000 .`,
        registrationLink:
          "https://unstop.com/competitions/gripbot-gauntlet-advitiya26-indian-institute-of-technology-iit-ropar-1620114",
        minSize: 2,
        maxSize: 4,
        eventRuleBook:
          "https://drive.google.com/file/d/14U_5pD7a-dY5T0hRe06QRb87rPXGUFK6/view",
      },
    ],
  },
  {
    clubName: "CIM",
    events: [
      {
        id: 1,
        eventName: "CADvergence",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1J_frQrsXBwM2z002OIMBZPDpJs889vEg",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Guidelines:
Open to all undergraduate and postgraduate students.
Participants from different colleges are allowed (inter-college participation is allowed).
Inter-specialization team members are allowed.
Each participant can be part of only one team.
Team Details:

Team size: 1–2 members.

Event Format:

The event consists of a single round.
Participants will be provided with one design problem statement on the spot.
The problem statement will include functional requirements, constraints, and expected outputs.
Participants must model the design using SolidWorks (or organiser-designated CAD software).
All modelling must be done during the event duration; pre-made models are not allowed.
Final CAD files must be submitted before the time limit ends.
Rules:

Participants must strictly follow all rules, instructions, and time limits provided by the organisers.
Any form of plagiarism, copying others’ files, or sharing work between teams will result in immediate disqualification.
Participants must ensure their systems and software are working properly before the event begins.
Misbehaviour or disturbance during the competition will lead to disqualification.
Late or incomplete submissions may be penalised or rejected.
Judges’ decisions will be final and non-negotiable.
`,
        registrationLink:
          "https://unstop.com/events/cadvergence-advitiya26-indian-institute-of-technology-iit-ropar-1619475",
        minSize: 1,
        maxSize: 2,
        eventRuleBook:
          "https://drive.google.com/file/d/10S5hTxGeOSQjW5UYmSih5IG7H7hspty2/view",
      },
      {
        id: 2,
        eventName: "Cyber Forge",
        eventImage:
          "https://drive.google.com/uc?export=view&id=11OSiX-mL7q48Q_waz2RTc-TNtYFz13JT",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Team Details:

Team size: 1 to 4 members
Event Format:

The competition is conducted in an online submission format.
A single problem statement related to 3D modelling will be released.
Participants must design the solution using any CAD software of their choice.
Solutions must be submitted online through Google Forms.
Problem Statement Details:

One problem statement will be provided.
The problem statement will include design requirements, constraints, and evaluation parameters.
The problem statement will be released one week before the submission deadline.
Duration:

Total duration is approximately one week from problem statement release to final submission.
Late submissions will not be accepted.
Software and Tools:

Any CAD software is allowed, including SolidWorks, AutoCAD, CATIA, Fusion 360, or similar tools.
Designs must be created entirely by the participants.
Submission Requirements:

3D CAD model file (.SLDPRT, .DWG, .CATPart, etc.) or exported file (.STL or .STEP).
A detailed design report in PDF or Word format (maximum 2 pages).
High-resolution images or screenshots of the design from multiple angles.
File naming format: TeamName/ParticipantName_EventName.
Rules:

All submissions must be original; plagiarism will lead to immediate disqualification.
Designs must strictly adhere to the requirements and constraints mentioned in the problem statement.
Any violation of submission rules, file naming conventions, or deadlines will result in disqualification.
Late submissions will not be considered under any circumstances.
The decision of the judges will be final and binding.`,
        registrationLink:
          "https://unstop.com/events/cyber-forge-advitiya26-indian-institute-of-technology-iit-ropar-1619502",
        minSize: 1,
        maxSize: 4,
        eventRuleBook:
          "https://drive.google.com/file/d/1HLIeghq4vd2YMpL5biUy4VifN4zhX5-n/view",
      },
    ],
  },
  {
    clubName: "Coding Club",
    events: [
      {
        id: 1,
        eventName: "COD-COM",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1AQ8pmpSXoy6UH0oGMwU2Iv8mZt89ipTZ",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Stage 1 - Online Round:
Your team of 2-3 will tackle cool coding problems, showing off your skills. The best teams here not only get significant bragging rights but also snag a spot in the big offline showdown
Mode- Online
Time Duration - 2 hours
Stage 2 - Offline Showdown:

Each team will be allotted a single system for coding and submitting the solutions.
Participants will not be permitted to use any extra devices during the contest.
Each team will also be allowed to carry a cheat sheet of almost 25 A4 size sheets. Participants will not be allowed to use the internet during the contest
Registration Rules:

A team should consist of 2-3 members.
Students from different educational institutions can form a team.
More than one team can participate from the same institution.
Judging Criteria:

Each problem will have the same associated score, and the score will be awarded only when the solution passes all the test cases.
For each incorrect solution, the team will receive a 10-minute penalty.
Each team will be ranked according to the number of problems solved, and ties will be broken using the time penalty.`,
        registrationLink:
          "https://unstop.com/hackathons/cod-advitiya26-indian-institute-of-technology-iit-ropar-1619481",
        minSize: 2,
        maxSize: 3,
        eventRuleBook:
          "https://drive.google.com/file/d/1DSyDL-R57EBH1bnGlQZ0oOGoSz3ebkxW/view",
      },
      {
        id: 2,
        eventName: "Codehunt",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1bWhLYLfLr5zKJtY3yHxKLO028jRPGc7a",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Guidelines:
Each team has to bring their laptop.
The duration of the event will be 2 hours 30 minutes.
Each team will be given a problem and their task is to write a program that solves each problem by taking in inputs producing corresponding outputs.
If the submitted solution is completely correct, that team will receive a hint for a location. After reaching that location they have to solve some aptitude puzzles. If the team answers them correctly, they will get points assigned for that apti-round and a link for the next question will be given.
In a Coding Problem, if a solution produces an incorrect output , a penalty of 10 minutes will be accounted for.
If a team is unable to solve any problem they can leave that problem and move to the apti-round, but they will not receive any points for that problem. Also, they can’t revisit that question.
There will be four coding problems and three aptitude rounds. (No apti-round after last coding problem).
Registration Rules:

This is an offline event.
There will be a team of 2-3 members.
Students from different educational institutions can form a team.
More than one team can participate from the same institution.
 Judging Criteria:

Each correct solution to the first two coding problems awards a total of 120 points, with 60 points for each problem.
The subsequent two problems, i.e., the last two, award a total of 160 points, with 80 points for each problem.
Each aptitude round awards a total of 50 points.
Ranking will be done based on the total score a team accumulates.`,
        registrationLink:
          "https://unstop.com/hackathons/codehunt-advitiya26-indian-institute-of-technology-iit-ropar-1619459",
        minSize: 2,
        maxSize: 3,
        eventRuleBook:
          "https://drive.google.com/file/d/1LoO3djbpfJaDRTssyvrm6f-78IDPV8OQ/view",
      },
      {
        id: 3,
        eventName: "Algo-Unlock",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1TWPYBeZ08neW0IfI92dohbndDjE028fD",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Guidelines:

Each Question Will Carry Some Points, Which Will Vary With Time. There Are Penalties for Wrong Submissions.
Penalties Will Be Applied Only to Questions That Are Solved by You.
Each Question Will Have Some Base Points That Will Be the Minimum.
Number of Points You Earn After Solving That Question. Note That This Is Irrespective of the Penalties.
Final Score Will Be Calculated After Applying All the Penalties to Your Score.
The Rank List Will Be Constructed Based on the Final Scores of All Participants.
In the Event of a Discrepancy, the Decision of the Organizing Team Will Be Final and Binding.
Event Structure:

Round 1: .Online contest having 7-8 questions
Round 2: winners  will be announced based on final ranking of the 2nd round only while accounting the penalties`,
        registrationLink:
          "https://unstop.com/hackathons/algo-advitiya26-indian-institute-of-technology-iit-ropar-1619469",
        minSize: 2,
        maxSize: 3,
        eventRuleBook:
          "https://drive.google.com/file/d/19A8tBB8va-sSiq0LgVzYNHMMDMP8NsyO/view",
      },
      {
        id: 4,
        eventName: "Code-War",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1SZbIPCaO_MCtzEyeO-7X0PMUnGUw7pdF",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Registration Rules:

There will be Two round and both will be online
This is a solo event
Guidelines:

Each Problem Will Have A Clearly Defined Problem Statement Along With the Input Format, Output Format, And Constraints.
Sample Inputs And Outputs Will Be Provided For Better Understanding of Each Problem
You Are Required To Register For The Event Beforehand
You Can Submit Solutions As Many Times As You’d Like. Note That e Are Penalties For Incorrect Submissions As Per CodeChef Rule
General Instructions:

In case of any discrepancy, the organizing committee’s decision will be final and binding
Violation of rules or use of unfair means will result in immediate disqualification.
No further debate will be allowed`,
        registrationLink:
          "https://unstop.com/hackathons/code-war-advitiya26-indian-institute-of-technology-iit-ropar-1619494",
        minSize: 1,
        maxSize: 1,
        eventRuleBook:
          "https://drive.google.com/file/d/1XwwHRqVkA8E6uLSHAdXiznj3VN3T9F9-/view",
      },
    ],
  },
  {
    clubName: "ESportZ ",
    events: [
      {
        id: 1,
        eventName: "Treasure Hunt",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Advitiya’26 Treasure Hunt

Organized by eSportz Club | IIT Ropar Tech Fest (Offline Event)

The Advitiya’26 Treasure Hunt, organized under the banner of IIT Ropar’s Tech Fest – Advitiya’26 by the eSportz Club, is an exciting campus-wide offline competition designed to challenge participants’ problem-solving skills, teamwork, speed, and campus awareness. Blending adventure with logical thinking, this event transforms the campus into a dynamic puzzle arena where teams race against time to decode clues and reach destinations accurately.

This fast-paced treasure hunt offers students a unique opportunity to explore familiar spaces from a new perspective while competing against other teams to complete a predefined sequence of clues in the shortest possible time.

Event Objective
The primary objective of the Advitiya’26 Treasure Hunt is to solve and complete all given clues faster than other competing teams. Each clue leads to a specific campus location that must be identified and reached correctly. Teams are required to verify their progress through photographic evidence at every stage.

The team that successfully completes all clues in the least amount of time will be declared the winner. In the event of close finishes, the official time records maintained by the organizers will be used to determine final rankings. All decisions made by the organizing committee shall be final and binding.

Team Structure and Participation
Participation is strictly team-based

Each team must consist of exactly five members

The event is conducted entirely offline on campus

Each team will be assigned a dedicated organizer who serves as the team’s primary point of contact throughout the event

The assigned organizer is responsible for:

Sharing clues

Verifying submissions

Tracking progress and maintaining official time records

Game Structure and Flow
The treasure hunt follows a sequential, clue-based format.

At the start of the event, teams receive their first clue from the assigned organizer

All clues are location-based and restricted to areas within the campus

Clues must be solved one at a time; skipping clues or attempting to access future clues without verification is not permitted

Verification Process
Once a team believes they have reached the correct location, they must submit a group selfie that clearly shows:

All five team members

The identifiable campus landmark referenced in the clue

The selfie must be sent to the assigned organizer. Upon successful verification, the next clue will be released.

Life System and Elimination Rules
Each clue is accompanied by a three-life system, adding a strategic element to the game.

Lives reset for every new clue

One life is lost for each incorrect location submission

Submitting three incorrect selfies for a single clue results in immediate elimination

This rule ensures accuracy, discourages random guessing, and rewards careful analysis.

Rules, Conduct, and Fair Play
Teams must maintain discipline and ethical conduct at all times

Interfering with other teams or tampering with campus property is strictly prohibited

Participants must follow instructions given by organizers without exception

Any form of unfair practice may lead to immediate disqualification without appeal

Tools and Assistance Policy
To promote creativity and problem-solving:

Use of AI tools, internet resources, and search engines is permitted

Seeking help from other students, faculty, staff, or outsiders is strictly prohibited

The competition is designed to test the registered team’s skills and coordination exclusively.

Prizes and Certificates
Winner: Wireless Headphones, Medals, Trophy, and Certificates

First Runner-Up: Speakers, Medals, Trophy, and Certificates

Second Runner-Up: Keyboards, Medals, Trophy, and Certificates

All participants attending in offline mode will receive an E-Participation Certificate.
Prizes will be distributed on the spot after the event concludes.

Contact and Queries
For any queries or clarifications, participants may contact the organizers listed in the official rule book. The organizing committee retains full authority in resolving disputes or ambiguities.`,
        registrationLink:
          "https://unstop.com/events/treasure-hunt-indian-institute-of-technology-iit-ropar-1618936",
        minSize: 5,
        maxSize: 5,
        eventRuleBook:
          "https://drive.google.com/file/d/1yRYwglBWnJCGLDL7Vn7v2Ah4z_aSbi01/view",
      },
      {
        id: 2,
        eventName: "BGMI",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1fomSWhtuOPlwJ2ybwt5ne-cNBk8jHqa7",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Team Composition and Registration Rules:

This is a team-based squad event
Each team must consist of 3–4 members
Four main players are mandatory per match
One substitute player is allowed (optional)
Once registered, team rosters cannot be changed
Students from different institutions may form a team
Multiple teams from the same institution are allowed
Match and Room Rules:

Room ID and password will be shared before each match
Teams must join only their assigned slot
Slot changes without permission may result in point deduction or disqualification
In-Game Restrictions:

Emergency Pickup
Self Aid / Auto Heal
Use of glitches, bugs, or exploits
Cheating, hacking, mod APKs, or scripts
Teaming with other squads
Ghosting or sharing live match information
Disconnection and Re-host Policy:

If a player disconnects, the team must continue without them
No rematch will be provided for individual disconnections`,
        registrationLink:
          "https://unstop.com/events/bgmi-advitiya26-indian-institute-of-technology-iit-ropar-1618964",
        minSize: 4,
        maxSize: 4,
        eventRuleBook:
          "https://drive.google.com/file/d/17rOjfsR0gtWibgj8C60h53_SaRXOcstX/view",
      },
      {
        id: 3,
        eventName: "Clash Royale ",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1FKww8yEZqr5O9-Anu51zsvg5D0pKTk0I",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Advitiya’26 Clash Royale Tournament

IIT Ropar Tech Fest | Offline Esports Event

The Advitiya’26 Clash Royale Tournament, organized as part of IIT Ropar’s Tech Fest – Advitiya’26, is a high-intensity solo esports competition designed to test players’ strategic thinking, real-time decision-making, and mastery of the popular mobile game Clash Royale. This tournament provides a fair, competitive, and professionally supervised platform for Clash Royale enthusiasts to showcase their individual skills and compete for exciting prizes.

The event focuses on pure one-on-one competition, where every participant fights for themselves. With a structured elimination format and strict fair-play rules, the tournament ensures an engaging and balanced experience for all players.

Event Objective
The primary objective of the Advitiya’26 Clash Royale Tournament is to identify the best individual Clash Royale player through a series of competitive knockout rounds. Participants must outplay their opponents using smart deck selection, precise timing, and in-game strategy. Only winners progress to the next stage, making every match crucial. The ultimate goal is to survive all rounds and claim the championship title.

Participation and Registration Rules
This is a solo event, and participation as a team or shared account usage is strictly prohibited. Each participant must compete using their own Clash Royale account, and account sharing of any kind is not allowed. Players are responsible for ensuring a stable internet connection throughout the tournament, as technical issues caused by poor connectivity will not be grounds for rematches.

Tournament Organisers (TOs) will be present throughout the event to supervise matches, resolve disputes, and ensure smooth conduct. Participants are required to follow all instructions given by the TOs, and their decisions shall be considered final and binding.

Fair Play and Conduct
Maintaining fairness is a top priority in this tournament. The use of hacks, mods, third-party tools, scripts, or any external assistance is strictly prohibited. Any player found violating fair-play rules will face immediate disqualification without warning. Unsportsmanlike behavior, refusal to follow instructions, or attempting to exploit loopholes may also result in removal from the event.

Tournament Structure and Match Format
The tournament follows a multi-round elimination format, designed to progressively filter the strongest players.

Round 1: Pool Stage
All registered players will be divided into four pools – Pool A, Pool B, Pool C, and Pool D. Matches in this round follow a Single Elimination format, meaning one loss results in elimination. Only one winner from each pool advances to the next stage.

Round 2: Semi-Finals
The four pool winners will compete in the Semi-Finals. These matches will be played in a Best of 3 (Bo3) format, testing consistency and adaptability.

Round 3: Third Place Playoff
The two players who lose in the Semi-Finals will face each other in a Third Place Playoff, played in a Best of 5 (Bo5) format.

Round 4: Grand Finals
The winners of the Semi-Finals will compete in the Grand Finals, also played in a Best of 5 (Bo5) format, to determine the tournament champion.

Judging and Dispute Resolution
Match winners will be determined strictly according to the defined match formats. Any confusion, disputes, lag-related issues, or rule violations will be handled by the Tournament Organisers. In ambiguous situations, the organizing club’s decision will be final. Any updates or changes to the tournament format, if required, will be communicated to participants in advance.

Prizes and Certificates
Winner: Wireless Headphones + Certificate

First Runner-Up: Speaker + Certificate

Second Runner-Up: Keyboard + Certificate

All participants who join the event in offline mode will receive an E-Participation Certificate. Prizes will be distributed after the conclusion of the tournament.

Contact Information
For any queries related to the event, participants may contact:
Abhinav Kumar Singh
9931502765`,
        registrationLink:
          "https://unstop.com/events/clash-royale-indian-institute-of-technology-iit-ropar-1618939",
        minSize: 1,
        maxSize: 1,
        eventRuleBook:
          "https://drive.google.com/file/d/1TDf3_NueFAJEaRstrqaHXVYgCf92xE2m/view",
      },
    ],
  },
  {
    clubName: "FinCOM",
    events: [
      {
        id: 1,
        eventName: "Case Study",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Problem Statement:

Problem Statement will be released after the deadline
About:

Welcome to the Case Study Event at Advitiya Techfest, IIT Ropar
Case studies demand more than just solutions, they require critical thinking, structured analysis, and the ability to bridge technology with real-world challenges
This event invites participants to dive deep into complex problem statements, question existing assumptions, analyze systems holistically, and design innovative, practical, and scalable solutions
Aligned with the spirit of Advitiya, the technical fest of IIT Ropar, this Case Study competition encourages participants to leverage technology, data, and strategic thinking to address contemporary challenges
It serves as a platform for budding engineers, innovators, and problem-solvers to transform ideas into impactful interventions
Case Study at Advitiya Techfest ’26 is not just about arriving at the right answer, it’s about redefining the problem, exploring unconventional perspectives, and driving meaningful change through innovation and execution
Event Structure:

Round 1: Case Study Submission:

Participants will receive a detailed case study problem statement
Teams are required to analyze the problem and submit their solutions in a structured format (PDF/PPT as specified)
Submissions will be evaluated on criteria mentioned in the attached Problem Statement file
Shortlisted teams will advance to the next round
Round 2: Case Presentation (Hybrid Mode):

Shortlisted teams will present their solutions before the judging panel
The presentation round will be conducted in hybrid mode
Offline: On-campus presentation for participants present physically
Online: Virtual presentation for participants joining remotely
Detailed guidelines regarding presentation format, duration, and mode will be shared exclusively with the shortlisted teams
Important Note:

The organizing team reserves the right to change or modify any rules
The decision of the judges will be final and binding`,
        registrationLink:
          "https://unstop.com/competitions/advitiya-case-study-competition-advitiya26-indian-institute-of-technology-iit-ropar-1621641",
        minSize: 1,
        maxSize: 3,
        eventRuleBook: "",
      },
      {
        id: 2,
        eventName: "Trader's Arena",
        eventImage:
          "https://drive.google.com/uc?export=view&id=11_PsYglSahcU3vU5MLqcEsm7y8F7-Mvd",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Introduction:

Welcome to Trader's Arena, the ultimate mock stock challenge.
This immersive experience is designed to test your trading skills, strategic thinking, and negotiation skills.
Armed with virtual money, participants will navigate market dynamics, react to news flashes, and engage in high-stakes trading to maximize their profits and portfolio diversification.
Trade, compete, and conquer as you unleash the trader in you.
Task:

Initial Setup:

Each team starts with ₹10,00,000 in virtual money.
Teams will use this capital to buy stocks from the ASE (Advitiya Stock Exchange) at the start of the event.
Trading Mechanics:

Post-initial buying, teams will engage in transactions based on real-time news flashes.
Teams can sell stocks or buy stocks from other teams at mutually agreed prices.
Sellers must negotiate with buyers, while accountants maintain accurate transaction records.
Event Flow:

The event spans 2 hours, with multiple news flashes shaping trading decisions.
Every deal must be authorized by the ASE team before execution.
Registration Rules:

Participation is offline at IIT Ropar Main Campus during Advitiya.
Each team must have four members.
Two sellers responsible for negotiation and sales.
Two accountants responsible for maintaining financial records.
Teams can consist of members from the same or different institutions.
Multiple teams from the same institution are allowed.
Judging Criteria:

Teams will be evaluated on money in hand.
Teams will be evaluated on the value of the stocks at the end of the event.
Guidelines:

Teams are prohibited from selling stocks back to ASE.
All transactions require authorization by the ASE team.
Unfair means or rule violations will result in immediate disqualification.
The decisions of the organizing committee are final and binding.
Notification of any changes will be communicated before the event.`,
        registrationLink:
          "https://unstop.com/competitions/traders-arena-advitiya26-indian-institute-of-technology-iit-ropar-1620547",
        minSize: 4,
        maxSize: 4,
        eventRuleBook:
          "https://drive.google.com/file/d/19lpciF15gTmcv66h-W5fWOS6A0lJFMO5/view",
      },
    ],
  },
  {
    clubName: "Monochrome",
    events: [
      {
        id: 1,
        eventName: "CineCanvas",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Guidelines:

Participants will draw a story card randomly from a set, containing a unique QR code.
Scanning the QR code reveals a story prompt on which the movie poster must be based.
Each participant/team will work exclusively with the story assigned to them.
Rules:

Participants must scan only the QR code on their assigned story card.
Exchanges or re-selection of story cards is not permitted, except in case of a verified technical issue.
Sharing story prompts or QR codes with others is strictly prohibited.
Design Specifications: Poster size: 1:1
Color scheme: Participants are free to choose their color palette.
File format: Submissions must be in JPEG or PNG format.
Rules:

A team can consist of a maximum of two members.
Students from different educational institutions can form a team.
More than one team can participate from the same institution.`,
        registrationLink:
          "https://unstop.com/events/cine-canvas-advitiya26-indian-institute-of-technology-iit-ropar-1619485",
        minSize: 1,
        maxSize: 2,
        eventRuleBook:
          "https://drive.google.com/file/d/19G5VPMfAL9-MNkLN_ALv8h7u59kz1Tsi/view",
      },
      {
        id: 2,
        eventName: "Colour pallette ",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1nGZXQGNRFUPggyKJZX94mZfcrCGdrk6R",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Registration Rules:
1. This is an online event.
2. This event is a solo event. No Team Participation is allowed

Guidelines:
1. Participants must choose one single color for their poster design.
2. Once the color is chosen, participants must incorporate only different shades of the selected color in their poster design.
3. Poster size: 1:1
4. File format: Submissions must be in JPEG or PNG format.
5. The theme will be released on 27th January.
6. Participants will have time to complete their poster design from 27th January to 7th February.
7. Participants must submit their designs online before 8th February.
8. Participants are encouraged to share their designs on social media platforms with the event hashtag.`,
        registrationLink:
          "https://unstop.com/events/colour-pallette-indian-institute-of-technology-iit-ropar-1619470",
        minSize: 1,
        maxSize: 1,
        eventRuleBook:
          "https://drive.google.com/file/d/1ssZ1HXVI97NOnnI7iVH3Y8LFa46x6Pf9/view",
      },
    ],
  },
  {
    clubName: "Robotics Club",
    events: [
      {
        id: 1,
        eventName: "Robosoccer",
        eventImage:
          "https://drive.google.com/uc?export=view&id=1HXrxCRCUapSfw8L7TJQPwJCGRQY9ZMem",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Introduction

IIT Ropar’s Advitya 26 proudly presents the exhilarating RoboSoccer competition! Teams will demonstrate their ingenuity by crafting non-attacking robots to engage in thrilling soccer matches. This event is a perfect fusion of technology, strategy, and sportsmanship, embodying the spirit of innovation seamlessly blended with the essence of humanity.

Task

As the name suggests, RoboSoccer involves robots playing “football” using a “tennis ball”, two goalposts, and two teams. Humanoid robots are not required; a wheeled robot is ideal. Each team consists of two robots: a defender and an attacker. The objective is to score by maneuvering the ball into the opposing team’s goalpost. Matches are tentatively set to last 12 minutes, subject to adjustments based on time availability.

Registration Rules

It is an offline, team-based event held at IIT Ropar Main Campus during ADVITIYA.
A team should consist of 2–4 members.
Students from different educational institutions can form a team.
More than one team can participate from the same institution.
Guidelines

A game is played between two teams, that are four robots.
Starting two-quarters of the arena belongs to one team, and the next two/ last two quarters belong to the other team.
A team aims to defend its goal, just like traditional soccer, which means you have to stop another team from pushing the ball through your goal.
All your parts including the battery (if wireless) on the bot, should not weigh more than 5 kgs (5% tolerance allowed). The only part which may not be on the bot is the controller.
Power can be on the bot or external. If external power is required, you are only allowed to use extension boards provided by the organizers. Your bot should have the required features which can be plugged into and unplugged from the extension boards as needed.
General Rules

Bot Dimensions and Weight

30*30*30 cm3 and 5 Kgs
The weight limits have a 5% tolerance.
(The robot must be designed to fit entirely within a 30 cm × 30 cm × 30 cm
cubic box, with all mechanisms fully extended or stretched to their
maximum limits. Additionally, the battery must be onboard and integrated
into the robot's design.)

Arena

The arena is divided into four equal parts along its length.
The dimensions of the arena are 8 ft * 12 ft(distance between the goal
posts).
The goal dimensions are not fixed but will be large enough to prevent a
single robot from completely blocking it.
Mobility

All robots must have easily visible and controlled mobility. Methods of
mobility include: 

Rolling (wheels, tracks or the whole robot).
Non-wheeled (no rolling elements in contact with the floor and no
continuous rolling/cam operated motion)
Mobility methods that are NOT allowed:

Flying mechanisms are not allowed.
The robots should not secure themselves on the match surface by
using suction cups, sticky threads, glue etc.
FOULS

Covering the ball from all four sides (not considering the top and
bottom here) by a single robot is not allowed.
Use any part of your robot as a weapon to harm other bots. It is clarified
that pushing a bot is allowed.
Kicking the ball out of the arena.
Using any part of your robot to damage the football field will be counted
as a foul. If a team damages the field more than 3 times in a single
match, then the team will be disqualified and will be out of the
competition.
If the ball is in contact with a bot and the bot’s wheels cross the goal
line will be counted as a goal. This rule may change for your match
which will be decided at the time of the event and will be informed to
you.
Damaging the opponent bot. If any team member touches any bot
without the referee's / event manager's permission,it is foul.
In case of any foul, the time clock will stop, and you will be given a
penalty.
In case there is a deadlock (lasting more than 8 seconds), the play will
stop and the team in whose quarter the deadlock occurs will be
awarded a goal kick.
Penalty (Any foul which is done inside the outer D-box)

The ball will be placed in the middle of the half of the team who is taking the
penalty. The bot of the team who has made a foul has to remain in the
opposite team's second quarter, i.e., 3rd quarter from his side, and cannot
leave it, till the attacker touches the ball.

Safety Rules

Compliance with all event rules is mandatory.

Special care should be taken to protect the onboard batteries and pneumatics.
If your robot design does not fully comply with the rules or includes ambiguous elements, please contact the RoboSoccer Organizing Team at IIT Ropar as early as possible. Attempting to exploit a loophole without prior clarification may result in disqualification.
Each event has safety inspections. Your team will be allowed to compete at the sole discretion of IIT Ropar authorities.
Criteria for Victory

A team is declared victorious if it scores a higher number of goals at the end of the match.
If there is a tie, an extra minute will be given as “extra time” to facilitate the tie-break.
Any team with robot(s) deemed unsafe by the judges after the match has begun will be disqualified and therefore declared the loser. The match will be immediately halted and the opponent will be awarded a win.
NOTE

Notification of any changes to the event will be given before the event commences.
Violating the rules or using unfair means will lead to immediate disqualification. The organizing team’s decision is final and binding, with no further debate permitted.
In case of any discrepancy, the decision of the organizing committee will be final and binding.`,
        registrationLink:
          "https://unstop.com/competitions/robo-soccer-advitiya26-indian-institute-of-technology-iit-ropar-1618914",
        minSize: 2,
        maxSize: 4,
        eventRuleBook:
          "https://drive.google.com/file/d/1VTI6eiLV7xeCpjjTkqVEsWqAsnkNBtBB/view",
      },
      {
        id: 2,
        eventName: "Fastest line follower",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Fastest Line Follower Competition
Objective
Design and build a fully autonomous robot

Robot must follow a continuous white line on a black surface

Navigate curves and branches accurately

Stop automatically inside the end zone

Complete the track in the shortest possible time

Arena Details
Arena size: 230 cm × 230 cm

Track type: White line on black base

Track features:

Curves

Free ends branching from the main path

No loops present

End zone:

40 cm × 40 cm white square

Robot must stop completely inside the box

Competition Format
Single-round competition

Each team gets 3 attempts

Best time out of 3 attempts is considered

Maximum time per attempt: 3 minutes

Calibration time:

3 minutes before attempts

Allowed to adjust code and hardware

No code or hardware changes allowed after calibration

Eligibility & Team Details
Team size: 2–4 members

Inter-college teams are allowed

Only one team member may be near the arena during official attempts

That member may only place and retrieve the robot

Bot Specifications
Maximum dimensions: 20 cm × 20 cm × 20 cm

Must be fully autonomous

No wired or wireless external communication

All computation must be onboard

No additional weight allowed during calibration

Robot must remain grounded at all times

Judging Criteria
Team with the least time (best attempt) wins

Penalties
+10 seconds if the robot moves off the line at any point

+10 seconds if the robot fails to stop inside the end zone

Rules & Regulations
Any external assistance leads to disqualification

Any rule violation results in disqualification

Judges’ and organizers’ decisions are final and binding

Organizers reserve the right to modify rules or event structure`,
        registrationLink:
          "https://unstop.com/competitions/fastest-line-follower-advitiya26-indian-institute-of-technology-iit-ropar-1622036",
        minSize: 2,
        maxSize: 4,
        eventRuleBook:
          "https://drive.google.com/file/d/101UKr5n_JRYdrgMN89YdxTiaEBpddhc7/view",
      },
    ],
  },
  {
    clubName: "Softcom",
    events: [
      {
        id: 1,
        eventName: "Hackathon",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `About the Event:

JPD Hub, a leading software development agency, is excited to collaborate with Advitiya, the Technical Fest of IIT Ropar, to host an innovative hackathon.
This challenge focuses on building intelligent routing, analytics, and scalability, rather than static page generation.
The complete problem statement will be shared at the time of event.
Note : The problem statements will be live on the spot in the unstop only.
Rules:

Team Size:
Teams must consist of 3-5 members to ensure effective collaboration and diverse skill sets.
All team members must be from the same college or university, but having members from multiple batches and departments is encouraged.
Originality:
Plagiarism of any kind is strictly prohibited.
Solutions must not replicate any existing platform or module directly.
Open source projects can be used for inspiration but must be duly acknowledged.
Timeliness:
Ensure all deliverables are submitted before the deadline. Late submissions will not be entertained.
Maintain timely and clear Git commits to demonstrate consistent progress throughout the hackathon.
Collaboration:
Teamwork and brainstorming are encouraged, but all code must be original and developed during the hackathon.
Duration:
Starts: 23th January 2026, 12 Noon
Ends: 27th January 2026, 12 Midnight
Total time: 4.5 days
Judging Criteria:

Problem Statement Accuracy & Feature Implementation – 60%
Completeness, App Design & Overall Quality – 30%
Performance, Efficiency & On-Time Submission – 10%
Objective:

Details will be communicated shortly.
Submission Details:

GitHub Repository:
Host all code in a public GitHub repository.
The repository must contain:
Properly structured and documented code.
A README.md file explaining:
Setup and usage instructions.
A brief overview of your solution.
Regular Git commits to track progress.
Zipped Code:
Submit a zipped file of the complete project for redundancy.
Submission Portal:
Participants will be required to submit the GitHub repository along with the zipped code before 27th January 2026, 12 Midnight.
Notification of any changes to the event will be given before the event commences.
In case of any discrepancy, the decision of the organizing committee will be final and binding.
Event Fee Status:

Free event`,
        registrationLink:
          "https://unstop.com/hackathons/advitiya-x-jpd-hub-hackathon26-advitiya26-indian-institute-of-technology-iit-ropar-1620027",
        minSize: 3,
        maxSize: 5,
        eventRuleBook: "",
      },
      {
        id: 2,
        eventName: "GameJam",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `IIT Ropar’s Software Community is organising Game Jam during Advitiya 2026. We are thrilled to have you participating in this creative and exciting event. This Game Jam is one of the biggest highlights of our college’s annual Technical Fest, and it’s a great chance to show off your skills.

Guidelines:

There are no restrictions on Game engines or Assets being used as long as there are no repercussions related to licensing etc. Examples: Polypizza, OpenGameArt, Sketchfab, Mixamo, Pixabay, Freesound, etc.
Games can be 2D or 3D.
You're free to make a game from scratch using any tools of your choice, as long as they don't restrict the sharing or distribution of your published project.
The platform the game is built for should be secure, generally accessible, and should not require any payment, subscription, purchase of hardware or software, or any kind of additional collection of data for advertising or other purposes.
You may build and upload the game on itch.io for example, but don't upload it to a cloud service that requires users to have an account or subscription to download.
Judging Criteria

Points will be awarded for the following criteria -

Round 1 :

Innovation / Originality - 15 points
Gameplay - 20 points
Visuals - 20 points
Completeness - 15 - points
Round 2 :

Demonstration / Presentation - 30 points
Note: Selected teams must attend Round 2 in person to avoid disqualification. However, if the majority of teams are unable to participate offline, Round 2 will be conducted online instead.

Rules:

Team Size:

Teams must consist of 1-4 members to ensure effective collaboration and diverse skill sets.
Team members can be from different colleges or universities.
Themes:

Themes for the game jam will be announced at the start of Round 1.
Rounds :

Round 1: Selected teams will be selected for Round 2 based on their performance in the 3-day Game Jam.
Round 2: Selected teams will be presenting their games to the judges. The format for presenting the game will be announced after Round 1. Teams must be present offline at IIT Ropar for Round 2 (Only in case of the non-availability of the majority of teams, the event shall shift online), otherwise they will be disqualified from Round 2.
Tools and Technologies:

Participants are allowed to use any legally licensed tools, engines, languages, or frameworks to create their games (e.g., Unity, Unreal Engine, Godot, Construct, etc.)
Pre-existing assets (code, art, audio) can be used, provided they adhere to legal and ethical standards and proper credits are given.
Duration:

Starts: 30th January 2026, 12:00 am
Ends: 1st February 2026, 11:59 pm
Total time: 3 days
Submission Details

GitHub Repository:
Host all code in a public GitHub repository.
The repository must contain:
A README.md file explaining:
Setup and usage instructions.
How you incorporated the themes given.
Link to the website where the game is hosted, if applicable.
Regular Git commits to track progress.
Final zip submission:
The final deliverable for Round 1 should be a zip containing the executable files and the github repository readme.
Any executable format is acceptable. However, preferred formats include an exe for win64, apk for Android, or a browser link in the README for web-hosted games.
The name of the final zip to be submitted in the Google form/Unstop should be <TeamID>_Advitiya26.
Submission Portal:
For Round 1, Games must be submitted before 1st Feb, 11:59 pm. Penalties will be awarded for late submission.
For Round 2, teams must submit their final presentations before the main event.`,
        registrationLink: "https://unstop.com/events/game-jam-advitiya26-indian-institute-of-technology-iit-ropar-1620102",
        minSize: 1,
        maxSize: 4,
        eventRuleBook: "",
      },
    ],
  },
  {
    clubName: "Zenith",
    events: [
      {
        id: 1,
        eventName: "Beyond Zenith- An E class model rocketry competition",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Introduction:

Beyond Zenith is a high-impact model rocketry competition where teams design, build, and launch an E-class rocket.
The event emphasizes end-to-end engineering, structural integrity, and real-world flight performance, fostering innovation, technical rigor, and hands-on learning in rocketry.
Registration Rules:

Registrations for Beyond Zenith will be done via UnStop.
Each team must consist of 4-6 members.
Ensure that all team members are registered under the same team name.
The event will be held in the IIT Ropar campus itself during ADVITIYA 26 (6 Feb 2026-8 Feb 2026).
If the number of participating teams is less than 4, then the event will be cancelled. However, participating teams will be informed about the number of participants.
All teams must declare the composition of the fuel used in their rocket on the day of the event.
Event Structure:

Teams must perform a vertical launch of their E-class model rockets in strict adherence to all competition rules and safety regulations.
The rocket’s maximum altitude achieved during flight will be officially measured and recorded using the designated altitude measurement system.
Successful deployment of the recovery system (parachute) is compulsory for every launch.
A flight will be considered valid only if the parachute deploys correctly, ensuring safe and controlled recovery of the rocket.
Rocket Design Specifications:

Remember any violation of the guidelines mentioned below will result in immediate disqualification and no queries will be entertained.
All rockets must be Class E Rockets.
Total weight of rocket must not exceed 600 gm.
The maximum thrust allowed is 30 N.
The body as well as the motors should be made from scratch.
A flight will be considered valid only if the parachute deploys correctly, ensuring safe and controlled recovery of the rocket.
Motors must be single-use and adhere to standard safety certification.
No metal parts are allowed in rockets apart from launch lugs.
Judging Criteria:

The final rankings will be determined primarily by the maximum altitude achieved by the rocket during a valid flight.
In the event of a tie, the following criteria will be used to determine the winner, in order of priority:
Innovation: Originality, creativity, and effectiveness of unique design features.
Stability: Quality of the flight trajectory, including straight ascent and minimal oscillation or wobble.
Rules and regulations are subject to revision prior to the event, and any updates will be communicated to all registered teams in advance.
The decision of the judges shall be final and binding on all participating teams, and no appeals will be entertained.`,
        registrationLink: "https://unstop.com/competitions/beyond-zenith-class-e-rocket-launching-competition-advitiya26-indian-institute-of-technology-iit-ropar-1621611",
        minSize: 4,
        maxSize: 6,
        eventRuleBook: ""
      },
      {
        id: 2,
        eventName: "Cosmoquest- A story based quiz competition with questions related to Astronomy and Astrophysics",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `CosmoQuest is a story-based quizzing competition focused on astronomy and astrophysics, designed to test participants’ scientific understanding, logical reasoning, and interpretative skills through interactive cosmic narratives.

Stage 1 – Story Quiz (Elimination Round):

In Stage 1, teams will participate in a story-based quiz round, where questions are drawn from one or more self-contained narratives rooted in astronomy and astrophysics. Each story will be introduced by the quizmaster and followed by a series of questions testing comprehension, scientific understanding, and logical reasoning based on the narrative context. All teams will receive the same set of questions. Scores accumulated across all questions in this round will determine team rankings, and the top-performing teams will qualify for Stage 2.
Stage 2 – Advanced Story Challenge (Final Round):

This will feature a more complex and detailed storyline that may span multiple segments. As the story progresses, teams will answer successive questions that require careful interpretation, strong reasoning, and close attention to narrative details. This round places greater emphasis on analytical thinking and continuity across the story. Final rankings will be decided based on overall performance in this round.
Guidelines:

Participants must follow all instructions given by the quizmaster and event coordinators.
Cheating or sharing answers across teams is strictly prohibited and may result in disqualification.
Any form of indiscipline, plagiarism, or misrepresentation may lead to penalties or removal from the event.
Internet and mobile device use is not allowed in either stage.
Teams must discuss answers only with their own members.
If fewer than 5 teams register, the event will be canceled and teams will be informed.
For more details refer to the rulebook.`,
        registrationLink: "https://unstop.com/competitions/cosmoquest-advitiya26-indian-institute-of-technology-iit-ropar-1618073",
        minSize: 3,
        maxSize: 5,
        eventRuleBook: ""
      },
    ]
  },
  {
    clubName: "Iota Cluster",
    events: [
      {
        id: 1,
        eventName: "PromptForge ",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Round 1 – Negotiation Round:

Teams are given 20 minutes to prepare their prompt and 5 minutes for live performance. Each team writes a prompt for their chosen LLM to act as a customer negotiating with the organizer’s LLM acting as the shopkeeper. The maximum prompt length is 150 words. Limited LLM options will be provided, including LLaMA, DeepSeek R1, and Grok, subject to availability. Teams whose LLMs negotiate the best prices qualify for the next round. Approximately 40 percent of teams will advance to Round 2.
Round 2 – Courtroom Showdown:

This is a head-to-head knockout round. Each team’s LLM acts as a lawyer in a courtroom scenario. The case details are revealed only after Round 1 ends to avoid preparation bias. The maximum prompt length is 100 words. Only one final submission is allowed per team.
Rules and Restrictions:

Teams are not allowed to interact with each other during any round. The system prompt of the organizer’s LLM will not be disclosed. Vulgar, explicit, offensive, or harmful content is strictly prohibited. Jailbreaking attempts are not allowed and chat history will be reviewed. Prompts must not attempt to exploit LLM loopholes such as hidden system prompts, DAN-like prompts, or forced personality overrides. Prompts must work as-is without requiring long conversations or setup. GenAI tools may only be used for writing clean and appropriate prompts.`,
        registrationLink: "https://unstop.com/hackathons/prompt-forge-indian-institute-of-technology-iit-ropar-1619484",
        minSize: 1,
        maxSize: 3,
        eventRuleBook: ""
      },
    ]
  },
  {
    clubName: "Chemical Engineering ",
    events: [
      {
        id: 1,
        eventName: "Process Wars- Teams engineer solutions and then clash head to head to justify why their process is the smartest and most scalable  ",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Introduction
Welcome to Process Wars, a reimagined and high-impact competition designed to challenge participants to innovate, strategize, and engineer practical solutions under pressure.
The event consists of two competitive rounds.
A set of teams will receive a unique problem statement, and teams working on the same statement will later battle it out.
The challenge is designed to test your adaptability, creativity, and engineering insight.
Prepare for fast thinking, smart planning, and high-energy idea battles.

 
Pre-requisites
Only your analytical skills, creativity, and problem-solving mindset are required.
 
Rules and Regulations
ROUND 1 — The Idea Draft (Prelims)
Format
Each set of teams will be assigned a unique engineering problem statement.
Teams will have 45 minutes to develop, structure, and refine their initial solution.
Submission

Teams must submit a 3–page (can extend to 4 pages if required) ideation slides:
 
Page 1 — Concept Overview
Understanding of the problem
Proposed solution / concept
Key innovation
Basic feasibility
Assumptions (if any)
 
Page 2 — Flow Structure
One of the following:
Flowchart
Block Flow Diagram (BFD)
Schematic workflow diagram
 
Page 3 — Supporting Logic
Brief justification of approach
Potential improvements
Early-stage constraints
 
Selection
Top teams from each problem statement will qualify for Round 2.
 
ROUND 2 — The Process Duel (Finals)
Teams who worked on the same problem statement will compete in a head-to-head engineering duel.
 
Preparation
Selected teams will get 30 minutes to expand their ideas on:
Scalability
Techno-economic reasoning
Sustainability & safety factors
Implementation challenges
Why their idea is superior
 
Teams may create a 3–5 slide pitch deck (optional, may include it in your pervious slides).
 
Round 2 Format
Each duel consists of:
  1. Pitch (6 minutes)
Teams present their improved solution.
 
  2. Judge Q&A 
To test understanding, logic, and technical consistency.
 
  3. The Duel (2 minutes each)
Teams directly justify why:
Their idea is more effective,
More scalable,
More innovative,
Better suited for real-world application.
 
Judging Criteria
Technical Strength — 25%
Innovation & Creativity — 25%
Scalability & Practical Viability — 20%
Economic & Environmental Logic — 15%
Pitch & Duel Performance — 15%
 
General Rules
  1. All solutions must be original.
  2. Internet allowed; AI tools permitted only for research, not full draft generation. 
  3. Respectful behaviour is mandatory during duels.
  4. Time limits must be followed strictly.
  5. Judges’ decisions are final.
 
Penalties & Deductions
To ensure fairness and uniformity, the following deductions will apply:
 
1. Time Exceeded (Round 2 – Pitch & Duel)
Exceeding the allotted 6-minute pitch or 2-minute duel time will result in
–10 marks for every minute exceeded.
After 2 minutes of exceedance, the team will be stopped immediately, and the remaining part of the pitch will not be considered.
 
2. Page Limit Violation (Round 1 Submission)
Round 1 submission requires 3 to 4 pages (Page 1: Overview, Page 2: Flow Structure, Page 3: Supporting Logic).
Deductions:
5th page partially used: –5 marks
5th page fully used: –7 marks
More than 5 pages: –10 marks + the extra pages will not be evaluated
 
3. Missing Mandatory Sections
If any required section is missing:
Missing Flowchart/BFD/Schematic: –5 marks
Missing Supporting Logic (Page 3): –3 marks`,
        registrationLink: "https://unstop.com/events/process-wars-advitiya26-indian-institute-of-technology-iit-ropar-1620121",
        minSize: 1,
        maxSize: 3,
        eventRuleBook: ""
      },
    ]
  },
  {
    clubName: "Civil Engineering ",
    events: [
      {
        id: 1,
        eventName: "The Bridge Off",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Design Constraints:

The bridge must satisfy the following dimensional requirements:
Minimum span: 25 cm
Maximum span: 45 cm
Width: No restriction
Only the materials provided by the organizers are permitted, and participants must follow all construction guidelines.
Judging Criteria:

Bridges will be evaluated on overall stability, maximum load carried, and strength-to-mass ratio. In case of a tie in load capacity, the bridge with the longer span will be ranked higher. Judges will also assess design approach, material efficiency, innovation, and compliance with the problem statement.`,
        registrationLink: "https://unstop.com/events/bridge-off-indian-institute-of-technology-iit-ropar-1620128",
        minSize: 2,
        maxSize: 3,
        eventRuleBook: ""
      },
      {
        id: 2,
        eventName: "Blueprint battle",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Task:

Conduct field observations using Dumpy level and prepare a complete Reduced Lengths table using both Height of Instrument (HI) method and Rise–Fall levelling table.
Compute reduced levels (RLs) with accuracy and consistency.
Use the obtained RL data to solve an on-spot Problem Statement (PS) within the given time.
Accuracy of readings, correctness of calculations, and quality of the PS solution will determine the final score.
Judging Criteria:

Judging will be based on the accuracy and consistency of the levelling work performed by each team.
Evaluators will check:

Precision of staff readings and instrument handling
Correctness of HI or Rise–Fall calculations
Proper closure and arithmetical checks in the levelling table
Accuracy of Reduced Levels (RLs) compared to the actual ground values
Quality and correctness of the Problem Statement solution derived from the levelling data`,
        registrationLink: "https://unstop.com/events/blueprint-battle-advitiya26-indian-institute-of-technology-iit-ropar-1618934",
        minSize: 4,
        maxSize: 6,
        eventRuleBook: ""
      },
    ]
  },
  {
    clubName: "Electrical Engineering",
    events: [
      {
        id: 1,
        eventName: "Circuit Chase",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Eligibility:

The event is open to all students.
Inter-college participation is allowed.
Inter-specialization team members are allowed.
Each team can have a maximum of two members.
Format:

Round 1 and Round 2 are Treasure Hunt–based rounds involving conceptual and numerical questions.
Round 3 (Final Round) is a practical circuit-building round.
The difficulty level of questions will be based on Class 12 and JEE-level concepts.
Process:

Teams must register online before the deadline.
All registered teams will participate in Round 1.
A predetermined number of teams will qualify for Round 2 based on performance.
Similarly, selected teams will advance to the Final Round.
The team that successfully completes all rounds with the best performance will be declared the winner.
Rules:

Each team is limited to a maximum of two members.
Each round will have a fixed time limit, which must be strictly followed.
Teams failing to complete a round within the time limit will be disqualified, irrespective of performance.
Use of unfair means, plagiarism, or external assistance is strictly prohibited and will lead to immediate disqualification.
Penalties may be imposed if assistance is taken, as specified for that round.
The decision of the judging panel and organizing committee will be final and binding.`,
        registrationLink: "https://unstop.com/competitions/circuit-chase-advitiya26-indian-institute-of-technology-iit-ropar-1619460",
        minSize: 1,
        maxSize: 2,
        eventRuleBook: ""
      },
    ]
  },
  {
    clubName: "Mathematics and Computing",
    events: [
      {
        id: 1,
        eventName: "Maths Arena",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Eligibility and Team Formation:

Participation is open to students only. Teams must consist of a minimum of 2 members and a maximum of 3 members.
Inter-college teams are allowed.
Registration Guidelines:

This is an offline event and participation is strictly team-based. A team is allowed to participate only once in Round 1. Multiple teams from the same institution are permitted.
Rules and Disciplinary Guidelines:

Any use of unfair means, plagiarism, or violation of rules will result in immediate disqualification. Usage of any electronic devices and calculator is strictly prohibited and will result in immediate disqualification. The organizing team’s decision is final and binding, and no further debate will be allowed. In case of any discrepancy, the decision of the organizing committee will be final.
Any changes to the event, if required, will be communicated before the commencement of the event.`,
        registrationLink: "https://unstop.com/events/maths-arena-indian-institute-of-technology-iit-ropar-1618925",
        minSize: 2,
        maxSize: 3,
        eventRuleBook: ""
      },
    ]
  },
  {
    clubName: "CSE",
    events: [
      {
        id: 1,
        eventName: "AI Fusion",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Tagline : Navigating the Future with AI brilliance  

1. Introduction: 

This challenge will require the participant to make use of existing AI tools and technologies to build a core technical system. The system so built should demonstrate innovation and practical application of AI. Exact Problem Statement will be announced at the time of the event only. 
There is NO need for having sound technical knowledge about AI or dev/coding for this event. It's just based on your creativity and your ability to use existing tools. But obviously having technical knowledge is a plus. 
Team Size : 4

2. Submission Guidelines: 

2.1 Time limit and Ethical considerations: 

The participants are required to strictly adhere to a time limit of 180 minutes which includes the construction of the structure and its submission. 
Only one entry would be accepted. In the case of multiple entries, the entry submitted most prior would be considered for further evaluation.
2.2 AI Tool Usage: 

Participants are required to use existing AI tools and technologies in their projects. 
Any proprietary AI tools or services used must comply with the respective terms of service. 
2.3 Core Technical Structure: 

Projects should demonstrate a well-designed system architecture.
The architecture should be outlined clearly in the documentation. 
2.4 Documentation: 

A comprehensive documentation package must accompany each submission. 
Documentation should be in the form of a Google Docs document with relevant screenshots and the links to the components which depict the working. 
Documentation should include technical specifications and user guides. 
Participants need to submit the GitHub repository.
3. Judging Criteria: 

Submissions will be evaluated based on: 

Innovation
Effective Use of AI Tools and the smooth integration of the various components. 
Documentation 
System Architecture - creativity and relevance 
Contact Info: 

Nehal Abbott: 6280339583

Arjun Aggarwal: 6280707215`,
        registrationLink: "https://unstop.com/events/ai-fusion-advitiya26-indian-institute-of-technology-iit-ropar-1618912",
        minSize: 4,
        maxSize: 4,
        eventRuleBook: ""
      },
      {
        id: 2,
        eventName: "AI Magination",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `AI Magination is a creative, skill-driven event designed to test participants’ abilities in prompt engineering, visual analysis, storytelling, AI tool usage, and real-time synthesis. The event consists of two rounds, where participants accumulate points across both. The competition aims to encourage innovation, originality, and practical understanding of AI generation systems.

The event consists of two rounds, both contributing to the final score:

Round 1 : Trivia (Prompt Recreation Challenge)

Round 2 : Synthesis (Creation Challenge)

Team Size : 3-4
 
Round 1: (Trivia)
Task Overview
Participants will be shown a set of AI-generated images/media. Their objective is to observe each media item closely and write a prompt that can recreate a similar-looking output.

Round 2: Synthesis

Option A: Short Movie Generation (Sci-Fi (A1), Anime (A2), Emotional (A3))

Option B: Product Advertisement Generation
Option C: BrainRot Story Creation

For each option, problem statements will be provided on spot.
This round consists of a total of 100 points.

Option A Problem Statements will consist of 3 problem statements. The total achievable score of Anime is 100 points, SciFi is 95 points, Emotional is 85 points.

Option B will consist of one problem statement. Maximum achievable score is 85 points.

Option C will not consist of any actual problem statement. Some environment settings will be mentioned. Total achievable points is 80.

A total of 5 problem statements will be there to choose from.

It may include constraints or mandatory elements.

Participants must integrate these elements while retaining creative freedom.

Tool Usage
Participants are free to use:

Any image generation tools (e.g., Midjourney, DALL·E, Stable Diffusion)

Any video generation tools (e.g., Runway, Pika, Luma Dream Machine, etc.)

Any LLMs for scripting or refinement

There is no restriction to the number of tools used for creation.

 
Combined score from both rounds determines winners.
Total score attainable : 200 points
Support and Queries:

Event volunteers will be available to assist with logistics.

Technical help (e.g., internet issues) will be provided when possible.

For major doubts, contact the event coordinators.


Winners - Headphones + Certificates + Medals + Trophies.
First Runner Up - Speakers + Certificates + Medals + Trophies.
Second Runner Up - Mouse + Certificates + Medals + Trophies. 
Prizes will be given on the spot.

Arjun Aggarwal: 6280707215

Nehal Abbott: 6280339583`,
        registrationLink: "https://unstop.com/competitions/aimagination-indian-institute-of-technology-iit-ropar-1618935",
        minSize: 3,
        maxSize: 4,
        eventRuleBook: ""
      },
    ]
  },
  {
    clubName: "Mechanical",
    events: [
      {
        id: 1,
        eventName: "CoasterX",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Task
Create a roller coaster track that allows a marble to roll for the longest
time, and reach maximum height incorporating design creativity and
stability.

Objective:

Allows the marble to travel for the longest possible time
Achieves the maximum height during the marble’s journey
Maintains structural stability and smooth motion
Demonstrates innovation and creativity
Design Requirements:

The marble must start from a defined starting point and finish at a clearly marked end line
The track must include: At least one circular loop
The design must not include closed loops that bring the marble back to the start
The marble must stay on the track at all times; any derailment invalidates the run
The track must be free-standing and must not be fixed to any surface
Judging Criteria:

Innovation and Creativity – 10 points
Stability of the Track – 10 points
Height Achieved – 35 points
`,
        registrationLink: "https://unstop.com/events/coasterx-indian-institute-of-technology-iit-ropar-1618931",
        minSize: 2,
        maxSize: 4,
        eventRuleBook: ""
      },
    ]
  },
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
    clubName: "Enigma",
    events: [
      {
        id: 1,
        eventName: "SBT Quiz: sci biz tech quiz",
        eventImage: "",
        isRegistrationOpen: true,
        eventDate: "06/02/2026",
        eventTime: "03:00 PM",
        description: `Guidelines:

Team Size: 2-3 members
The Quiz is open to all.
Rules:

A written Prelims round would be conducted to shortlist 8 teams for the finals.
Tie between two or more teams will be settled by star marked questions.
The decision of the quiz master will be final and binding upon all participants.
The finals would be held in the bounce-pounce format and can be subject to change according to the Quiz Master’s wish.
Note:

In case of any discrepancy, the decision of the organizing committee will be final and binding
Participants are expected to maintain sportsmanship and fair play throughout the event.
Any form of cheating or unethical behavior will lead to disqualification of the team.`,
        registrationLink: "https://unstop.com/quiz/space-quiz-advitiya26-indian-institute-of-technology-iit-ropar-1618980",
        minSize: 2,
        maxSize: 3,
        eventRuleBook: ""
      },
    ]
  },
];

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
      await axios
        .post("/api/participant/createParticipant", formData)
        .then((response) => {
          toast.success("Registration Created Successfully");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
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
      {eventList.length > 0 ? (
        eventList.map((event) => (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-white font-bold relative text-center text-3xl p-4">
              {event.clubName}
            </h1>
            <EventCard events={event.events} />
          </div>
        ))
      ) : (
        <h3 className="text-6xl md:text-7xl font-bold mb-6 py-10">
          <span className="bg-linear-to-r from-green-400 via-green-400 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.8)] text-center justify-center mx-auto flex">
            Coming Soon...
          </span>
        </h3>
      )}
      {/* <EventRegistrationModal
        event={selectedEvent}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      /> */}
    </div>
  );
};

export default page;
