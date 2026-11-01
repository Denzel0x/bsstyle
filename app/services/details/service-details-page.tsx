import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { slugifyServiceTitle } from "../../../lib/service-slug";
import {
  getServiceDetailsDefaults,
  requireServiceBySlug,
} from "../../../service/services.service";

export default function ServiceDetailsPage({ slug }: { slug?: string }) {
  const service = requireServiceBySlug(slug);
  const detailsDefaults = getServiceDetailsDefaults();

  const safeDescription =
    service.description && service.description.trim().length > 0
      ? service.description
      : detailsDefaults.description;

  const safeFeatures =
    Array.isArray(service.features) && service.features.length > 0
      ? service.features
      : detailsDefaults.features;

  const safeDeliverables = detailsDefaults.deliverables;

  const safeProcess = detailsDefaults.process;

  const safeOutcomes = detailsDefaults.outcomes;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white pt-20 min-h-screen"
    >
      {/* HERO SECTION */}
      <section className="bg-[#030712] py-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[120px] -ml-48 -mb-48" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.nav 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-500 mb-12"
          >
            <Link to="/" className="hover:text-cyan-400 transition-colors" id="breadcrumb-home">
              Home
            </Link>
            <FiChevronRight className="text-[10px]" aria-hidden="true" />
            <Link to="/services" className="hover:text-cyan-400 transition-colors" id="breadcrumb-services">
              Services
            </Link>
            <FiChevronRight className="text-[10px]" aria-hidden="true" />
            <span className="text-cyan-400">{service.title}</span>
          </motion.nav>

          <motion.div className="max-w-4xl space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
            >
              {service.title}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light"
            >
              {safeDescription}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6">
              <Link
                to={`/services/${slugifyServiceTitle(service.title)}/pricing`}
                id="hero-view-pricing"
                className="group relative px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
                <span className="relative z-10 flex items-center gap-2">View Price List</span>
              </Link>
              
              <Link
                to={`/services/${slugifyServiceTitle(service.title)}/schedule`}
                className="group relative px-8 py-4 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all backdrop-blur-md overflow-hidden rounded-sm hover:border-cyan-400/50 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                Book a Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU GET SECTION */}
      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            <motion.div 
              className="lg:col-span-2 space-y-10"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                  What you get
                </h2>
                <p className="text-gray-400 text-base font-light leading-relaxed">
                  A focused engagement designed to produce clear outcomes,
                  practical next steps, and measurable progress.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="p-8 md:p-10 bg-[#030712] border border-white/10 relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-500" />
                <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">
                  Included highlights
                </h3>
                <ul className="space-y-4">
                  {safeFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <FaRegCheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-light text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.aside 
              className="space-y-6"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
            >
              <div className="p-8 bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">
                  Next step
                </h4>
                <p className="text-gray-400 text-sm font-light mb-8 leading-relaxed">
                  See pricing and package options for this service.
                </p>
                <Link
                  to={`/services/${slugifyServiceTitle(service.title)}/pricing`}
                  className="w-full inline-flex items-center justify-center px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all bg-white text-black hover:bg-cyan-400"
                >
                  Open Price List
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* DELIVERABLES SECTION */}
      <section className="py-24 bg-[#030712] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-4"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                <span className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold">Outputs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                Deliverables
              </h2>
              <p className="text-gray-400 text-base font-light leading-relaxed">
                Concrete Web3 outputs you can share, use, and execute-designed to reduce ambiguity and accelerate decentralized decisions.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 md:p-10 bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-colors duration-500"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
            >
              <ul className="space-y-4">
                {safeDeliverables.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <FaRegCheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 font-light text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            className="max-w-2xl space-y-4 mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              How it works
            </h2>
            <p className="text-gray-400 text-base font-light leading-relaxed">
              A simple, repeatable Web3 engagement flow-built to create momentum quickly and end with decision-ready outputs for your decentralized strategy.
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-3 gap-0 border-t border-l border-white/10"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          >
            {safeProcess.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="p-8 md:p-10 border-r border-b border-white/10 bg-[#030712] hover:bg-white/[0.02] transition-colors group"
              >
                <div className="text-xs font-mono font-bold text-cyan-400 mb-4 tracking-widest">
                  STEP {item.step}
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EXPECTED OUTCOMES SECTION */}
      <section className="py-24 bg-[#030712] relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-4"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                Expected outcomes
              </h2>
              <p className="text-gray-400 text-base font-light leading-relaxed">
                What you should walk away with—clear, measurable, and aligned to Web3 execution.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 md:p-10 bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.1)]"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
            >
              <ul className="space-y-4">
                {safeOutcomes.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <FaRegCheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 font-light text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
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

// import { FaRegCheckCircle } from "react-icons/fa";

// import { FiChevronRight } from "react-icons/fi";

// import { slugifyServiceTitle } from "../../../lib/service-slug";

// import {
//   getServiceDetailsDefaults,
//   requireServiceBySlug,
// } from "../../../service/services.service";

// export default function ServiceDetailsPage({ slug }: { slug?: string }) {
//   const service = requireServiceBySlug(slug);
//   const detailsDefaults = getServiceDetailsDefaults();

//   const safeDescription =
//     service.description && service.description.trim().length > 0
//       ? service.description
//       : detailsDefaults.description;

//   const safeFeatures =
//     Array.isArray(service.features) && service.features.length > 0
//       ? service.features
//       : detailsDefaults.features;

//   const safeDeliverables = detailsDefaults.deliverables;

//   const safeProcess = detailsDefaults.process;

//   const safeOutcomes = detailsDefaults.outcomes;

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="pt-20"
//     >
//       <section className="hero-gradient py-24 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10 text-white">
//           <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
//             <a href="/" className="hover:text-white" id="breadcrumb-home">
//               Home
//             </a>
//             <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//             <a
//               href="/services"
//               className="hover:text-white"
//               id="breadcrumb-services"
//             >
//               Services
//             </a>
//             <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//             <span className="text-blue-400">{service.title}</span>
//           </nav>

//           <div className="max-w-3xl space-y-6">
//             <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
//               {service.title}
//             </h1>
//             <p className="text-xl text-slate-300 leading-relaxed">
//               {safeDescription}
//             </p>

//             <div className="flex items-center gap-6 pt-4 flex-wrap">
//               <a
//                 href={`/services/${slugifyServiceTitle(service.title)}/pricing`}
//                 id="hero-view-pricing"
//                 className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
//               >
//                 View Price List
//               </a>
//               <a
//                 href={`/services/${slugifyServiceTitle(service.title)}/schedule`}
//                 className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
//               >
//                 Book a Consultation
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="xl:py-20 py-10 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-3 gap-16">
//             <div className="lg:col-span-2 space-y-10">
//               <div className="space-y-4">
//                 <h2 className="text-3xl font-bold text-slate-900">
//                   What you get
//                 </h2>
//                 <p className="text-slate-600 text-lg leading-relaxed">
//                   A focused engagement designed to produce clear outcomes,
//                   practical next steps, and measurable progress.
//                 </p>
//               </div>

//               <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl">
//                 <h3 className="text-xl font-bold text-slate-900 mb-4">
//                   Included highlights
//                 </h3>
//                 <ul className="space-y-3 text-slate-600">
//                   {safeFeatures.map((feature) => (
//                     <li key={feature} className="flex items-center gap-3">
//                       <FaRegCheckCircle className="w-5 h-5 text-blue-600" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <aside className="space-y-6">
//               <div className="p-8 border border-slate-200 rounded-3xl">
//                 <h4 className="text-xl font-bold text-slate-900 mb-2">
//                   Next step
//                 </h4>
//                 <p className="text-slate-600 mb-6">
//                   See pricing and package options for this service.
//                 </p>
//                 <a
//                   href={`/services/${slugifyServiceTitle(service.title)}/pricing`}
//                   className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl font-bold transition-all bg-slate-900 text-white hover:bg-slate-800"
//                 >
//                   Open Price List
//                 </a>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>

//       <section className="xl:py-20 py-10 bg-slate-50 border-t border-slate-100">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-2 gap-10 items-start">
//             <div className="space-y-3">
//               <h2 className="text-3xl font-bold text-slate-900">
//                 Deliverables
//               </h2>
//               <p className="text-slate-600 text-lg leading-relaxed">
//                Concrete Web3 outputs you can share, use, and execute-designed to reduce ambiguity and accelerate decentralized decisions.
//               </p>
//             </div>

//             <div className="p-8 bg-white border border-slate-200 rounded-2xl">
//               <ul className="space-y-3 text-slate-600">
//                 {safeDeliverables.map((item) => (
//                   <li key={item} className="flex items-center gap-3">
//                     <FaRegCheckCircle className="w-5 h-5 text-blue-600" />
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="xl:py-20 py-10 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
//             <div className="max-w-2xl space-y-3">
//               <h2 className="text-3xl font-bold text-slate-900">
//                 How it works
//               </h2>
//               <p className="text-slate-600 text-lg leading-relaxed">
//                A simple, repeatable Web3 engagement flow-built to create momentum quickly and end with decision-ready outputs for your decentralized strategy.
//               </p>
//             </div>
//           </div>

//           <div className="grid sm:grid-cols-3 gap-6">
//             {safeProcess.map((item) => (
//               <div
//                 key={item.step}
//                 className="p-8 rounded-2xl bg-slate-50 border border-slate-100"
//               >
//                 <div className="text-sm font-bold text-blue-600">
//                   {item.step}
//                 </div>
//                 <h3 className="mt-2 font-bold text-slate-900">{item.title}</h3>
//                 <p className="mt-2 text-sm text-slate-600 leading-relaxed">
//                   {item.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="xl:py-20 py-10 bg-slate-900">
//         <div className="max-w-full-sm xl:container mx-auto px-6 text-white">
//           <div className="grid lg:grid-cols-2 gap-10 items-start">
//             <div className="space-y-3">
//               <h2 className="text-3xl font-bold">Expected outcomes</h2>
//               <p className="text-slate-300 text-lg leading-relaxed">
//                 Expected outcomes. What you should walk away with-clear, measurable, and aligned to Web3 execution.
//               </p>
//             </div>

//             <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
//               <ul className="space-y-3 text-slate-200">
//                 {safeOutcomes.map((item) => (
//                   <li key={item} className="flex items-center gap-3">
//                     <FaRegCheckCircle className="w-5 h-5 text-blue-400" />
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }