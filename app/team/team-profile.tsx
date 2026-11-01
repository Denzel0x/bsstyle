import React from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import {
  FaArrowRight,
  FaLinkedin,
  FaTwitter,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import {
  getMemberOverlayText,
  getTeamMemberOrThrow,
  academicIconMap,
} from "../../service/team.service";

export default function TeamProfile({ memberId }: { memberId?: string }) {
  const params = useParams();
  const id = memberId ?? (params as { id?: string }).id;
  const member = getTeamMemberOrThrow(id);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  if (!member.profileDetails) {
    return (
      <main
        style={{ viewTransitionName: "main-content" } as React.CSSProperties}
        className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white min-h-screen"
      >
        <section className="pt-32 pb-24 bg-[#030712] relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] -mr-48 -mt-48" />
          </div>

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <Link
              to="/team"
              id="back-to-team-btn"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-12 hover:text-white transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Leadership Team
            </Link>

            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-4">
                <div className="aspect-[4/5] border border-white/10 overflow-hidden relative group">
                  <img
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
                </div>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-blue-500/30 bg-blue-600/10 text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.2em] w-fit">
                    Strategic Leadership
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
                    {member.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-cyan-400 font-mono tracking-widest uppercase">
                    {member.role}
                  </p>
                </div>

                <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-light">
                  {getMemberOverlayText(member)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const d = member.profileDetails;

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

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link
              to="/team"
              id="back-to-team-btn"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-12 hover:text-white transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Leadership Team
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/5] border border-white/10 overflow-hidden relative group">
                <img
                  src={member.imageSrc}
                  alt={member.imageAlt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-8 space-y-8"
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              <div className="space-y-4">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 border border-blue-500/30 bg-blue-600/10 text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.2em] w-fit shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                  {d.heroChip}
                </motion.div>
                <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
                  {d.heroTitle}
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-cyan-400 font-mono tracking-widest uppercase">
                  {d.heroSubtitle}
                </motion.p>
              </div>

              <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl leading-relaxed font-light">
                {d.shortBio}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* LEFT COLUMN */}
            <motion.div 
              className="lg:col-span-8 space-y-20"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
            >
              {/* Biography */}
              <motion.div variants={fadeInUp}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                    Professional Biography
                  </h2>
                </div>
                <div className="space-y-6">
                  {d.biography.map((p) => (
                    <p key={p} className="text-base text-gray-400 leading-relaxed font-light">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Expertise */}
              <motion.div variants={fadeInUp}>
                <div className="flex items-center gap-4 mb-10">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                    Specialized Expertise
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  {d.expertise.map((ex, idx) => (
                    <div key={ex.title} className="space-y-3 group">
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-gray-200 text-sm uppercase tracking-wider group-hover:text-white transition-colors">
                          {ex.title}
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          {ex.percent}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 overflow-hidden relative">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${ex.percent}%` }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Career Journey */}
              <motion.div variants={fadeInUp}>
                <div className="flex items-center gap-4 mb-10">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                    Career Journey
                  </h2>
                </div>

                <div className="space-y-0 ml-2 border-l border-white/10 pl-8 relative">
                  {d.careerJourney.map((t) => (
                    <div key={t.period} className="relative pb-12 group">
                      <div className="absolute -left-[37px] top-1.5 w-3 h-3 border border-cyan-400/50 bg-cyan-400/20 group-hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                        {t.period}
                      </span>
                      <h4 className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                        {t.title}
                      </h4>
                      <p className="text-gray-400 text-sm font-light mt-1">{t.role}</p>
                      <p className="text-gray-500 text-sm font-light mt-3 max-w-xl leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN / SIDEBAR */}
            <motion.aside 
              className="lg:col-span-4 space-y-8"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
            >
              {/* Academic Foundations */}
              <motion.div variants={fadeInUp} className="p-8 bg-[#030712] border border-white/10 space-y-8">
                <h4 className="text-lg font-black uppercase tracking-tight text-white">
                  Academic Foundations
                </h4>
                <div className="space-y-6">
                  {d.academicFoundations.map((a) => {
                    const Icon = academicIconMap[a.icon];
                    return (
                      <div key={a.title} className="flex gap-4 group">
                        <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center text-cyan-400 shrink-0 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 transition-all duration-300">
                          <Icon className="text-xl" />
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-sm uppercase tracking-wider">
                            {a.title}
                          </h5>
                          <p className="text-xs text-gray-400 font-light mt-1">{a.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Notable Impact */}
              <motion.div variants={fadeInUp} className="p-8 bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <h4 className="text-lg font-black uppercase tracking-tight text-white">Notable Impact</h4>
                  <div className="space-y-6">
                    {d.notableImpact.map((n) => (
                      <div key={n.title} className="space-y-2">
                        <p className="text-[9px] font-mono text-cyan-400 uppercase tracking-[0.2em] font-bold">
                          {n.category}
                        </p>
                        <p className="font-bold text-white text-sm uppercase tracking-wider">{n.title}</p>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          {n.description}
                        </p>
                        <div className="w-full h-[1px] bg-white/10 pt-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -right-8 -bottom-8 opacity-5">
                  <span className="text-[10rem] leading-none text-white font-black">↑</span>
                </div>
              </motion.div>

              {/* Direct Contact */}
              <motion.div variants={fadeInUp} className="p-8 bg-[#030712] border border-white/10 space-y-6">
                <h4 className="text-lg font-black uppercase tracking-tight text-white">
                  Direct Contact
                </h4>
                <div className="space-y-4">
                  <a
                    href={`mailto:${d.directContact.email}`}
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors group"
                  >
                    <FiMail className="text-lg text-cyan-400 group-hover:scale-110 transition-transform" />
                    {d.directContact.email}
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors group"
                  >
                    <FiPhone className="text-lg text-cyan-400 group-hover:scale-110 transition-transform" />
                    {d.directContact.phone}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <FiMapPin className="text-lg text-cyan-400" />
                    {d.directContact.location}
                  </div>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* CLIENT VOICE */}
      <section className="py-24 bg-[#030712] border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16 space-y-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            <span className="text-cyan-400 font-mono font-bold uppercase tracking-[0.3em] text-xs">
              Client Voice
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Endorsements from the C-Suite
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {d.clientVoice.map((v) => (
              <motion.div
                key={v.name}
                variants={fadeInUp}
                className="p-8 md:p-10 bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-colors duration-500 relative group"
              >
                <FaQuoteLeft className="absolute top-8 right-8 text-4xl text-white/5 group-hover:text-cyan-400/10 transition-colors duration-500" />
                <div className="relative z-10 space-y-8">
                  <blockquote className="text-lg font-light italic text-gray-300 leading-relaxed">
                    “{v.quote}”
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-white/10 overflow-hidden grayscale">
                      <img
                        src={v.imageSrc}
                        alt={v.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-white uppercase tracking-wider text-sm">{v.name}</h5>
                      <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mt-1">{v.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-[#050A14]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            className="bg-[#030712] border border-blue-500/20 p-12 lg:p-24 text-center relative overflow-hidden group"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-cyan-500 transition-colors duration-1000" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                {d.bottomCta.title}
              </h2>
              <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
                {d.bottomCta.description}
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <Link
                  to={d.bottomCta.href}
                  id="cta-member-bottom"
                  className="group/btn relative px-10 py-5 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover/btn:animate-shimmer" />
                  <span className="relative z-10 flex items-center gap-2">
                    {d.bottomCta.buttonLabel}
                    <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              </div>
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





// import React from "react";

// import { motion } from "motion/react";

// import { Link, useParams } from "react-router";

// import {
//   FaArrowRight,
//   FaLinkedin,
//   FaTwitter,
//   FaQuoteLeft,
// } from "react-icons/fa";

// import {
//   FiArrowLeft,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiCalendar,
// } from "react-icons/fi";

// import {
//   getMemberOverlayText,
//   getTeamMemberOrThrow,
//   academicIconMap,
// } from "../../service/team.service";

// export default function TeamProfile({ memberId }: { memberId?: string }) {
//   const params = useParams();
//   const id = memberId ?? (params as { id?: string }).id;
//   const member = getTeamMemberOrThrow(id);

//   if (!member.profileDetails) {
//     return (
//       <main
//         style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//         className="flex-1"
//       >
//         <section className="pt-28 pb-24 hero-gradient relative overflow-hidden">
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//           </div>

//           <div className="max-w-7xl mx-auto px-6 relative z-10">
//             <Link
//               to="/team"
//               id="back-to-team-btn"
//               className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-12 hover:text-white transition-colors group"
//             >
//               <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//               Back to Leadership Team
//             </Link>

//             <div className="grid lg:grid-cols-12 gap-16 items-center">
//               <div className="lg:col-span-4">
//                 <div className="aspect-4/5 rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative group">
//                   <img
//                     src={member.imageSrc}
//                     alt={member.imageAlt}
//                     className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
//                   />
//                   <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
//                 </div>
//               </div>
//               <div className="lg:col-span-8 space-y-8">
//                 <div className="space-y-4">
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
//                     Strategic Leadership
//                   </div>
//                   <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
//                     {member.name}
//                   </h1>
//                   <p className="text-2xl text-blue-400 font-semibold">
//                     {member.role}
//                   </p>
//                 </div>

//                 <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
//                   {getMemberOverlayText(member)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     );
//   }

//   const d = member.profileDetails;

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1"
//     >
//       <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
//           <Link
//             to="/team"
//             id="back-to-team-btn"
//             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-12 hover:text-white transition-colors group"
//           >
//             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Leadership Team
//           </Link>

//           <div className="grid lg:grid-cols-12 gap-16 items-center">
//             <div className="lg:col-span-4">
//               <div className="aspect-4/5 rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative group">
//                 <img
//                   src={member.imageSrc}
//                   alt={member.imageAlt}
//                   className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
//                 />
//                 <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
//               </div>
//             </div>

//             <div className="lg:col-span-8 space-y-8">
//               <div className="space-y-4">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
//                   {d.heroChip}
//                 </div>
//                 <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
//                   {d.heroTitle}
//                 </h1>
//                 <p className="text-2xl text-blue-400 font-semibold">
//                   {d.heroSubtitle}
//                 </p>
//               </div>

//               <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
//                 {d.shortBio}
//               </p>

//               {/* <div className="flex flex-wrap gap-4 pt-4">
//                 <a
//                   href={d.scheduleHref}
//                   id="cta-schedule-member"
//                   className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
//                 >
//                   {d.scheduleLabel}{" "}
//                   <FiCalendar className="w-5 h-5" aria-hidden="true" />
//                 </a>

//                 <div className="flex gap-3">
//                   <a
//                     href={d.socialLinks.linkedinHref}
//                     id="member-social-li"
//                     className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
//                     aria-label="LinkedIn"
//                   >
//                     <FaLinkedin className="text-2xl" />
//                   </a>
//                   <a
//                     href={d.socialLinks.twitterHref}
//                     id="member-social-tw"
//                     className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
//                     aria-label="Twitter"
//                   >
//                     <FaTwitter className="text-2xl" />
//                   </a>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="xl:py-24 py-10 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-12 gap-20">
//             <div className="lg:col-span-8 space-y-20">
//               <div>
//                 <h2 className="text-3xl font-bold text-slate-900 mb-8">
//                   Professional Biography
//                 </h2>
//                 <div className="space-y-6">
//                   {d.biography.map((p) => (
//                     <p
//                       key={p}
//                       className="text-lg leading-relaxed text-slate-600"
//                     >
//                       {p}
//                     </p>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-3xl font-bold text-slate-900 mb-10">
//                   Specialized Expertise
//                 </h2>
//                 <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
//                   {d.expertise.map((ex, idx) => (
//                     <div key={ex.title} className="space-y-3">
//                       <div className="flex justify-between items-end">
//                         <span className="font-bold text-slate-900">
//                           {ex.title}
//                         </span>
//                         <span className="text-sm font-bold text-blue-600">
//                           {ex.percent}%
//                         </span>
//                       </div>
//                       <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
//                         <motion.div
//                           className="h-full bg-blue-600 rounded-full"
//                           initial={{ width: "0%" }}
//                           whileInView={{ width: `${ex.percent}%` }}
//                           viewport={{ once: true, amount: 0.35 }}
//                           transition={{
//                             duration: 1,
//                             ease: "easeOut",
//                             delay: idx * 0.12,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-3xl font-bold text-slate-900 mb-10">
//                   Career Journey
//                 </h2>

//                 <div className="space-y-0 ml-4 border-l-2 border-slate-100 pl-10">
//                   {d.careerJourney.map((t) => (
//                     <div key={t.period} className="relative pb-12">
//                       <div className="absolute -left-[25px] top-[6px] w-3 h-3 rounded-full bg-blue-600" />
//                       <span className="text-sm font-bold text-slate-600 block mb-1">
//                         {t.period}
//                       </span>
//                       <h4 className="text-xl font-bold text-slate-900">
//                         {t.title}
//                       </h4>
//                       <p className="text-slate-500 font-medium">{t.role}</p>
//                       <p className="text-slate-500 text-sm mt-2 max-w-xl">
//                         {t.description}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <aside className="lg:col-span-4 space-y-10">
//               <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-8">
//                 <h4 className="text-xl font-bold text-slate-900">
//                   Academic Foundations
//                 </h4>
//                 <div className="space-y-6">
//                   {d.academicFoundations.map((a) => {
//                     const Icon = academicIconMap[a.icon];
//                     return (
//                       <div key={a.title} className="flex gap-4">
//                         <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
//                           <Icon className="text-2xl" />
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-slate-900">
//                             {a.title}
//                           </h5>
//                           <p className="text-sm text-slate-500">{a.subtitle}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="p-8 bg-slate-900 text-white rounded-4xl space-y-8 relative overflow-hidden">
//                 <div className="relative z-10 space-y-6">
//                   <h4 className="text-xl font-bold">Notable Impact</h4>
//                   <div className="space-y-6">
//                     {d.notableImpact.map((n) => (
//                       <div key={n.title} className="space-y-2">
//                         <p className="text-xs text-blue-400 uppercase font-bold tracking-widest">
//                           {n.category}
//                         </p>
//                         <p className="font-bold">{n.title}</p>
//                         <p className="text-sm text-slate-400">
//                           {n.description}
//                         </p>
//                         <div className="w-full h-px bg-white/10" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="absolute -right-12 -bottom-12 opacity-10">
//                   {/* Decorative icon */}
//                   <span className="text-[10rem] leading-none">↑</span>
//                 </div>
//               </div>

//               <div className="p-8 border border-slate-200 rounded-3xl space-y-6">
//                 <h4 className="text-xl font-bold text-slate-900">
//                   Direct Contact
//                 </h4>
//                 <div className="space-y-4">
//                   <a
//                     href={`mailto:${d.directContact.email}`}
//                     className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
//                   >
//                     <FiMail className="text-xl text-blue-600" />
//                     {d.directContact.email}
//                   </a>
//                   <a
//                     href="#"
//                     onClick={(e) => e.preventDefault()}
//                     className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
//                   >
//                     <FiPhone className="text-xl text-blue-600" />
//                     {d.directContact.phone}
//                   </a>
//                   <div className="flex items-center gap-3 text-slate-600">
//                     <FiMapPin className="text-xl text-blue-600" />
//                     {d.directContact.location}
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>

//       <section className="xl:py-24 py-10 bg-slate-50">
//         <div className="max-w-full-sm xl:container mx-auto px-6 text-center mb-16">
//           <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
//             Client Voice
//           </span>
//           <h2 className="text-4xl font-bold text-slate-900 mt-2">
//             Endorsements from the C-Suite
//           </h2>
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 grid md:grid-cols-2 gap-12">
//           {d.clientVoice.map((v) => (
//             <div
//               key={v.name}
//               className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative"
//             >
//               <FaQuoteLeft className="absolute top-10 right-10 text-5xl text-blue-50/50" />
//               <div className="relative z-10 space-y-8">
//                 <blockquote className="text-xl font-medium italic text-slate-800 leading-relaxed">
//                   “{v.quote}”
//                 </blockquote>
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden">
//                     <img
//                       src={v.imageSrc}
//                       alt={v.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <h5 className="font-bold text-slate-900">{v.name}</h5>
//                     <p className="text-sm text-slate-500">{v.role}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="xl:py-24 py-10 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -mr-48 -mt-48" />
//             </div>

//             <div className="relative z-10 max-w-3xl mx-auto space-y-8">
//               <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
//                 {d.bottomCta.title}
//               </h2>
//               <p className="text-xl text-slate-400 leading-relaxed">
//                 {d.bottomCta.description}
//               </p>
//               <div className="flex flex-wrap justify-center gap-6 pt-4">
//                 <a target="_blank"
//                   href={d.bottomCta.href}
//                   id="cta-member-bottom"
//                   className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3"
//                 >
//                   {d.bottomCta.buttonLabel}{" "}
//                   <FaArrowRight className="w-4 h-4" aria-hidden="true" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }