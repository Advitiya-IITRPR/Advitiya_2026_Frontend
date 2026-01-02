"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Background from "@/components/BackgroundEvent";
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

const merchandiseList = [
  {
    title: "Advitiya T-Shirt White",
    src: "/merchandise/Advitiya_TShirt1.png",
    description: "Rs 349",
    ctaText: "Order Now",
    ctaLink: "https://docs.google.com/forms/d/e/1FAIpQLSftGIgeis0G31Ck6hGGIPwv49ppwOPrEGyECwrjXm43_UvHwg/viewform?usp=sharing&ouid=102438842226303481541",
    content: () => {
      return <Image
        src="/merchandise/T_Shirt_Size.png"
        alt="Advitiya T-Shirt Size"
        width={800}
        height={1600}
        sizes="(max-width: 768px) 100vw, 500px"
        className="w-full h-auto object-contain rounded-lg"
      />
    },
  },
  {
    title: "Advitiya T-Shirt Black",
    src: "/merchandise/Advitiya_TShirt2.png",
    description: "Rs 349",
    ctaText: "Order Now",
    ctaLink: "https://docs.google.com/forms/d/e/1FAIpQLSftGIgeis0G31Ck6hGGIPwv49ppwOPrEGyECwrjXm43_UvHwg/viewform?usp=sharing&ouid=102438842226303481541",
    content: () => {
      return <Image
        src="/merchandise/T_Shirt_Size.png"
        alt="Advitiya T-Shirt Size"
        width={800}
        height={1600}
        sizes="(max-width: 768px) 100vw, 500px"
        className="w-full h-auto object-contain rounded-lg"
      />
    },
  },
  {
    title: "Advitiya Hoodie Black",
    src: "/merchandise/Advitiya_Hoodie2.png",
    description: "Rs 749",
    ctaText: "Order Now",
    ctaLink: "https://docs.google.com/forms/d/e/1FAIpQLSd14zNmvLeM2eP5RgjA819bzABeeD_6ul1xljBtTZwSko-zXA/viewform?usp=header",
    content: () => {
      return <Image
        src="/merchandise/Hoodie_Size.png"
        alt="Advitiya Hoodie Size"
        width={800}
        height={1600}
        sizes="(max-width: 768px) 100vw, 500px"
        className="w-full h-auto object-contain rounded-lg"
      />
    },
  },
  {
    title: "Advitiya Hoodie White",
    src: "/merchandise/Advitiya_Hoodie1.png",
    description: "Rs 749",
    ctaText: "Order Now",
    ctaLink: "https://docs.google.com/forms/d/e/1FAIpQLSd14zNmvLeM2eP5RgjA819bzABeeD_6ul1xljBtTZwSko-zXA/viewform?usp=header",
    content: () => {
      return (
        <Image
          src="/merchandise/Hoodie_Size.png"
          alt="Advitiya Hoodie Size"
          width={800}
          height={1600}
          sizes="(max-width: 768px) 100vw, 500px"
          className="w-full h-auto object-contain rounded-lg"
        />

      )
    },
  },
];

function MerchandisePage() {
  const [active, setActive] = useState<
    (typeof merchandiseList)[number] | boolean | null
  >(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
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


  // return (
  //   <>
  //     <main className="relative min-h-screen">
  //       {/* <StarsBackground/> */}
  //       <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
  //         <StarsBackground className="w-full h-full" showShootingStars={true} />
  //       </div>
  //       <h1 className="relative z-10 mt-34 text-center justify-center font-bold text-5xl mb-5 text-white">
  //         Coming Soon...
  //       </h1>

  //     </main>
  //   </>
  // );

  return (
    <>
      <main className="relative min-h-screen">
        {/* Background */}
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
          <StarsBackground className="w-full h-full" showShootingStars={true} />
        </div>

        <h1 className="relative z-10 mt-34 text-center justify-center font-bold text-5xl mb-5 text-white">
          Buy Our Merchandise
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

                  {/* Hoodie Image (scaled down) */}
                  <motion.div layoutId={`image-${active.title}-${id}`}>
                    <img
                      src={active.src}
                      alt={active.title}
                      className="w-full h-auto max-h-[40vh] object-contain sm:rounded-t-3xl"
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
                        className="text-neutral-600 dark:text-neutral-400 text-base"
                      >
                        {active.description}
                      </motion.p>
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

                  {/* Scrollable area for hoodie + size chart */}
                  <div className="px-4 pb-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {/* Hoodie image again (scrollable version) */}

                    {/* Size chart */}
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
          {merchandiseList.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Image
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
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </main>
    </>
  );


}

export default MerchandisePage;
