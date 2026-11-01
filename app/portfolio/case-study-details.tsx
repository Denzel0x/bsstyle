import React from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import data from "../../lib/data.json";

const CASE_STUDIES = (data as PortfolioData).portfolio.caseStudies;

const teamData = (data as TeamData).team;
const TEAM_LEADERS = teamData.leaders;
const TEAM_SPECIALISTS = teamData.specialists;

function getTeamMemberSlug(name: string): string | undefined {
  return (
    TEAM_LEADERS.find((m) => m.name === name)?.slug ??
    TEAM_SPECIALISTS.find((m) => m.name === name)?.slug
  );
}

export default function CaseStudyDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const slug =
    (params as { id?: string; slug?: string }).slug ??
    (params as { id?: string; slug?: string }).id;

  const caseStudy = CASE_STUDIES.find((c) => c.slug === slug);
  if (!caseStudy) {
    throw new Response("Case study not found", { status: 404 });
  }

  const details = caseStudy.details;
  if (!details) {
    throw new Response("Case study details not found", { status: 500 });
  }
  const related = CASE_STUDIES.filter((c) => c.slug !== caseStudy.slug).slice(
    0,
    2,
  );

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
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white"
    >
      {/* HERO SECTION */}
      <section className="bg-[#030712] pt-32 pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-500 mb-12">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <FiChevronRight className="text-[10px]" />
            <Link to="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</Link>
            <FiChevronRight className="text-[10px]" />
            <span className="text-gray-300">{details.breadcrumbLabel}</span>
          </motion.nav>

          <motion.div className="max-w-4xl" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-6 block w-fit">
              {details.categoryLabel}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
              {details.pageTitle}
            </motion.h1>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-gray-400">
              {details.engagementBadges.map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  <span className="text-xs font-mono uppercase tracking-widest">{b.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CHALLENGE & SOLUTION */}
      <section className="py-24 bg-[#050A14] border-b border-white/5 relative z-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="p-8 sm:p-12 bg-[#030712] border border-white/10 h-full relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50 group-hover:bg-red-500 transition-colors duration-500" />
                <span className="text-red-400 font-mono uppercase tracking-[0.2em] text-xs mb-4 block">
                  The Challenge
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6">
                  {details.challenge.title}
                </h2>
                <p className="text-base text-gray-400 leading-relaxed mb-8 font-light">
                  {details.challenge.description}
                </p>
                <ul className="space-y-4">
                  {details.challenge.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-4">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                      <span className="text-sm text-gray-300 font-light">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }}>
              <div className="p-8 sm:p-12 bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 h-full relative overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.1)]">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                <span className="text-cyan-400 font-mono uppercase tracking-[0.2em] text-xs mb-4 block relative z-10">
                  The Invorious Solution
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6 relative z-10">
                  {details.solution.title}
                </h2>
                <p className="text-base text-gray-300 leading-relaxed mb-8 font-light relative z-10">
                  {details.solution.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                  {details.solution.features.map((f) => (
                    <div key={f.title} className="space-y-2 p-5 bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors">
                      <h4 className="font-bold text-white text-sm uppercase tracking-wider">{f.title}</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-24 bg-[#030712] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Measurable Impact
            </h2>
            <p className="text-gray-400 mt-4 text-sm font-light">
              We delivered data-driven Web3 results that transformed our clients' bottom lines and market perception.
            </p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {details.metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeInUp}
                className="p-10 border-r border-b border-white/10 bg-[#030712] hover:bg-white/[0.02] transition-colors group text-center flex flex-col items-center justify-center"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-500 mb-4">
                  {m.value}
                </div>
                <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em]">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-[#050A14] border-b border-white/5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-3xl font-black uppercase tracking-tight text-white mb-16">
            Phase-by-Phase Execution
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="absolute hidden md:block top-6 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {details.timeline.map((t, index) => (
              <motion.div 
                key={t.step} 
                className="relative space-y-4"
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.6 } } }}
              >
                <div className="w-12 h-12 bg-[#030712] border border-white/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-lg relative z-10 shadow-[0_0_15px_rgba(3,7,18,1)]">
                  {t.step}
                </div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wider pt-2">{t.title}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{t.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM INVOLVED */}
      <section className="py-24 bg-[#030712] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                Team Involved
              </h2>
              <p className="text-gray-400 mt-2 text-sm font-light">
                The experts behind the transformation.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Link to="/team" className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 group mt-4 md:mt-0">
                View Full Team <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {details.teamInvolved.map((m) => {
              const slug = getTeamMemberSlug(m.name);

              const card = (
                <div className="p-6 bg-white/[0.02] border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 h-full">
                  <div className="relative w-20 h-20 mb-6 overflow-hidden border border-white/10">
                    <img
                      src={m.imageSrc}
                      alt={m.imageAlt}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">{m.name}</h4>
                  <p className="text-xs text-cyan-400 font-mono mt-1">{m.role}</p>
                </div>
              );

              return slug ? (
                <motion.div key={m.name} variants={fadeInUp}>
                  <Link to={`/team/${slug}`} className="block group h-full">
                    {card}
                  </Link>
                </motion.div>
              ) : (
                <motion.div key={m.name} variants={fadeInUp} className="block group h-full">
                  {card}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 bg-[#050A14] border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div className="max-w-3xl mx-auto px-6 text-center relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <FaQuoteLeft className="text-5xl text-blue-500/30 mb-8 mx-auto" />
          <blockquote className="text-xl sm:text-3xl font-light text-white leading-relaxed tracking-tight mb-10">
            &quot;{details.testimonial.quote}&quot;
          </blockquote>
          <div className="flex flex-col items-center">
            <h5 className="font-bold text-white uppercase tracking-widest text-sm">
              {details.testimonial.name}
            </h5>
            <p className="text-cyan-400 font-mono text-[10px] mt-2 uppercase tracking-widest">
              {details.testimonial.role}
            </p>
          </div>
        </motion.div>
      </section>

      {/* GALLERY / INTERFACE EVOLUTION */}
      {details.gallery && details.gallery.length > 0 && (
        <section className="py-24 bg-[#030712] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-3xl font-black uppercase tracking-tight text-white mb-12 text-center">
              Interface Evolution
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {details.gallery.slice(0, 2).map((g, idx) => (
                <motion.div key={g.label} className="flex flex-col gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.2, duration: 0.6 } } }}>
                  <span className="text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                    {g.label}
                  </span>
                  <div
                    className={
                      g.label.toLowerCase().includes("legacy")
                        ? "aspect-video border border-white/10 overflow-hidden grayscale opacity-40"
                        : "aspect-video border border-blue-500/30 overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)] relative group"
                    }
                  >
                    <img
                      src={g.imageSrc}
                      alt={g.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {!g.label.toLowerCase().includes("legacy") && (
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none mix-blend-overlay" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KEY LEARNINGS */}
      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div className="lg:col-span-1" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                Key Strategic Learnings
              </h2>
              <p className="text-gray-400 mt-4 text-sm font-light leading-relaxed">
                Three fundamental insights we gained that now inform our broader practice.
              </p>
            </motion.div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {details.keyLearnings.map((k, idx) => (
                <motion.div
                  key={k.title}
                  className="p-8 bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-colors duration-300 group"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} 
                  variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { delay: idx * 0.1, duration: 0.6 } } }}
                >
                  <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-sm group-hover:text-cyan-400 transition-colors">{k.title}</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{k.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-[#030712]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            className="bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 p-12 lg:p-24 text-center relative overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -ml-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-600/20 blur-[100px] rounded-full -mr-32 -mb-32 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white">
                {details.bottomCta.title}
              </h2>
              <p className="text-base text-gray-400 font-light leading-relaxed">
                {details.bottomCta.description}
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <button
                  onClick={scrollToContactForm}
                  className="group relative px-10 py-5 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
                  <span className="relative z-10 flex items-center gap-2">
                    {details.bottomCta.buttonLabel}
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RELATED CASE STUDIES */}
      <section className="py-24 bg-[#050A14] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-2xl font-black uppercase tracking-tight text-white mb-12">
            More Success Stories
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p) => (
              <motion.div key={p.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Link to={`/portfolio/${p.slug}`} className="group block">
                  <div className="aspect-video border border-white/10 overflow-hidden mb-4 relative">
                    <img
                      src={p.imageSrc}
                      alt={p.imageAlt}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  </div>
                  <h4 className="font-bold text-white text-lg uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-widest">
                    {p.outcomeLabel}
                  </p>
                </Link>
              </motion.div>
            ))}
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
// import { Link, useParams, useNavigate } from "react-router";
// import { FaArrowRight, FaQuoteLeft } from "react-icons/fa";
// import { FiChevronRight } from "react-icons/fi";
// import data from "../../lib/data.json";

// const CASE_STUDIES = (data as PortfolioData).portfolio.caseStudies;

// const teamData = (data as TeamData).team;
// const TEAM_LEADERS = teamData.leaders;
// const TEAM_SPECIALISTS = teamData.specialists;

// function getTeamMemberSlug(name: string): string | undefined {
//   return (
//     TEAM_LEADERS.find((m) => m.name === name)?.slug ??
//     TEAM_SPECIALISTS.find((m) => m.name === name)?.slug
//   );
// }

// export default function CaseStudyDetailsPage() {
//   const navigate = useNavigate();
//   const params = useParams();
//   const slug =
//     (params as { id?: string; slug?: string }).slug ??
//     (params as { id?: string; slug?: string }).id;

//   const caseStudy = CASE_STUDIES.find((c) => c.slug === slug);
//   if (!caseStudy) {
//     throw new Response("Case study not found", { status: 404 });
//   }

//   const details = caseStudy.details;
//   if (!details) {
//     throw new Response("Case study details not found", { status: 500 });
//   }
//   const related = CASE_STUDIES.filter((c) => c.slug !== caseStudy.slug).slice(
//     0,
//     2,
//   );

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

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1 pt-20"
//     >
//       <section className="hero-gradient text-white pt-12 pb-32 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] -mr-96 -mt-96" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
//           <nav className="flex items-center gap-3 text-sm text-slate-400 mb-12">
//             <Link
//               to="/"
//               id="breadcrumb-home"
//               className="hover:text-blue-400 transition-colors"
//             >
//               Home
//             </Link>
//             <FiChevronRight className="text-xs" />
//             <Link
//               to="/portfolio"
//               id="breadcrumb-portfolio"
//               className="hover:text-blue-400 transition-colors"
//             >
//               Portfolio
//             </Link>
//             <FiChevronRight className="text-xs" />
//             <span className="text-slate-200">{details.breadcrumbLabel}</span>
//           </nav>

//           <div className="max-w-4xl">
//             <span className="px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 block w-fit italic">
//               {details.categoryLabel}
//             </span>
//             <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
//               {details.pageTitle}
//             </h1>
//             <div className="flex flex-wrap items-center gap-8 text-slate-300">
//               {details.engagementBadges.map((b) => (
//                 <div key={b.text} className="flex items-center gap-2">
//                   <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
//                   <span className="text-sm font-medium">{b.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-white -mt-16 relative z-20">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-2 gap-16">
//             <div className="space-y-8">
//               <div className="p-12 bg-slate-50 rounded-[2.5rem] border border-slate-100">
//                 <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">
//                   The Challenge
//                 </span>
//                 <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
//                   {details.challenge.title}
//                 </h2>
//                 <p className="text-lg text-slate-600 leading-relaxed mb-6">
//                   {details.challenge.description}
//                 </p>
//                 <ul className="space-y-4">
//                   {details.challenge.bullets.map((bullet) => (
//                     <li key={bullet} className="flex items-start gap-3">
//                       <span className="mt-1 shrink-0 w-2 h-2 rounded-full bg-red-500" />
//                       <span className="text-slate-700">{bullet}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div className="p-12 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20">
//                 <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 block">
//                   The Invorious Solution
//                 </span>
//                 <h2 className="text-3xl font-bold mb-6 tracking-tight">
//                   {details.solution.title}
//                 </h2>
//                 <p className="text-lg text-slate-300 leading-relaxed mb-6">
//                   {details.solution.description}
//                 </p>
//                 <div className="grid sm:grid-cols-2 gap-6">
//                   {details.solution.features.map((f) => (
//                     <div key={f.title} className="space-y-2">
//                       <h4 className="font-bold text-white">{f.title}</h4>
//                       <p className="text-sm text-slate-400">{f.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-slate-50">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//               Measurable Impact
//             </h2>
//             <p className="text-slate-500 mt-4">
//               We delivered data-driven Web3 results that transformed our clients' bottom lines and market perception.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {details.metrics.map((m) => (
//               <div
//                 key={m.label}
//                 className="metric-card bg-white p-10 rounded-3xl border border-slate-200 text-center"
//               >
//                 <div className="text-5xl font-black text-blue-600 mb-2">
//                   {m.value}
//                 </div>
//                 <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
//                   {m.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-white overflow-hidden">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-slate-900 mb-16 tracking-tight">
//             Phase-by-Phase Execution
//           </h2>
//           <div className="grid md:grid-cols-4 gap-8 relative">
//             <div className="absolute hidden md:block top-8 left-0 right-0 h-0.5 bg-slate-100" />

//             {details.timeline.map((t) => (
//               <div key={t.step} className="relative space-y-4">
//                 <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center font-bold text-xl relative z-10 shadow-sm">
//                   {t.step}
//                 </div>
//                 <h4 className="font-bold text-slate-900 pt-2">{t.title}</h4>
//                 <p className="text-sm text-slate-500">{t.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-slate-50 border-y border-slate-100">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
//             <div>
//               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
//                 Team Involved
//               </h2>
//               <p className="text-slate-500 mt-2">
//                 The experts behind the transformation.
//               </p>
//             </div>
//             <a
//               href="/team"
//               className="text-blue-600 font-bold flex items-center gap-2 group mt-4 md:mt-0"
//             >
//               View Full Team{" "}
//               <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//             </a>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {details.teamInvolved.map((m) => {
//               const slug = getTeamMemberSlug(m.name);

//               const card = (
//                 <div className="p-6 bg-white rounded-3xl border border-slate-200 group-hover:border-blue-400 transition-all">
//                   <img
//                     src={m.imageSrc}
//                     alt={m.imageAlt}
//                     className="w-20 h-20 rounded-2xl object-cover mb-4 grayscale group-hover:grayscale-0 transition-all"
//                   />
//                   <h4 className="font-bold text-slate-900">{m.name}</h4>
//                   <p className="text-sm text-slate-500">{m.role}</p>
//                 </div>
//               );

//               return slug ? (
//                 <Link key={m.name} to={`/team/${slug}`} className="block group">
//                   {card}
//                 </Link>
//               ) : (
//                 <div key={m.name} className="block group">
//                   {card}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6 text-center">
//           <FaQuoteLeft className="text-6xl text-blue-100 mb-8 mx-auto" />
//           <blockquote className="text-3xl font-medium text-slate-900 italic leading-snug mb-10">
//             &quot;{details.testimonial.quote}&quot;
//           </blockquote>
//           <div className="flex flex-col items-center">
//             <h5 className="font-bold text-slate-900">
//               {details.testimonial.name}
//             </h5>
//             <p className="text-slate-500 text-sm uppercase tracking-widest">
//               {details.testimonial.role}
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-slate-900 overflow-hidden">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-white mb-12 tracking-tight text-center">
//             Interface Evolution
//           </h2>
//           <div className="grid md:grid-cols-2 gap-12">
//             {details.gallery.slice(0, 2).map((g) => (
//               <div key={g.label} className="flex flex-col gap-4">
//                 <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
//                   {g.label}
//                 </span>
//                 <div
//                   className={
//                     g.label.toLowerCase().includes("legacy")
//                       ? "aspect-video rounded-3xl overflow-hidden grayscale opacity-50 border border-white/10"
//                       : "aspect-video rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl shadow-blue-500/20"
//                   }
//                 >
//                   <img
//                     src={g.imageSrc}
//                     alt={g.imageAlt}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-3 gap-16">
//             <div className="lg:col-span-1">
//               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
//                 Key Strategic Learnings
//               </h2>
//               <p className="text-slate-500 mt-4 leading-relaxed">
//                 Three fundamental insights we gained that now inform our broader
//                 practice.
//               </p>
//             </div>

//             <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
//               {details.keyLearnings.map((k) => (
//                 <div
//                   key={k.title}
//                   className="p-8 rounded-3xl bg-slate-50 border border-slate-100"
//                 >
//                   <h4 className="font-bold text-slate-900 mb-2">{k.title}</h4>
//                   <p className="text-sm text-slate-600">{k.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
//             <div className="relative z-10 max-w-2xl mx-auto space-y-8">
//               <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
//                 {details.bottomCta.title}
//               </h2>
//               <p className="text-xl text-blue-100 leading-relaxed">
//                 {details.bottomCta.description}
//               </p>
//               <div className="flex flex-wrap justify-center gap-6">
//                 <button
//                   onClick={scrollToContactForm}
//                   className="px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-3 shadow-xl cursor-pointer"
//                 >
//                   {details.bottomCta.buttonLabel}
//                   <FaArrowRight className="w-4 h-4" aria-hidden="true" />
//                 </button>
//               </div>
//             </div>
//             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32" />
//           </div>
//         </div>
//       </section>

//       <section className="py-10 md:py-24 bg-slate-50 border-t border-slate-200">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <h3 className="text-2xl font-bold text-slate-900 mb-12">
//             More Success Stories
//           </h3>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {related.map((p) => (
//               <Link
//                 key={p.slug}
//                 to={`/portfolio/${p.slug}`}
//                 className="group block"
//               >
//                 <div className="aspect-video rounded-3xl overflow-hidden mb-4 relative">
//                   <img
//                     src={p.imageSrc}
//                     alt={p.imageAlt}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                   />
//                   <div className="absolute inset-0 bg-slate-900/20" />
//                 </div>
//                 <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
//                   {p.title}
//                 </h4>
//                 <p className="text-sm text-slate-500 mt-1 italic">
//                   {p.outcomeLabel}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }