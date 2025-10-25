import React from "react";
import Footer from "@/components/Footer";

const CA = () => {
  return (
    <div className="relative min-h-screen bg-transparent text-white">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-6 py-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full">
            <span className="text-sm font-medium text-cyan-300">
              HOME • CAMPUS AMBASSADOR
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            CAMPUS
            <br />
            AMBASSADOR
          </h1>

          <div className="flex flex-col items-center mt-12 space-y-8">
            <div className="relative w-full max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-xl opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 md:p-8">
                <p className="text-base md:text-lg leading-relaxed text-gray-200">
                  Being our Campus Ambassador is just one step away. Register
                  now to be a part of the ADVITIYA family and get a chance to
                  represent your college at the national level.
                </p>
              </div>
            </div>

            <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center my-16">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="mx-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rotate-45"></div>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>

      {/* Role Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-cyan-400 mb-4">ROLE</h2>
            <h3 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ROLE
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Role Card 1 - You Ideate */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-500/60 transition-all duration-300">
                <div className="mb-6">
                  <span className="text-7xl font-bold bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent opacity-60">
                    01
                  </span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-cyan-300">
                  YOU IDEATE
                </h4>
                <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-xl mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                    alt="Ideate"
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                <p className="text-gray-300 text-sm">
                  Generate innovative ideas and strategies to promote ADVITIYA
                </p>
              </div>
            </div>

            {/* Role Card 2 - You Promote */}
            <div className="group relative md:mt-12">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 hover:border-purple-500/60 transition-all duration-300">
                <div className="mb-6">
                  <span className="text-7xl font-bold bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent opacity-60">
                    02
                  </span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-purple-300">
                  YOU PROMOTE
                </h4>
                <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop"
                    alt="Promote"
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                <p className="text-gray-300 text-sm">
                  Spread awareness and excitement about ADVITIYA across your
                  campus
                </p>
              </div>
            </div>

            {/* Role Card 3 - You Engage */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8 hover:border-pink-500/60 transition-all duration-300">
                <div className="mb-6">
                  <span className="text-7xl font-bold bg-gradient-to-br from-pink-400 to-cyan-500 bg-clip-text text-transparent opacity-60">
                    03
                  </span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-pink-300">
                  YOU ENGAGE
                </h4>
                <div className="aspect-video bg-gradient-to-br from-pink-900/30 to-cyan-900/30 rounded-xl mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop"
                    alt="Engage"
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                <p className="text-gray-300 text-sm">
                  Connect with students and build a strong community around the
                  event
                </p>
              </div>
            </div>

            {/* Role Card 4 - You Represent */}
            <div className="group relative md:col-start-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-500/60 transition-all duration-300">
                <div className="mb-6">
                  <span className="text-7xl font-bold bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent opacity-60">
                    04
                  </span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-cyan-300">
                  YOU REPRESENT
                </h4>
                <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-xl mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop"
                    alt="Represent"
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                <p className="text-gray-300 text-sm">
                  Be the face of your college at ADVITIYA's national platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center my-16">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="mx-4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rotate-45"></div>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
      </div>

      {/* Perks Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              PERKS
            </h2>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center mb-16">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            <div className="mx-3 w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-purple-500 rotate-45"></div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Perk 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/50 backdrop-blur-md border-2 border-cyan-500/40 rounded-2xl p-8 hover:border-cyan-500/70 transition-all duration-300">
                <h4 className="text-2xl font-bold mb-3 text-cyan-300">
                  Certificates of Appreciation
                </h4>
                <p className="text-gray-300">
                  Recognizing your efforts and contributions.
                </p>
              </div>
            </div>

            {/* Perk 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/50 backdrop-blur-md border-2 border-purple-500/40 rounded-2xl p-8 hover:border-purple-500/70 transition-all duration-300">
                <h4 className="text-2xl font-bold mb-3 text-purple-300">
                  Exclusive ADVITIYA Merchandise
                </h4>
                <p className="text-gray-300">
                  Hoodies, T-shirts, and goodies to flaunt your association.
                </p>
              </div>
            </div>

            {/* Perk 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/50 backdrop-blur-md border-2 border-pink-500/40 rounded-2xl p-8 hover:border-pink-500/70 transition-all duration-300">
                <h4 className="text-2xl font-bold mb-3 text-pink-300">
                  Free Passes
                </h4>
                <p className="text-gray-300">
                  Get complimentary access to workshops, sessions, and events.
                </p>
              </div>
            </div>

            {/* Perk 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-600/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/50 backdrop-blur-md border-2 border-cyan-500/40 rounded-2xl p-8 hover:border-cyan-500/70 transition-all duration-300">
                <h4 className="text-2xl font-bold mb-3 text-cyan-300">
                  Exciting Rewards
                </h4>
                <p className="text-gray-300">
                  Win prizes and incentives based on milestone achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-black/60 backdrop-blur-md border border-cyan-500/40 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Ready to Make an Impact?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Join us in creating an unforgettable experience and represent
                your college on a national stage.
              </p>
              <button className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CA;
