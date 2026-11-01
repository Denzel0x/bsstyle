import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import { 
  FiArrowLeft, 
  FiBriefcase, 
  FiMapPin, 
  FiSend, 
  FiX, 
  FiCheck, 
  FiMail, 
  FiCopy 
} from "react-icons/fi";
import data from "../../lib/data.json";

// ============================================================================
// EMBEDDED EMAIL SENDING LOGIC (Targeting Careers Inbox)
// ============================================================================
const CAREERS_INBOX = "career@invorious.com";

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
// MAIN COMPONENT
// ============================================================================

const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
const OPENINGS = workWithUsData.openings;
const OPENING_CONTENT = workWithUsData.openingDetails;

export default function WorkWithUsDetails({
  openingId,
}: {
  openingId?: string;
}) {
  const params = useParams();
  const id = openingId ?? (params as { id?: string }).id;

  const opening = OPENINGS.find((item) => item.id === id);
  if (!opening) {
    throw new Response("Opening not found", { status: 404 });
  }

  // Application Form State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitMessageType, setSubmitMessageType] = useState<"success" | "error" | "">("");
  const [fallbackLink, setFallbackLink] = useState("");

  // Resume Dialog State
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [applicantInfo, setApplicantInfo] = useState({ name: "", role: "", track: "" });
  const [copied, setCopied] = useState<"" | "address" | "subject" | "failed">("");

  // Map category to openingDetails key
  const categoryToKey: Record<string, string> = {
    "Blockchain Development": "Blockchain",
    "Smart Contract Development Intern": "Smart Contract Intern",
    "Product Design": "Design",
    "Backend Engineering": "Backend",
    "Frontend Engineering": "Frontend",
    "Mobile Engineering": "Mobile",
    "AI Development": "AI-Developer",
    "AI-Assisted Development": "AI-Agent",
    "Systems Engineering":"Rust-Go-Engineer",
    "Technical Leadership":"TechLead-Web3",
    "Project Management": "ProjectManager-Web3"
  };

  const detailsKey = categoryToKey[opening.category] || "Strategy";
  const openingContent = OPENING_CONTENT[detailsKey];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Delay resetting the form to avoid visual glitches on close
    setTimeout(() => {
      setFormData({ fullName: "", email: "", phone: "", portfolio: "", message: "" });
      setErrors({});
      setSubmitMessage("");
      setSubmitMessageType("");
      setFallbackLink("");
      setIsSubmitting(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const nextErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) nextErrors.email = "Please enter a valid email address.";
    
    // NEW: Required Portfolio
    if (!formData.portfolio.trim()) nextErrors.portfolio = "Please provide a link to your portfolio, LinkedIn, or GitHub.";
    
    // NEW: Required Cover Letter
    if (!formData.message.trim()) nextErrors.message = "Please provide a cover letter.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const subject = `New Application: ${opening.title} from ${formData.fullName}`;
    const fields = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone || "Not provided",
      portfolio: formData.portfolio,
      message: formData.message,
      role_applied: opening.title,
    };

    const result = await sendToInbox(CAREERS_INBOX, subject, fields);

    if (result.ok) {
      // Store applicant info for the dialog
      setApplicantInfo({
        name: formData.fullName,
        role: opening.title,
        track: opening.details
      });
      
      setIsSubmitting(false);
      // Hide the form modal and show the resume dialog
      setShowModal(false);
      setShowResumeDialog(true);
      
    } else {
      setSubmitMessage(diagnose(result.error));
      setSubmitMessageType("error");
      setFallbackLink(result.fallbackHref);
      setIsSubmitting(false);
    }
  };

  // Resume Dialog Logic
  const handleCopy = async (text: string, type: "address" | "subject") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("failed");
      setTimeout(() => setCopied(""), 2000);
    }
  };

  const resumeSubject = `Resume — ${applicantInfo.role} (${applicantInfo.track}) — ${applicantInfo.name}`;
  const mailtoLink = `mailto:${CAREERS_INBOX}?subject=${encodeURIComponent(resumeSubject)}`;

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 bg-[#030712] text-white selection:bg-blue-600 selection:text-white pt-20 min-h-screen"
    >
      {/* =================================================================== */}
      {/* APPLICATION MODAL */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-24 md:pt-28 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#050A14] border border-white/10 rounded-sm shadow-[0_0_50px_rgba(37,99,235,0.2)] w-full max-w-lg mx-auto relative mb-10"
            >
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-blue-500/30 pointer-events-none" />
              
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    Apply for <span className="text-cyan-400">{opening.title}</span>
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-sm"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-400 font-light text-sm mb-8">
                  Fill out the form below to apply for the {opening.title} position.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                      Full Name <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border text-white placeholder-gray-600 focus:outline-none transition-all rounded-none text-sm ${errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-blue-500 focus:bg-blue-500/5'}`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                      Email Address <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border text-white placeholder-gray-600 focus:outline-none transition-all rounded-none text-sm ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-blue-500 focus:bg-blue-500/5'}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                      Phone Number <span className="text-gray-600 text-xs font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all rounded-none text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Portfolio (NOW REQUIRED) */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                      Portfolio / LinkedIn / GitHub <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="text" name="portfolio" value={formData.portfolio} onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border text-white placeholder-gray-600 focus:outline-none transition-all rounded-none text-sm ${errors.portfolio ? 'border-red-500' : 'border-white/10 focus:border-blue-500 focus:bg-blue-500/5'}`}
                      placeholder="https://..."
                    />
                    {errors.portfolio && <p className="text-[10px] text-red-500 mt-1">{errors.portfolio}</p>}
                  </div>

                  {/* Cover Letter (NOW REQUIRED) */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                      Cover Letter / Message <span className="text-blue-500">*</span>
                    </label>
                    <textarea
                      name="message" rows={4} value={formData.message} onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border text-white placeholder-gray-600 focus:outline-none transition-all rounded-none resize-none text-sm ${errors.message ? 'border-red-500' : 'border-white/10 focus:border-blue-500 focus:bg-blue-500/5'}`}
                      placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                    />
                    {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {submitMessage && (
                    <div className={`p-4 text-xs font-mono uppercase tracking-widest border flex flex-col gap-2 ${
                      submitMessageType === "success"
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    }`}>
                      <span>{submitMessage}</span>
                      {submitMessageType === "error" && fallbackLink && (
                        <a href={fallbackLink} className="text-white underline hover:text-cyan-400 normal-case font-sans text-sm font-bold w-fit" target="_blank" rel="noopener noreferrer">
                          Click here to email us directly instead &rarr;
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button" onClick={closeModal}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit" disabled={isSubmitting}
                      className="group relative flex-1 px-4 py-3 bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      {isSubmitting ? (
                        <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                      ) : (
                        <>Submit Application <FiSend className="w-3 h-3" /></>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* RESUME DIALOG (Appears after successful submission) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showResumeDialog && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#050A14] border border-cyan-500/30 rounded-sm shadow-[0_0_60px_rgba(34,211,238,0.15)] w-full max-w-lg relative"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                    <FiCheck className="w-3 h-3" /> Application Sent
                  </div>
                  <button onClick={() => setShowResumeDialog(false)} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-sm">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  One more step, {applicantInfo.name.split(" ")[0]}
                </h3>
                <p className="text-gray-400 font-light text-sm mb-6 leading-relaxed">
                  Your application for <strong className="text-white">{applicantInfo.role}</strong> ({applicantInfo.track}) is with us. 
                  Please send your resume <strong className="text-cyan-400">separately</strong> to our company email to complete your application.
                </p>

                {/* Email Address Copy Box */}
                <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 mb-6">
                  <span className="font-mono text-sm text-cyan-400">{CAREERS_INBOX}</span>
                  <button 
                    onClick={() => handleCopy(CAREERS_INBOX, "address")}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                  >
                    {copied === "address" ? <><FiCheck className="text-cyan-400"/> Copied</> : <><FiCopy /> Copy</>}
                  </button>
                </div>

                <ol className="space-y-4 mb-8">
                  <li className="flex gap-4">
                    <span className="flex items-center justify-center w-6 h-6 border border-white/20 text-xs font-mono shrink-0">1</span>
                    <p className="text-sm text-gray-400 font-light pt-0.5">Start a new email to <strong className="text-white">{CAREERS_INBOX}</strong> and attach your resume (PDF preferred).</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex items-center justify-center w-6 h-6 border border-white/20 text-xs font-mono shrink-0">2</span>
                    <div className="text-sm text-gray-400 font-light pt-0.5">
                      Use this subject so we can match it to your application:
                      <div className="mt-2 flex items-center justify-between bg-[#030712] border border-white/10 p-2">
                        <span className="font-mono text-xs text-gray-300 truncate max-w-[200px] sm:max-w-[250px]">{resumeSubject}</span>
                        <button 
                          onClick={() => handleCopy(resumeSubject, "subject")}
                          className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 hover:text-white ml-2 shrink-0"
                        >
                          {copied === "subject" ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </li>
                </ol>

                {copied === "failed" && (
                  <p className="text-[10px] text-red-500 mb-4">Couldn't copy — please select the text and copy it manually.</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                  <a 
                    href={mailtoLink}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-white/10 transition-colors"
                  >
                    <FiMail className="w-3 h-3" /> Open Email App
                  </a>
                  <button 
                    onClick={() => setShowResumeDialog(false)}
                    className="flex-1 px-4 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="pt-32 pb-24 bg-[#030712] relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[120px] -ml-48 -mb-48" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link
              to="/work-with-us"
              id="back-to-openings"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-10 hover:text-white transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Current Openings
            </Link>
          </motion.div>

          <motion.div 
            className="max-w-4xl space-y-6"
            initial="hidden" animate="visible" variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
            >
              {opening.category}
            </motion.span>

            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 leading-[1.05]"
            >
              {opening.title}
            </motion.h1>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center gap-6 text-gray-400"
            >
              <div className="inline-flex items-center gap-2">
                <FiBriefcase className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-widest">{opening.details}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-widest">Global Team Collaboration</span>
              </div>
            </motion.div>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed font-light"
            >
              {opening.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-24 bg-[#050A14] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {/* Role Overview */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-8 md:p-10 bg-[#030712] border border-white/10 relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-500" />
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-5">
                  Role Overview
                </h2>
                <p className="text-gray-400 font-light leading-relaxed">
                  {opening.description}
                </p>
              </motion.div>

              {/* Qualifications */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-8 md:p-10 bg-[#030712] border border-white/10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-5">
                  Qualifications
                </h2>
                <ul className="space-y-4">
                  {openingContent?.qualifications?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-300 text-sm font-light leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Responsibilities */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-8 md:p-10 bg-[#030712] border border-white/10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-5">
                  Key Responsibilities
                </h2>
                <ul className="space-y-4">
                  {openingContent?.responsibilities?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-300 text-sm font-light leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* SIDEBAR */}
            <motion.aside 
              className="p-8 bg-gradient-to-br from-[#0A0F1C] to-[#030712] border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)] rounded-sm space-y-6 h-fit sticky top-24"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
            >
              <h3 className="text-lg font-black uppercase tracking-tight text-white">How to Apply</h3>
              <ul className="space-y-4">
                {openingContent?.applicationSteps?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="text-xs font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openModal}
                className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest transition-all rounded-sm overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
                <span className="relative z-10 flex items-center gap-2">
                  Apply Now
                  <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.aside>
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







// import React, { useState } from "react";
// import { Link, useParams } from "react-router";
// import { FaArrowRight } from "react-icons/fa";
// import { FiArrowLeft, FiBriefcase, FiMapPin, FiSend, FiX } from "react-icons/fi";
// import data from "../../lib/data.json";

// const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
// const OPENINGS = workWithUsData.openings;
// const OPENING_CONTENT = workWithUsData.openingDetails;

// export default function WorkWithUsDetails({
//   openingId,
// }: {
//   openingId?: string;
// }) {
//   const params = useParams();
//   const id = openingId ?? (params as { id?: string }).id;

//   const opening = OPENINGS.find((item) => item.id === id);
//   if (!opening) {
//     throw new Response("Opening not found", { status: 404 });
//   }

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     portfolio: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState("");
//   const [submitMessageType, setSubmitMessageType] = useState<"success" | "error" | "">("");

//   // Map category to openingDetails key
//   const categoryToKey: Record<string, string> = {
//     "Blockchain Development": "Blockchain",
//     "Smart Contract Development Intern": "Smart Contract Intern",
//     "Product Design": "Design",
//     "Backend Engineering": "Backend",
//     "Frontend Engineering": "Frontend",
//     "Mobile Engineering": "Mobile",
//     "AI Development": "AI-Developer",
//     "AI-Assisted Development": "AI-Agent"
//   };

//   const detailsKey = categoryToKey[opening.category] || "Strategy";
//   const openingContent = OPENING_CONTENT[detailsKey];

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       portfolio: "",
//       message: "",
//     });
//     setSubmitMessage("");
//     setSubmitMessageType("");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.fullName.trim()) {
//       setSubmitMessage("Please enter your full name.");
//       setSubmitMessageType("error");
//       setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
//       return;
//     }

//     if (!formData.email.trim()) {
//       setSubmitMessage("Please enter your email address.");
//       setSubmitMessageType("error");
//       setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setSubmitMessage("Please enter a valid email address.");
//       setSubmitMessageType("error");
//       setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
//       return;
//     }

//     setIsSubmitting(true);

//     // Build email content
//     const subject = `Job Application: ${opening.title} from ${formData.fullName}`;
//     const body = `
// Full Name: ${formData.fullName}
// Email: ${formData.email}
// Phone: ${formData.phone || "Not provided"}
// Portfolio/LinkedIn/GitHub: ${formData.portfolio || "Not provided"}
// Position: ${opening.title}

// Message:
// ${formData.message || "No message provided"}

// ---
// Please send your resume/CV to: hello@Invorious.com
//     `.trim();

//     // Open email client
//     window.location.href = `mailto:hello@Invorious.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

//     setSubmitMessage("✅ Application information sent! Please check your email client and attach your resume/CV to complete your application.");
//     setSubmitMessageType("success");

//     // Clear form
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       portfolio: "",
//       message: "",
//     });

//     setIsSubmitting(false);

//     // Clear status after 5 seconds
//     setTimeout(() => setSubmitMessage(""), 5000);

//     // Close modal after 5 seconds
//     setTimeout(() => closeModal(), 5000);
//   };

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1 pt-20"
//     >
//       {/* Application Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            
//             <div className="p-5 sm:p-6">
              
//               {/* Header */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
//                   Apply for {opening.title}
//                 </h2>
//                 <button
//                   onClick={closeModal}
//                   className="p-2 text-slate-400 hover:text-slate-600 transition-colors hover:bg-slate-100 rounded-full"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               </div>
              
//               <p className="text-slate-500 text-sm mb-6">
//                 Fill out the form below to apply for the {opening.title} position.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Full Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="jhon@example.com"
//                     required
//                   />
//                 </div>

//                 {/* Phone (Optional) */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Phone Number <span className="text-slate-400 text-xs font-normal">(Optional)</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="+1 (555) 000-0000"
//                   />
//                 </div>

//                 {/* Portfolio / LinkedIn / GitHub (Optional) */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Portfolio / LinkedIn / GitHub <span className="text-slate-400 text-xs font-normal">(Optional)</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="portfolio"
//                     value={formData.portfolio}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="https://..."
//                   />
//                 </div>

//                 {/* Cover Letter (Optional) */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Cover Letter / Message <span className="text-slate-400 text-xs font-normal">(Optional)</span>
//                   </label>
//                   <textarea
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
//                     placeholder="Tell us why you'are interested in this role and what makes you a great fit for this position"
//                   />
//                 </div>

//                 {/* Resume Required Notice */}
//                 <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//                   <p className="text-sm text-amber-800 font-medium">
//                     📄 Resume/CV Required
//                   </p>
//                   <p className="text-xs text-amber-700 mt-1">
//                     Please email your resume separately to <span className="font-mono font-bold">hello@Invorious.com</span> after submitting the form.
//                   </p>
//                 </div>

//                 {submitMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     submitMessageType === "success"
//                       ? "bg-green-50 text-green-700 border border-green-200"
//                       : "bg-red-50 text-red-600 border border-red-200"
//                   }`}>
//                     {submitMessage}
//                   </div>
//                 )}

//                 {/* Buttons */}
//                 <div className="flex gap-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       <>
//                         Submit Application
//                         <FiSend className="w-4 h-4" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
//           <Link
//             to="/work-with-us"
//             id="back-to-openings"
//             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
//           >
//             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Current Openings
//           </Link>

//           <div className="max-w-4xl space-y-6">
//             <span
//               className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
//             >
//               {opening.category}
//             </span>

//             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
//               {opening.title}
//             </h1>

//             <div className="flex flex-wrap items-center gap-6 text-slate-300">
//               <div className="inline-flex items-center gap-2">
//                 <FiBriefcase className="w-4 h-4" />
//                 <span className="text-sm">{opening.details}</span>
//               </div>
//               <div className="inline-flex items-center gap-2">
//                 <FiMapPin className="w-4 h-4" />
//                 <span className="text-sm">Global Team Collaboration</span>
//               </div>
//             </div>

//             <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
//               {opening.description}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content Section */}
//       <section className="py-10 md:py-20 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-8">
//               <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Role Overview
//                 </h2>
//                 <p className="text-slate-600 leading-relaxed">
//                   {opening.description}
//                 </p>
//               </div>

//               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Qualifications
//                 </h2>
//                 <ul className="space-y-3">
//                   {openingContent?.qualifications?.map((item: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 text-slate-700">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Key Responsibilities
//                 </h2>
//                 <ul className="space-y-3">
//                   {openingContent?.responsibilities?.map((item: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 text-slate-700">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
//               <h3 className="text-xl font-bold">How to Apply</h3>
//               <ul className="space-y-3">
//                 {openingContent?.applicationSteps?.map((item: string, idx: number) => (
//                   <li key={idx} className="flex items-start gap-3 text-slate-300">
//                     <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
//                     <span className="text-sm">{item}</span>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={openModal}
//                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
//               >
//                 Apply Now <FaArrowRight className="w-4 h-4" />
//               </button>
//             </aside>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }








// // import React from "react";

// // import { Link, useParams } from "react-router";

// // import { FaArrowRight } from "react-icons/fa";

// // import { FiArrowLeft, FiBriefcase, FiMapPin } from "react-icons/fi";

// // import data from "../../lib/data.json";

// // const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
// // const OPENINGS = workWithUsData.openings;
// // const OPENING_CONTENT = workWithUsData.openingDetails;

// // export default function WorkWithUsDetails({
// //   openingId,
// // }: {
// //   openingId?: string;
// // }) {
// //   const params = useParams();
// //   const id = openingId ?? (params as { id?: string }).id;

// //   const opening = OPENINGS.find((item) => item.id === id);
// //   if (!opening) {
// //     throw new Response("Opening not found", { status: 404 });
// //   }


// //   const openingContent =
// //     OPENING_CONTENT[opening.category] ?? OPENING_CONTENT.Strategy;

// //   return (
// //     <main
// //       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
// //       className="flex-1 pt-20"
// //     >
// //       <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
// //         <div className="absolute inset-0 opacity-10">
// //           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
// //         </div>

// //         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
// //           <Link
// //             to="/work-With-us"
// //             id="back-to-openings"
// //             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
// //           >
// //             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
// //             Back to Current Openings
// //           </Link>

// //           <div className="max-w-4xl space-y-6">
// //             <span
// //               className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
// //             >
// //               {opening.category}
// //             </span>

// //             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
// //               {opening.title}
// //             </h1>

// //             <div className="flex flex-wrap items-center gap-6 text-slate-300">
// //               <div className="inline-flex items-center gap-2">
// //                 <FiBriefcase className="w-4 h-4" />
// //                 <span className="text-sm">{opening.details}</span>
// //               </div>
// //               <div className="inline-flex items-center gap-2">
// //                 <FiMapPin className="w-4 h-4" />
// //                 <span className="text-sm">Global Team Collaboration</span>
// //               </div>
// //             </div>

// //             <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
// //               {opening.description}
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="py-10 md:py-20 bg-white">
// //         <div className="max-w-full-sm xl:container mx-auto px-6">
// //           <div className="grid lg:grid-cols-3 gap-8">
// //             <div className="lg:col-span-2 space-y-8">
// //               <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Role Overview
// //                 </h2>
// //                 <p className="text-slate-600 leading-relaxed">
// //                   {opening.description}
// //                 </p>
// //               </div>

// //               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Qualifications
// //                 </h2>
// //                 <ul className="space-y-3">
// //                   {openingContent.qualifications.map((item) => (
// //                     <li key={item} className="flex items-start gap-3 text-slate-700">
// //                       <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>

// //               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Responsibilities
// //                 </h2>
// //                 <ul className="space-y-3">
// //                   {openingContent.responsibilities.map((item) => (
// //                     <li key={item} className="flex items-start gap-3 text-slate-700">
// //                       <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>

// //             <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
// //               <h3 className="text-xl font-bold">How to Apply</h3>
// //               <ul className="space-y-3">
// //                 {openingContent.applicationSteps.map((item) => (
// //                   <li key={item} className="flex items-start gap-3 text-slate-300">
// //                     <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
// //                     <span className="text-sm">{item}</span>
// //                   </li>
// //                 ))}
// //               </ul>

// //               <p className="text-slate-300 text-sm pt-2">
// //                 Send to our careers team and include the role code.:{" "}
// //                 <span className="font-bold text-white">{opening.id}</span>.
// //               </p>

// //               <a
// //                 href={`mailto:careers@Invorious.com?subject=Application%20for%20${encodeURIComponent(opening.title)}`}
// //                 id="apply-mail-link"
// //                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
// //               >
// //                 Apply via Email <FaArrowRight className="w-4 h-4" />
// //               </a>
// //             </aside>
// //           </div>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }
// // import React from "react";
// // import { Link, useParams } from "react-router";
// // import { FaArrowRight } from "react-icons/fa";
// // import { FiArrowLeft, FiBriefcase, FiMapPin } from "react-icons/fi";
// // import data from "../../lib/data.json";

// // const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
// // const OPENINGS = workWithUsData.openings;
// // const OPENING_CONTENT = workWithUsData.openingDetails;

// // export default function WorkWithUsDetails({
// //   openingId,
// // }: {
// //   openingId?: string;
// // }) {
// //   const params = useParams();
// //   const id = openingId ?? (params as { id?: string }).id;

// //   const opening = OPENINGS.find((item) => item.id === id);
// //   if (!opening) {
// //     throw new Response("Opening not found", { status: 404 });
// //   }

// //   // Map category to openingDetails key
// //   const categoryToKey: Record<string, string> = {
// //     "Blockchain Development": "Blockchain",
// //         "Smart Contract Development Intern": "Smart Contract Intern",
// //     "Product Design": "Design",
// //     "Backend Engineering": "Backend",
// //     "Frontend Engineering": "Frontend",
// //     "Mobile Engineering": "Mobile",
// //   "AI-Assisted Development":"AI-Agent"  };

// //   const detailsKey = categoryToKey[opening.category] || "Strategy";
// //   const openingContent = OPENING_CONTENT[detailsKey];

// //   return (
// //     <main
// //       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
// //       className="flex-1 pt-20"
// //     >
// //       <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
// //         <div className="absolute inset-0 opacity-10">
// //           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
// //         </div>

// //         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
// //           <Link
// //             to="/work-with-us"
// //             id="back-to-openings"
// //             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
// //           >
// //             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
// //             Back to Current Openings
// //           </Link>

// //           <div className="max-w-4xl space-y-6">
// //             <span
// //               className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
// //             >
// //               {opening.category}
// //             </span>

// //             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
// //               {opening.title}
// //             </h1>

// //             <div className="flex flex-wrap items-center gap-6 text-slate-300">
// //               <div className="inline-flex items-center gap-2">
// //                 <FiBriefcase className="w-4 h-4" />
// //                 <span className="text-sm">{opening.details}</span>
// //               </div>
// //               <div className="inline-flex items-center gap-2">
// //                 <FiMapPin className="w-4 h-4" />
// //                 <span className="text-sm">Global Team Collaboration</span>
// //               </div>
// //             </div>

// //             <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
// //               {opening.description}
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="py-10 md:py-20 bg-white">
// //         <div className="max-w-full-sm xl:container mx-auto px-6">
// //           <div className="grid lg:grid-cols-3 gap-8">
// //             <div className="lg:col-span-2 space-y-8">
// //               <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Role Overview
// //                 </h2>
// //                 <p className="text-slate-600 leading-relaxed">
// //                   {opening.description}
// //                 </p>
// //               </div>

// //               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Qualifications
// //                 </h2>
// //                 <ul className="space-y-3">
// //                   {openingContent?.qualifications?.map((item: string, idx: number) => (
// //                     <li key={idx} className="flex items-start gap-3 text-slate-700">
// //                       <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>

// //               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Key Responsibilities
// //                 </h2>
// //                 <ul className="space-y-3">
// //                   {openingContent?.responsibilities?.map((item: string, idx: number) => (
// //                     <li key={idx} className="flex items-start gap-3 text-slate-700">
// //                       <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>

// //             <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
// //               <h3 className="text-xl font-bold">How to Apply</h3>
// //               <ul className="space-y-3">
// //                 {openingContent?.applicationSteps?.map((item: string, idx: number) => (
// //                   <li key={idx} className="flex items-start gap-3 text-slate-300">
// //                     <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
// //                     <span className="text-sm">{item}</span>
// //                   </li>
// //                 ))}
// //               </ul>

// //               {/* <p className="text-slate-300 text-sm pt-2">
// //                 Send to our careers team and include the role code:{" "}
// //                 <span className="font-bold text-white">{opening.id}</span>
// //               </p> */}

// //               <a
// //                 href={`mailto:hello@Invorious.com?subject=Application%20for%20${encodeURIComponent(opening.title)}`}
// //                 id="apply-mail-link"
// //                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
// //               >
// //                 Apply via Email <FaArrowRight className="w-4 h-4" />
// //               </a>
// //             </aside>
// //           </div>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }



// import React, { useState } from "react";
// import { Link, useParams } from "react-router";
// import { FaArrowRight } from "react-icons/fa";
// import { FiArrowLeft, FiBriefcase, FiMapPin, FiSend, FiX } from "react-icons/fi";
// import data from "../../lib/data.json";

// const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
// const OPENINGS = workWithUsData.openings;
// const OPENING_CONTENT = workWithUsData.openingDetails;

// // Web3Forms Configuration - YOUR ACCESS KEY
// const WEB3FORMS_ACCESS_KEY = "7be6a23a-864a-41f5-849f-265762877bcd";

// export default function WorkWithUsDetails({
//   openingId,
// }: {
//   openingId?: string;
// }) {
//   const params = useParams();
//   const id = openingId ?? (params as { id?: string }).id;

//   const opening = OPENINGS.find((item) => item.id === id);
//   if (!opening) {
//     throw new Response("Opening not found", { status: 404 });
//   }

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message: "",
//     resume: null as File | null,
//   });
//   const [formStatus, setFormStatus] = useState({ type: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Map category to openingDetails key
//   const categoryToKey: Record<string, string> = {
//     "Blockchain Development": "Blockchain",
//     "Smart Contract Development Intern": "Smart Contract Intern",
//     "Product Design": "Design",
//     "Backend Engineering": "Backend",
//     "Frontend Engineering": "Frontend",
//     "Mobile Engineering": "Mobile",
//     "AI Development": "AI-Developer",
//     "AI-Assisted Development": "AI-Agent"
//   };

//   const detailsKey = categoryToKey[opening.category] || "Strategy";
//   const openingContent = OPENING_CONTENT[detailsKey];

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const maxSize = 5 * 1024 * 1024; // 5MB
//       if (file.size > maxSize) {
//         alert("File size must be less than 5MB");
//         return;
//       }
//       setFormData((prev) => ({ ...prev, resume: file }));
//     }
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       message: "",
//       resume: null,
//     });
//     setFormStatus({ type: "", message: "" });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.firstName.trim()) {
//       setFormStatus({ type: "error", message: "Please enter your first name." });
//       setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
//       return;
//     }

//     if (!formData.lastName.trim()) {
//       setFormStatus({ type: "error", message: "Please enter your last name." });
//       setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
//       return;
//     }

//     if (!formData.email.trim()) {
//       setFormStatus({ type: "error", message: "Please enter your email address." });
//       setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setFormStatus({ type: "error", message: "Please enter a valid email address." });
//       setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
//       return;
//     }

//     setIsSubmitting(true);

//     // Prepare form data for Web3Forms
//     const formPayload = new FormData();
//     formPayload.append("access_key", WEB3FORMS_ACCESS_KEY);
//     formPayload.append("name", `${formData.firstName} ${formData.lastName}`);
//     formPayload.append("email", formData.email);
//     formPayload.append("phone", formData.phone || "");
//     formPayload.append("position", opening.title);
//     formPayload.append("message", formData.message);
//     formPayload.append(
//       "subject",
//       `Job Application: ${opening.title} from ${formData.firstName} ${formData.lastName}`
//     );
//     formPayload.append("from_name", "Invorious Careers");

//     if (formData.resume) {
//       formPayload.append("attachment", formData.resume);
//     }

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: formPayload,
//       });

//       const result = await response.json();

//       if (result.success) {
//         setFormStatus({
//           type: "success",
//           message:
//             "✅ Application submitted successfully! We'll review it and get back to you within 5-7 business days.",
//         });

//         // Clear form after successful submission
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           message: "",
//           resume: null,
//         });

//         // Close modal after 3 seconds
//         setTimeout(() => {
//           closeModal();
//         }, 3000);
//       } else {
//         throw new Error(result.message || "Failed to submit application");
//       }
//     } catch (error) {
//       console.error("Web3Forms Error:", error);
//       setFormStatus({
//         type: "error",
//         message:
//           "❌ Something went wrong. Please try again or email us directly at hello@Invorious.com.",
//       });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1 pt-20"
//     >
//       {/* Application Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            
//             <div className="p-5 sm:p-6">
              
//               {/* Header - Close button */}
//               <div className="flex justify-end mb-3">
//                 <button
//                   onClick={closeModal}
//                   className="p-2 text-slate-400 hover:text-slate-600 transition-colors hover:bg-slate-100 rounded-full"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               </div>
              
//               <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
//                 Apply for {opening.title}
//               </h2>
              
//               <p className="text-slate-500 text-sm mb-6">
//                 Fill out the form below to submit your application. We'll review it and get back to you soon.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                       First Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                       placeholder="John"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                       Last Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                       placeholder="Doe"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     placeholder="john@company.com"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                     Phone Number (Optional)
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     placeholder="+44 20 7946 0123"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                     Resume/CV <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="file"
//                     name="resume"
//                     onChange={handleFileChange}
//                     accept=".pdf,.doc,.docx,.jpg,.png"
//                     className="w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                     required
//                   />
//                   <p className="text-xs text-slate-400 mt-1">
//                     Max 5MB. PDF, DOC, DOCX, JPG, PNG
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                     Cover Letter / Why you're a great fit
//                   </label>
//                   <textarea
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     placeholder="Describe your relevant experience, key skills, and what makes you a great fit for this position."
//                   />
//                 </div>

//                 {formStatus.message && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     formStatus.type === "success"
//                       ? "bg-green-50 text-green-700 border border-green-200"
//                       : "bg-red-50 text-red-600 border border-red-200"
//                   }`}>
//                     {formStatus.message}
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       Submit Application
//                       <FiSend className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
//           <Link
//             to="/work-with-us"
//             id="back-to-openings"
//             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
//           >
//             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Current Openings
//           </Link>

//           <div className="max-w-4xl space-y-6">
//             <span
//               className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
//             >
//               {opening.category}
//             </span>

//             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
//               {opening.title}
//             </h1>

//             <div className="flex flex-wrap items-center gap-6 text-slate-300">
//               <div className="inline-flex items-center gap-2">
//                 <FiBriefcase className="w-4 h-4" />
//                 <span className="text-sm">{opening.details}</span>
//               </div>
//               <div className="inline-flex items-center gap-2">
//                 <FiMapPin className="w-4 h-4" />
//                 <span className="text-sm">Global Team Collaboration</span>
//               </div>
//             </div>

//             <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
//               {opening.description}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content Section */}
//       <section className="py-10 md:py-20 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-8">
//               <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Role Overview
//                 </h2>
//                 <p className="text-slate-600 leading-relaxed">
//                   {opening.description}
//                 </p>
//               </div>

//               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Qualifications
//                 </h2>
//                 <ul className="space-y-3">
//                   {openingContent?.qualifications?.map((item: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 text-slate-700">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Key Responsibilities
//                 </h2>
//                 <ul className="space-y-3">
//                   {openingContent?.responsibilities?.map((item: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 text-slate-700">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
//               <h3 className="text-xl font-bold">How to Apply</h3>
//               <ul className="space-y-3">
//                 {openingContent?.applicationSteps?.map((item: string, idx: number) => (
//                   <li key={idx} className="flex items-start gap-3 text-slate-300">
//                     <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
//                     <span className="text-sm">{item}</span>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={openModal}
//                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
//               >
//                 Apply Now <FaArrowRight className="w-4 h-4" />
//               </button>
//             </aside>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
