import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  FaBrain,
  FaChartBar,
  FaCoffee,
  FaGraduationCap,
  FaHeart,
  FaQuoteLeft,
  FaStethoscope,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import data from "../../lib/data.json";

const workWithUsData = (data as WorkWithUsData).workWithUs;
const openings = workWithUsData.openings;
const journey = workWithUsData.journey;
const benefits = workWithUsData.benefits;

const benefitIcons: Record<
  BenefitIcon,
  React.ComponentType<{ className?: string }>
> = {
  stethoscope: FaStethoscope,
  graduationCap: FaGraduationCap,
  coffee: FaCoffee,
  chartBar: FaChartBar,
};

export default function WorkWithUs() {
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
  } as const;

  return (
    <main 
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white min-h-screen"
    >
      {/* HERO SECTION */}
      <section className="pt-32 pb-24 bg-[#030712] relative overflow-hidden border-b border-white/5">
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
            Careers at Invorious
          </motion.div>
          
          <motion.h1
            variants={heroItem}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 mb-8 leading-[1.05]"
          >
            Shape the Future <br />
            of Global Business.
          </motion.h1>
          
          <motion.p
            variants={heroItem}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-10"
          >
            Join a collective of world-class experts dedicated to solving the
            most complex challenges of the modern economy.
          </motion.p>
          
          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="#open-positions"
              id="cta-scroll-jobs"
              className="group relative w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
              <span className="relative z-10">View Open Roles</span>
            </a>
            <a
              href="#culture"
              id="cta-scroll-culture"
              className="group relative w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all backdrop-blur-md overflow-hidden rounded-sm hover:border-cyan-400/50 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Our Culture
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* CULTURE SECTION */}
      <section id="culture" className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              variants={heroContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="space-y-4">
                <motion.div variants={heroItem} className="flex items-center gap-4">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                  <span className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold">The Invorious Way</span>
                </motion.div>
                <motion.h2
                  variants={heroItem}
                  className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]"
                >
                  Built on Intelligence, <br className="hidden md:block"/> Driven by Impact.
                </motion.h2>
              </div>
              
              <motion.p
                variants={heroItem}
                className="text-base text-gray-400 leading-relaxed font-light"
              >
                At Invorious, we do not just provide consulting; we architect
                transformation. Our culture is defined by intellectual
                curiosity, radical transparency, and a relentless commitment to
                our clients&apos; success. 
                <br/><br/>
                We are an AI-first engineering team. We use Cursor as our primary development tool - it is not just an editor, but our pair programmer, code reviewer, and productivity multiplier. We believe AI-assisted development allows us to ship high-quality code 3-5x faster without compromising quality. Every engineer is expected to be proficient with AI tools and to use them as force multipliers in their daily work.
                We hire leaders who think differently, act with purpose, and embrace the tools that help us build the future.
              </motion.p>
              
              <motion.div
                variants={heroItem}
                className="grid sm:grid-cols-2 gap-6 pt-4"
              >
                <div className="p-6 bg-[#030712] border border-white/10 group hover:border-cyan-400/30 transition-colors">
                  <div className="w-10 h-10 border border-white/10 bg-white/5 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaBrain className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-2">
                    Intellectual Rigor
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    We value depth of thought and data-driven insights over
                    conventional wisdom.
                  </p>
                </div>
                
                <div className="p-6 bg-[#030712] border border-white/10 group hover:border-cyan-400/30 transition-colors">
                  <div className="w-10 h-10 border border-white/10 bg-white/5 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaHeart className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-2">
                    Human Centric
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Strategy is about people. We prioritize empathy and
                    partnership in every engagement.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-square border border-white/10 overflow-hidden relative group">
                <img
                  src="/images/workwithus/blockcSherpaCulture.avif"
                  alt="Invorious Culture"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-80" />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-[#030712] border border-blue-500/30 p-6 md:p-8 text-white shadow-[0_0_30px_rgba(37,99,235,0.2)] max-w-[240px]">
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">94%</p>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-widest leading-relaxed">
                  Employee satisfaction rating across our global offices.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS SECTION */}
      <section id="open-positions" className="py-24 bg-[#030712] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="mb-16"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={heroItem}
              className="text-cyan-400 font-mono font-bold uppercase tracking-[0.3em] text-xs block mb-4"
            >
              Opportunities
            </motion.span>
            <motion.h2
              variants={heroItem}
              className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white"
            >
              Current Openings
            </motion.h2>
            <motion.p
              variants={heroItem}
              className="text-gray-400 mt-4 max-w-2xl text-sm font-light"
            >
              We are always looking for exceptional talent to join our
              specialized practice groups.
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-4 w-full"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {openings && openings.length > 0 ? (
              openings.map((opening) => (
                <motion.div
                  key={opening.id}
                  variants={gridItem}
                  className="bg-white/[0.02] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 hover:bg-white/[0.05] hover:border-cyan-400/30 transition-all duration-300 group w-full"
                >
                  <div className="space-y-3 w-full">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/30 text-cyan-400 text-[9px] font-mono font-bold uppercase tracking-widest">
                        {opening.category}
                      </span>
                      <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">
                        {opening.details}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                      {opening.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light max-w-3xl leading-relaxed">
                      {opening.description}
                    </p>
                  </div>
                  
                  <Link
                    to={`/work-with-us/${opening.id}`}
                    id={opening.id}
                    className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center flex items-center justify-center gap-2 shrink-0 rounded-sm"
                  >
                    Apply Now
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No open positions at the moment. Check back soon!</p>
              </div>
            )}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm font-light">
              Don&apos;t see a role that fits?{" "}
              <a
                href="mailto:career@invorious.com"
                id="general-apply-link"
                className="text-cyan-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors ml-1"
              >
                Send us a general application
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* JOURNEY & BENEFITS SECTION */}
      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* JOURNEY */}
          <motion.div
            className="space-y-12"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              variants={heroItem}
              className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
            >
              Your Journey to <br /> Joining Invorious
            </motion.h2>
            
            <motion.div variants={heroItem} className="space-y-10">
              {journey.map((item, index) => {
                const isLast = index === journey.length - 1;

                return (
                  <div key={`journey-step-${item.step}`} className="flex gap-6 relative group">
                    {/* Timeline Line */}
                    {!isLast && <div className="absolute left-5 top-10 bottom-[-40px] w-[1px] bg-white/10" />}
                    
                    <div className="w-10 h-10 border border-white/20 bg-[#030712] text-cyan-400 flex items-center justify-center font-mono font-bold text-sm shrink-0 z-10 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all duration-300 shadow-[0_0_10px_rgba(3,7,18,1)]">
                      {item.step}
                    </div>
                    
                    <div className="space-y-2 pt-1">
                      <h4 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* BENEFITS */}
          <motion.div
            className="bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 p-8 md:p-12 shadow-[0_0_40px_rgba(37,99,235,0.1)] relative overflow-hidden"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-10 relative z-10">
              Global Benefits
            </h3>
            
            <motion.div variants={heroItem} className="grid gap-8 relative z-10">
              {benefits.map((benefit) => {
                const Icon = benefitIcons[benefit.icon];

                return (
                  <div key={`benefit-${benefit.icon}`} className="flex gap-5 group">
                    <div className="w-12 h-12 border border-white/10 bg-white/5 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-cyan-400/10 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white uppercase tracking-wider text-sm mb-2 group-hover:text-cyan-400 transition-colors">
                        {benefit.title}
                      </h5>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-24 bg-[#030712] border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          className="max-w-[1200px] mx-auto px-6 text-center relative z-10"
          variants={heroContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={heroItem} className="mb-10">
            <FaQuoteLeft className="text-5xl text-blue-500/30 mx-auto" />
          </motion.div>
          
          <motion.blockquote
            variants={heroItem}
            className="text-xl md:text-3xl font-light text-white leading-relaxed tracking-tight mb-12 max-w-4xl mx-auto"
          >
            &quot;Invorious provided me with the platform to work on projects that
            actually move the needle for global industries. The level of
            autonomy and support from the leadership is unparalleled in the
            consulting world.&quot;
          </motion.blockquote>
          
          <motion.div
            variants={heroItem}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 border border-white/20 p-1 mb-4">
              <img
                src="/images/team/spec3.jpg"
                className="w-full h-full object-cover grayscale"
                alt="Employee Portrait"
              />
            </div>
            <h5 className="font-bold text-white uppercase tracking-widest text-sm">Julian Voss</h5>
            <p className="text-cyan-400 font-mono text-[10px] mt-2 uppercase tracking-widest">
              Blockchain Supply Chain Advisor
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-24 bg-[#050A14]">
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center space-y-8"
          variants={heroContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={heroItem}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500"
          >
            Ready to redefine your future?
          </motion.h2>
          
          <motion.p
            variants={heroItem}
            className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Join a team that&apos;s building the next generation of Web3 infrastructure. We&apos;re excited to meet you.
          </motion.p>
          
          <motion.div
            variants={heroItem}
            className="flex justify-center pt-6"
          >
            <a
              href="mailto:career@invorious.com"
              id="footer-career-mail"
              className="group relative w-full sm:w-auto sm:min-w-[280px] px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-3">
                Contact Careers Team
                <FiMail className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </motion.div>
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