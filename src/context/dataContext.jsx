"use client";
import { createContext, useState, useEffect } from "react";
import { OCsData, headsData, coheadsData } from "./teamData";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  
  const [OCs, setOCs] = useState(OCsData)
  const [heads, setHeads] = useState(headsData)
  const [coheads, setcoheads] = useState(coheadsData)

  // Values to be provided to all child components
  const value = {
    OCs,
    heads,
    coheads,
    teamMembers: [...heads, ...coheads],
  };
  return (
    <dataContext.Provider value={value}>{children}</dataContext.Provider>
  );
};
