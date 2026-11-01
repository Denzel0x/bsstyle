// import React from "react";
// import { useNavigate } from "react-router";
// import { Link } from "react-router";
// import { motion } from "motion/react";
// import { FaBriefcase, FaGlobe, FaRegCheckCircle } from "react-icons/fa";
// import {
//   FiChevronRight,
//   FiClock,
//   FiMonitor,
//   FiTrendingUp,
//   FiUsers,
// } from "react-icons/fi";
// import { IoBarChart } from "react-icons/io5";
// import data from "../../lib/data.json";
// import { slugifyServiceTitle } from "../../lib/service-slug";

// const homePageData = (data as HomePageData).homePage;

// const servicesIcons: Record<
//   HomeService["icon"],
//   React.ComponentType<{ className?: string }>
// > = {
//   trendingUp: FiTrendingUp,
//   barChart: IoBarChart,
//   monitor: FiMonitor,
//   users: FiUsers,
//   globe: FaGlobe,
//   briefcase: FaBriefcase,
// };

// export default function Services() {
//   const navigate = useNavigate();

//   // Scroll to contact form on homepage
//   const scrollToContactForm = () => {
//     navigate("/");
//     setTimeout(() => {
//       const contactSection = document.getElementById("contact");
//       if (contactSection) {
//         contactSection.scrollIntoView({ behavior: "smooth" });
//       }
//     }, 150);
//   };

//   const heroContainer = {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
//   } as const;

//   const heroItem = {
//     hidden: { opacity: 0, y: 14 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   } as const;

//   const gridContainer = {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
//   } as const;

//   const gridItem = {
//     hidden: { opacity: 0, y: 14 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   } as const;

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="pt-20"
//     >
//       <section className="hero-gradient py-24 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <motion.div
//           className="max-w-full-sm xl:container mx-auto px-6 relative z-10 text-white"
//           variants={heroContainer}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.nav
//             variants={heroItem}
//             className="flex items-center gap-2 text-sm text-slate-400 mb-8"
//           >
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
//           </motion.nav>

//           <div className="max-w-3xl space-y-6">
//             <motion.div
//               variants={heroItem}
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-400 text-xs font-bold uppercase tracking-widest w-fit"
//             >
//               {homePageData.services.badge}
//             </motion.div>
//             <motion.h1
//               variants={heroItem}
//               className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
//             >
//               {homePageData.services.title}
//             </motion.h1>
//             <motion.p
//               variants={heroItem}
//               className="text-xl text-slate-300 leading-relaxed"
//             >
//               {homePageData.services.description}
//             </motion.p>

//             <motion.div
//               variants={heroItem}
//               className="flex items-center gap-6 pt-4 flex-wrap"
//             >
//               <button
//                 onClick={scrollToContactForm}
//                 id="hero-book-btn"
//                 className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
//               >
//                 Book a Consultation
//               </button>

//               <div className="flex items-center gap-2 text-sm text-slate-400">
//                 <FiClock className="w-5 h-5 text-blue-400" aria-hidden="true" />
//                 <span>Explore all service offerings</span>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       <section className="py-20 bg-white border-t border-slate-100">
//         <motion.div
//           className="max-w-full-sm xl:container mx-auto px-6 text-center mb-16"
//           variants={heroContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.35 }}
//         >
//           <motion.span
//             variants={heroItem}
//             className="text-blue-600 font-bold uppercase tracking-widest text-sm"
//           >
//             {homePageData.services.badge}
//           </motion.span>
//           <motion.h2
//             variants={heroItem}
//             className="text-4xl font-bold text-slate-900 mt-2 tracking-tight"
//           >
//             {homePageData.services.title}
//           </motion.h2>
//           <motion.p
//             variants={heroItem}
//             className="text-slate-500 max-w-2xl mx-auto mt-4"
//           >
//             {homePageData.services.description}
//           </motion.p>
//         </motion.div>

//         <motion.div
//           className="max-w-full-sm xl:container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//           variants={gridContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           {homePageData.services.items.map((service) => {
//             const Icon = servicesIcons[service.icon];
//             const slug = slugifyServiceTitle(service.title);

//             return (
//        <motion.div
//   key={service.title}
//   variants={gridItem}
// >
//   <Link
//     to={`/services/${slug}`}
//     className="p-8 bg-slate-50 border border-slate-100 rounded-2xl card-hover group block"
//   >
//     <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
//       <Icon className="w-7 h-7" />
//     </div>
//     <h3 className="text-xl font-bold text-slate-900 mb-4">
//       {service.title}
//     </h3>
//     <p className="text-slate-600">{service.description}</p>
//     <ul className="mt-6 space-y-3 text-sm text-slate-500">
//       {service.features.map((feature) => (
//         <li key={feature} className="flex items-center gap-2">
//           <FaRegCheckCircle className="w-4 h-4 text-blue-500" />
//           {feature}
//         </li>
//       ))}
//     </ul>
//   </Link>
// </motion.div>
//             );
//           })}
//         </motion.div>
//       </section>
//     </main>
//   );
// }


import React from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { FaBriefcase, FaGlobe, FaRegCheckCircle } from "react-icons/fa";
import {
  FiChevronRight,
  FiClock,
  FiMonitor,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { IoBarChart } from "react-icons/io5";
import data from "../../lib/data.json";
import { slugifyServiceTitle } from "../../lib/service-slug";

const homePageData = (data as HomePageData).homePage;

const servicesIcons: Record<
  HomeService["icon"],
  React.ComponentType<{ className?: string }>
> = {
  trendingUp: FiTrendingUp,
  barChart: IoBarChart,
  monitor: FiMonitor,
  users: FiUsers,
  globe: FaGlobe,
  briefcase: FaBriefcase,
};

export default function Services() {
  const navigate = useNavigate();

  // Scroll to contact form on homepage
  const scrollToContactForm = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  } as const;

  const heroItem = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  const gridContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  } as const;

  const gridItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

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

        <motion.div
          className="max-w-[1200px] mx-auto px-6 relative z-10"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.nav
            variants={heroItem}
            className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-500 mb-12"
          >
            <Link to="/" className="hover:text-cyan-400 transition-colors" id="breadcrumb-home">
              Home
            </Link>
            <FiChevronRight className="text-[10px]" aria-hidden="true" />
            <span className="text-gray-300">Services</span>
          </motion.nav>

          <div className="max-w-4xl space-y-8">
            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.2em] w-fit shadow-[0_0_20px_rgba(34,211,238,0.1)]"
            >
              {homePageData.services.badge}
            </motion.div>
            
            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
            >
              {homePageData.services.title}
            </motion.h1>
            
            <motion.p
              variants={heroItem}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light"
            >
              {homePageData.services.description}
            </motion.p>

            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6"
            >
              <button
                onClick={scrollToContactForm}
                id="hero-book-btn"
                className="group relative px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
                <span className="relative z-10 flex items-center gap-2">
                  Book a Consultation
                </span>
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-gray-500 uppercase tracking-widest">
                <FiClock className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Explore all service offerings</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="py-24 bg-[#050A14]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="mb-20 text-center"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={heroItem}
              className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold block mb-4"
            >
              {homePageData.services.badge}
            </motion.span>
            <motion.h2
              variants={heroItem}
              className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white"
            >
              {homePageData.services.title}
            </motion.h2>
            <motion.p
              variants={heroItem}
              className="text-gray-400 max-w-2xl mx-auto mt-6 text-sm font-light leading-relaxed"
            >
              {homePageData.services.description}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {homePageData.services.items.map((service) => {
              const Icon = servicesIcons[service.icon];
              const slug = slugifyServiceTitle(service.title);

              return (
                <motion.div
                  key={service.title}
                  variants={gridItem}
                  className="border-r border-b border-white/10 group relative overflow-hidden bg-[#030712] hover:bg-[#080C17] transition-colors duration-500"
                >
                  {/* Gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <Link
                    to={`/services/${slug}`}
                    className="p-10 block h-full relative z-10"
                  >
                    <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 mb-8 group-hover:text-cyan-400 group-hover:border-cyan-400/30 group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 text-xs font-mono text-gray-500 uppercase tracking-widest">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <FaRegCheckCircle className="w-4 h-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore Service <FiChevronRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
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