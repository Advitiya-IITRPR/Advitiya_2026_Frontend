"use client";
import React from "react";

const Background = () => (
  <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
  </div>
);

const DecorativeDivider = ({
  colorFrom = "blue-400",
  colorTo = "purple-500",
}) => (
  <div className="flex items-center justify-center my-12">
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    <div className="mx-3 w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rotate-45 shadow-lg shadow-blue-400/50"></div>
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
  </div>
);

const Accommodation = () => {
  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-visible mt-20">
      <Background />

      {/* HERO SECTION */}
      <section className="relative pt-20 sm:pt-20 pb-12 px-6 flex flex-col justify-center items-center">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-6 py-2 mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/40 rounded-full shadow-lg shadow-blue-500/30">
            <span className="text-sm font-medium text-blue-300">
              HOME • ACCOMMODATION
            </span>
          </div>

          <h1 className="font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent leading-tight text-[clamp(2rem,5vw,4rem)] sm:text-[clamp(2.5rem,6vw,5rem)] md:text-[clamp(3rem,6.5vw,5.5rem)] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            ACCOMMODATION
          </h1>

          <div className="flex flex-col items-center mt-6 space-y-6">
            <div className="relative w-full max-w-3xl sm:max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-xl opacity-40"></div>
              <div className="relative bg-black/50 backdrop-blur-md border border-blue-400/40 rounded-lg p-5 sm:p-6 shadow-2xl shadow-blue-500/20">
                <p className="text-base sm:text-lg leading-relaxed text-gray-200 text-center">
                  Experience comfort and convenience during ADVITIYA. Book your
                  stay with us and enjoy hassle-free accommodation at affordable
                  rates.
                </p>
              </div>
            </div>

            <a href="https://forms.gle/ppBxdLcabXP9Xh1WA">
              <button className="px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-blue-400/30">
                Book Now
              </button>
            </a>
          </div>
        </div>
      </section>

      <DecorativeDivider />

      {/* PRICING SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-blue-300 mb-3 tracking-widest drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
              ACCOMMODATION PLANS
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(147,197,253,0.4)]">
              CHOOSE YOUR STAY
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
            {[
              {
                id: "01",
                days: "One Day",
                price: "₹200",
                color: "blue",
                features: [
                ],
                glow: "from-blue-500/30 to-blue-600/30",
                border: "border-blue-400/40 hover:border-blue-400/70",
              },
              {
                id: "02",
                days: "Two Days",
                price: "₹400",
                color: "purple",
                features: [
                ],
                glow: "from-purple-500/30 to-purple-600/30",
                border: "border-purple-400/40 hover:border-purple-400/70",
              },
              {
                id: "03",
                days: "Three Days",
                price: "₹600",
                color: "indigo",
                features: [
                ],
                glow: "from-indigo-500/30 to-indigo-600/30",
                border: "border-indigo-400/40 hover:border-indigo-400/70",
              },
            ].map((plan) => (
              <div
                key={plan.id}
                className="group relative w-full max-w-sm transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.glow} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300`}
                ></div>

                <div
                  className={`relative bg-black/60 backdrop-blur-md border-2 ${plan.border} rounded-3xl p-8 transition-all duration-300 shadow-2xl`}
                >
                  <div className="mb-4">
                    <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-blue-300 to-purple-500 bg-clip-text text-transparent opacity-80">
                      {plan.id}
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold mb-2 text-blue-300">
                    {plan.days}
                  </h4>

                  <div className="mb-6">
                    <span className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">
                      per person
                    </span>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-300"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DecorativeDivider colorFrom="purple-400" colorTo="indigo-500" />

      {/* SCHEDULE SECTION */}

      {/* IMPORTANT INFORMATION SECTION */}
      <section className="py-16 px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(147,197,253,0.4)]">
              IMPORTANT INFORMATION
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🏠",
                title: "Check-in & Check-out",
                desc: "Flexible timings based on event schedule. Early check-in available on request.",
                color: "blue",
              },
              {
                icon: "🛡️",
                title: "Security",
                desc: "24/7 security personnel and CCTV surveillance for your safety.",
                color: "purple",
              },
              {
                icon: "🍽️",
                title: "Meals",
                desc: "Basic meals can be arranged at an additional cost. Please inquire during booking.",
                color: "indigo",
              },
              {
                icon: "📋",
                title: "Requirements",
                desc: "Valid ID proof and college ID card mandatory at the time of check-in.",
                color: "blue",
              },
            ].map((info, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

                <div className="relative bg-black/50 backdrop-blur-md border border-blue-400/40 hover:border-blue-400/70 rounded-xl p-6 transition-all duration-300">
                  <div className="text-4xl mb-3">{info.icon}</div>
                  <h4 className="text-xl font-bold mb-2 text-blue-300">
                    {info.title}
                  </h4>
                  <p className="text-gray-300 text-sm">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accommodation;
