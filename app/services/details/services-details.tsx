import React from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import data from "../../../lib/data.json";
import ServicesDetailsHero from "./services-details-hero";
import ServicesDetailsPriceListDetails from "./services-details-price-list-details";
import ServicesDetailsServiceDetails from "./services-details-service-details";

type ServicesDetailsParams = { id?: string };

export default function ServicesDetails({ packageId }: { packageId?: string }) {
  const params = useParams();
  const id = packageId ?? (params as ServicesDetailsParams).id;

  const servicesData = (data as ServicesData).services;
  const overview = servicesData.overview;
  const engagementPackages = servicesData.engagementPackages.items;

  const selectedPackage = id
    ? engagementPackages.find((p) => p.id === id)
    : undefined;

  if (!selectedPackage) {
    throw new Response("Service package not found", { status: 404 });
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white pt-20 min-h-screen"
    >
      <ServicesDetailsHero selectedPackage={selectedPackage} />

      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* TABS / NAVIGATION */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-12 flex flex-wrap gap-4"
          >
            <a
              href="#service-details"
              className="px-6 py-3 rounded-none border border-white/10 bg-white/5 text-gray-400 text-xs font-mono font-bold uppercase tracking-widest hover:text-white hover:border-cyan-400/30 transition-all scroll-mt-24"
            >
              Service Details
            </a>
            <a
              href="#price-list-details"
              className="px-6 py-3 rounded-none bg-blue-600 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all scroll-mt-24"
            >
              Price List Details
            </a>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <ServicesDetailsServiceDetails overview={overview} />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <ServicesDetailsPriceListDetails selectedPackage={selectedPackage} />
            </div>

            <motion.aside 
              className="space-y-8"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp}
            >
              {/* TIMELINE CARD */}
              <div className="p-8 bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-8">
                  Engagement Timeline
                </h4>

                <div className="space-y-8 relative">
                  {/* Step 01 */}
                  <div className="flex gap-5 relative group">
                    <div className="w-8 h-8 rounded-none border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 z-10 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      01
                    </div>
                    <div>
                      <h5 className="font-bold text-white uppercase tracking-wider text-sm group-hover:text-cyan-400 transition-colors">Discovery &amp; Audit</h5>
                      <p className="text-xs text-gray-400 font-light mt-2 leading-relaxed">
                        Weeks 1-2: Internal assessment &amp; stakeholder interviews.
                      </p>
                    </div>
                    <div className="absolute left-4 top-8 w-[1px] h-10 bg-white/10" />
                  </div>

                  {/* Step 02 */}
                  <div className="flex gap-5 relative group">
                    <div className="w-8 h-8 rounded-none border border-white/10 bg-white/5 text-gray-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 z-10 group-hover:text-white group-hover:border-white/30 transition-all">
                      02
                    </div>
                    <div>
                      <h5 className="font-bold text-white uppercase tracking-wider text-sm group-hover:text-cyan-400 transition-colors">Strategy Synthesis</h5>
                      <p className="text-xs text-gray-400 font-light mt-2 leading-relaxed">
                        Weeks 3-6: Market research and roadmap development.
                      </p>
                    </div>
                    <div className="absolute left-4 top-8 w-[1px] h-10 bg-white/10" />
                  </div>

                  {/* Step 03 */}
                  <div className="flex gap-5 relative group">
                    <div className="w-8 h-8 rounded-none border border-white/10 bg-white/5 text-gray-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 z-10 group-hover:text-white group-hover:border-white/30 transition-all">
                      03
                    </div>
                    <div>
                      <h5 className="font-bold text-white uppercase tracking-wider text-sm group-hover:text-cyan-400 transition-colors">Final Implementation</h5>
                      <p className="text-xs text-gray-400 font-light mt-2 leading-relaxed">
                        Weeks 7-10: Handover and execution training.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONSULTANT CARD */}
              <div className="p-8 bg-white/[0.02] border border-white/10 space-y-6 hover:border-cyan-400/30 transition-colors duration-500">
                <h4 className="text-lg font-black uppercase tracking-tight text-white">
                  Specialized Consultant
                </h4>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 overflow-hidden border border-white/10 grayscale">
                    <img
                      src="/images/team/dev1.jpg"
                      alt="Dr. Karlheinz"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <h5 className="font-bold text-white uppercase tracking-wider">
                      Dr. Karlheinz
                    </h5>
                    <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mt-1">
                      Talent Acquisition, Strategy
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 font-light italic leading-relaxed border-l-2 border-blue-500/30 pl-4">
                  "We don't just look at the numbers; we look at the culture and
                  the capability to ensure every strategy we build can actually
                  cross the finish line."
                </p>

                <Link
                  to="/team"
                  id="sidebar-team-link"
                  className="group flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
                >
                  View full team
                  <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="w-16 h-16 border border-white/10 bg-white/5 text-cyan-400 flex items-center justify-center mx-auto mb-10 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
          >
            <IoSparkles className="w-8 h-8" aria-hidden="true" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
          >
            Ready to architect your market dominance?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Join 500+ global leaders who have transformed their business
            outcomes through the Invorious framework.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6 flex-wrap"
          >
            <Link
              to="/#contact"
              id="cta-bottom-btn"
              className="group relative px-10 py-5 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                Book Strategy Workshop
                <FiCalendar className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500">
              <FiClock className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>Response time: within 1-2 business days</span>
            </div>
          </motion.div>
        </div>
      </section>

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

