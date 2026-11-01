import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "motion/react";

type ServicesDetailsPriceListDetailsProps = {
  selectedPackage: ServicesData["services"]["engagementPackages"]["items"][number];
};

export default function ServicesDetailsPriceListDetails({
  selectedPackage,
}: ServicesDetailsPriceListDetailsProps) {
  return (
    <motion.div 
      id="price-list-details" 
      className="scroll-mt-24 space-y-8 pt-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-4">
        <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
          Price List Details
        </h2>
      </div>

      <div className="p-8 md:p-10 bg-[#050A14] border border-white/10 relative overflow-hidden group">
        {/* Subtle hover glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors duration-700" />
        
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 flex-wrap relative z-10">
          <div>
            {selectedPackage.isFeatured && (
              <div className="inline-flex items-center px-3 py-1 border border-blue-500/30 bg-blue-600/10 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
                {selectedPackage.badgeText}
              </div>
            )}

            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-4">
              {selectedPackage.priceMain}
              <span className="text-lg md:text-xl font-mono font-normal text-gray-500 ml-1">
                {selectedPackage.priceSuffix}
              </span>
            </div>

            <p className="text-sm text-gray-400 font-light max-w-md leading-relaxed">
              {selectedPackage.description}
            </p>
          </div>

          <Link
            to="/services"
            className="group/link text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors mt-4 sm:mt-0 bg-white/5 px-4 py-2 border border-white/10 hover:border-cyan-400/30"
          >
            Back to services
            <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        <ul className="space-y-4 mt-10 relative z-10">
          {selectedPackage.features.map((feature) => (
            <li
              key={feature.text}
              className={`flex items-start gap-4 text-sm ${
                feature.included ? "text-gray-200" : "text-gray-600"
              }`}
            >
              <span
                className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold border ${
                  feature.included
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                    : "border-white/10 bg-white/5 text-gray-600 line-through"
                }`}
                aria-hidden="true"
              >
                {feature.included ? "✓" : "✕"}
              </span>
              <span className={`font-light leading-relaxed ${!feature.included && "line-through opacity-50"}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}


// import { FaArrowRight } from "react-icons/fa";

// type ServicesDetailsPriceListDetailsProps = {
//   selectedPackage: ServicesData["services"]["engagementPackages"]["items"][number];
// };

// export default function ServicesDetailsPriceListDetails({
//   selectedPackage,
// }: ServicesDetailsPriceListDetailsProps) {
//   return (
//     <div id="price-list-details" className="scroll-mt-24 space-y-6 pt-2">
//       <h2 className="text-3xl font-bold text-slate-900">Price List Details</h2>

//       <div className="p-10 bg-slate-50 border border-slate-100 rounded-3xl">
//         <div className="flex items-start justify-between gap-6 flex-wrap">
//           <div>
//             {selectedPackage.isFeatured && (
//               <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
//                 {selectedPackage.badgeText}
//               </div>
//             )}

//             <div className="text-3xl font-black text-slate-900">
//               {selectedPackage.priceMain}
//               <span className="text-lg font-normal text-slate-500">
//                 {selectedPackage.priceSuffix}
//               </span>
//             </div>

//             <p className="text-sm text-slate-600 mt-2">
//               {selectedPackage.description}
//             </p>
//           </div>

//           <a
//             href="/services"
//             className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:text-blue-700 transition-colors"
//           >
//             Back to services{" "}
//             <FaArrowRight className="w-4 h-4" aria-hidden="true" />
//           </a>
//         </div>

//         <ul className="space-y-4 mt-8">
//           {selectedPackage.features.map((feature) => (
//             <li
//               key={feature.text}
//               className={`flex items-center gap-3 text-sm ${
//                 feature.included ? "text-slate-700" : "text-slate-400"
//               }`}
//             >
//               <span
//                 className={
//                   feature.included
//                     ? "text-green-500"
//                     : "text-slate-300 line-through"
//                 }
//                 aria-hidden="true"
//               >
//                 {feature.included ? "✓" : "✕"}
//               </span>
//               {feature.text}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }