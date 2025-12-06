"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {/* Menu Text */}
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:opacity-90 dark:text-white"
      >
        {item}
      </motion.p>

      {/* Dropdown */}
      {active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={transition}
          className="absolute top-[calc(100%+1rem)] left-1/2 -translate-x-1/2 pt-4"
        >
          <motion.div
            layoutId="active"
            transition={transition}
            className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl 
                       overflow-hidden border border-black/20 dark:border-white/20 shadow-xl"
          >
            <motion.div layout className="w-max h-full p-4">
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full bg-blue-200 dark:bg-black 
                 border border-transparent dark:border-white/20 
                 shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-3 items-start">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="rounded-md shadow-2xl object-cover"
      />

      <div>
        <h4 className="text-xl font-bold text-black dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm max-w-[10rem]">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white"
    >
      {children}
    </a>
  );
};
