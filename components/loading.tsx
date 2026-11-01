// app/components/Loading.tsx
import { motion } from "motion/react";
import logoImage from "/favicon.ico";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#030712] z-[9999] flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center space-y-8 relative z-10">
        
        {/* Perfect Square Rotating Container (Reduced Size) */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          
          {/* The spinning perfect square */}
          <div className="absolute inset-0 border-2 border-cyan-400/10 border-t-cyan-400 border-l-cyan-400 rounded-none animate-spin shadow-[0_0_20px_rgba(34,211,238,0.2)]"></div>
          
          {/* Center Logo (Larger, Tighter Fit) */}
          <div className="relative z-10 w-16 h-16 bg-[#030712] flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="Invorious Logo" 
              className="w-12 h-12 object-contain" 
            />
          </div>
        </div>

        {/* Loading Text with Animated Dots */}
        <div className="space-y-4">
          <p className="text-gray-500 font-mono text-xs font-bold uppercase tracking-[0.3em]">
            Initializing Invorious
          </p>
          <div className="flex justify-center gap-2">
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
              className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}