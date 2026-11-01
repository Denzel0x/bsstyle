import React from "react";
import { motion } from "motion/react";
import { FiShield, FiTrendingUp } from "react-icons/fi";

type ServicesDetailsServiceDetailsProps = {
  overview: ServicesData["services"]["overview"];
};

const overviewIcons: Record<
  OverviewHighlightIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  trendingUp: FiTrendingUp,
  shield: FiShield,
};

export default function ServicesDetailsServiceDetails({
  overview,
}: ServicesDetailsServiceDetailsProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div 
      id="service-details" 
      className="scroll-mt-24 space-y-12 pt-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className="space-y-8">
        <motion.div variants={fadeInUp} className="flex items-center gap-4">
          <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            Service Details
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-6 text-base md:text-lg text-gray-400 font-light leading-relaxed">
          {overview.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerContainer}>
        {overview.highlights.map((highlight) => {
          const Icon = overviewIcons[highlight.icon];
          return (
            <motion.div
              key={highlight.title}
              variants={fadeInUp}
              className="p-8 bg-[#030712] border border-white/10 relative group overflow-hidden hover:border-cyan-400/30 transition-colors duration-500"
            >
              {/* Subtle hover glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-12 h-12 border border-white/10 bg-white/5 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-400/10 transition-all duration-500 relative z-10">
                <Icon className="w-5 h-5" aria-hidden={true} />
              </div>

              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-3 relative z-10">
                {highlight.title}
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed relative z-10">
                {highlight.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div className="space-y-6" variants={fadeInUp}>
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
          Key Deliverables
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {overview.deliverables.map((deliverable) => (
            <div key={deliverable} className="flex items-start gap-4 p-4 border border-white/5 bg-white/[0.02]">
              <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-[10px] font-bold" aria-hidden="true">
                ✓
              </span>
              <span className="text-sm text-gray-300 font-light leading-relaxed">
                {deliverable}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}