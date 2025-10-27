"use client";
import React from "react";
import Background from "@/components/Background_ca";
import Link from "next/link";

const DecorativeDivider = ({
  colorFrom = "cyan-500",
  colorTo = "purple-500",
}) => (
  <div className="flex items-center justify-center my-12">
    <div
      className={`h-px w-24 bg-gradient-to-r from-transparent via-${colorFrom} to-transparent`}
    ></div>
    <div
      className={`mx-3 w-2.5 h-2.5 bg-gradient-to-r from-${colorFrom} to-${colorTo} rotate-45`}
    ></div>
    <div
      className={`h-px w-24 bg-gradient-to-r from-transparent via-${colorTo} to-transparent`}
    ></div>
  </div>
);

const CA = () => {
  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-visible">
      {/* ✅ overflow-hidden removed to prevent card clipping */}
      <Background />

      {/* HERO SECTION */}
      <section className="relative pt-20 sm:pt-20 pb-12 px-6 flex flex-col justify-center items-center">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-6 py-2 mb-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full">
            <span className="text-sm font-medium text-cyan-300">
              HOME • CAMPUS AMBASSADOR
            </span>
          </div>

          <h1
            className="font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight
            text-[clamp(2rem,5vw,4rem)] sm:text-[clamp(2.5rem,6vw,5rem)] md:text-[clamp(3rem,6.5vw,5.5rem)]"
          >
            CAMPUS
            <br />
            AMBASSADOR
          </h1>

          <div className="flex flex-col items-center mt-6 space-y-6">
            <div className="relative w-full max-w-3xl sm:max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-xl opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-5 sm:p-6">
                <p className="text-base sm:text-lg leading-relaxed text-gray-200 text-center">
                  Being our Campus Ambassador is just one step away. Register
                  now to be a part of the ADVITIYA family and get a chance to
                  represent your college at the national level.
                </p>
              </div>
            </div>

            <Link href="/contact">
              <button className="px-8 py-3 sm:py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <DecorativeDivider />

      {/* YOUR ROLE SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* ✅ improved contrast for title */}
            <h2 className="text-sm font-semibold text-cyan-300 mb-3 tracking-widest drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
              YOUR ROLE
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-200 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              YOUR ROLE
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
            {[
              {
                id: "01",
                color: "cyan",
                title: "YOU IDEATE",
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
                desc: "Generate innovative ideas and strategies to promote ADVITIYA.",
              },
              {
                id: "02",
                color: "purple",
                title: "YOU PROMOTE",
                img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
                desc: "Spread awareness and excitement about ADVITIYA across your campus.",
              },
              {
                id: "03",
                color: "pink",
                title: "YOU ENGAGE",
                img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
                desc: "Connect with students and build a strong community around the event.",
              },
              {
                id: "04",
                color: "cyan",
                title: "YOU REPRESENT",
                img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
                desc: "Be the face of your college at ADVITIYA's national platform",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="group relative w-full max-w-sm transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/20 rounded-3xl blur-xl group-hover:blur-2xl`}
                ></div>
                <div
                  className={`relative bg-black/40 backdrop-blur-md border border-${item.color}-500/30 rounded-3xl p-8 hover:border-${item.color}-500/60`}
                >
                  <div className="mb-6">
                    <span
                      className={`text-6xl sm:text-7xl font-bold bg-gradient-to-br from-${item.color}-400 to-${item.color}-500 bg-clip-text text-transparent opacity-70`}
                    >
                      {item.id}
                    </span>
                  </div>
                  <h4
                    className={`text-2xl font-bold mb-4 text-${item.color}-300`}
                  >
                    {item.title}
                  </h4>
                  <div className="aspect-video bg-gradient-to-br from-black/30 to-gray-800/30 rounded-xl mb-4 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <DecorativeDivider colorFrom="purple-500" colorTo="pink-500" />

      {/* PERKS SECTION */}
      <section className="py-16 px-6 pb-28">
        {/* ✅ extra bottom padding added */}
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-200 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            PERKS
          </h2>

          <div className="grid md:grid-cols-2 gap-10 justify-items-center">
            {[
              {
                title: "Certificates of Appreciation",
                desc: "Recognizing your efforts and contributions.",
                border: "border-cyan-500/40 hover:border-cyan-500/70",
                glow: "from-cyan-500/10 to-purple-600/10",
                text: "text-cyan-300",
              },
              {
                title: "Exclusive ADVITIYA Merchandise",
                desc: "Hoodies, T-shirts, and goodies to flaunt your association.",
                border: "border-purple-500/40 hover:border-purple-500/70",
                glow: "from-purple-500/10 to-pink-600/10",
                text: "text-purple-300",
              },
              {
                title: "Free Passes",
                desc: "Get complimentary access to workshops, sessions, and events.",
                border: "border-pink-500/40 hover:border-pink-500/70",
                glow: "from-pink-500/10 to-cyan-600/10",
                text: "text-pink-300",
              },
              {
                title: "Exciting Rewards",
                desc: "Win prizes and incentives based on milestone achievements.",
                border: "border-cyan-500/40 hover:border-cyan-500/70",
                glow: "from-cyan-500/10 to-pink-600/10",
                text: "text-cyan-300",
              },
            ].map((perk) => (
              <div key={perk.title} className="group relative w-full max-w-md">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${perk.glow} rounded-2xl blur-xl`}
                ></div>
                <div
                  className={`relative bg-black/50 backdrop-blur-md border-2 ${perk.border} rounded-2xl p-8 transition-all duration-300`}
                >
                  <h4 className={`text-2xl font-bold mb-3 ${perk.text}`}>
                    {perk.title}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CA;
