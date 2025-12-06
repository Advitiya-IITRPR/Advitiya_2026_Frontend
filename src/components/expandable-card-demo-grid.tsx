"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { LoaderOne } from "./ui/loader";
import Image from "next/image";

type EventType = {
  id: string;
  eventName: string;
  eventFees: number;
  isRegistrationOpen: boolean;
  minSize: number;
  maxSize: number;
  eventDateAndTime: Date;
  description: string;
  eventImage: string;
  webPageLink: string;
  eventRuleBook: string;
};

export function ExpandableCardDemo() {
  const [active, setActive] = useState<EventType | boolean | null>(null);
  const [eventList, setEventList] = useState<EventType[]>([]);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isToggleButtonDisabled, setIsToggleButtonDisabled] = useState(false);

  // Fetch event list
  useEffect(() => {
    async function getEventList() {
      setLoading(true);
      axios
        .get("/api/events/getAllEventList")
        .then((res) => {
          setEventList(res.data.data);
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Failed to load events");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getEventList();
  }, []);

  const changeRegistrationStatus = async (eventId: string) => {
    setIsToggleButtonDisabled(true);

    await axios
      .post(`/api/events/changeRegistrationOpenStatus/${eventId}`)
      .then(() => {
        toast.success("Event Registration Status changed successfully");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error updating status");
      })
      .finally(() => {
        setIsToggleButtonDisabled(false);
      });
  };

  // ESC key & body scroll lock
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow =
      active && typeof active === "object" ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const deleteEventPage = (eventId: string) => {
    axios
      .delete(`/api/events/deleteEvent/${eventId}`)
      .then(() => {
        toast.success("Event deleted successfully");
        setTimeout(() => router.refresh(), 500);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Delete failed");
      });
  };

  if (loading) {
    return (
      <div className="text-center justify-center">
        <LoaderOne />
      </div>
    );
  }

  if (eventList.length === 0) {
    return (
      <div className="text-center mt-2 italic text-xl">No Event Present</div>
    );
  }

  return (
    <>
      {/* Background overlay */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* EXPANDED CARD */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.eventName}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.eventName}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.eventName}-${id}`}>
                <Image
                  width={600}
                  height={400}
                  src={active.eventImage}
                  alt={active.eventName}
                  className="w-full h-80 object-cover object-top"
                />
              </motion.div>

              <div className="px-4">
                <div className="flex justify-between items-start px-4 py-2">
                  <motion.h3
                    layoutId={`title-${active.eventName}-${id}`}
                    className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                  >
                    {active.eventName}
                  </motion.h3>

                  <motion.a
                    layout
                    href={active.webPageLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    Visit Page
                  </motion.a>

                  <motion.button
                    layout
                    onClick={() => deleteEventPage(active.id)}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-red-500 text-white"
                  >
                    Delete Event
                  </motion.button>
                </div>

                {/* Registration toggle */}
                <div className="flex items-start gap-x-4">
                  <p>Registration Open:</p>

                  <button
                    disabled={isToggleButtonDisabled}
                    title={active.isRegistrationOpen ? "Close registration" : "Open registration"}
                    aria-label={active.isRegistrationOpen ? "Close registration" : "Open registration"}
                    onClick={async () => {
                      setIsToggleButtonDisabled(true);

                      await changeRegistrationStatus(active.id);

                      setActive((prev) => {
                        if (!prev || typeof prev !== "object") return prev;
                        return {
                          ...prev,
                          isRegistrationOpen: !prev.isRegistrationOpen,
                        };
                      });

                      setIsToggleButtonDisabled(false);
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      active.isRegistrationOpen ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        active.isRegistrationOpen
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>

                  <div>Event Fees: {active.eventFees}</div>
                </div>

                <div>Event Date: {new Date(active.eventDateAndTime).toDateString()}</div>
                <div>Event Time: {new Date(active.eventDateAndTime).toLocaleTimeString()}</div>

                <div>
                  Event RuleBook:
                  {active.eventRuleBook ? (
                    <a
                      href={active.eventRuleBook}
                      target="_blank"
                      className="text-blue-700"
                    >
                      {" "}
                      Link
                    </a>
                  ) : (
                    " No Rule Book"
                  )}
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base 
                      max-h-40 overflow-y-auto pb-4 pr-2 flex flex-col items-start gap-4 
                      dark:text-neutral-400"
                  >
                    {active.description}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* CARD GRID */}
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventList.map((card) => (
          <motion.div
            layoutId={`card-${card.eventName}-${id}`}
            key={card.id}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <motion.div layoutId={`image-${card.eventName}-${id}`}>
              <Image
                width={400}
                height={300}
                src={card.eventImage}
                alt={card.eventName}
                className="h-60 w-full rounded-lg object-cover object-top"
              />
            </motion.div>

            <div className="flex justify-center items-center flex-col">
              <motion.h3
                layoutId={`title-${card.eventName}-${id}`}
                className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base"
              >
                {card.eventName}
              </motion.h3>

              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-center text-base overflow-hidden h-5"
              >
                {card.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
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
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
