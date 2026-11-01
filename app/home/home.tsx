import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  FaArrowRight,
  FaLinkedin,
  FaQuoteLeft,
  FaTwitter,
  FaBriefcase,
  FaRegCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaGlobe,
} from "react-icons/fa";
import { IoBarChart, IoLayers } from "react-icons/io5";
import {
  FiMapPin,
  FiMail,
  FiMonitor,
  FiPhone,
  FiSend,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import data from "../../lib/data.json";
import { Link, useNavigate } from "react-router";
import { slugifyServiceTitle } from "../../lib/service-slug"; // <-- FIXED IMPORT

// ============================================================================
// EMBEDDED EMAIL SENDING LOGIC (FormSubmit)
// ============================================================================
const CLIENT_INBOX = "hello@invorious.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type SendResult =
  | { ok: true; status: number; raw: unknown }
  | { ok: false; error: string; status?: number; raw?: unknown; fallbackHref: string };

function fallbackMailto(to: string, subject: string, fields: Record<string, string>): string {
  const body = Object.entries(fields)
    .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
    .join("\n")
    .slice(0, 1500);
  const enc = (s: string) => encodeURIComponent(s.replace(/\r?\n/g, "\r\n"));
  return `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;
}

async function sendToInbox(
  to: string,
  subject: string,
  fields: Record<string, string> & { email: string }
): Promise<SendResult> {
  const fallbackHref = fallbackMailto(to, subject, fields);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        _subject: subject,
        _template: "table",
        _honey: "",
        ...(typeof window !== "undefined" ? { _url: window.location.href } : {}),
      }),
      signal: controller.signal,
    });

    const raw: unknown = await res.json().catch(() => null);
    const data = (raw && typeof raw === "object" ? raw : {}) as { success?: unknown; message?: unknown };
    const message = typeof data.message === "string" ? data.message : "";

    const rejected = !res.ok || data.success === false || data.success === "false" || /activat/i.test(message);
    if (rejected) {
      return { ok: false, error: message || `HTTP ${res.status}`, status: res.status, raw, fallbackHref };
    }
    return { ok: true, status: res.status, raw };
  } catch (err) {
    return {
      ok: false,
      error: "network",
      raw: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      fallbackHref,
    };
  } finally {
    clearTimeout(timer);
  }
}

function diagnose(error: string): string {
  if (error === "network") {
    return "No readable reply from formsubmit.co. Most often the target inbox hasn't been activated yet — open it (and its spam folder), click the \"Activate Form\" email from FormSubmit, then try again.";
  }
  if (/activat/i.test(error)) {
    return `FormSubmit says this inbox needs activation — open it (and its spam folder), click "Activate Form", then try again. (FormSubmit said: "${error}")`;
  }
  return `FormSubmit replied: ${error}`;
}

// ============================================================================
// DATA & HELPERS
// ============================================================================
const homePageData = (data as HomePageData).homePage;
const CASE_STUDIES = (data as PortfolioData).portfolio.caseStudies;
const teamData = (data as TeamData).team;
const TEAM_LEADERS = teamData.leaders;
const TEAM_SPECIALISTS = teamData.specialists;

const getTeamMemberSlug = (name: string) => {
  const leader = TEAM_LEADERS.find((m) => m.name === name);
  if (leader) return leader.slug;
  const specialist = TEAM_SPECIALISTS.find((m) => m.name === name);
  return specialist?.slug;
};

const aboutHighlightIcons: Record<
  HomeAboutHighlight["icon"],
  React.ComponentType<{ className?: string }>
> = {
  target: FiTarget,
  zap: FiZap,
};

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

type FormStatus = {
  type: "success" | "error" | "";
  message: string;
  fallbackHref?: string;
};

// ============================================================================
// 3D TILT & SPOTLIGHT COMPONENTS
// ============================================================================
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SpotlightCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,211,238,.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const portfolioScrollRef = useRef<HTMLDivElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Form State (EXACTLY as your original)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "Technology Consulting",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hp, setHp] = useState(""); // Honeypot

  // Mouse parallax for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 20);
    mouseY.set((clientY / innerHeight - 0.5) * 20);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({ type: "error", message: "Please fill out all required fields." });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
      return;
    }
    
    if (!EMAIL_RE.test(formData.email)) {
      setFormStatus({ type: "error", message: "Please enter a valid email address." });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
      return;
    }

    if (hp) {
      setFormStatus({ type: "success", message: "Message sent! We'll get back to you within 24 hours." });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 5000);
      return;
    }
    
    setIsSubmitting(true);
    
    // Using your exact original payload structure
    const subject = `New Invorious Inquiry: ${formData.service} from ${formData.firstName}`;
    const fields = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      service: formData.service,
      message: formData.message,
    };

    const result = await sendToInbox(CLIENT_INBOX, subject, fields);
    
    if (result.ok) {
      setFormStatus({ type: "success", message: "Message sent! We'll get back to you within 24 hours." });
      setFormData({ firstName: "", lastName: "", email: "", service: "Technology Consulting", message: "" });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 5000);
    } else {
      setFormStatus({ type: "error", message: diagnose(result.error), fallbackHref: result.fallbackHref });
    }
    
    setIsSubmitting(false);
  };

  const scrollPortfolio = (direction: "prev" | "next") => {
    const el = portfolioScrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("a, [role='link'], div");
    const cardWidth = firstCard?.offsetWidth ?? 360;
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = cardWidth + gap;
    const left = direction === "next" ? step : -step;
    el.scrollBy({ left, behavior: "smooth" });
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
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    },
  } as const;

  const gridContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  } as const;

  const gridItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <>
      {!videoLoaded && <div className="fixed inset-0 z-[9999] bg-[#030712]" />}

      <main
        style={{ viewTransitionName: "main-content" } as React.CSSProperties}
        className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white overflow-hidden"
      >
        {/* HERO SECTION */}
        <section
          id="home"
          onMouseMove={handleHeroMouseMove}
          className="pt-32 pb-16 min-h-[95vh] flex items-center relative overflow-hidden bg-black"
        >
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay loop preload="auto" muted playsInline
              className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src="/images/landing/landing.mp4" type="video/mp4" />
              <source src="/images/landing/landing.webm" type="video/webm" />
            </video>
            {videoLoaded && (
              <>
                <div className="absolute inset-0 bg-[#030712]/80 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
              </>
            )}
          </div>

          {videoLoaded && (
            <motion.div 
              style={{ x: springX, y: springY }}
              className="max-w-[1200px] mx-auto px-6 w-full relative z-10 pt-12 pb-20"
            >
              <motion.div
                className="max-w-3xl mx-auto text-center space-y-8"
                variants={heroContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={heroItem}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  {homePageData.home.badge}
                </motion.div>

                <motion.h1
                  variants={heroItem}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight bg-clip-text text-transparent bg-[linear-gradient(110deg,#fff,45%,#22d3ee,55%,#fff)] bg-[length:200%_100%] animate-shimmer"
                  style={{
                    animation: "shimmer 4s linear infinite",
                    textShadow: "0 0 40px rgba(34,211,238,0.2)"
                  }}
                >
                  {homePageData.home.title}
                </motion.h1>

                <motion.p
                  variants={heroItem}
                  className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
                >
                  {homePageData.home.description}
                </motion.p>

                <motion.div variants={heroItem} className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <button
                    onClick={scrollToContact}
                    id="hero-primary-cta"
                    className="group relative px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-2">
                      {homePageData.home.primaryCta.label}
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button
                    onClick={() => navigate(homePageData.home.secondaryCta.href)}
                    id="hero-secondary-cta"
                    className="group relative px-8 py-4 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all cursor-pointer backdrop-blur-md overflow-hidden rounded-sm hover:border-cyan-400/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {homePageData.home.secondaryCta.label}
                  </button>
                </motion.div>

                <motion.div
                  variants={heroItem}
                  className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 max-w-2xl mx-auto"
                >
                  {homePageData.home.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center group cursor-default">
                      <div className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300">{stat.value}</div>
                      <div className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] mt-2">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  variants={heroItem}
                  className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                  <div className="flex -space-x-4">
                    {homePageData.home.trustedBy.avatars.map((avatar, index) => (
                      <img
                        key={avatar}
                        src={avatar}
                        className="w-12 h-12 rounded-full border-2 border-[#030712] grayscale hover:grayscale-0 transition-all duration-300"
                        alt={`Team ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    {homePageData.home.trustedBy.text}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-[#050A14] border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <motion.div className="space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={heroContainer}>
                <div className="flex items-center gap-4">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                  <motion.span variants={heroItem} className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold">
                    {homePageData.about.badge}
                  </motion.span>
                </div>

                <motion.h2 variants={heroItem} className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1]">
                  {homePageData.about.title}
                </motion.h2>

                <motion.p variants={heroItem} className="text-base text-gray-400 leading-relaxed font-light">
                  {homePageData.about.description}
                </motion.p>

                <motion.div variants={heroItem} className="grid sm:grid-cols-2 gap-6 border-t border-white/10 pt-6">
                  {homePageData.about.highlights.map((highlight) => {
                    const Icon = aboutHighlightIcons[highlight.icon];
                    return (
                      <div key={highlight.title} className="flex gap-4 group">
                        <div className="w-10 h-10 shrink-0 border border-white/10 bg-white/5 text-cyan-400 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white uppercase tracking-tight text-sm">{highlight.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 font-light">{highlight.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                <motion.div variants={heroItem} className="p-6 bg-gradient-to-r from-[#030712] to-[#0A0F1C] border border-white/10 flex items-center gap-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 relative z-10">
                    {homePageData.about.retention.value}
                  </div>
                  <div className="text-gray-400 text-sm font-light relative z-10">
                    {homePageData.about.retention.description}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="relative" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {homePageData.about.images.slice(0, 2).map((image) => (
                      <TiltCard key={image.alt}>
                        <div className="relative group overflow-hidden border border-white/10">
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                          <img src={image.src} className="w-full h-48 sm:h-56 object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={image.alt} />
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                  <div className="space-y-4 pt-12">
                    {homePageData.about.images.slice(2, 4).map((image) => (
                      <TiltCard key={image.alt}>
                        <div className="relative group overflow-hidden border border-white/10">
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                          <img src={image.src} className="w-full h-40 sm:h-48 object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={image.alt} />
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-[#030712] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={heroContainer}>
              <div>
                <motion.span variants={heroItem} className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs mb-3 block">
                  {homePageData.services.badge}
                </motion.span>
                <motion.h2 variants={heroItem} className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                  {homePageData.services.title}
                </motion.h2>
              </div>
              <motion.p variants={heroItem} className="text-gray-400 max-w-sm text-sm font-light">
                {homePageData.services.description}
              </motion.p>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10" variants={gridContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {homePageData.services.items.map((service) => {
                const Icon = servicesIcons[service.icon];
                const slug = slugifyServiceTitle(service.title);
                return (
                  <motion.div key={service.title} variants={gridItem} className="border-r border-b border-white/10">
                    <TiltCard>
                      <SpotlightCard className="h-full bg-[#030712] hover:bg-[#080C17] transition-colors duration-500">
                        <Link to={`/services/${slug}`} className="p-8 block h-full relative z-10 group">
                          <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 mb-6 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                          <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">{service.description}</p>
                          <ul className="space-y-3 text-xs font-mono text-gray-500 uppercase tracking-widest group-hover:text-gray-400 transition-colors">
                            {service.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-3">
                                <span className="w-1 h-1 bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </Link>
                      </SpotlightCard>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-24 bg-[#050A14] border-b border-white/5 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div className="max-w-xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={heroContainer}>
              <motion.span variants={heroItem} className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold">
                {homePageData.portfolio.badge}
              </motion.span>
              <motion.h2 variants={heroItem} className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mt-3 text-white">
                {homePageData.portfolio.title}
              </motion.h2>
              <motion.p variants={heroItem} className="text-gray-400 mt-4 text-sm font-light">{homePageData.portfolio.description}</motion.p>
            </motion.div>
            <motion.div className="flex gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <button className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all duration-300" onClick={() => scrollPortfolio("prev")}>
                <FaChevronLeft className="w-3 h-3" />
              </button>
              <button className="w-10 h-10 bg-blue-600 flex items-center justify-center hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]" onClick={() => scrollPortfolio("next")}>
                <FaChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          </div>

          <div ref={portfolioScrollRef} className="max-w-[1200px] mx-auto px-6 overflow-x-auto pb-8 scrollbar-hide">
            <motion.div className="flex gap-6 w-max" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={gridContainer}>
              {CASE_STUDIES.map((c) => (
                <motion.div key={c.slug} variants={gridItem}>
                  <TiltCard>
                    <Link to={`/portfolio/${c.slug}`} className="w-[280px] sm:w-[360px] group cursor-pointer block">
                      <div className="aspect-[4/5] border border-white/10 overflow-hidden mb-4 relative">
                        <img src={c.imageSrc} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={c.imageAlt} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                        
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
                          <span className="px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-widest text-white">{c.industry}</span>
                          <span className="px-2 py-1 bg-blue-600 text-white text-[9px] font-mono uppercase tracking-widest">{c.outcomeLabel}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-2 group-hover:text-cyan-400 transition-colors">{c.title}</h3>
                      <p className="text-gray-400 text-xs font-light leading-relaxed">{c.description}</p>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TEAM SECTION (Restored & Commented Out) */}
        {/* <section id="team" className="py-24 bg-[#030712]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
              <motion.div
                className="max-w-2xl"
                variants={heroContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <motion.span
                  variants={heroItem}
                  className="text-cyan-400 font-mono font-bold uppercase tracking-[0.3em] text-xs"
                >
                  {homePageData.team.badge}
                </motion.span>
                <motion.h2
                  variants={heroItem}
                  className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-2"
                >
                  {homePageData.team.title}
                </motion.h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              >
                <Link
                  to="/team"
                  id="team-all-link"
                  className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 group"
                >
                  {homePageData.team.joinLabel}
                  <FaChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {homePageData.team.members.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={gridItem}
                  className="group text-center cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    const slug = getTeamMemberSlug(member.name);
                    if (slug) navigate(`/team/${slug}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    const slug = getTeamMemberSlug(member.name);
                    if (slug) navigate(`/team/${slug}`);
                  }}
                >
                  <div className="aspect-square overflow-hidden mb-6 border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 relative group-hover:border-cyan-400/50">
                    <img
                      src={member.imageSrc}
                      className="w-full h-full object-cover"
                      alt={member.imageAlt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                    {member.name}
                  </h4>
                  <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mt-2">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section> */}

        {/* TESTIMONIAL SECTION */}
        <section className="py-24 bg-[#030712] border-b border-white/5 relative overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" 
          />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <motion.div variants={heroItem} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
              <FaQuoteLeft className="w-10 h-10 text-blue-500/50 mx-auto" />
            </motion.div>
            <motion.blockquote variants={heroItem} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xl sm:text-3xl font-light text-white leading-relaxed tracking-tight mb-10">
              "Invorious didn't just give us a strategy; they stayed with us through the execution. Our Web3 transformation journey was seamless because of their deep blockchain expertise and hands-on approach."
            </motion.blockquote>
            <motion.div variants={heroItem} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center">
              <img src="/images/landing/client_portrait.jpg" className="w-14 h-14 rounded-full mb-4 border border-white/20 grayscale hover:grayscale-0 transition-all duration-500" alt="Client Portrait" />
              <h5 className="font-bold text-white uppercase tracking-widest text-xs">Alexander Dupont</h5>
              <p className="text-cyan-400 font-mono text-[10px] mt-2 uppercase tracking-widest">CEO, Global Retail Systems</p>
              <div className="mt-12 flex gap-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <IoLayers className="w-8 h-8" />
                <FaGlobe className="w-8 h-8" />
                <FaBriefcase className="w-8 h-8" />
                <FiTrendingUp className="w-8 h-8" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-[#050A14] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              <motion.div className="space-y-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={heroContainer}>
                <div>
                  <motion.span variants={heroItem} className="text-cyan-400 font-mono uppercase tracking-[0.3em] text-xs font-bold block mb-4">
                    Start a project
                  </motion.span>
                  <motion.h2 variants={heroItem} className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1] text-white">
                    Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400">Build?</span>
                  </motion.h2>
                  <motion.p variants={heroItem} className="text-gray-400 mt-6 max-w-md font-light text-sm leading-relaxed">
                    Fill out the form and a senior consultant will reach out to schedule a discovery call within 24 hours. No sales pitches, just engineering.
                  </motion.p>
                </div>

                <motion.div variants={heroItem} className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-300">
                      <FiMail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Email Us</h4>
                      <p className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">{CLIENT_INBOX}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-300">
                      <FiPhone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Call Us</h4>
                      <p className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">0426 576 625</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-300">
                      <FiMapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Headquarters</h4>
                      <p className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">Sydney, NSW, Australia</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* FORM WITH GLOWING GRADIENT BORDER */}
              <motion.div
                className="relative p-[1px] rounded-sm overflow-hidden group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-transparent to-cyan-500/50 opacity-50 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
                
                <div className="bg-[#030712] p-6 sm:p-8 relative z-10 h-full">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot */}
                    <div style={{ display: "none" }} aria-hidden="true">
                      <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                          First Name <span className="text-blue-500">*</span>
                        </label>
                        <input
                          type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all rounded-none text-sm"
                          placeholder="John" required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                          Last Name <span className="text-blue-500">*</span>
                        </label>
                        <input
                          type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all rounded-none text-sm"
                          placeholder="Doe" required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                        Email Address <span className="text-blue-500">*</span>
                      </label>
                      <input
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all rounded-none text-sm"
                        placeholder="john@company.com" required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                        Service Interested In
                      </label>
                      {/* FIXED SELECT DROPDOWN OPTIONS */}
                      <select
                        name="service" value={formData.service} onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A0F1C] border border-white/10 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all rounded-none appearance-none text-sm cursor-pointer"
                      >
                        <option className="bg-[#0A0F1C] text-white">Technology Consulting</option>
                        <option className="bg-[#0A0F1C] text-white">Web2 – Apps & Web</option>
                        <option className="bg-[#0A0F1C] text-white">Web3 – Blockchain</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                        How can we help? <span className="text-blue-500">*</span>
                      </label>
                      <textarea
                        name="message" rows={4} value={formData.message} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all rounded-none resize-none text-sm"
                        placeholder="Tell us about your project..." required
                      />
                    </div>
                    
                    {formStatus.message && (
                      <div className={`p-4 text-xs font-mono uppercase tracking-widest border flex flex-col gap-3 ${
                        formStatus.type === "success" 
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" 
                          : "bg-red-500/10 text-red-400 border-red-500/30"
                      }`}>
                        <span>{formStatus.message}</span>
                        {formStatus.type === "error" && formStatus.fallbackHref && (
                          <a href={formStatus.fallbackHref} className="text-white underline hover:text-cyan-400 normal-case font-sans text-sm font-bold w-fit" target="_blank" rel="noopener noreferrer">
                            Click here to email us directly instead &rarr;
                          </a>
                        )}
                      </div>
                    )}
                    
                    <button
                      type="submit" disabled={isSubmitting}
                      className="w-full py-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] group/btn overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <FiSend className="w-4 h-4" />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Styles for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </>
  );
}