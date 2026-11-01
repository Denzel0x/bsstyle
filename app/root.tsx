import { useState, useEffect, useLayoutEffect } from "react";
// import CookieConsent from "../components/CookieConsent"; 
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/root";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./app.css";

const SITE_NAME = "Invorious";
const SITE_DESCRIPTION = "Sydney's Senior-Only Software Agency. Tailored Web2 and Web3 solutions.";
const THEME_COLOR = "#030712";

export const meta: Route.MetaFunction = () => {
  const title = SITE_NAME;
  const description = SITE_DESCRIPTION;
  const ogImage = "/og-image.svg";

  return [
    { title },
    { name: "description", content: description },
    { name: "theme-color", content: THEME_COLOR },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { name: "apple-mobile-web-app-title", content: SITE_NAME },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "mobile-web-app-capable", content: "yes" },
  ];
};

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://api.fontshare.com/v2/css?f[]=general-sans@700,600,500,400&f[]=satoshi@700,500,400&display=swap",
  },
  // ✅ Favicon links
  { rel: "icon", href: "/favicon.ico" },  // For legacy browsers
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon-180x180.png" }, 
  { rel: "manifest", href: "/manifest.webmanifest" },
  { rel: "mask-icon", href: "/maskable-icon.svg", color: THEME_COLOR },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Force a delay so you can SEE the loading state
  useLayoutEffect(() => {
    setIsHydrated(true);
    
    // Add a slight delay to ensure smooth transition
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const isLoading = navigation.state === "loading";

  // Reusable Loading Screen Component (Perfect Square Rotating Box)
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-[#030712] z-50 flex flex-col items-center justify-center">
      
      {/* Perfect Square Rotating Container (Reduced Size) */}
      <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
        {/* The spinning perfect square */}
        <div className="absolute inset-0 border-2 border-cyan-400/10 border-t-cyan-400 border-l-cyan-400 rounded-none animate-spin shadow-[0_0_20px_rgba(34,211,238,0.2)]"></div>
        
        {/* Center Logo (Larger, Tighter Fit) */}
        <div className="relative z-10 w-16 h-16 bg-[#030712] flex items-center justify-center">
          <img
            src="/favicon.ico"
            alt="Invorious Logo"
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
        Initializing Invorious...
      </p>
    </div>
  );

  // Show loading screen during hydration or before content is ready
  if (!isHydrated || !showContent) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="view-transition" content="same-origin" />
          <Meta />
          <Links />
        </head>
        <body className="bg-[#030712] text-white">
          <LoadingScreen />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="view-transition" content="same-origin" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#030712] text-white selection:bg-blue-600 selection:text-white">
        <div className="min-h-screen flex flex-col">
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </>
          )}
        </div>
        {/* ✅ Cookie Consent - Appears after homepage is fully loaded */}
        {/* <CookieConsent /> */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center px-6 pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
          {message}
        </h1>
        
        <p className="text-lg text-gray-400 font-light max-w-md mx-auto">
          {details}
        </p>
        
        <div className="pt-6">
          <a
            href="/"
            className="group relative inline-flex px-8 py-4 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest transition-all items-center justify-center overflow-hidden rounded-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
            <span className="relative z-10">Return to Base</span>
          </a>
        </div>

        {stack && import.meta.env.DEV && (
          <div className="mt-12 w-full text-left">
            <p className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">Stack Trace:</p>
            <pre className="w-full p-6 overflow-x-auto bg-[#050A14] border border-white/10 rounded-sm">
              <code className="text-xs text-cyan-400 font-mono">{stack}</code>
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}