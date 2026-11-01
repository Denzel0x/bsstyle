import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { FiCalendar, FiChevronRight } from "react-icons/fi";
import { slugifyServiceTitle } from "../../../../lib/service-slug";
import {
  getServicesData,
  requireServiceBySlug,
} from "../../../../service/services.service";

export default function ServicePricingPage({ slug }: { slug?: string }) {
  const service = requireServiceBySlug(slug);
  const servicesData = getServicesData();
  const engagementPackages = servicesData.engagementPackages;

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
            <Link to="/services" className="hover:text-cyan-400 transition-colors">
              Services
            </Link>
            <FiChevronRight className="text-[10px]" aria-hidden="true" />
            <Link
              to={`/services/${slugifyServiceTitle(service.title)}`}
              className="hover:text-cyan-400 transition-colors"
            >
              {service.title}
            </Link>
            <FiChevronRight className="text-[10px]" aria-hidden="true" />
            <span className="text-cyan-400">Price List</span>
          </motion.nav>

          <motion.div className="max-w-4xl space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
            >
              Price List
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light"
            >
              Package options for{" "}
              <span className="text-cyan-400 font-bold">{service.title}</span>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PRICING PACKAGES */}
      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            className="text-center mb-20 space-y-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            <span className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold block">
              Engagement Packages
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              {engagementPackages.heading}
            </h2>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-8 items-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {engagementPackages.items.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={fadeInUp}
                className={
                  pkg.isFeatured
                    ? "bg-gradient-to-br from-[#0A0F1C] to-[#030712] p-8 md:p-10 border border-blue-500/40 shadow-[0_0_50px_rgba(37,99,235,0.15)] flex flex-col relative transform lg:scale-105 z-10"
                    : "bg-[#030712] p-8 md:p-10 border border-white/10 flex flex-col hover:border-white/20 transition-colors duration-500"
                }
              >
                {pkg.isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-1.5 shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                    {pkg.badgeText}
                  </div>
                )}
                
                <h3 className={`text-xl font-bold uppercase tracking-wider mb-2 ${pkg.isFeatured ? "text-white" : "text-white"}`}>
                  {pkg.name}
                </h3>
                
                <p className={`text-sm mb-8 font-light ${pkg.isFeatured ? "text-gray-400" : "text-gray-500"}`}>
                  {pkg.description}
                </p>
                
                <div className={`text-4xl md:text-5xl font-black mb-10 ${pkg.isFeatured ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400" : "text-white"}`}>
                  {pkg.priceMain}
                  <span className={`text-lg font-mono font-normal ml-1 ${pkg.isFeatured ? "text-cyan-400/60" : "text-gray-600"}`}>
                    {pkg.priceSuffix}
                  </span>
                </div>

                <ul className="space-y-4 mb-10 grow">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={`flex items-start gap-4 text-sm ${
                        feature.included
                          ? pkg.isFeatured
                            ? "text-gray-300"
                            : "text-gray-400"
                          : "text-gray-600 line-through"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold border shrink-0 ${
                          feature.included
                            ? pkg.isFeatured
                              ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                              : "border-white/20 bg-white/5 text-gray-300"
                            : "border-white/5 bg-white/5 text-gray-700"
                        }`}
                        aria-hidden="true"
                      >
                        {feature.included ? "✓" : "✕"}
                      </span>
                      <span className={`font-light leading-relaxed ${!feature.included && "opacity-50"}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/services/${slugifyServiceTitle(service.title)}/schedule`}
                  className={
                    pkg.isFeatured
                      ? "group relative w-full py-4 text-center bg-blue-600 text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 overflow-hidden rounded-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
                      : "w-full py-4 text-center border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm flex items-center justify-center"
                  }
                >
                  {pkg.isFeatured && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
                  )}
                  <span className="relative z-10">{pkg.ctaLabel}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
          >
            Ready to get started?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Tell us what you're working on and we'll recommend the best package.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-6 flex-wrap"
          >
            <Link
              to={`/services/${slugifyServiceTitle(service.title)}/schedule`}
              className="group relative px-10 py-5 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                Book a Consultation
                <FiCalendar className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
            
            <Link
              to={`/services/${slugifyServiceTitle(service.title)}`}
              className="group relative px-10 py-5 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all backdrop-blur-md overflow-hidden rounded-sm hover:border-cyan-400/50 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Back to Details
            </Link>
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

// import { FiCalendar, FiChevronRight } from "react-icons/fi";

// import { slugifyServiceTitle } from "../../../../lib/service-slug";

// import {
//   getServicesData,
//   requireServiceBySlug,
// } from "../../../../service/services.service";

// export default function ServicePricingPage({ slug }: { slug?: string }) {
//   const service = requireServiceBySlug(slug);
//   const servicesData = getServicesData();
//   const engagementPackages = servicesData.engagementPackages;

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
//             <a href="/services" className="hover:text-white">
//               Services
//             </a>
//             <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//             <a
//               href={`/services/${slugifyServiceTitle(service.title)}`}
//               className="hover:text-white"
//             >
//               {service.title}
//             </a>
//             <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//             <span className="text-blue-400">Price List</span>
//           </nav>

//           <div className="max-w-3xl space-y-6">
//             <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
//               Price List
//             </h1>
//             <p className="text-xl text-slate-300 leading-relaxed">
//               Package options for{" "}
//               <span className="text-white font-bold">{service.title}</span>.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-slate-50">
//         <div className="max-w-full-sm xl:container mx-auto px-6 text-center mb-16">
//           <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
//             Engagement Packages
//           </span>
//           <h2 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">
//             {engagementPackages.heading}
//           </h2>
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 grid lg:grid-cols-3 gap-8">
//           {engagementPackages.items.map((pkg) => (
//             <div
//               key={pkg.id}
//               className={
//                 pkg.isFeatured
//                   ? "bg-slate-900 p-10 rounded-3xl border border-blue-600/30 shadow-2xl flex flex-col transform lg:scale-105 relative"
//                   : "bg-white p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col"
//               }
//             >
//               {pkg.isFeatured && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
//                   {pkg.badgeText}
//                 </div>
//               )}
//               <h3
//                 className={`text-xl font-bold mb-2 ${
//                   pkg.isFeatured ? "text-white" : "text-slate-900"
//                 }`}
//               >
//                 {pkg.name}
//               </h3>
//               <p
//                 className={`text-sm mb-6 ${
//                   pkg.isFeatured ? "text-slate-400" : "text-slate-500"
//                 }`}
//               >
//                 {pkg.description}
//               </p>
//               <div
//                 className={`text-4xl font-black mb-8 ${
//                   pkg.isFeatured ? "text-white" : "text-slate-900"
//                 }`}
//               >
//                 {pkg.priceMain}
//                 <span
//                   className={`text-lg font-normal ${
//                     pkg.isFeatured ? "text-slate-500" : "text-slate-400"
//                   }`}
//                 >
//                   {pkg.priceSuffix}
//                 </span>
//               </div>

//               <ul className="space-y-4 mb-10 grow">
//                 {pkg.features.map((feature) => (
//                   <li
//                     key={feature.text}
//                     className={`flex items-center gap-3 text-sm ${
//                       feature.included
//                         ? pkg.isFeatured
//                           ? "text-slate-300"
//                           : "text-slate-600"
//                         : "text-slate-400 line-through"
//                     }`}
//                   >
//                     <span
//                       className={
//                         feature.included
//                           ? pkg.isFeatured
//                             ? "text-blue-400"
//                             : "text-green-500"
//                           : "text-slate-300"
//                       }
//                       aria-hidden="true"
//                     >
//                       {feature.included ? "✓" : "✕"}
//                     </span>
//                     {feature.text}
//                   </li>
//                 ))}
//               </ul>

//               <a
//                 href={`/services/${slugifyServiceTitle(service.title)}/schedule`}
//                 className={
//                   pkg.isFeatured
//                     ? "w-full py-4 text-center bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
//                     : "w-full py-4 text-center border border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all"
//                 }
//               >
//                 {pkg.ctaLabel}
//               </a>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="py-20 bg-white border-t border-slate-100">
//         <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//             Ready to get started?
//           </h2>
//           <p className="text-xl text-slate-500 max-w-2xl mx-auto">
//             Tell us what you’re working on and we’ll recommend the best package.
//           </p>

//           <div className="flex justify-center gap-4 pt-4 flex-wrap">
//             <a
//               href={`/services/${slugifyServiceTitle(service.title)}/schedule`}
//               className="px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-3 justify-center"
//             >
//               Book a Consultation{" "}
//               <FiCalendar className="w-5 h-5" aria-hidden="true" />
//             </a>
//             <a
//               href={`/services/${slugifyServiceTitle(service.title)}`}
//               className="px-10 py-5 border border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all"
//             >
//               Back to Details
//             </a>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }