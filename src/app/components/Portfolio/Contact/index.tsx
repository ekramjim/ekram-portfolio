"use client";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";
import TerminalButton from "@/components/ui/TerminalButton";
import TerminalFrame from "@/components/ui/TerminalFrame";
import type { FormEvent } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const contacts = [
  {
    label: "Email",
    value: "ekramjim002@gmail.com",
    href: "mailto:ekramjim002@gmail.com",
    icon: (
      <Icon icon="ion:mail-outline" width="20" height="20" />
    ),
  },
  {
    label: "GitHub",
    value: "github.com/ekramjim002",
    href: "https://github.com/ekramjim002",
    icon: (
      <Icon icon="ion:logo-github" width="20" height="20" />
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ekram02",
    href: "https://www.linkedin.com/in/ekram02",
    icon: (
      <Icon icon="ion:logo-linkedin" width="20" height="20" />
    ),
  },
  {
    label: "Company",
    value: "lynksphere.com",
    href: "https://lynksphere.com",
    icon: (
      <Image
        src="/images/lynksphereLogo/lsLogoDark.png"
        alt=""
        width={22}
        height={22}
        className="h-5 w-5 object-contain"
      />
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
            <TerminalFrame title="zsh — ekram@portfolio ~ socials">
              <div className="grid grid-cols-1 gap-3 p-5">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-3 border border-[#1e1e1e] bg-[#0d0d0d] px-3 py-3 transition-colors duration-200 hover:border-[#FF6600]"
                    style={{ borderRadius: 4 }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#242424] bg-[#161616] text-[#FF6600] transition-colors duration-200 group-hover:border-[#FF6600]">
                      {contact.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-[family-name:var(--font-space-mono)] text-[10px] font-bold uppercase tracking-[0.25em] text-[#666666]">
                        {contact.label}
                      </span>
                      <span className="block truncate font-[family-name:var(--font-space-mono)] text-xs text-[#aaaaaa] transition-colors duration-200 group-hover:text-white">
                        {contact.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </TerminalFrame>
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