// import { FaArrowRight } from "react-icons/fa";

// import { FiCalendar, FiClock } from "react-icons/fi";

// import { IoSparkles } from "react-icons/io5";

// import { useParams } from "react-router";

// import data from "../../../lib/data.json";

// import ServicesDetailsHero from "./services-details-hero";

// import ServicesDetailsPriceListDetails from "./services-details-price-list-details";

// import ServicesDetailsServiceDetails from "./services-details-service-details";

// type ServicesDetailsParams = { id?: string };

// export default function ServicesDetails({ packageId }: { packageId?: string }) {
//   const params = useParams();
//   const id = packageId ?? (params as ServicesDetailsParams).id;

//   const servicesData = (data as ServicesData).services;
//   const overview = servicesData.overview;
//   const engagementPackages = servicesData.engagementPackages.items;

//   const selectedPackage = id
//     ? engagementPackages.find((p) => p.id === id)
//     : undefined;

//   if (!selectedPackage) {
//     throw new Response("Service package not found", { status: 404 });
//   }

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="pt-20"
//     >
//       <ServicesDetailsHero selectedPackage={selectedPackage} />

//       <section className="py-20 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="mb-12 flex flex-wrap gap-3">
//             <a
//               href="#service-details"
//               className="px-4 py-2 rounded-xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors scroll-mt-24"
//             >
//               Service Details
//             </a>
//             <a
//               href="#price-list-details"
//               className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors scroll-mt-24"
//             >
//               Price List Details
//             </a>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-16">
//             <div className="lg:col-span-2 space-y-12">
//               <ServicesDetailsServiceDetails overview={overview} />

//               <ServicesDetailsPriceListDetails
//                 selectedPackage={selectedPackage}
//               />
//             </div>

//             <aside className="space-y-8">
//               <div className="p-8 bg-slate-900 rounded-3xl text-white">
//                 <h4 className="text-xl font-bold mb-6">Engagement Timeline</h4>

//                 <div className="space-y-8 relative">
//                   <div className="flex gap-4 relative">
//                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0 z-10">
//                       01
//                     </div>
//                     <div>
//                       <h5 className="font-bold">Discovery &amp; Audit</h5>
//                       <p className="text-xs text-slate-400 mt-1">
//                         Weeks 1-2: Internal assessment &amp; stakeholder
//                         interviews.
//                       </p>
//                     </div>
//                     <div className="absolute left-4 top-8 w-px h-8 bg-slate-700" />
//                   </div>

//                   <div className="flex gap-4 relative">
//                     <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 z-10">
//                       02
//                     </div>
//                     <div>
//                       <h5 className="font-bold">Strategy Synthesis</h5>
//                       <p className="text-xs text-slate-400 mt-1">
//                         Weeks 3-6: Market research and roadmap development.
//                       </p>
//                     </div>
//                     <div className="absolute left-4 top-8 w-px h-8 bg-slate-700" />
//                   </div>

//                   <div className="flex gap-4">
//                     <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 z-10">
//                       03
//                     </div>
//                     <div>
//                       <h5 className="font-bold">Final Implementation</h5>
//                       <p className="text-xs text-slate-400 mt-1">
//                         Weeks 7-10: Handover and execution training.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-8 border border-slate-200 rounded-3xl space-y-6">
//                 <h4 className="text-xl font-bold text-slate-900">
//                   Specialized Consultant
//                 </h4>

//                 <div className="flex items-center gap-4">
//                   <img
//                     src="/images/team/dev1.jpg"
//                     alt="Marek Vance"
//                     className="w-14 h-14 rounded-full object-cover"
//                   />
//                   <div className="text-sm">
//                     <h5 className="font-bold text-slate-900">
//                       Dr. Karlheinz
//                     </h5>
//                     <p className="text-slate-500">
//                     Talent Acquisition, Strategy
//                     </p>
//                   </div>
//                 </div>

//                 <p className="text-sm text-slate-600 italic">
//                   "We don't just look at the numbers; we look at the culture and
//                   the capability to ensure every strategy we build can actually
//                   cross the finish line."
//                 </p>

//                 <a
//                   href="/#team"
//                   id="sidebar-team-link"
//                   className="text-blue-600 text-sm font-bold flex items-center gap-2"
//                 >
//                   View full team{" "}
//                   <FaArrowRight className="w-4 h-4" aria-hidden="true" />
//                 </a>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-white border-t border-slate-100">
//         <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
//           <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-10">
//             <IoSparkles className="w-10 h-10" aria-hidden="true" />
//           </div>

//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//             Ready to architect your market dominance?
//           </h2>
//           <p className="text-xl text-slate-500 max-w-2xl mx-auto">
//             Join 500+ global leaders who have transformed their business
//             outcomes through the Invorious framework.
//           </p>

//           <div className="flex justify-center gap-4 pt-4 flex-wrap">
//             <a
//               href="/#contact"
//               id="cta-bottom-btn"
//               className="px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-3 justify-center"
//             >
//               <span>Book Strategy Workshop</span>
//               <FiCalendar className="w-5 h-5" aria-hidden="true" />
//             </a>

//             <div className="flex items-center gap-2 text-sm text-slate-400">
//               <FiClock className="w-4 h-4 text-blue-400" aria-hidden="true" />
//               <span>Response time: within 1-2 business days</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }