import { Link } from "react-router";
import { motion } from "motion/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

// Your Calendly link - REPLACE WITH YOUR ACTUAL CALENDLY LINK
// Format: https://calendly.com/your-username/event-name
const CALENDLY_URL = "https://calendly.com/blockcsherpa/Invorious-discovery-call-30-min";

export default function ServiceSchedulePage({ slug }: { slug?: string }) {
  // Handle booking - redirect to Calendly
  const handleBookOnCalendly = () => {
    // Open Calendly in a new tab
    window.open(CALENDLY_URL, "_blank");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white pt-32 pb-24 min-h-screen"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          className="mb-16 text-center lg:text-left space-y-6"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Link
              to={`/services/${slug}`}
              id="back-to-service-link"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
            >
              <FaArrowLeft className="w-3 h-3" />
              Back to Service Details
            </Link>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
          >
            Book a Discovery Call
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-400 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Select your preferred time below. You will be redirected to Calendly to complete your booking with our Web3 experts.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content - Calendly Booking Card */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="bg-[#050A14] p-8 md:p-12 border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors duration-700" />
              
              <div className="mb-8 relative z-10">
                <div className="w-20 h-20 border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                  <svg 
                    className="w-10 h-10 text-cyan-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                  Schedule Your Consultation
                </h3>
                <p className="text-gray-400 font-light text-sm max-w-md mx-auto">
                  Choose a time that works best for you. Our Web3 experts are available for 30-minute discovery calls.
                </p>
              </div>

              <button
                onClick={handleBookOnCalendly}
                className="group/btn relative w-full py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover/btn:animate-shimmer" />
                <span className="relative z-10 flex items-center gap-2">
                  Book on Calendly
                  <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>

              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mt-6">
                You will be redirected to Calendly to select your preferred date and time.
              </p>
            </motion.div>

            {/* How It Works Section */}
            <motion.div variants={fadeInUp} className="bg-[#030712] p-8 md:p-10 border border-white/10">
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-8 text-center">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Book a Time", desc: "Click the button above and select your preferred date and time on Calendly." },
                  { step: "2", title: "Get Confirmation", desc: "Receive an email confirmation with a unique Zoom meeting link for your consultation." },
                  { step: "3", title: "Join the Call", desc: "Click the Zoom link at your scheduled time and meet with our expert." }
                ].map((item, idx) => (
                  <div key={idx} className="text-center relative group">
                    <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 transition-colors duration-300">
                      <span className="text-cyan-400 font-mono font-bold text-lg">{item.step}</span>
                    </div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar - Why Book With Us */}
          <motion.div 
            className="space-y-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#0A0F1C] to-[#030712] p-8 border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                  <FiInfo aria-hidden="true" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white">Why book with us?</h4>
              </div>

              <ul className="space-y-4 text-sm text-gray-400 font-light relative z-10">
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-cyan-400 mt-1 shrink-0" />
                  <span>Immediate Web3 expert feedback on your current strategy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-cyan-400 mt-1 shrink-0" />
                  <span>Personalized blockchain growth roadmap tailored to your industry.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-cyan-400 mt-1 shrink-0" />
                  <span>Access to our proprietary Web3 analytics dashboard demo.</span>
                </li>
              </ul>
            </motion.div>

            {/* What's Included */}
            <motion.div variants={fadeInUp} className="bg-[#050A14] p-8 border border-white/10">
              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5">What's Included?</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-light">
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-cyan-400 w-4 h-4 shrink-0" />
                  30-minute discovery call
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-cyan-400 w-4 h-4 shrink-0" />
                  Zoom video consultation
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-cyan-400 w-4 h-4 shrink-0" />
                  Personalized next-step recommendations
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-cyan-400 w-4 h-4 shrink-0" />
                  Follow-up email with resources
                </li>
              </ul>
            </motion.div>

            {/* Need Help? */}
            <motion.div variants={fadeInUp} className="bg-[#030712] p-8 border border-white/10">
              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-2">Need help?</h4>
              <p className="text-xs text-gray-500 font-light mb-4 leading-relaxed">
                Having trouble booking? Contact us directly.
              </p>
              <a
                href="mailto:hello@invorious.com"
                className="text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                hello@invorious.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </main>
  );
}






// // import React from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { FiCheckCircle, FiInfo } from "react-icons/fi";
// import { useNavigate } from "react-router";
// import { slugifyServiceTitle } from "../../../../../lib/service-slug";

// // Your Calendly link - REPLACE WITH YOUR ACTUAL CALENDLY LINK
// // Format: https://calendly.com/your-username/event-name
// const CALENDLY_URL = "https://calendly.com/blockcsherpa/Invorious-discovery-call-30-min";

// export default function ServiceSchedulePage({ slug }: { slug?: string }) {
//   const navigate = useNavigate();

//   // Handle booking - redirect to Calendly
//   const handleBookOnCalendly = () => {
//     // Open Calendly in a new tab
//     window.open(CALENDLY_URL, "_blank");
    
//     // Optional: Navigate back to service page or show a confirmation modal
//     // navigate(`/services/${slug}`);
//   };

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="grow pt-32 pb-10 bg-slate-50"
//     >
//       <div className="max-w-full-sm xl:container mx-auto px-6">
//         {/* Header Section */}
//         <div className="mb-12 text-center lg:text-left">
//           <a
//             href={`/services/${slug}`}
//             id="back-to-service-link"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mb-4"
//           >
//             <FaArrowLeft className="w-4 h-4" />
//             Back to Service Details
//           </a>

//           <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
//             Book a Discovery Call with Invorious
//           </h1>
//           <p className="text-slate-500 mt-4 max-w-2xl">
//             Select your preferred time below. You will be redirected to Calendly to complete your booking with our Web3 experts.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Content - Calendly Booking Card */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
//               {/* Icon */}
//               <div className="mb-6">
//                 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg 
//                     className="w-10 h-10 text-blue-600" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round" 
//                       strokeWidth={2} 
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-2">
//                   Schedule Your Consultation
//                 </h3>
//                 <p className="text-slate-500">
//                   Choose a time that works best for you. Our Web3 experts are available for 30-minute discovery calls.
//                 </p>
//               </div>

//               {/* Calendly Booking Button */}
//               <button
//                 onClick={handleBookOnCalendly}
//                 className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
//               >
//                 Book on Calendly
//                 <FaArrowRight className="w-5 h-5" />
//               </button>

//               <p className="text-xs text-slate-400 mt-4">
//                 You will be redirected to Calendly to select your preferred date and time. A Zoom link will be generated automatically.
//               </p>
//             </div>

//             {/* How It Works Section */}
//             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
//                 How It Works
//               </h3>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <span className="text-blue-600 font-bold text-xl">1</span>
//                   </div>
//                   <h4 className="font-bold text-slate-900 mb-1">Book a Time</h4>
//                   <p className="text-sm text-slate-500">
//                     Click the button above and select your preferred date and time on Calendly.
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <span className="text-blue-600 font-bold text-xl">2</span>
//                   </div>
//                   <h4 className="font-bold text-slate-900 mb-1">Get Confirmation</h4>
//                   <p className="text-sm text-slate-500">
//                    Receive an email confirmation with a unique Zoom meeting link for your consultation.
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <span className="text-blue-600 font-bold text-xl">3</span>
//                   </div>
//                   <h4 className="font-bold text-slate-900 mb-1">Join the Call</h4>
//                   <p className="text-sm text-slate-500">
//                    Click the Zoom link at your scheduled time and meet with our expert.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar - Why Book With Us */}
//           <div className="space-y-8">
//             <div className="bg-blue-600 p-8 rounded-3xl text-white">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
//                   <FiInfo aria-hidden="true" />
//                 </div>
//                 <h4 className="text-lg font-bold">Why book with us?</h4>
//               </div>

//               <ul className="space-y-4 text-sm text-blue-100">
//                 <li className="flex items-start gap-3">
//                   <FiCheckCircle className="text-blue-300 mt-1" />
//                   <span>Immediate Web3 expert feedback on your current strategy.</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <FiCheckCircle className="text-blue-300 mt-1" />
//                   <span>Personalized blockchain growth roadmap tailored to your industry.</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <FiCheckCircle className="text-blue-300 mt-1" />
//                   <span>Access to our proprietary Web3 analytics dashboard demo.</span>
//                 </li>
//               </ul>
//             </div>

//             {/* What's Included */}
//             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
//               <h4 className="font-bold text-slate-900 mb-3">What's Included?</h4>
//               <ul className="space-y-2 text-sm text-slate-600">
//                 <li className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500 w-4 h-4" />
//                   30-minute discovery call
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500 w-4 h-4" />
//                   Zoom video consultation                </li>
//                 <li className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500 w-4 h-4" />
//                   Personalized next-step recommendations
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500 w-4 h-4" />
//                   Follow-up email with resources
//                 </li>
//               </ul>
//             </div>

//             {/* Need Help? */}
//             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
//               <h4 className="font-bold text-slate-900 mb-2">Need help?</h4>
//               <p className="text-sm text-slate-500 mb-3">
//                 Having trouble booking? Contact us directly.
//               </p>
//               <a
//                 href="mailto:hello@Invorious.com"
//                 className="text-blue-600 text-sm font-semibold hover:underline"
//               >
//                 hello@Invorious.com
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }