// // components/CookieConsent.tsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { FiCheck, FiShield } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router";

// export default function CookieConsent() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showBanner, setShowBanner] = useState(false);
//   const [isHomePage, setIsHomePage] = useState(false);
//   const [hasConsent, setHasConsent] = useState(false);
//   const [pageFullyLoaded, setPageFullyLoaded] = useState(false);

//   // Check for consent on mount
//   useEffect(() => {
//     const consent = localStorage.getItem("cookie-consent");
//     if (consent) {
//       setHasConsent(true);
//       setShowBanner(false);
//       return;
//     }

//     const path = window.location.pathname;
//     setIsHomePage(path === "/" || path === "");

//     // Block navigation to other pages
//     const allowedPaths = ["/", "/privacy-policy", "/cookie-policy"];
//     if (!allowedPaths.includes(path) && !consent) {
//       navigate("/");
//     }
//   }, [location.pathname, navigate]);

//   // Wait for FULL page load (including videos, images, etc.)
//   useEffect(() => {
//     // Check if page is already fully loaded
//     if (document.readyState === 'complete') {
//       setPageFullyLoaded(true);
//       return;
//     }

//     // Wait for everything to load
//     const handleLoad = () => {
//       setPageFullyLoaded(true);
//     };

//     // Listen for full page load
//     window.addEventListener('load', handleLoad);
    
//     // Also check if all resources are loaded
//     const checkReadyState = setInterval(() => {
//       if (document.readyState === 'complete') {
//         setPageFullyLoaded(true);
//         clearInterval(checkReadyState);
//       }
//     }, 100);

//     return () => {
//       window.removeEventListener('load', handleLoad);
//       clearInterval(checkReadyState);
//     };
//   }, []);

//   // Show banner only after page is fully loaded AND video is loaded
//   useEffect(() => {
//     if (!pageFullyLoaded) return;
    
//     const consent = localStorage.getItem("cookie-consent");
//     if (consent) {
//       setHasConsent(true);
//       setShowBanner(false);
//       return;
//     }

//     // Additional delay to ensure video is playing
//     const timer = setTimeout(() => {
//       setShowBanner(true);
//     }, 500); // Small extra delay after full page load

//     return () => clearTimeout(timer);
//   }, [pageFullyLoaded]);

//   // Handle navigation blocking
//   useEffect(() => {
//     if (!showBanner || !isHomePage) return;

//     const handleNavigation = (e: MouseEvent | TouchEvent) => {
//       const target = e.target as HTMLElement;
      
//       if (target.closest('#cookie-banner')) {
//         return;
//       }

//       if (target.closest('a[href="/privacy-policy"]') || 
//           target.closest('a[href="/cookie-policy"]')) {
//         return;
//       }

//       e.preventDefault();
//       e.stopPropagation();
      
//       const banner = document.getElementById('cookie-banner');
//       if (banner) {
//         banner.style.animation = 'shake 0.5s ease-in-out';
//         setTimeout(() => {
//           banner.style.animation = '';
//         }, 500);
//       }
//     };

//     const handleScroll = (e: Event) => {
//       e.preventDefault();
//       window.scrollTo(0, 0);
//     };

//     const style = document.createElement('style');
//     style.id = 'cookie-shake-style';
//     style.textContent = `
//       @keyframes shake {
//         0%, 100% { transform: translateX(0); }
//         25% { transform: translateX(-10px); }
//         75% { transform: translateX(10px); }
//       }
//     `;
//     document.head.appendChild(style);

//     document.addEventListener('click', handleNavigation, true);
//     document.addEventListener('touchstart', handleNavigation, { passive: false, capture: true });
//     window.addEventListener('scroll', handleScroll, { passive: false });

//     return () => {
//       document.removeEventListener('click', handleNavigation, true);
//       document.removeEventListener('touchstart', handleNavigation, { capture: true });
//       window.removeEventListener('scroll', handleScroll);
//       const styleEl = document.getElementById('cookie-shake-style');
//       if (styleEl) styleEl.remove();
//     };
//   }, [showBanner, isHomePage]);

//   const handleAccept = () => {
//     localStorage.setItem("cookie-consent", "accepted");
//     setHasConsent(true);
//     setShowBanner(false);
//   };

//   const handleDecline = () => {
//     localStorage.setItem("cookie-consent", "declined");
//     setHasConsent(true);
//     setShowBanner(false);
//   };

//   // Don't show anything until page is fully loaded
//   if (!pageFullyLoaded) {
//     return null;
//   }

//   if (hasConsent) {
//     return null;
//   }

//   return (
//     <AnimatePresence>
//       {showBanner && (
//         <>
//           <div 
//             id="cookie-overlay"
//             className="fixed inset-0 z-[9998]"
//             style={{ 
//               pointerEvents: 'auto',
//               background: 'transparent',
//               touchAction: 'none',
//             }}
//           />
          
//           <motion.div
//             id="cookie-banner"
//             initial={{ y: 100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 100, opacity: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
//             style={{ pointerEvents: 'auto' }}
//           >
//             <div 
//               className={`max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden ${
//                 isHomePage 
//                   ? "bg-black/40 backdrop-blur-md border border-white/10" 
//                   : "bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl"
//               }`}
//             >
//               <div className="p-5 md:p-6">
//                 <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//                   <div className={`hidden md:flex w-10 h-10 rounded-full items-center justify-center shrink-0 ${
//                     isHomePage 
//                       ? "bg-blue-500/20 text-blue-400" 
//                       : "bg-blue-50 text-blue-600"
//                   }`}>
//                     <FiShield className="w-5 h-5" />
//                   </div>

//                   <div className="flex-1">
//                     <p className={`text-sm leading-relaxed ${
//                       isHomePage ? "text-white/90" : "text-slate-600"
//                     }`}>
//                       <span className={`font-semibold ${isHomePage ? "text-white" : "text-slate-900"}`}>
//                         We Value Your Privacy
//                       </span>
//                       {" "}— We use cookies to enhance your experience. Please accept or decline to continue browsing.
//                     </p>
                    
//                     <div className="mt-2 flex flex-wrap items-center gap-3">
//                       <a
//                         href="/privacy-policy"
//                         className={`text-xs font-medium transition-colors ${
//                           isHomePage 
//                             ? "text-blue-400 hover:text-blue-300" 
//                             : "text-blue-600 hover:text-blue-700"
//                         }`}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           navigate("/privacy-policy");
//                         }}
//                       >
//                         Privacy Policy
//                       </a>
//                       <span className={isHomePage ? "text-white/20" : "text-slate-300"}>|</span>
//                       <a
//                         href="/cookie-policy"
//                         className={`text-xs font-medium transition-colors ${
//                           isHomePage 
//                             ? "text-blue-400 hover:text-blue-300" 
//                             : "text-blue-600 hover:text-blue-700"
//                         }`}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           navigate("/cookie-policy");
//                         }}
//                       >
//                         Cookie Policy
//                       </a>
//                     </div>
//                   </div>

//                   <div className="flex gap-2 w-full md:w-auto">
//                     <button
//                       onClick={handleDecline}
//                       className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
//                         isHomePage 
//                           ? "bg-white/10 text-white hover:bg-white/20 border border-white/10" 
//                           : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
//                       }`}
//                     >
//                       Decline
//                     </button>
//                     <button
//                       onClick={handleAccept}
//                       className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
//                         isHomePage 
//                           ? "bg-blue-600 text-white hover:bg-blue-700" 
//                           : "bg-blue-600 text-white hover:bg-blue-700"
//                       }`}
//                     >
//                       <FiCheck className="w-3 h-3" />
//                       Accept
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }