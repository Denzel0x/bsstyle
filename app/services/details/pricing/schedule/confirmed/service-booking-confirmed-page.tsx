import React from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  FiCalendar,
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiFileText,
  FiInfo,
  FiUploadCloud,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import { getBookingConfirmedViewModel } from "../../../../../../service/services.service";

export default function ServiceBookingConfirmedPage({
  slug,
}: {
  slug?: string;
}) {
  const location = useLocation();
  const vm = React.useMemo(
    () => getBookingConfirmedViewModel({ slug, search: location.search }),
    [slug, location.search],
  );

  const copyMeetingLink = async () => {
    try {
      await navigator.clipboard.writeText(vm.meetingLink);
    } catch {
      // ignore
    }
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
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white pt-32 pb-24 relative min-h-screen"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 pointer-events-none">
        <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,#2563EB_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <motion.div 
          className="text-center mb-16 space-y-6"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center justify-center w-20 h-20 border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 mb-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <FiCheckCircle className="text-4xl" aria-hidden="true" />
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
          >
            Your Consultation is Confirmed
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Confirmation ID:</span>
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 font-mono text-cyan-400 text-sm font-bold tracking-wider">
              {vm.confirmationId}
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center gap-4 mt-8 flex-wrap">
            <a
              href="#"
              id="btn-cal-google"
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:border-cyan-400/50 hover:bg-white/10 transition-all rounded-sm backdrop-blur-md"
              onClick={(e) => e.preventDefault()}
            >
              <FiCalendar className="text-lg text-cyan-400" aria-hidden="true" /> 
              Add to Google Calendar
            </a>
            <a
              href="#"
              id="btn-cal-outlook"
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:border-cyan-400/50 hover:bg-white/10 transition-all rounded-sm backdrop-blur-md"
              onClick={(e) => e.preventDefault()}
            >
              <FiCalendar className="text-lg text-cyan-400" aria-hidden="true" /> 
              Add to Outlook
            </a>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* MAIN CONTENT */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          >
            
            {/* MEETING DETAILS CARD */}
            <motion.div variants={fadeInUp} className="bg-[#050A14] border border-white/10 p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors duration-700" />
              
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-10 flex items-center gap-3 relative z-10">
                <FiCalendar className="text-cyan-400" aria-hidden="true" /> 
                Meeting Details
              </h2>

              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em]">
                      Date &amp; Time
                    </label>
                    <p className="text-xl md:text-2xl font-bold text-white mt-2">
                      {vm.dateLabel}
                    </p>
                    <p className="text-sm font-mono text-cyan-400 mt-1">{vm.timeRangeLabel} (EST)</p>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em]">
                      Meeting Link
                    </label>
                    <div className="flex items-center gap-3 mt-2 p-4 bg-white/5 border border-white/10 rounded-sm hover:border-cyan-400/50 transition-all group/link">
                      <span className="text-cyan-400 font-mono text-sm truncate">
                        {vm.meetingLink}
                      </span>
                      <button
                        type="button"
                        className="ml-auto text-gray-500 hover:text-white transition-colors"
                        aria-label="Copy meeting link"
                        onClick={copyMeetingLink}
                      >
                        <FiCopy aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                      Format:{" "}
                      <span className="font-bold text-gray-300">
                        {vm.meetingFormat === "virtual" ? "Virtual" : "In-Person"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 rounded-sm relative overflow-hidden flex flex-col justify-between group/consultant">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none" />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative w-16 h-16 border border-white/20 overflow-hidden grayscale group-hover/consultant:grayscale-0 transition-all duration-500">
                      <img
                        src={vm.consultant?.imageSrc ?? "/images/team/dev1.jpg"}
                        alt={vm.consultant?.imageAlt ?? vm.consultantName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white uppercase tracking-wider text-sm">{vm.consultantName}</h4>
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                        {vm.consultant?.role ?? "Senior Strategic Partner"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 relative z-10">
                    <Link
                      to="/team"
                      id="btn-view-team-profile"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
                    >
                      View Full Expertise Profile 
                      <FiExternalLink aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="absolute -right-8 -bottom-8 opacity-5">
                    <FiUsers className="text-9xl" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AGENDA HIGHLIGHTS */}
            <motion.div variants={fadeInUp} className="bg-[#030712] border border-white/10 p-8">
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-6">
                Meeting Agenda Highlights
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 transition-colors">
                  <div className="text-2xl text-cyan-400 mb-3" aria-hidden="true">⌕</div>
                  <h5 className="font-bold text-sm text-white uppercase tracking-wider mb-2">Market Audit</h5>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Review of current position and competitive landscape.
                  </p>
                </div>
                <div className="p-5 border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors">
                  <div className="text-2xl text-gray-400 mb-3" aria-hidden="true">↗</div>
                  <h5 className="font-bold text-sm text-white uppercase tracking-wider mb-2">Growth Mapping</h5>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Identifying high-impact opportunities for Q4.
                  </p>
                </div>
                <div className="p-5 border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors">
                  <div className="text-2xl text-gray-400 mb-3" aria-hidden="true">✓</div>
                  <h5 className="font-bold text-sm text-white uppercase tracking-wider mb-2">Risk Mitigation</h5>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Discussing strategic safeguards and execution hurdles.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* SIDEBAR */}
          <motion.div 
            className="space-y-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          >
            
            {/* NEXT STEPS */}
            <motion.div variants={fadeInUp} className="bg-[#050A14] border border-white/10 p-8 relative overflow-hidden">
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-8">Next Steps</h3>

              <div className="space-y-8 relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-8 bottom-8 w-[1px] bg-white/10" />

                {/* Step 1 */}
                <div className="flex gap-5 relative group">
                  <div className="w-10 h-10 rounded-none border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <FiFileText className="text-lg" aria-hidden="true" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-sm">Complete Briefing Form</h5>
                    <p className="text-xs text-gray-400 font-light mt-2 leading-relaxed">
                      Please provide deeper context on your current business model.
                    </p>
                    <Link
                      to="/#contact"
                      id="step-link-form"
                      className="inline-block mt-3 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
                    >
                      Go to Form &rarr;
                    </Link>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-5 relative group">
                  <div className="w-10 h-10 rounded-none border border-white/10 bg-white/5 text-gray-400 flex items-center justify-center shrink-0 z-10 group-hover:text-white transition-colors">
                    <FiUploadCloud className="text-lg" aria-hidden="true" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-300 uppercase tracking-wider text-sm group-hover:text-white transition-colors">Upload Documents</h5>
                    <p className="text-xs text-gray-500 font-light mt-2 leading-relaxed">
                      Upload any relevant financial statements or project briefs.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-5 relative group">
                  <div className="w-10 h-10 rounded-none border border-white/10 bg-white/5 text-gray-400 flex items-center justify-center shrink-0 z-10 group-hover:text-white transition-colors">
                    <FiVideo className="text-lg" aria-hidden="true" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-300 uppercase tracking-wider text-sm group-hover:text-white transition-colors">Join the Call</h5>
                    <p className="text-xs text-gray-500 font-light mt-2 leading-relaxed">
                      {vm.dateLabel}. We recommend joining 5 mins early.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RESCHEDULE */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 p-8">
              <div className="flex items-center gap-4 mb-6">
                <FiInfo className="text-xl text-cyan-400" aria-hidden="true" />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">
                  Need to Reschedule?
                </h4>
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-8">
                We understand that plans change. You can reschedule or cancel
                your session up to 12 hours before the start time.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={vm.rescheduleHref}
                  id="btn-reschedule"
                  className="w-full py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-blue-500 transition-all text-center shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                >
                  Manage Appointment
                </a>
                <Link
                  to="/#contact"
                  id="btn-contact-support"
                  className="w-full py-3 bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-white/10 hover:text-white transition-all text-center"
                >
                  Contact Support
                </Link>
              </div>
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







// import React from "react";

// import {
//   FiCalendar,
//   FiCheckCircle,
//   FiCopy,
//   FiExternalLink,
//   FiFileText,
//   FiInfo,
//   FiUploadCloud,
//   FiUsers,
//   FiVideo,
// } from "react-icons/fi";

// import { useLocation } from "react-router";

// import { getBookingConfirmedViewModel } from "../../../../../../service/services.service";

// export default function ServiceBookingConfirmedPage({
//   slug,
// }: {
//   slug?: string;
// }) {
//   const location = useLocation();
//   const vm = React.useMemo(
//     () => getBookingConfirmedViewModel({ slug, search: location.search }),
//     [slug, location.search],
//   );

//   const copyMeetingLink = async () => {
//     try {
//       await navigator.clipboard.writeText(vm.meetingLink);
//     } catch {
//       // ignore
//     }
//   };

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1 pt-32 pb-24 relative bg-slate-50"
//     >
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 pointer-events-none">
//         <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,#3B82F6_0%,transparent_70%)]" />
//       </div>

//       <div className="max-w-full-sm xl:container mx-auto px-6">
//         <div className="text-center mb-16 space-y-4">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4">
//             <FiCheckCircle className="text-5xl" aria-hidden="true" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
//             Your Consultation is Confirmed
//           </h1>
//           <p className="text-lg text-slate-600">
//             Confirmation ID:{" "}
//             <span className="font-bold text-slate-900 tracking-wider">
//               {vm.confirmationId}
//             </span>
//           </p>

//           <div className="flex justify-center gap-4 mt-8 flex-wrap">
//             <a
//               href="#"
//               id="btn-cal-google"
//               className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
//               onClick={(e) => e.preventDefault()}
//             >
//               <FiCalendar className="text-xl" aria-hidden="true" /> Add to
//               Google Calendar
//             </a>
//             <a
//               href="#"
//               id="btn-cal-outlook"
//               className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
//               onClick={(e) => e.preventDefault()}
//             >
//               <FiCalendar className="text-xl" aria-hidden="true" /> Add to
//               Outlook
//             </a>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
//               <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
//                 <FiCalendar className="text-blue-600" aria-hidden="true" />{" "}
//                 Meeting Details
//               </h2>

//               <div className="grid md:grid-cols-2 gap-12">
//                 <div className="space-y-6">
//                   <div>
//                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//                       Date &amp; Time
//                     </label>
//                     <p className="text-xl font-bold text-slate-900 mt-1">
//                       {vm.dateLabel}
//                     </p>
//                     <p className="text-slate-600">{vm.timeRangeLabel} (EST)</p>
//                   </div>

//                   <div>
//                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//                       Meeting Link
//                     </label>
//                     <div className="flex items-center gap-3 mt-1 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-all">
//                       <span className="text-blue-600 font-medium truncate">
//                         {vm.meetingLink}
//                       </span>
//                       <button
//                         type="button"
//                         className="ml-auto text-slate-400 hover:text-blue-600"
//                         aria-label="Copy meeting link"
//                         onClick={copyMeetingLink}
//                       >
//                         <FiCopy aria-hidden="true" />
//                       </button>
//                     </div>
//                     <p className="mt-2 text-xs text-slate-400">
//                       Format:{" "}
//                       <span className="font-bold text-slate-600">
//                         {vm.meetingFormat === "virtual" ? "Virtual" : "In-Person"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden">
//                   <div className="relative z-10 flex flex-col h-full justify-between">
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={
//                           vm.consultant?.imageSrc ??
//                           "/images/team/dev1.jpg"
//                         }
//                         alt={vm.consultant?.imageAlt ?? vm.consultantName}
//                         className="w-16 h-16 rounded-full border-2 border-white/20 object-cover"
//                       />
//                       <div className="space-y-1">
//                         <h4 className="font-bold">{vm.consultantName}</h4>
//                         <p className="text-xs text-slate-400 uppercase tracking-tighter">
//                           {vm.consultant?.role ?? "Senior Strategic Partner"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-8">
//                       <a
//                         href="/team"
//                         id="btn-view-team-profile"
//                         className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-all"
//                       >
//                         View Full Expertise Profile{" "}
//                         <FiExternalLink aria-hidden="true" />
//                       </a>
//                     </div>
//                   </div>

//                   <div className="absolute -right-8 -bottom-8 opacity-10">
//                     <FiUsers className="text-9xl" aria-hidden="true" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-6">
//                 Meeting Agenda Highlights
//               </h3>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
//                   <div
//                     className="text-2xl text-blue-600 mb-2"
//                     aria-hidden="true"
//                   >
//                     ⌕
//                   </div>
//                   <h5 className="font-bold text-sm text-slate-900">
//                     Market Audit
//                   </h5>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Review of current position and competitive landscape.
//                   </p>
//                 </div>
//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
//                   <div
//                     className="text-2xl text-slate-600 mb-2"
//                     aria-hidden="true"
//                   >
//                     ↗
//                   </div>
//                   <h5 className="font-bold text-sm text-slate-900">
//                     Growth Mapping
//                   </h5>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Identifying high-impact opportunities for Q4.
//                   </p>
//                 </div>
//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
//                   <div
//                     className="text-2xl text-slate-600 mb-2"
//                     aria-hidden="true"
//                   >
//                     ✓
//                   </div>
//                   <h5 className="font-bold text-sm text-slate-900">
//                     Risk Mitigation
//                   </h5>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Discussing strategic safeguards and execution hurdles.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-8">
//             <div className="bg-slate-900 rounded-3xl p-8 text-white">
//               <h3 className="text-xl font-bold mb-8">Next Steps</h3>

//               <div className="space-y-8">
//                 <div className="flex gap-4 relative">
//                   <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-700" />
//                   <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 z-10">
//                     <FiFileText className="text-lg" aria-hidden="true" />
//                   </div>
//                   <div>
//                     <h5 className="font-bold">Complete Briefing Form</h5>
//                     <p className="text-sm text-slate-400 mt-1">
//                       Please provide deeper context on your current business
//                       model.
//                     </p>
//                     <a
//                       href="/#contact"
//                       id="step-link-form"
//                       className="inline-block mt-3 text-sm text-blue-400 font-bold hover:underline"
//                     >
//                       Go to Form &rarr;
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 relative">
//                   <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-700" />
//                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 z-10">
//                     <FiUploadCloud className="text-lg" aria-hidden="true" />
//                   </div>
//                   <div>
//                     <h5 className="font-bold text-slate-300">
//                       Upload Documents
//                     </h5>
//                     <p className="text-sm text-slate-500 mt-1">
//                       Upload any relevant financial statements or project
//                       briefs.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 relative">
//                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 z-10">
//                     <FiVideo className="text-lg" aria-hidden="true" />
//                   </div>
//                   <div>
//                     <h5 className="font-bold text-slate-300">Join the Call</h5>
//                     <p className="text-sm text-slate-500 mt-1">
//                       {vm.dateLabel}. We recommend joining 5 mins early.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
//               <div className="flex items-center gap-4 mb-6">
//                 <FiInfo className="text-2xl text-blue-600" aria-hidden="true" />
//                 <h4 className="font-bold text-slate-900">
//                   Need to Reschedule?
//                 </h4>
//               </div>
//               <p className="text-sm text-slate-500 leading-relaxed mb-6">
//                 We understand that plans change. You can reschedule or cancel
//                 your session up to 12 hours before the start time.
//               </p>
//               <div className="flex flex-col gap-3">
//                 <a
//                   href={vm.rescheduleHref}
//                   id="btn-reschedule"
//                   className="w-full py-3 bg-slate-50 text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all text-center"
//                 >
//                   Manage Appointment
//                 </a>
//                 <a
//                   href="/#contact"
//                   id="btn-contact-support"
//                   className="w-full py-3 border border-slate-200 text-slate-500 font-medium text-sm rounded-xl hover:bg-slate-50 transition-all text-center"
//                 >
//                   Contact Support
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }