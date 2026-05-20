"use client";
import { useState } from "react";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";
import { useMobileScrollActive } from "@/app/hooks/useMobileScrollActive";
import TerminalButton from "@/components/ui/TerminalButton";
import type { FormEvent } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending contact message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="Contact" className="relative py-24 overflow-hidden">
      <svg className="absolute inset-0 hidden w-full h-full pointer-events-none md:block" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <AnimatedPath d="M600 0 L600 100 L400 100 L400 300 L700 300 L700 500 L600 500 L600 600" stroke="#FF6600" strokeWidth={1} opacity={0.25} dashed />
        <AnimatedPath d="M0 400 L150 400 L150 200 L350 200" stroke="#FF6600" strokeWidth={1} opacity={0.22} dashed />
        <AnimatedPath d="M1200 200 L1050 200 L1050 400 L900 400" stroke="#FF6600" strokeWidth={1} opacity={0.22} dashed />
        <AnimatedPath d="M0 150 L250 150 L250 350 L450 350 L450 150 L700 150" stroke="#FF6600" strokeWidth={1} opacity={0.15} dashed />
        <AnimatedPath d="M1200 450 L950 450 L950 250 L750 250 L750 500 L500 500" stroke="#FF6600" strokeWidth={1} opacity={0.15} dashed />
        <AnimatedPath d="M200 0 L200 100 L500 100 L500 0" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
        <AnimatedPath d="M700 600 L700 500 L1000 500 L1000 600" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          {/* Left: CTA */}
          <FadeInView>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-6 leading-tight">
              Let&apos;s have a chat
            </h2>
            <p className="text-[var(--text-body)] text-lg leading-relaxed mb-10">
              Open to collaborations, freelance projects, internships, and full-time opportunities.
              Whether you have a project idea or just want to say hello, I&apos;d love to hear from you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contacts.map((c, i) => (
                <ContactCard key={c.label} contact={c} index={i} />
              ))}
            </div>
          </FadeInView>

          <FadeInView delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="border-2 border-[var(--border-primary)] bg-[var(--bg-card)] p-5 sm:p-6 relative overflow-hidden"
              style={{ borderRadius: 4 }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF6600]" />
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--border-primary)] pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-2">
                    Send Message
                  </p>
                  <p className="text-sm text-[var(--text-body)]">
                    This goes straight to my email.
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#666666] font-[family-name:var(--font-space-mono)]">
                  ./contact.sh
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] font-[family-name:var(--font-space-mono)] mb-2">
                    Name
                  </span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    required
                    className="w-full border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-3 text-sm text-[var(--text-heading)] outline-none transition-colors duration-200 focus:border-[#FF6600]"
                    style={{ borderRadius: 4 }}
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] font-[family-name:var(--font-space-mono)] mb-2">
                    Email
                  </span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    required
                    className="w-full border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-3 text-sm text-[var(--text-heading)] outline-none transition-colors duration-200 focus:border-[#FF6600]"
                    style={{ borderRadius: 4 }}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block mb-4">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] font-[family-name:var(--font-space-mono)] mb-2">
                  Subject
                </span>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(event) => setFormData((prev) => ({ ...prev, subject: event.target.value }))}
                  className="w-full border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-3 text-sm text-[var(--text-heading)] outline-none transition-colors duration-200 focus:border-[#FF6600]"
                  style={{ borderRadius: 4 }}
                  placeholder="Optional"
                />
              </label>

              <label className="block mb-5">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] font-[family-name:var(--font-space-mono)] mb-2">
                  Message
                </span>
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  required
                  rows={7}
                  className="w-full resize-none border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 py-3 text-sm text-[var(--text-heading)] outline-none transition-colors duration-200 focus:border-[#FF6600]"
                  style={{ borderRadius: 4 }}
                  placeholder="Tell me what you want to build..."
                />
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                <TerminalButton
                  cmd={isSubmitting ? "sending..." : "./send-message.sh"}
                  type="submit"
                  disabled={isSubmitting}
                />

                {submitStatus === "success" && (
                  <p className="text-sm text-[#FF6600] font-[family-name:var(--font-space-mono)]">
                    Message sent.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-sm text-red-400 font-[family-name:var(--font-space-mono)]">
                    Failed to send. Try email instead.
                  </p>
                )}
              </div>
            </form>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ contact, index }: { contact: typeof contacts[0]; index: number }) {
  const { ref, isActive } = useMobileScrollActive<HTMLDivElement>();

  const inner = (
    <div
      ref={ref}
      className={`terminal-frame bg-[#0d0d0d] border border-[#1e1e1e] flex flex-col ${isActive ? "terminal-frame-active" : ""}`}
      style={{ borderRadius: 6 }}
    >
      {/* Chrome header — same pattern as TerminalFrame */}
      <div className="relative flex items-center gap-2 px-4 py-2 border-b border-[#2a2a2a] bg-[#161616] overflow-hidden shrink-0">
        <span className="terminal-header-fill" />
        <span className="terminal-dot-orange relative z-10 w-3 h-3 rounded-full bg-[#FF6600] opacity-75 shrink-0 transition-colors duration-500" />
        <span className="terminal-dot-grey relative z-10 w-3 h-3 rounded-full bg-[#222] shrink-0 transition-colors duration-500" />
        <span className="relative z-10 ml-3 text-[10px] uppercase tracking-[0.25em] text-[#666] font-[family-name:var(--font-space-mono)] terminal-header-title transition-all duration-500">
          {contact.label}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="text-[#555] transition-colors duration-300 group-hover:text-[#FF6600]">
          {contact.icon}
        </div>
        <p className="text-[13px] text-[#aaa] font-[family-name:var(--font-space-mono)] break-all leading-relaxed">
          {contact.value}
        </p>
        {contact.href && (
          <span className="text-[11px] text-[#FF6600] font-[family-name:var(--font-space-mono)] mt-auto opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            ↗ open
          </span>
        )}
      </div>
    </div>
  );

  return (
    <FadeInView delay={index * 0.1}>
      {contact.href ? (
        <a
          href={contact.href}
          target={contact.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="group block"
        >
          {inner}
        </a>
      ) : inner}
    </FadeInView>
  );
}
