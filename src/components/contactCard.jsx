import React from "react";
import { Mail, Linkedin } from "lucide-react";

const contactCards = ({ member }) => {
  const { name, position, image, linkedin, email } = member;

  return (
    <div className="relative w-54 h-64 bg-black/60 backdrop-blur-lg border border-purple-400/40 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 mx-4 my-6 hover:bg-black/70">
      {/* Default state content */}
      <div className="flex flex-col items-center justify-center h-full p-6 group-hover:opacity-0 transition-opacity duration-300">
        {/* Profile picture */}
        <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Name and position */}
        <h3 className="text-cyan-100 text-xl font-bold text-center mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          {name}
        </h3>
        <p className="text-cyan-50 text-center font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{position}</p>
      </div>

      {/* Hover state content */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Expanded background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${image})`, width: "100%", height: "100%" }}
        >
          {/* Overlay for better icon visibility */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>

        {/* Icons container - moved outside the background div */}
        <div className="absolute inset-0 flex items-center justify-center space-x-8 z-20">
          {/* Email icon */}
          <a
            href={`mailto:${email}`}
            className="p-3 bg-cyan-500/90 backdrop-blur-sm rounded-full hover:bg-cyan-400 transition-all duration-200 hover:scale-110 shadow-lg shadow-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-6 h-6 text-white" />
          </a>

          {/* LinkedIn icon */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-500/90 backdrop-blur-sm rounded-full hover:bg-blue-400 transition-all duration-200 hover:scale-110 shadow-lg shadow-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default contactCards;