"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { StarsBackground } from "@/components/StarsBackground";
import Image from "next/image";

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const workshopsList = [
  {
    title: "Derivatives (Futures & Options) Workshop",
    src: "/Talk_Final.png",
    description: ``,
    date: "8th Feb 2026",
    time: "11AM onwards",
    instructor: "Mr. Saurabh Khanna",
    ctaText: "Register Now",
    ctaLink: "https://docs.google.com/forms/d/e/1FAIpQLSdMuVJGcfySjse0cg2Yp22TJY4kTtytD7vsoOdilQYBhoQIEA/viewform",
    content: () => {
      return (
        <div className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Educator Details::
          </h4>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Name: Mr. Saurabh Khanna</li>
            <li>Learning and Development Specialist</li>
            <li>Multi-Commodity Exchange of India Limited</li>

          </ul>
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Session Details:
          </h4>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Date: 8th Feb 2026</li>
            <li>Time: 11AM onwards</li>
            <li>Session Fee: Rs 150/-</li>
          </ul>
        </div>
      );
    },
  },
  
];

function WorkshopsPage() {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <main className="relative min-h-screen">
        {/* Background */}
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
          <StarsBackground className="w-full h-full" showShootingStars={true} />
        </div>

        <h1 className="relative z-10 mt-34 text-center justify-center font-bold text-5xl mb-5 text-white">
          Upcoming Workshops
        </h1>

        {/* Overlay (desktop only) */}
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-10 hidden sm:block"
            />
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {active && typeof active === "object" && (
            <div className="fixed inset-0 z-[100] grid place-items-center ">
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-[110]"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              {/* Modal Card */}
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-full md:max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              >
                {/* Scrollable content */}
                <div className="flex flex-col overflow-y-auto max-h-full">

                  {/* Workshop Image */}
                  <motion.div layoutId={`image-${active.title}-${id}`}>
                    <img
                      src={active.src}
                      alt={active.title}
                      width={500}
                      height={300}
                      className="w-full h-auto max-h-[40vh] object-cover sm:rounded-t-3xl"
                    />
                  </motion.div>

                  {/* Title + CTA */}
                  <div className="p-4 flex justify-between items-start gap-4">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-sm"
                      >
                        {active.description}
                      </motion.p>
                      {/* <div className="mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <p><span className="font-semibold">Date:</span> {active.date}</p>
                        <p><span className="font-semibold">Duration:</span> {active.time}</p>
                        <p><span className="font-semibold">Instructor:</span> {active.instructor}</p>
                      </div> */}
                    </div>
                    <motion.a
                      layout
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>

                  {/* Scrollable area for workshop details */}
                  <div className="px-4 pb-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Cards Grid */}
        <ul className="relative z-10 max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          {workshopsList.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-60 w-full rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-sm"
                  >
                    {card.description}
                  </motion.p>
                  <p className="text-neutral-500 dark:text-neutral-500 text-center text-xs mt-1">
                    {card.date} • {card.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </main>
    </>
  );
}

export default WorkshopsPage;