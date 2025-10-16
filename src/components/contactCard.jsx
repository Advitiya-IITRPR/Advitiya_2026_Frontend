import React from "react";
import { Mail, Linkedin } from "lucide-react";

const contactCards = ({ member }) => {
  const { name, position, image, linkedin, email } = member;

  return (
    <div className="relative w-54 h-64 bg-white dark:bg-gray-800 border-4 border-[#275a91] dark:border-[#e47b3c] rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl mx-4 my-6">
      {/* Default state content */}
      <div className="flex flex-col items-center justify-center h-full p-6 group-hover:opacity-0 transition-opacity duration-300">
        {/* Profile picture */}
        <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-2 border-[#275a91] dark:border-[#e47b3c]">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Name and position */}
        <h3 className="text-[#275a91] dark:text-[#e47b3c] text-xl font-bold text-center mb-2">
          {name}
        </h3>
        <p className="text-[#012a61] dark:text-[#ed9e6f] text-center font-medium">{position}</p>
      </div>

      {/* Hover state content */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Expanded background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${image})`, width: "100%", height: "100%" }}
        >
          {/* Overlay for better icon visibility */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-10"></div>
        </div>

        {/* Icons container - moved outside the background div */}
        <div className="absolute inset-0 flex items-center justify-center space-x-8 z-20">
          {/* Email icon */}
          <a
            href={`mailto:${email}`}
            className="p-3 bg-white dark:bg-[#ed9e6f] bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 hover:scale-110 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-6 h-6 text-[#275a91] dark:text-[#021334]" />
          </a>

          {/* LinkedIn icon */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white dark:bg-[#ed9e6f] bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 hover:scale-110 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="w-6 h-6 text-[#275a91] dark:text-[#021334]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default contactCards;