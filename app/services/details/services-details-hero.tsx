import { Link } from "react-router";
import { FiCalendar, FiChevronRight } from "react-icons/fi";
import { motion } from "motion/react";

type ServicesDetailsHeroProps = {
  selectedPackage: ServicesData["services"]["engagementPackages"]["items"][number];
};

export default function ServicesDetailsHero({
  selectedPackage,
}: ServicesDetailsHeroProps) {
  return (
    <section className="bg-[#030712] py-24 relative overflow-hidden border-b border-white/5">
      {/* Background Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[120px] -ml-48 -mb-48" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.nav 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-500 mb-12"
        >
          <Link to="/" className="hover:text-cyan-400 transition-colors" id="breadcrumb-home">
            Home
          </Link>
          <FiChevronRight className="text-[10px]" aria-hidden="true" />
          <Link to="/services" className="hover:text-cyan-400 transition-colors" id="breadcrumb-services">
            Services
          </Link>
        </motion.nav>

        <motion.div 
          className="max-w-4xl space-y-8"
          initial="hidden" 
          animate="visible" 
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
          >
            {selectedPackage.name}
          </motion.h1>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light"
          >
            {selectedPackage.description}
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6"
          >
            <Link
              to="/#contact"
              id="hero-book-btn"
              className="group relative px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                {selectedPackage.ctaLabel}
              </span>
            </Link>

            <div className="flex items-center gap-3 text-sm font-mono text-gray-400 uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-3 rounded-sm backdrop-blur-md">
              <FiCalendar className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <span className="font-bold text-white">
                {selectedPackage.priceMain}
              </span>
              <span className="text-gray-500">
                {selectedPackage.priceSuffix}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </section>
  );
}



// import { FiCalendar, FiChevronRight } from "react-icons/fi";

// type ServicesDetailsHeroProps = {
//   selectedPackage: ServicesData["services"]["engagementPackages"]["items"][number];
// };

// export default function ServicesDetailsHero({
//   selectedPackage,
// }: ServicesDetailsHeroProps) {
//   return (
//     <section className="hero-gradient py-24 relative overflow-hidden">
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//       </div>

//       <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10 text-white">
//         <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
//           <a href="/" className="hover:text-white" id="breadcrumb-home">
//             Home
//           </a>
//           <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//           <a
//             href="/services"
//             className="hover:text-white"
//             id="breadcrumb-services"
//           >
//             Services
//           </a>
//         </nav>

//         <div className="max-w-3xl space-y-6">
//           <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
//             {selectedPackage.name}
//           </h1>

//           <p className="text-xl text-slate-300 leading-relaxed">
//             {selectedPackage.description}
//           </p>

//           <div className="flex items-center gap-6 pt-4 flex-wrap">
//             <a
//               href="/#contact"
//               id="hero-book-btn"
//               className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
//             >
//               {selectedPackage.ctaLabel}
//             </a>

//             <div className="flex items-center gap-2 text-sm text-slate-400">
//               <FiCalendar
//                 className="w-5 h-5 text-blue-400"
//                 aria-hidden="true"
//               />
//               <span>
//                 {selectedPackage.priceMain}
//                 <span className="text-slate-400">
//                   {selectedPackage.priceSuffix}
//                 </span>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }