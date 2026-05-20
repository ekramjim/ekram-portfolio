"use client";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const contacts = [
  {
    label: "Email",
    value: "ekramjim002@gmail.com",
    href: "mailto:ekramjim002@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/ekramjim002",
    href: "https://github.com/ekramjim002",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ekram02",
    href: "https://www.linkedin.com/in/ekram02",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Company",
    value: "lynksphere.com",
    href: "https://lynksphere.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="Contact" className="relative py-24 overflow-hidden">
      {/* Decorative SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <AnimatedPath
          d="M600 0 L600 100 L400 100 L400 300 L700 300 L700 500 L600 500 L600 600"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.08}
          delay={200}
          duration={3000}
        />
        <AnimatedPath
          d="M0 400 L150 400 L150 200 L350 200"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.06}
          delay={500}
          duration={2000}
        />
        <AnimatedPath
          d="M1200 200 L1050 200 L1050 400 L900 400"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.06}
          delay={400}
          duration={2200}
        />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: CTA */}
          <FadeInView>
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-4 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#FF6600]" />
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-6 leading-tight">
              Let&apos;s Build
              <br />
              Something Together
            </h2>
            <p className="text-[var(--text-body)] text-lg leading-relaxed mb-10">
              Open to collaborations, freelance projects, internships, and full-time opportunities.
              Whether you have a project idea or just want to say hello — I&apos;d love to hear from you.
            </p>

            <a
              href="mailto:ekramjim002@gmail.com"
              className="inline-flex items-center gap-3 bg-[#FF6600] text-white px-8 py-4 hover:bg-[#e55500] transition-colors duration-300 font-[family-name:var(--font-space-mono)] text-sm font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-all"
              style={{ borderRadius: 4 }}
            >
              Send a Message
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </FadeInView>

          {/* Right: Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c, i) => (
              <FadeInView key={c.label} delay={i * 0.1}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group border-2 border-[var(--border-primary)] bg-[var(--bg-card)] p-5 flex flex-col gap-3 hover:border-[#FF6600] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    style={{ borderRadius: 4 }}
                  >
                    <div className="text-[#888888] group-hover:text-[#FF6600] transition-colors duration-200">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#888888] font-[family-name:var(--font-space-mono)] mb-1">{c.label}</p>
                      <p className="text-sm text-[var(--text-body)] group-hover:text-[#FF6600] transition-colors duration-200 break-all font-[family-name:var(--font-space-mono)]">{c.value}</p>
                    </div>
                  </a>
                ) : (
                  <div
                    className="border-2 border-[var(--border-primary)] bg-[var(--bg-card)] p-5 flex flex-col gap-3"
                    style={{ borderRadius: 4 }}
                  >
                    <div className="text-[#888888]">{c.icon}</div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#888888] font-[family-name:var(--font-space-mono)] mb-1">{c.label}</p>
                      <p className="text-sm text-[var(--text-body)] font-[family-name:var(--font-space-mono)]">{c.value}</p>
                    </div>
                  </div>
                )}
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
