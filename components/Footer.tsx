import { useState } from "react";
import {
  FaArrowRight,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { Link } from "react-router";
import data from "../lib/data.json";
import { slugifyServiceTitle } from "../lib/service-slug";
import logoImage from "/favicon.ico"; // <-- ADDED LOGO IMPORT

export default function Footer() {
  const homePageData = (data as HomePageData).homePage;
  
  // Newsletter state
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // error or info

  const handleSubscribe = () => {
    // Validate email
    if (!email) {
      setAlertMessage("Please enter your email address.");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertMessage("Please enter a valid email address.");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    
    // Open email client
    window.location.href = `mailto:hello@invorious.com?subject=Newsletter%20Subscription&body=Please%20add%20me%20to%20your%20newsletter.%0D%0A%0D%0AMy%20email%3A%20${encodeURIComponent(email)}%0D%0A%0D%0AThank you!`;
    
    // Show honest info message
    setAlertMessage("📧 Your email client has opened. Please send the email to complete your subscription.");
    setAlertType("info");
    setShowAlert(true);
    
    // Clear email field
    setEmail("");
    
    // Hide alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Company Info */}
          <div className="space-y-6">
            <Link
              to="/"
              id="footer-logo-link"
              className="flex items-center gap-3 group"
            >
              {/* FIXED: Using actual logo image instead of FiLayers */}
              <img
                src={logoImage}
                alt="Invorious Logo"
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="text-xl font-black uppercase tracking-tighter text-white">Invorious</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              The global standard in Web3-native consulting and development. Transforming 
              complex blockchain challenges into sustainable growth since 2021.
            </p>
            {/* <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/block-sherpa"
                id="foot-soc-1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div> */}
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">
              Services
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link to="/services" id="f-serv-all" className="hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              {homePageData.services.items.slice(0, 4).map((service, idx) => {
                const slug = slugifyServiceTitle(service.title);
                return (
                  <li key={service.title}>
                    <Link to={`/services/${slug}`} id={`f-serv-${idx + 1}`} className="hover:text-white transition-colors">
                      {service.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link to="/about" id="f-comp-1" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" id="f-comp-2" className="hover:text-white transition-colors">
                  Our Portfolio
                </Link>
              </li>
              <li>
                <Link to="/team" id="f-comp-3" className="hover:text-white transition-colors">
                  Leadership Team
                </Link>
              </li>
              <li>
                <Link to="/work-with-us" id="f-comp-4" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400 font-light mb-6 leading-relaxed">
              Get the latest Web3 insights and blockchain strategies delivered weekly.
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all w-full rounded-none"
                  placeholder="Enter your email"
                />
                <button
                  onClick={handleSubscribe}
                  className="group relative bg-blue-600 text-white p-3 flex items-center justify-center hover:bg-blue-500 transition-colors rounded-none shadow-[0_0_15px_rgba(37,99,235,0.3)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <FaArrowRight className="w-4 h-4 relative z-10" />
                </button>
              </div>
              
              {/* Alert Messages */}
              {showAlert && (
                <div className={`text-xs p-3 border rounded-none ${
                  alertType === "error" 
                    ? "bg-red-500/10 text-red-400 border-red-500/30" 
                    : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                }`}>
                  {alertMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">
          <p>© 2026 Invorious. All rights reserved.</p>
          <div className="flex flex-wrap gap-8">
            <Link to="/privacy-policy" id="f-legal-1" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" id="f-legal-2" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" id="f-legal-3" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}




// import { useState } from "react";
// import {
//   FaArrowRight,
//   FaInstagram,
//   FaLinkedin,
//   FaTwitter,
// } from "react-icons/fa";
// import { FiLayers } from "react-icons/fi";
// import { Link } from "react-router";
// import data from "../lib/data.json";
// import { slugifyServiceTitle } from "../lib/service-slug";

// export default function Footer() {
//   const homePageData = (data as HomePageData).homePage;
  
//   // Newsletter state
//   const [email, setEmail] = useState("");
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState(""); // error or info

//   const handleSubscribe = () => {
//     // Validate email
//     if (!email) {
//       setAlertMessage("Please enter your email address.");
//       setAlertType("error");
//       setShowAlert(true);
//       setTimeout(() => setShowAlert(false), 3000);
//       return;
//     }
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setAlertMessage("Please enter a valid email address.");
//       setAlertType("error");
//       setShowAlert(true);
//       setTimeout(() => setShowAlert(false), 3000);
//       return;
//     }
    
//     // Open email client
//     window.location.href = `mailto:hello@blockchainsherpa.io?subject=Newsletter%20Subscription&body=Please%20add%20me%20to%20your%20newsletter.%0D%0A%0D%0AMy%20email%3A%20${encodeURIComponent(email)}%0D%0A%0D%0AThank you!`;
    
//     // Show honest info message
//     setAlertMessage("📧 Your email client has opened. Please send the email to complete your subscription.");
//     setAlertType("info");
//     setShowAlert(true);
    
//     // Clear email field
//     setEmail("");
    
//     // Hide alert after 5 seconds
//     setTimeout(() => setShowAlert(false), 5000);
//   };

//   return (
//     <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
//       <div className="max-w-full-sm xl:container mx-auto px-6">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
//           {/* Logo & Company Info */}
//           <div className="space-y-6">
//             <Link
//               to="/"
//               id="footer-logo-link"
//               className="flex items-center gap-2"
//             >
//               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
//                 <FiLayers className="text-white text-lg" />
//               </div>
//               <span className="text-lg font-bold text-slate-900">Invorious</span>
//             </Link>
//             <p className="text-slate-500 text-sm leading-relaxed">
//               The global standard in Web3-native consulting and development. Transforming 
//               complex blockchain challenges into sustainable growth since 2022.
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="https://www.linkedin.com/company/block-sherpa"
//                 id="foot-soc-1"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
//               >
//                 <FaLinkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Services Links */}
//           <div>
//             <h4 className="font-bold text-slate-900 mb-6">Services</h4>
//             <ul className="space-y-4 text-sm text-slate-500">
//               <li className="hover:text-blue-600 transition-colors">
//                 <Link to="/services" id="f-serv-all">
//                   All Services
//                 </Link>
//               </li>
//               {homePageData.services.items.slice(0, 4).map((service, idx) => {
//                 const slug = slugifyServiceTitle(service.title);
//                 return (
//                   <li
//                     key={service.title}
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     <Link to={`/services/${slug}`} id={`f-serv-${idx + 1}`}>
//                       {service.title}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           {/* Company Links */}
//           <div>
//             <h4 className="font-bold text-slate-900 mb-6">Company</h4>
//             <ul className="space-y-4 text-sm text-slate-500">
//               <li className="hover:text-blue-600 transition-colors">
//                 <Link to="/about" id="f-comp-1">
//                   About Us
//                 </Link>
//               </li>
//               <li className="hover:text-blue-600 transition-colors">
//                 <Link to="/portfolio" id="f-comp-2">
//                   Our Portfolio
//                 </Link>
//               </li>
//               <li className="hover:text-blue-600 transition-colors">
//                 <Link to="/team" id="f-comp-3">
//                   Leadership Team
//                 </Link>
//               </li>
//               <li className="hover:text-blue-600 transition-colors">
//                 <Link to="/work-with-us" id="f-comp-4">
//                   Careers
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter Section */}
//           <div>
//             <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
//             <p className="text-sm text-slate-500 mb-4">
//               Get the latest Web3 insights and blockchain strategies delivered weekly.
//             </p>
            
//             <div className="space-y-3">
//               <div className="flex gap-2">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
//                   placeholder="Enter your email"
//                 />
//                 <button
//                   onClick={handleSubscribe}
//                   className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
//                 >
//                   <FaArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
              
//               {/* Alert Messages */}
//               {showAlert && (
//                 <div className={`text-xs p-2 rounded-lg ${
//                   alertType === "error" 
//                     ? "bg-red-50 text-red-600" 
//                     : "bg-blue-50 text-blue-600"
//                 }`}>
//                   {alertMessage}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Footer */}
//         <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
//           <p>© 2026 Invorious. All rights reserved.</p>
//           <div className="flex gap-8">
//             <Link
//               to="/privacy-policy"
//               id="f-legal-1"
//               className="hover:text-slate-900"
//             >
//               Privacy Policy
//             </Link>
//             <Link
//               to="/terms-of-service"
//               id="f-legal-2"
//               className="hover:text-slate-900"
//             >
//               Terms of Service
//             </Link>
//             <Link
//               to="/cookie-policy"
//               id="f-legal-3"
//               className="hover:text-slate-900"
//             >
//               Cookie Policy
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }