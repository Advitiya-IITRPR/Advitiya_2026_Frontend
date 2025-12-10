// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu,
//   X,
//   Home,
//   Calendar,
//   Users,
//   Trophy,
//   Mail,
//   MicVocal,
//   UserPlus,
//   Sparkles
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function NavigationBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeItem, setActiveItem] = useState("");
//   const { data: session } = useSession()
//   const router = useRouter()


//   const Logout = async () => {
//     console.log("Enter")

//     await signOut({ redirect: false, callbackUrl: '/' })
//       .then(() => {
//         toast.success("User Logout Successfully")
//         setTimeout(() => {
//           router.push('/')
//         }, 1000);
//       })
//       .catch((error) => {
//         toast.error("Error while Logout", {
//           description: error.message
//         })
//       })
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const navItems = [
//     { name: "Home", href: "/", icon: Home },
//     { name: "Events", href: "/events", icon: Calendar },
//     { name: "Our Team", href: "/our-team", icon: Users },
//     { name: "Sponsors", href: "/#sponsors", icon: Trophy },
//     { name: "Contact Us", href: "/contact", icon: Mail },
//     { name: "CA", href: "/ca", icon: MicVocal },
//     { name: "Prefest", href: "/prefest", icon: Sparkles },
//   ];

//   return (
//     <>
//       <style jsx global>{`
//         .glass-nav {
//           background: rgba(10, 10, 30, 0.75);
//           backdrop-filter: blur(20px);
//           border-bottom: 1px solid rgba(99, 102, 241, 0.2);
//           box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//         }
        
//         .nav-item {
//           position: relative;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }
        
//         .nav-item::after {
//           content: '';
//           position: absolute;
//           bottom: -8px;
//           left: 50%;
//           transform: translateX(-50%) scaleX(0);
//           width: 100%;
//           height: 3px;
//           background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899);
//           border-radius: 2px;
//           transition: transform 0.3s ease;
//         }
        
//         .nav-item:hover::after {
//           transform: translateX(-50%) scaleX(1);
//         }
        
//         .nav-item-active::after {
//           transform: translateX(-50%) scaleX(0.7);
//         }
        
//         .gradient-button {
//           background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%);
//           background-size: 200% 200%;
//           animation: gradient-shift 3s ease infinite;
//           position: relative;
//           overflow: hidden;
//         }
        
//         @keyframes gradient-shift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
        
//         .gradient-button::before {
//           content: '';
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           width: 0;
//           height: 0;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.3);
//           transition: width 0.6s, height 0.6s;
//         }
        
//         .gradient-button:hover::before {
//           width: 300px;
//           height: 300px;
//         }
        
//         .gradient-button span {
//           position: relative;
//           z-index: 1;
//         }
        
//         .logo-glow {
//           filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.6));
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }
        
//         .logo-glow:hover {
//           filter: drop-shadow(0 0 40px rgba(139, 92, 246, 0.9)) 
//                   drop-shadow(0 0 20px rgba(6, 182, 212, 0.7));
//         }
        
//         .login-button {
//           position: relative;
//           border: 2px solid transparent;
//           background: linear-gradient(rgba(10, 10, 30, 0.9), rgba(10, 10, 30, 0.9)) padding-box,
//                       linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899) border-box;
//           transition: all 0.3s ease;
//         }
        
//         .login-button:hover {
//           background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%);
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
//         }

//         .icon-float {
//           display: inline-block;
//           transition: transform 0.3s ease;
//         }
        
//         .nav-item:hover .icon-float {
//           transform: translateY(-3px);
//         }
//       `}</style>

//       <motion.nav
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "glass-nav py-2" : "bg-transparent py-4"
//           }`}
//       >
//         {/* --- Centered container --- */}
//         <div className="max-w-[98%] mx-auto flex justify-between items-center px-4">
//           {/* --- Left Logo --- */}
//           <Link href="/" className="flex items-center">
//             <motion.span
//               className="text-3xl md:text-4xl font-bold gradient-text"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//             >
//               {/* LOGO */}
//               <Image
//                 src="/logo.png"
//                 alt="Advitiya Logo"
//                 width={100}
//                 height={100}
//               />
//             </motion.span>
//           </Link>

//           {/* --- Desktop Menu with significant spacing --- */}
//           <div className="hidden lg:flex items-center gap-1 xl:gap-2">
//             {navItems.map((item, index) => (
//               <motion.a
//                 key={item.name}
//                 href={item.href}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05, duration: 0.4 }}
//                 onMouseEnter={() => setActiveItem(item.name)}
//                 onMouseLeave={() => setActiveItem("")}
//                 className={`nav-item ${activeItem === item.name ? 'nav-item-active' : ''} px-3 py-2 text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-sm xl:text-base font-medium group`}
//               >
//                 <motion.div 
//                   className="icon-float"
//                   whileHover={{ rotate: [0, -10, 10, -10, 0] }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <item.icon size={26} strokeWidth={2.5} className="group-hover:text-purple-400 transition-colors" />
//                 </motion.div>
//                 <span>{item.name}</span>
//               </motion.a>
//             ))}
//           </div>


//             {/* --- Register Now Button with balanced padding --- */}
//             {!session ? (
//               <div className="hidden lg:flex items-center gap-2.5">
//                 <a href="/registration">
//                   <motion.button
//                     whileHover={{ scale: 1.08, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="gradient-button px-5 py-2 rounded-full text-white font-semibold text-sm xl:text-base flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/60 transition-all"
//                   >
//                     <motion.div
//                       animate={{ rotate: [0, 360] }}
//                     >
//                       <UserPlus size={18} strokeWidth={2.5} />
//                     </motion.div>
//                     <span>Register</span>
//                   </motion.button>
//                 </a>

//                 <a href="/login">
//                   <motion.button
//                     whileHover={{ scale: 1.08, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="login-button px-5 py-2 rounded-full text-white font-semibold text-sm xl:text-base transition-all"
//                   >
//                     <span>Login</span>
//                   </motion.button>
//                 </a>
//               </div>
//             ) : (
//               <div className="flex justify-center items-center gap-x-2">
//                 {/* Profile Button */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                 >
//                   <Link
//                     href={`profile/${session.user.id}`}
//                     className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl flex items-center justify-center"
//                     style={{ padding: "12px 24px", gap: "10px" }}
//                   >
//                     <UserPlus size={22} />
//                     <span>Profile</span>
//                   </Link>
//                 </motion.div>

//                 {/* Logout Button */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.7 }}
//                 >
//                   <div
//                     className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-xl flex items-center justify-center hover:cursor-pointer"
//                     style={{ padding: "12px 24px", gap: "10px" }}
//                     onClick={() => Logout()}
//                   >
//                     <span>Logout</span>
//                   </div>
//                 </motion.div>
//               </div>
//             )}
          

//           {/* --- Mobile Toggle Button --- */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-white p-2"
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* --- Mobile Menu --- */}
//         <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black/85 backdrop-blur-md z-40 lg:hidden"
//               onClick={() => setIsOpen(false)}
//             />

//             <motion.div
//               initial={{ opacity: 0, x: "100%" }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: "100%" }}
//               transition={{ duration: 0.4, ease: "easeInOut" }}
//               className="fixed top-0 right-0 h-full w-[85%] max-w-md z-50 lg:hidden"
//             >
//               <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900 backdrop-blur-xl p-6 pt-20 flex flex-col space-y-1 overflow-y-auto border-l-2 border-purple-500/40">
//                 {navItems.map((item, index) => (
//                   <motion.div
//                     key={item.name}
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.08 }}
//                   >
//                     <a
//                       href={item.href}
//                       onClick={() => setIsOpen(false)}
//                       className="text-white hover:text-cyan-300 hover:bg-white/5 transition-all flex items-center gap-4 text-lg font-semibold py-4 px-4 rounded-lg border-b border-white/10 group"
//                     >
//                       <motion.div
//                         whileHover={{ scale: 1.2, rotate: 360 }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         <item.icon size={22} strokeWidth={2.5} className="group-hover:text-purple-400" />
//                       </motion.div>
//                       <span>{item.name}</span>
//                     </a>
//                   </motion.div>
//                 ))}

//                   {!session ? (
//                     <div className="space-y-2">
//                       {/* Register Button */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.5 }}
//                         className="pt-6"
//                       >
//                         <a
//                           href="/registration"
//                           className="gradient-button w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-500/40"
//                           onClick={() => setIsOpen(false)}
//                         >
//                           <UserPlus size={22} strokeWidth={2.5} />
//                           <span>Register Now</span>
//                         </a>
//                       </motion.div>

//                       {/* Login Button */}
//                       <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                 >
//                   <a
//                     href="/login"
//                     className="login-button w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center transition-all"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <span>Login</span>
//                   </a>
//                 </motion.div>
//                     </div>
//                   ) : (
//                     <div className="space-y-2">
//                       {/* Profile Button */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.6 }}
//                       >
//                         <Link
//                           href={`profile/${session.user.id}`}
//                           className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl flex items-center justify-center mt-6"
//                           style={{ padding: "12px 24px", gap: "10px" }}
//                         >
//                           <UserPlus size={22} />
//                           <span>Profile</span>
//                         </Link>
//                       </motion.div>

//                       {/* Login Button */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.7 }}
//                       >
//                         <div
//                           className="w-full pt-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-xl flex items-center justify-center"
//                           style={{ padding: "12px 24px", gap: "10px" }}
//                           onClick={() => Logout()}
//                         >
//                           <span>Logout</span>
//                         </div>
//                       </motion.div>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Calendar,
  Users,
  Trophy,
  Mail,
  MicVocal,
  UserPlus,
  Sparkles,
  User,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const Logout = async () => {
    console.log("Enter");

    await signOut({ redirect: false, callbackUrl: "/" })
      .then(() => {
        toast.success("User Logout Successfully");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Error while Logout", {
          description: error.message,
        });
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Our Team", href: "/our-team", icon: Users },
    { name: "Sponsors", href: "/#sponsors", icon: Trophy },
    { name: "Contact Us", href: "/contact", icon: Mail },
    { name: "CA", href: "/ca", icon: MicVocal },
    { name: "Prefest", href: "/prefest", icon: Sparkles },
  ];

  return (
    <>
      <style jsx global>{`
        .glass-nav {
          background: rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .nav-item {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899);
          border-radius: 2px;
          transition: transform 0.3s ease;
        }

        .nav-item:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        .nav-item-active::after {
          transform: translateX(-50%) scaleX(0.7);
        }

        .gradient-button {
          background: linear-gradient(
            135deg,
            #06b6d4 0%,
            #8b5cf6 50%,
            #ec4899 100%
          );
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          position: relative;
          overflow: hidden;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .gradient-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: width 0.6s, height 0.6s;
        }

        .gradient-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .gradient-button span {
          position: relative;
          z-index: 1;
        }

        .logo-glow {
          filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.6));
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .logo-glow:hover {
          filter: drop-shadow(0 0 40px rgba(139, 92, 246, 0.9))
            drop-shadow(0 0 20px rgba(6, 182, 212, 0.7));
        }

        .profile-button {
          position: relative;
          border: 2px solid transparent;
          background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))
              padding-box,
            linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899) border-box;
          transition: all 0.3s ease;
        }

        .profile-button:hover {
          background: linear-gradient(
            135deg,
            #06b6d4 0%,
            #8b5cf6 50%,
            #ec4899 100%
          );
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        }

        .icon-float {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .nav-item:hover .icon-float {
          transform: translateY(-3px);
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 200px;
          background: rgba(15, 15, 35, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          z-index: 100;
        }

        .dropdown-item {
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          transition: all 0.3s ease;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: rgba(139, 92, 246, 0.2);
          padding-left: 25px;
        }
      `}</style>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 glass-nav py-1.5`}
      >
        {/* --- Centered container --- */}
        <div className="max-w-[98%] mx-auto flex justify-between items-center px-4">
          {/* --- Left Logo --- */}
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-3xl md:text-4xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* LOGO */}
              <Image
                src="/logo.png"
                alt="Advitiya Logo"
                width={80}
                height={80}
              />
            </motion.span>
          </Link>

          {/* --- Desktop Menu with significant spacing --- */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem("")}
                className={`nav-item ${
                  activeItem === item.name ? "nav-item-active" : ""
                } px-2.5 py-1.5 text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-sm xl:text-base font-medium group`}
              >
                <motion.div
                  className="icon-float"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon
                    size={20}
                    strokeWidth={2.5}
                    className="group-hover:text-purple-400 transition-colors"
                  />
                </motion.div>
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* --- Profile Button with Dropdown --- */}
          {!session ? (
            <div
              className="hidden lg:flex items-center gap-2.5"
              ref={dropdownRef}
            >
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="profile-button px-4 py-1.5 rounded-full text-white font-semibold text-sm xl:text-base flex items-center gap-2 shadow-lg transition-all"
                >
                  <User size={16} strokeWidth={2.5} />
                  <span>Profile</span>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="profile-dropdown"
                    >
                      <a href="/login" className="dropdown-item">
                        <LogIn size={16} />
                        <span>Sign In</span>
                      </a>
                      <a href="/registration" className="dropdown-item">
                        <UserPlus size={16} />
                        <span>Sign Up</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-x-2">
              {/* Profile Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href={`profile/${session.user.id}`}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-sm flex items-center justify-center"
                  style={{ padding: "8px 20px", gap: "8px" }}
                >
                  <UserPlus size={18} />
                  <span>Profile</span>
                </Link>
              </motion.div>

              {/* Logout Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-sm flex items-center justify-center hover:cursor-pointer"
                  style={{ padding: "8px 20px", gap: "8px" }}
                  onClick={() => Logout()}
                >
                  <span>Logout</span>
                </div>
              </motion.div>
            </div>
          )}

          {/* --- Mobile Toggle Button --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* --- Mobile Menu --- */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/85 backdrop-blur-md z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-md z-50 lg:hidden"
              >
                <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900 backdrop-blur-xl p-6 pt-20 flex flex-col space-y-1 overflow-y-auto border-l-2 border-purple-500/40">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-cyan-300 hover:bg-white/5 transition-all flex items-center gap-4 text-lg font-semibold py-4 px-4 rounded-lg border-b border-white/10 group"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon
                            size={22}
                            strokeWidth={2.5}
                            className="group-hover:text-purple-400"
                          />
                        </motion.div>
                        <span>{item.name}</span>
                      </a>
                    </motion.div>
                  ))}

                  {!session ? (
                    <div className="space-y-2">
                      {/* Sign In Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="pt-6"
                      >
                        <a
                          href="/login"
                          className="gradient-button w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-500/40"
                          onClick={() => setIsOpen(false)}
                        >
                          <LogIn size={22} strokeWidth={2.5} />
                          <span>Sign In</span>
                        </a>
                      </motion.div>

                      {/* Sign Up Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <a
                          href="/registration"
                          className="profile-button w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          <UserPlus size={22} strokeWidth={2.5} />
                          <span>Sign Up</span>
                        </a>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Profile Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Link
                          href={`profile/${session.user.id}`}
                          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-xl flex items-center justify-center mt-6"
                          style={{ padding: "12px 24px", gap: "10px" }}
                        >
                          <UserPlus size={22} />
                          <span>Profile</span>
                        </Link>
                      </motion.div>

                      {/* Logout Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div
                          className="w-full pt-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-xl flex items-center justify-center"
                          style={{ padding: "12px 24px", gap: "10px" }}
                          onClick={() => Logout()}
                        >
                          <span>Logout</span>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}