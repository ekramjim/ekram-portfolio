"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import TerminalButton from "@/components/ui/TerminalButton";

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
  { icon: "ion:logo-linkedin", href: "https://www.linkedin.com/in/ekram02", label: "LinkedIn" },
  { icon: "ion:mail", href: "mailto:ekramjim002@gmail.com", label: "Email" },
];

const dividerBlocks = Array.from({ length: 48 }, (_, index) => (
  <span key={index}>▓▓▓░░░</span>
));

const Footer = () => {
  return (
    <div className="relative" id="first-section">
      <section className="bg-[#0d0d0d] px-4 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-[#242424] bg-[#111111] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF6600]">
              <span className="h-[2px] w-3 bg-[#FF6600]" />
              Curriculum Vitae
            </p>
            <h3 className="font-[family-name:var(--font-space-mono)] text-xl font-bold text-white">
              Download my technical CV
            </h3>
          </div>
          <TerminalButton
            cmd="./download-cv.sh"
            href="/cv/ekram-tech-cv.pdf"
            download
          />
        </div>
      </section>

      <div className="w-full overflow-hidden border-y border-[#FF6600] bg-[#0a0a0a] py-2 text-[#FF6600]">
        <div className="flex w-max animate-footer-marquee whitespace-nowrap font-[family-name:var(--font-space-mono)] text-xs tracking-[0.35em]">
          <div className="flex">{dividerBlocks}</div>
          <div className="flex" aria-hidden="true">
            {dividerBlocks}
          </div>
        </div>
      </div>

      {/* Footer content */}
      <footer className="bg-[#0a0a0a] relative overflow-hidden">
        {/* Decorative circuit lines */}
        <svg className="absolute inset-0 hidden w-full h-full pointer-events-none opacity-5 md:block" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M0 100 L200 100 L200 200 L500 200 L500 50 L800 50 L800 300 L1200 300" stroke="#FF6600" strokeWidth="1" />
          <path d="M0 300 L150 300 L150 150 L400 150 L400 350 L1200 350" stroke="#FF6600" strokeWidth="1" />
        </svg>

        <div className="relative container mx-auto max-w-7xl px-4 pt-16 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8">
            {/* Brand column */}
            <div className="lg:col-span-5">
              <h4 className="text-white font-[family-name:var(--font-space-mono)] font-bold text-2xl mb-1">
                EKRAM<span className="text-[#FF6600]">.</span>
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
                &copy; 2026 Ekram
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
