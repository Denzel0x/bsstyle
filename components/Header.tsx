import React, { useState } from "react";
import { FiLayers, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import { motion } from "motion/react";
import logoImage from "/favicon.ico";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 transition-all duration-300 border-b-2 relative z-10 ${
      isActive
        ? "text-cyan-400 border-cyan-400"
        : "text-gray-400 border-transparent hover:text-white hover:border-white/20"
    }`;

  const ctaClassName = ({ isActive }: { isActive: boolean }) =>
    `group relative z-10 px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 overflow-hidden rounded-sm ${
      isActive
        ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
    }`;

  const mobileNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-sm font-bold uppercase tracking-widest border-l-2 transition-all ${
      isActive
        ? "text-cyan-400 border-cyan-400 bg-white/5"
        : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
    }`;

  return (
    <header
      // The header is now relative and overflow-hidden to contain the moving gradient
      className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 relative overflow-hidden"
      style={{ viewTransitionName: "main-nav" } as React.CSSProperties}
    >
      {/* CONTINUOUS MOVIE EFFECT: Sweeping Light Beam */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent pointer-events-none z-0"
      />

      {/* CONTINUOUS MOVIE EFFECT: Glowing Bottom Border */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "200% 50%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent bg-[length:200%_100%] pointer-events-none z-0"
      />

      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        {/* LOGO - Clean, no bounding box */}
        <Link to="/" id="nav-logo-link" className="flex items-center gap-3 group">
          <img
            src={logoImage}
            alt="Invorious Logo"
            className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="text-xl font-black uppercase tracking-tighter text-white">
            Invorious
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-2">
          <NavLink to="/" id="nav-home" className={navLinkClassName} end>
            Home
          </NavLink>
          <NavLink to="/about" id="nav-about" className={navLinkClassName}>
            About
          </NavLink>
          <NavLink to="/services" id="nav-services" className={navLinkClassName}>
            Services
          </NavLink>
          <NavLink to="/portfolio" id="nav-portfolio" className={navLinkClassName}>
            Portfolio
          </NavLink>
          <NavLink to="/team" id="nav-team" className={navLinkClassName}>
            Team
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          {/* CTA BUTTON */}
          <NavLink
            to="/work-with-us"
            id="nav-cta-btn"
            className={({ isActive }) => ctaClassName({ isActive })}
          >
            {({ isActive }) => (
              <>
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
                )}
                <span className="relative z-10 hidden md:inline">Work With Us</span>
                <FiLayers className="relative z-10 md:hidden w-4 h-4" />
              </>
            )}
          </NavLink>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden text-white hover:text-cyan-400 transition-colors relative z-10"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {isMenuOpen && (
        <nav 
          id="mobile-nav-menu" 
          className="lg:hidden absolute top-20 left-0 right-0 bg-[#050A14]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 shadow-2xl z-20"
        >
          <div className="flex flex-col space-y-1">
            <NavLink
              to="/"
              id="mobile-nav-home"
              className={mobileNavLinkClassName}
              end
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              id="mobile-nav-about"
              className={mobileNavLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              id="mobile-nav-services"
              className={mobileNavLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/portfolio"
              id="mobile-nav-portfolio"
              className={mobileNavLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/team"
              id="mobile-nav-team"
              className={mobileNavLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}