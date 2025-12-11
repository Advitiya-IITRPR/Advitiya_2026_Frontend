import React from "react";
import { Mail, Linkedin } from "lucide-react";

const contactCards = ({ member, isOC = false }) => {
  const { name, position, image, linkedin, email } = member;

  // Hardcoded themes: orange for OCs, purple for rest
  const orangeTheme = {
    border: "border-orange-400/60",
    shadow: "shadow-[0_0_20px_rgba(251,146,60,0.4)]",
    nameText: "text-orange-100",
    nameShadow: "drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]",
    iconBg: "bg-orange-500/90",
    iconHover: "hover:bg-orange-400",
    iconShadow: "shadow-orange-500/40",
    iconHoverShadow: "hover:shadow-[0_0_20px_rgba(251,146,60,0.8)]",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(251,146,60,0.4)]",
  };

  const magentaTheme = {
  border: "border-pink-400/60",
  shadow: "shadow-[0_0_20px_rgba(236,72,153,0.4)]",
  nameText: "text-pink-100",
  nameShadow: "drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]",
  iconBg: "bg-pink-500/90",
  iconHover: "hover:bg-pink-400",
  iconShadow: "shadow-pink-500/40",
  iconHoverShadow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.8)]",
  hoverGlow: "hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]",
};


  const purpleTheme = {
    border: "border-purple-400/60",
    shadow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    nameText: "text-purple-100",
    nameShadow: "drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]",
    iconBg: "bg-purple-500/90",
    iconHover: "hover:bg-purple-400",
    iconShadow: "shadow-purple-500/40",
    iconHoverShadow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]",
  };

  const theme = isOC ? magentaTheme : purpleTheme;

  return (
    <div
      className={`relative w-54 h-64 bg-black/60 backdrop-blur-lg border border-purple-400/40 rounded-xl overflow-hidden cursor-pointer mx-4 my-6 ${theme.hoverGlow}`}
    >
      <div className="flex flex-col items-center justify-center h-full p-6">
        {/* Profile picture */}
        <div
          className={`w-24 h-24 mb-4 overflow-hidden rounded-full border-2 ${theme.border} ${theme.shadow}`}
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Name */}
        <h3
          className={`${theme.nameText} text-xl font-bold text-center mb-2 ${theme.nameShadow}`}
        >
          {name}
        </h3>
        
        {/* Position */}
        <p className="text-gray-300 text-center font-medium mb-3">
          {position}
        </p>

        {/* Contact Icons */}
        <div className="flex items-center justify-center space-x-4">
          {/* Email icon */}
          <a
            href={`mailto:${email}`}
            className={`p-2 ${theme.iconBg} backdrop-blur-sm rounded-full ${theme.iconHover} shadow-lg ${theme.iconShadow} ${theme.iconHoverShadow}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-5 h-5 text-white" />
          </a>

          {/* LinkedIn icon */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 ${theme.iconBg} backdrop-blur-sm rounded-full ${theme.iconHover} shadow-lg ${theme.iconShadow} ${theme.iconHoverShadow}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default contactCards;
