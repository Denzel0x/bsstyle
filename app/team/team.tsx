import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import data from "../../lib/data.json";

const teamData = (data as TeamData).team;
const LEADERS = teamData.leaders;
const SPECIALISTS = teamData.specialists;

const FILTER_TABS = ["All Leaders", "Strategy", "Operations"];

export default function Team() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Leaders");

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

  const goToMember = (slug?: string) => {
    if (!slug) return;
    navigate(`/team/${slug}`);
  };

  // Filter logic based on the selected tab
  const filteredLeaders = activeTab === "All Leaders"
    ? LEADERS
    : LEADERS.filter((leader) => {
        const role = leader.role.toLowerCase();
        if (activeTab === "Strategy") return role.includes("strategy");
        if (activeTab === "Operations") return role.includes("advisory") || role.includes("risk") || role.includes("operations");
        return true;
      });

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
    hidden: { opacity: 0, y: 20 },
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
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white min-h-screen"
    >
      {/* HERO SECTION */}
      <section
        id="team"
        className="pt-40 pb-24 bg-[#030712] relative overflow-hidden border-b border-white/5"
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[120px] -ml-48 -mb-48" />
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
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            Our People
          </motion.div>
          
          <motion.h1
            variants={heroItem}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 mb-8 leading-[1.05]"
          >
            The Minds Shaping <br className="hidden md:block"/> Tomorrow&apos;s Web3 Strategies.
          </motion.h1>
          
          <motion.p
            variants={heroItem}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Invorious is built on the collective brilliance of blockchain veterans, decentralized finance masters, and visionary Web3 leaders. Our diverse expertise is your competitive advantage.
          </motion.p>
        </motion.div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              variants={heroContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                variants={heroItem}
                className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white"
              >
                Executive Leadership
              </motion.h2>
              <motion.p variants={heroItem} className="text-gray-400 mt-4 text-sm font-light max-w-xl">
                The core steering committee guiding Invorious&apos;s global Web3 strategy and execution.
              </motion.p>
            </motion.div>

            {/* FUNCTIONAL TABS */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 rounded-none border ${
                    activeTab === tab
                      ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-400/30"
                  }`}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </motion.div>
          </div>

          {/* LEADERS GRID */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={gridContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filteredLeaders.map((leader) => (
                <motion.div
                  layout
                  key={leader.name}
                  variants={gridItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group cursor-pointer flex flex-col"
                  role="button"
                  tabIndex={0}
                  onClick={() => goToMember(leader.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") goToMember(leader.slug);
                  }}
                >
                  <div className="relative aspect-[4/5] border border-white/10 overflow-hidden mb-6 bg-[#030712]">
                    <img
                      src={leader.imageSrc}
                      alt={leader.imageAlt}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                      <p className="text-sm text-gray-300 font-light leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {leader.overlayText}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                      {leader.name}
                    </h4>
                    <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                      {leader.role}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {leader.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-[9px] font-mono font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-gray-400 px-2 py-1"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* SPECIALISTS SECTION */}
      <section className="py-24 bg-[#030712] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="mb-16"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={heroItem}
              className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white"
            >
              Senior Consultants &amp; Specialists
            </motion.h2>
            <motion.p variants={heroItem} className="text-gray-400 mt-4 text-sm font-light">
              The deep domain experts executing change across industries.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {SPECIALISTS.map((s) => (
              <motion.div
                key={s.name}
                variants={gridItem}
                className="p-6 bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.05] transition-all duration-300 group cursor-pointer flex flex-col"
                role="button"
                tabIndex={0}
                onClick={() => goToMember(s.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goToMember(s.slug);
                }}
              >
                <div className="aspect-square border border-white/10 overflow-hidden mb-6 relative">
                  <img
                    src={s.imageSrc}
                    alt={s.imageAlt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-50" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white group-hover:text-cyan-400 transition-colors">{s.name}</h4>
                <p className="text-xs text-gray-400 font-mono mt-1">{s.role}</p>
                
                <div className="mt-4 flex flex-wrap gap-2 mt-auto pt-4">
                  {s.tags.map((t) => (
                    <span
                      key={t.label}
                      className="text-[9px] font-mono font-bold bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5"
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-24 bg-[#050A14]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="bg-[#030712] border border-white/10 p-8 lg:p-16 xl:p-24 relative overflow-hidden group"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-cyan-500 transition-colors duration-1000" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600 rounded-full blur-[100px] -ml-48 -mb-48 group-hover:bg-blue-500 transition-colors duration-1000" />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
              <motion.div
                variants={heroItem}
                className="flex-1 space-y-6 text-white text-center lg:text-left w-full"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1]">
                  Want to work with our experts?
                </h2>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
                  Our team doesn&apos;t just provide answers; we solve your
                  specific organizational puzzles side-by-side with your
                  leadership.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 w-full">
                  <button
                    onClick={scrollToContactForm}
                    id="team-cta-btn"
                    className="group/btn relative w-full sm:w-auto justify-center px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-3 overflow-hidden rounded-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover/btn:animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-2">
                      Contact Invorious
                      <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  </button>
                  
                  <button
                    onClick={() => navigate("/work-with-us")}
                    id="team-cta-careers"
                    className="group/sec relative w-full sm:w-auto text-center px-8 py-4 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all backdrop-blur-md overflow-hidden rounded-sm hover:border-cyan-400/50 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/sec:translate-x-full transition-transform duration-700" />
                    Join Our Global Network
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={heroItem}
                className="flex-1 w-full max-w-md lg:max-w-none grid grid-cols-2 gap-4 lg:gap-6"
              >
                <div className="space-y-4 lg:space-y-6">
                  <div className="p-6 bg-white/5 border border-white/10 text-center hover:border-cyan-400/30 transition-colors">
                    <div className="text-3xl font-black text-white mb-1">15+</div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                      Senior Partners
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 text-center hover:border-cyan-400/30 transition-colors">
                    <div className="text-3xl font-black text-white mb-1">12</div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                      Nationalities
                    </div>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-6 pt-8">
                  <div className="p-6 bg-white/5 border border-white/10 text-center hover:border-cyan-400/30 transition-colors">
                    <div className="text-3xl font-black text-white mb-1">40+</div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                      Specialists
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 text-center hover:border-cyan-400/30 transition-colors">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">100%</div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                      Dedication
                    </div>
                  </div>
                </div>
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