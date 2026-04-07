"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

const navLinks = [
  { label: "About", href: "/#About" },
  { label: "Skills", href: "/#Skills" },
  { label: "Experience", href: "/#Experience" },
  { label: "Projects", href: "/#Projects" },
  { label: "Education", href: "/#Education" },
  { label: "Leadership", href: "/#Leadership" },
  { label: "Contact", href: "/#Contact" },
];

const socials = [
  { icon: "ion:logo-github", href: "https://github.com", label: "GitHub" },
  { icon: "ion:logo-linkedin", href: "https://linkedin.com", label: "LinkedIn" },
  { icon: "ion:mail", href: "mailto:ekramjim002@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <div className="relative" id="first-section">
      {/* Animated Wave at the top */}
      <div className="relative w-full overflow-hidden">
        <svg
          className="relative w-full h-32 md:h-40"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="waves">
            <use xlinkHref="#gentle-wave" x="48" y="0" style={{ fill: "rgba(255, 102, 0, 0.12)", animation: "wave1 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite" }} />
            <use xlinkHref="#gentle-wave" x="48" y="2" style={{ fill: "rgba(255, 102, 0, 0.2)", animation: "wave2 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite" }} />
            <use xlinkHref="#gentle-wave" x="48" y="4" style={{ fill: "rgba(255, 102, 0, 0.35)", animation: "wave3 6s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.25s infinite" }} />
            <use xlinkHref="#gentle-wave" x="48" y="6" style={{ fill: "rgba(10, 10, 10, 0.7)", animation: "wave4 9s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.375s infinite" }} />
            <use xlinkHref="#gentle-wave" x="48" y="8" style={{ fill: "#0a0a0a", animation: "wave5 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.5s infinite" }} />
          </g>
        </svg>

        <style jsx>{`
          @keyframes wave1 { 0% { transform: translateX(0); } 50% { transform: translateX(-25%); } 100% { transform: translateX(0); } }
          @keyframes wave2 { 0% { transform: translateX(0); } 50% { transform: translateX(-15%); } 100% { transform: translateX(0); } }
          @keyframes wave3 { 0% { transform: translateX(0); } 50% { transform: translateX(-30%); } 100% { transform: translateX(0); } }
          @keyframes wave4 { 0% { transform: translateX(0); } 50% { transform: translateX(-20%); } 100% { transform: translateX(0); } }
          @keyframes wave5 { 0% { transform: translateX(0); } 50% { transform: translateX(-10%); } 100% { transform: translateX(0); } }
        `}</style>
      </div>

      {/* Footer content */}
      <footer className="bg-[#0a0a0a] border-t-4 border-[#FF6600] relative overflow-hidden">
        {/* Decorative circuit lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M0 100 L200 100 L200 200 L500 200 L500 50 L800 50 L800 300 L1200 300" stroke="#FF6600" strokeWidth="1" />
          <path d="M0 300 L150 300 L150 150 L400 150 L400 350 L1200 350" stroke="#FF6600" strokeWidth="1" />
        </svg>

        <div className="relative container mx-auto max-w-7xl px-4 pt-16 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8">
            {/* Brand column */}
            <div className="lg:col-span-5">
              <h4 className="text-white font-[family-name:var(--font-space-mono)] font-bold text-2xl mb-1">
                EKRAMUL<span className="text-[#FF6600]">.</span>
              </h4>
              <p className="text-[#888888] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-4">
                Melbourne, Australia
              </p>
              <p className="text-[#888888] text-sm font-[family-name:var(--font-space-mono)] leading-relaxed mb-8 max-w-xs">
                Co-Founder & CEO of LynkSphere. CS Graduate from Monash University specialising in Data Science & Full-Stack Development.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <Link
                    key={s.icon}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-[#888888] hover:border-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all duration-200"
                  >
                    <Icon icon={s.icon} width="16" height="16" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="hidden lg:block lg:col-span-2" />

            {/* Nav links */}
            <div className="lg:col-span-5">
              <p className="text-[10px] font-bold tracking-[0.4em] text-[#FF6600] uppercase font-[family-name:var(--font-space-mono)] mb-6 flex items-center gap-2">
                <span className="w-3 h-[2px] bg-[#FF6600]" />
                Navigation
              </p>
              <div className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[#888888] text-sm font-[family-name:var(--font-space-mono)] hover:text-[#FF6600] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Email CTA */}
          <div className="mt-12 pt-8 border-t border-[#1a1a1a]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.4em] text-[#555555] uppercase font-[family-name:var(--font-space-mono)] mb-1">Open for work & collaboration</p>
                <a
                  href="mailto:ekramjim002@gmail.com"
                  className="text-[#888888] text-sm font-[family-name:var(--font-space-mono)] hover:text-[#FF6600] transition-colors duration-200"
                >
                  ekramjim002@gmail.com
                </a>
              </div>
              <p className="text-[#333333] text-[10px] font-[family-name:var(--font-space-mono)] uppercase tracking-[0.3em]">
                &copy; 2026 Ekramul Islam
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
