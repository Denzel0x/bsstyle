import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  FiAward,
  FiClock,
  FiGlobe,
  FiPhone,
  FiShield,
  FiTarget,
  FiZap,
  FiUsers,
  FiArrowUpRight,
} from "react-icons/fi";
import data from "../../lib/data.json";
import { useAboutStatsAnimation } from "../../service/about.service";

const aboutData = (data as AboutData).about;

const values = aboutData.values;
const journey = aboutData.journey;
const stats = aboutData.stats;
const presence = aboutData.presence;
const recognitions = aboutData.recognitions;

const valueIcons: Record<
  AboutValueIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  award: FiAward,
  shield: FiShield,
  zap: FiZap,
  users: FiUsers,
};

const recognitionIcons: Record<
  RecognitionIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  award: FiAward,
  shield: FiShield,
  target: FiTarget,
  zap: FiZap,
};

export default function About() {
  const navigate = useNavigate();
  const { statsSectionRef, animatedStats } = useAboutStatsAnimation();

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

  const sectionContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  } as const;

  const sectionItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="pt-20 bg-[#030712] min-h-screen text-white selection:bg-blue-600 selection:text-white relative"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-24 border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="max-w-[1200px] mx-auto px-6 relative z-10"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={heroItem} className="flex items-center gap-4 mb-8">
            <span className="h-[1px] w-12 bg-blue-500"></span>
            <span className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold">
              About Invorious
            </span>
          </motion.div>
          
          {/* FIXED HEADING SIZE */}
          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-blue-900/50"
          >
            Client-
            <br />
            Centred.
          </motion.h1>
          
          <motion.div variants={heroItem} className="mt-12 max-w-2xl border-l-2 border-blue-500/50 pl-6">
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-snug">
              We are a small, senior software agency based in Sydney. We build tailored software solutions—from Web2 apps to Web3 protocols—that fit how a business actually runs.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* EDITORIAL MISSION SECTION */}
      <section className="relative z-10 py-32 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <motion.div
              className="lg:col-span-7 space-y-12"
              variants={sectionContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={sectionItem} className="flex items-center gap-3 text-sm font-mono tracking-widest text-gray-400 uppercase">
                <FiClock className="text-cyan-400" />
                Established in 2021
              </motion.div>

              <motion.h2
                variants={sectionItem}
                className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-[1.1]"
              >
                No bloated management.
                <br />
                <span className="text-gray-600">Just great code.</span>
              </motion.h2>

              <motion.p
                variants={sectionItem}
                className="text-lg text-gray-400 leading-relaxed font-light max-w-xl"
              >
                Founded in Sydney, Invorious was born to fix the broken agency model. We are a tight-knit team of senior builders who believe the engineers who scope your project should be the exact same people who write the code.
              </motion.p>

              <motion.div
                variants={sectionItem}
                className="relative p-10 bg-[#0A0F1C] border border-blue-900/30 group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 mb-6">
                  Our Mission
                </h4>
                <p className="text-2xl md:text-3xl font-light leading-snug text-gray-200">
                  "To deliver top-quality, client-centred software solutions that exceed expectations. By keeping our team deliberately small, we guarantee 1:1 access to elite engineers who build secure, scalable systems that drive real-world success."
                </p>
                <FiTarget className="absolute -right-10 -bottom-10 text-[200px] text-white/[0.02]" />
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-auto">
                <img
                  src="/images/about/office.avif"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Modern Office"
                />
                <div className="absolute inset-0 border border-blue-500/30 translate-x-4 translate-y-4 -z-10" />
              </div>
              
              <div className="absolute -bottom-10 -left-10 lg:-left-20 bg-[#030712] border border-white/10 p-8 w-48 backdrop-blur-xl">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-500">
                  2–10
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 mt-2">
                  Senior Team Members
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FASHION VALUES GRID */}
      <section className="relative z-10 py-32 bg-[#050A14] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <motion.span variants={sectionItem} className="text-gray-500 font-mono uppercase tracking-[0.3em] text-xs mb-4 block">
                Our Values
              </motion.span>
              <motion.h2 variants={sectionItem} className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                The Pillars
              </motion.h2>
            </div>
            <motion.p variants={sectionItem} className="text-gray-400 max-w-sm text-sm font-light">
              The core principles that dictate how we operate, build, and interact with our clients.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/10"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((value, index) => {
              const Icon = valueIcons[value.icon];
              return (
                <motion.div
                  key={value.title}
                  variants={sectionItem}
                  className="p-10 border-r border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500 group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-16">
                    <Icon className="text-3xl text-gray-500 group-hover:text-cyan-400 transition-colors duration-500" />
                    <span className="font-mono text-xs text-gray-600">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {value.description}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* EDITORIAL TIMELINE */}
      <section className="relative z-10 py-32 border-b border-white/10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="mb-24 text-center"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={sectionItem} className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs">
              Our Journey
            </motion.span>
            <motion.h2 variants={sectionItem} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4">
              Milestones
            </motion.h2>
          </motion.div>

          <div className="relative">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
              variants={sectionContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {journey.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  variants={sectionItem}
                  className="relative pt-8 border-t border-white/20 group"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 bg-white -translate-y-1/2 group-hover:bg-blue-500 group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0)] group-hover:shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                  
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent mb-4 group-hover:from-blue-400 group-hover:to-blue-900 transition-all duration-500">
                    {item.year}
                  </div>
                  <h4 className="font-bold text-white text-lg uppercase tracking-tight mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* MASSIVE DATA / STATS */}
      <section ref={statsSectionRef} className="relative z-10 py-32 bg-[#050A14] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((item) => (
              <motion.div
                key={item.key}
                variants={sectionItem}
                className="flex flex-col items-start border-l border-blue-500/30 pl-6"
              >
                <div className="text-6xl lg:text-7xl font-black tracking-tighter text-white mb-2">
                  <span className="text-cyan-400">{item.prefix}</span>
                  {animatedStats[item.key]}
                  <span className="text-gray-500 text-4xl">{item.suffix}</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BOUTIQUE PRESENCE */}
      <section className="relative z-10 py-32 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <motion.div
              className="lg:col-span-4"
              variants={sectionContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span variants={sectionItem} className="text-gray-500 font-mono uppercase tracking-[0.3em] text-xs block mb-6">
                Our Presence
              </motion.span>
              <motion.h2 variants={sectionItem} className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10">
                {presence.heading}
              </motion.h2>
              
              <motion.button
                variants={sectionItem}
                onClick={scrollToContactForm}
                className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white hover:text-cyan-400 transition-colors"
              >
                Contact Regional HQ
                <span className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-blue-600/20 transition-all">
                  <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              className="lg:col-span-8 grid md:grid-cols-2 gap-8"
              variants={sectionContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {presence.offices.map((office) => (
                <motion.div
                  key={office.city}
                  variants={sectionItem}
                  className="p-8 bg-[#0A0F1C] border border-white/10 group hover:border-blue-500/50 transition-colors"
                >
                  <h4 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">
                    {office.city}
                  </h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                    {office.type}
                    <br />
                    {office.address}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white">
                    <FiPhone className="text-cyan-400" />
                    {office.phone}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* MINIMALIST RECOGNITIONS */}
      <section className="relative z-10 py-24 bg-[#030712]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="flex flex-wrap justify-between items-center gap-12"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {recognitions.map((recognition) => {
              const Icon = recognitionIcons[recognition.icon];
              return (
                <motion.div
                  key={`${recognition.icon}-${recognition.label}`}
                  variants={sectionItem}
                  className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  <Icon className="text-2xl text-white" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                    {recognition.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}