import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { FaArrowRight, FaQuoteLeft, FaTrophy } from "react-icons/fa";
import data from "../../lib/data.json";

const CASE_STUDIES = (data as PortfolioData).portfolio.caseStudies;

// Extract unique industries from data for dynamic filtering (fallback to hardcoded if needed)
const FILTER_OPTIONS = [
  "All Industries",
  "Fintech",
  "Retail",
  "Energy",
  "Technology",
  "Web3",
  "Logistics",
];

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All Industries");

  // Scroll to contact form on homepage
  const scrollToContactForm = () => {
    if (window.location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#contact");
    }
  };

  // Filter logic
  const filteredCaseStudies =
    activeFilter === "All Industries"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) =>
          c.industry.toLowerCase().includes(activeFilter.toLowerCase())
        );

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
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  } as const;

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white"
    >
      {/* HERO SECTION */}
      <section className="bg-[#030712] pt-32 pb-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px] -mr-96 -mt-96" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600 rounded-full blur-[120px] -ml-48 -mb-48" />
        </div>

        <motion.div
          className="max-w-[1200px] mx-auto px-6 relative z-10 text-center"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.2em] backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
          >
            <FaTrophy className="w-4 h-4" aria-hidden="true" />
            Excellence in Execution
          </motion.div>
          
          <motion.h1
            variants={heroItem}
            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 mb-6"
          >
            Our Impact <br className="hidden md:block" /> in Action
          </motion.h1>
          
          <motion.p
            variants={heroItem}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Explore how Invorious has partnered with global leaders to
            navigate disruption and unlock sustainable growth across diverse
            industries.
          </motion.p>
        </motion.div>
      </section>

      {/* FILTER BAR (Now Functional) */}
      <section className="py-4 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl sticky top-20 z-40">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-center gap-3">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-cyan-400/30"
              }`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="py-24 bg-[#050A14] border-b border-white/5 min-h-[600px]" id="portfolio">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={gridContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filteredCaseStudies.map((c) => (
                <motion.div 
                  layout
                  key={c.slug ?? c.title} 
                  variants={gridItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    to={`/portfolio/${c.slug}`}
                    className="group cursor-pointer block h-full flex flex-col"
                  >
                    <div className="aspect-[4/5] border border-white/10 overflow-hidden mb-6 relative bg-[#030712]">
                      <img
                        src={c.imageSrc}
                        alt={c.imageAlt}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                      
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-mono font-bold uppercase tracking-widest">
                          {c.industry}
                        </span>
                        <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-mono font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                          {c.outcomeLabel}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 flex-grow">
                      {c.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mt-auto">
                      Read Case Study
                      <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredCaseStudies.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-24"
            >
              <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">No case studies found for this industry.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* MEASURABLE RESULTS SECTION */}
      <section className="py-24 bg-[#030712] border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              variants={heroContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                <motion.span
                  variants={heroItem}
                  className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold"
                >
                  Measurable Results
                </motion.span>
              </div>
              
              <motion.h2
                variants={heroItem}
                className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1] text-white"
              >
                We measure our success by the success of our clients.
              </motion.h2>
              
              <motion.p
                variants={heroItem}
                className="text-base text-gray-400 leading-relaxed font-light"
              >
                Beyond the strategies and slides, we focus on tangible metrics
                that move the needle. Our results are validated by the growth of
                our partners over long-term engagements.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10"
              >
                {[
                  { val: "$2.4B+", label: "Client Capital Optimized" },
                  { val: "120%", label: "Avg. Efficiency Increase" },
                  { val: "45+", label: "Fortune 100 Partners" },
                  { val: "15+", label: "Industry Awards" },
                ].map((stat, i) => (
                  <div key={i} className="border-l border-white/10 pl-6 group">
                    <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-500">
                      {stat.val}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-[0.15em]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 p-10 lg:p-14 shadow-[0_0_40px_rgba(37,99,235,0.1)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                
                <FaQuoteLeft
                  className="text-5xl text-blue-500/30 mb-8"
                  aria-hidden="true"
                />
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed italic mb-8 text-gray-300 relative z-10">
                  "Invorious didn't just deliver a plan; they integrated
                  into our culture and stayed through the execution phase. The
                  $40M in operational savings we achieved was a direct result of
                  their hands-on methodology."
                </blockquote>

                <div className="flex items-center gap-4 relative z-10">
                  <img
                    src="/images/clients/ThomasReed.jpg"
                    alt="Thomas Reed"
                    className="w-12 h-12 rounded-full border border-white/20 grayscale"
                  />
                  <div className="text-sm">
                    <h5 className="font-bold text-white uppercase tracking-wider">Thomas Reed</h5>
                    <p className="text-cyan-400 font-mono text-[10px] mt-1 uppercase tracking-widest">COO, Global Logistics Corp</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-[#050A14]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="bg-[#030712] border border-white/10 p-12 lg:p-24 text-center relative overflow-hidden group"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Animated Background Glows */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-cyan-500 transition-colors duration-1000" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600 rounded-full blur-[100px] -ml-48 -mb-48 group-hover:bg-blue-500 transition-colors duration-1000" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <motion.h2
                variants={heroItem}
                className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white"
              >
                Ready to be our next <br className="hidden md:block"/> success story?
              </motion.h2>
              
              <motion.p
                variants={heroItem}
                className="text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-xl mx-auto"
              >
                Let's discuss how our strategic framework can be tailored to
                solve your organization's most pressing challenges.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
              >
                <button
                  onClick={scrollToContactForm}
                  id="cta-start-project"
                  className="group/btn relative px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover/btn:animate-shimmer" />
                  <span className="relative z-10 flex items-center gap-2">
                    Start a Partnership
                    <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </button>
                
                <Link
                  to="/services"
                  id="cta-learn-more"
                  className="group/sec relative px-8 py-4 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all backdrop-blur-md overflow-hidden rounded-sm hover:border-cyan-400/50 flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/sec:translate-x-full transition-transform duration-700" />
                  Our Methodology
                </Link>
              </motion.div>
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