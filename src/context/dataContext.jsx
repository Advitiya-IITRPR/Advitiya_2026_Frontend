"use client";
import { createContext, useState, useEffect } from "react";
import { OCsData, headsData, coheadsData } from "./teamData";
import { eventData } from "./eventData";
import axios from "axios";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const [OCs, setOCs] = useState(OCsData);
  const [heads, setHeads] = useState(headsData);
  const [coheads, setcoheads] = useState(coheadsData);

  const [events, setEvents] = useState(eventData);

  // useEffect(() => {
  //   const getEvents = async () => {
  //     try {
  //       const baseUrl =
  //         process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
  //       const response = await axios.get(`${baseUrl}/events/getAllEventList`);
  //       if (response.data.success) {
  //         setEvents(response.data.eventsList);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     } finally {
  //       console.log(events);
  //     }
  //   };

  //   getEvents();
  // }, []);

  // Values to be provided to all child components
  const value = {
    OCs,
    heads,
    coheads,
    events,
    teamMembers: [...heads, ...coheads],
  };
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};
