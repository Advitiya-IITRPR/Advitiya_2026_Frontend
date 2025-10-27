import React, { useState, useEffect, useRef } from "react";
import { Calendar, Award, X, MapPin } from "lucide-react";

// Hardcoded events data based on the sample
const eventsData = [
  {
    id: "5c3011cc-9737-41de-aa54-cfefaeb502cf",
    eventName: "TedX",
    eventDateAndTime: "2025-09-30T04:30:00.000Z",
    eventFees: 67,
    minSize: 1,
    maxSize: 3,
    isRegistrationOpen: false,
    eventImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-vZ36EMCcxCAnTra0bNj1JfXsWvWZO74cQ&s",
    description: "This is the tedx event of iit ropar",
    webPageLink: "localhost:3000/contact",
    venue: "IIT Ropar",
  },
  {
    id: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    eventName: "Hackathon 2025",
    eventDateAndTime: "2025-10-15T10:00:00.000Z",
    eventFees: 100,
    minSize: 2,
    maxSize: 4,
    isRegistrationOpen: true,
    eventImage:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop&crop=entropy&auto=format",
    description:
      "Join us for an intensive 24-hour coding marathon where innovation meets creativity",
    webPageLink: "localhost:3000/hackathon",
    venue: "IIT Ropar",
  },
  {
    id: "b2c3d4e5-6789-01bc-def1-234567890abc",
    eventName: "Cultural Night",
    eventDateAndTime: "2025-10-20T18:00:00.000Z",
    eventFees: 50,
    minSize: 1,
    maxSize: 5,
    isRegistrationOpen: true,
    eventImage:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&crop=entropy&auto=format",
    description:
      "Experience an evening of music, dance, and cultural performances from around the world",
    webPageLink: "localhost:3000/cultural",
    venue: "IIT Ropar",
  },
  {
    id: "c3d4e5f6-7890-12cd-ef12-34567890abcd",
    eventName: "Gaming Tournament",
    eventDateAndTime: "2025-11-05T12:00:00.000Z",
    eventFees: 150,
    minSize: 1,
    maxSize: 1,
    isRegistrationOpen: true,
    eventImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop&crop=entropy&auto=format",
    description:
      "Battle it out in the ultimate esports tournament with massive prize pools",
    webPageLink: "localhost:3000/gaming",
    venue: "IIT Ropar",
  },
  {
    id: "d4e5f6g7-8901-23de-f123-4567890abcde",
    eventName: "Business Conclave",
    eventDateAndTime: "2025-11-12T09:00:00.000Z",
    eventFees: 200,
    minSize: 2,
    maxSize: 3,
    isRegistrationOpen: false,
    eventImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&crop=entropy&auto=format",
    description:
      "Network with industry leaders and showcase your entrepreneurial ideas",
    webPageLink: "localhost:3000/business",
    venue: "IIT Ropar",
  },
  {
    id: "e5f6g7h8-9012-34ef-1234-567890abcdef",
    eventName: "Design Workshop",
    eventDateAndTime: "2025-11-18T14:00:00.000Z",
    eventFees: 80,
    minSize: 1,
    maxSize: 2,
    isRegistrationOpen: true,
    eventImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop&crop=entropy&auto=format",
    description:
      "Learn from industry experts and create stunning visual designs",
    webPageLink: "localhost:3000/design",
    venue: "IIT Ropar",
  },
];

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

const getGradientColor = (index) => {
  const gradients = [
    "from-cyan-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-yellow-500 to-orange-500",
  ];
  return gradients[index % gradients.length];
};

export default function EventsSection() {
  const [active, setActive] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActive(null);
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  return (
    <section id="events" className="w-full py-12 sm:py-16 lg:py-20 relative">
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Modal Overlay and Content */}
          {active && (
            <>
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn" />
              <div className="fixed inset-0 grid place-items-center z-50 p-4 animate-fadeIn">
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-6 right-6 lg:hidden flex items-center justify-center bg-white rounded-full h-8 w-8 hover:bg-gray-100 transition-colors z-10"
                >
                  <X className="h-4 w-4 text-black" />
                </button>

                <div
                  ref={modalRef}
                  className="w-full max-w-[700px] max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden m-4 shadow-2xl animate-scaleIn"
                >
                  <div className="flex-none">
                    <img
                      src={active.eventImage}
                      alt={active.eventName}
                      className="w-full h-44 object-cover"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col min-h-0 overflow-auto">
                    <div className="text-center mb-4">
                      <h3 className="font-bold text-neutral-700 dark:text-neutral-200 text-2xl mb-2">
                        {active.eventName}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        {active.description}
                      </p>
                    </div>

                    {active.webPageLink && (
                      <div className="text-center mb-4 px-4">
                        <a
                          href="/login" // Changed to login route
                          className={`inline-block px-8 py-3 text-sm rounded-full font-bold bg-gradient-to-r ${getGradientColor(
                            eventsData.findIndex((e) => e.id === active.id)
                          )} text-white hover:shadow-lg transition-all hover:scale-105`}
                        >
                          Register Now
                        </a>
                      </div>
                    )}

                    <div className="space-y-4 text-center">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center justify-center gap-2">
                          <Calendar size={16} className="text-cyan-400" />
                          <span className="text-sm">
                            {formatDateTime(active.eventDateAndTime)}
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <MapPin size={16} className="text-pink-400" />
                          <span className="text-sm">{active.venue}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Award size={16} className="text-yellow-400" />
                          <span className="text-sm">Prize Pool TBA</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <h4 className="font-semibold text-neutral-700 dark:text-neutral-300">
                          Event Details:
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Team Size:</strong> {active.minSize} -{" "}
                            {active.maxSize} members
                          </p>
                          <p>
                            <strong>Entry Fees:</strong> ₹{active.eventFees}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Header */}
          <div className="w-full flex flex-col items-center text-center animate-fadeIn">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              Events
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed px-4 text-center drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-medium">
              FLAGSHIP EVENTS ACROSS DIVERSE CATEGORIES
            </p>
          </div>

          {/* Events Grid */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-none items-stretch">
              {eventsData.map((event, index) => {
                const gradient = getGradientColor(index);
                return (
                  <div
                    key={event.id}
                    onClick={() => setActive(event)}
                    className="group cursor-pointer w-full h-full animate-fadeInUp"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-xl backdrop-blur-lg bg-black/60 border border-purple-400/40 p-0 hover:bg-black/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 flex flex-col h-full">
                      <div className="flex-none overflow-hidden">
                        <img
                          src={event.eventImage}
                          alt={event.eventName}
                          className="w-full h-44 rounded-t-lg object-cover object-center group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 flex flex-col items-center text-center justify-between p-4 min-h-0">
                        <div className="w-full">
                          <h3 className="font-bold text-cyan-100 text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] mb-3">
                            {event.eventName}
                          </h3>

                          <p className="text-cyan-50 mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] text-sm line-clamp-3">
                            {event.description}
                          </p>

                          <div className="flex flex-col items-center gap-2 text-cyan-100 text-sm mb-4">
                            <div className="flex items-center justify-center gap-2">
                              <Calendar
                                size={16}
                                className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,1)]"
                              />
                              <span>
                                {formatDateTime(event.eventDateAndTime)}
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-cyan-200">
                              <MapPin
                                size={16}
                                className="text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,1)]"
                              />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        </div>

                        <div className="w-full mt-3">
                          <div className="grid grid-cols-2 gap-3 w-full mb-2 text-sm">
                            <div className="text-center p-3 rounded bg-black/40 border border-cyan-400/30">
                              <div className="text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                                ₹{event.eventFees}
                              </div>
                              <div className="text-cyan-100 text-xs">
                                Entry Fee
                              </div>
                            </div>
                            <div className="text-center p-3 rounded bg-black/40 border border-yellow-400/30">
                              <div className="text-yellow-300 font-semibold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                                Prize Pool
                              </div>
                              <div className="text-cyan-100 text-xs">TBA</div>
                            </div>
                          </div>
                          <p className="text-cyan-200 text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mt-2">
                            Click to view details
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Info */}
          <div
            className="w-full flex flex-col items-center text-center animate-fadeIn"
            style={{ animationDelay: "1100ms" }}
          >
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-cyan-100 text-base sm:text-lg mb-6 mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Click on any event card to explore detailed information,
                schedules, and registration links
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm text-cyan-200 flex-wrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                <span>• Interactive details</span>
                <span>• Real-time registration</span>
                <span>• Prize breakdown</span>
                <span>• Venue information</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
