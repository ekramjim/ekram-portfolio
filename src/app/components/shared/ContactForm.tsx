"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import FadeInView from "@/app/components/Common/FadeInView";

interface ContactFormProps {
  showHeader?: boolean;
  className?: string;
}

const services = ["Web App", "Mobile App", "Website", "Others"];

const ContactForm: React.FC<ContactFormProps> = ({
  className = "",
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    services: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      alert("Please fill in your name and email");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: `Company: ${formData.company}. Services: ${formData.services.join(", ") || "Not specified"}.`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ fullName: "", company: "", email: "", services: [] });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FadeInView className={`overflow-hidden ${className}`}>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-left sm:text-center">

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 md:mb-16 text-[var(--text-heading)]">
          Let's Collaborate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
          {/* Name & Company */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-center text-lg sm:text-xl">
            <div className="flex items-baseline gap-2">
              <span className="text-[var(--text-heading)] whitespace-nowrap">My Name is</span>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="first & last name"
                className="w-32 sm:w-56 border-b-2 border-[var(--border-primary)] focus:border-[#FF6600] bg-transparent focus:outline-none text-[var(--text-body)] text-center placeholder:text-sm placeholder:text-[var(--text-faint)] placeholder:font-normal px-1 py-1 transition-colors duration-200"
                required
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[var(--text-heading)] whitespace-nowrap">From</span>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                placeholder="company name"
                className="w-32 sm:w-56 border-b-2 border-[var(--border-primary)] focus:border-[#FF6600] bg-transparent focus:outline-none text-[var(--text-body)] text-center placeholder:text-sm placeholder:text-[var(--text-faint)] placeholder:font-normal px-1 py-1 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-lg sm:text-xl mb-5 text-[var(--text-body)]">
              I want to have a conversation about software/design for my:
            </p>
            <div className="flex flex-wrap justify-start sm:justify-center gap-2 sm:gap-3">
              {services.map((service) => {
                const selected = formData.services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-base border-2 font-medium transition-colors duration-200 cursor-pointer ${
                      selected
                        ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                        : "text-white border-[#FF6600] bg-brand hover:bg-brand/90 hover:border-[#e55a00]"
                    }`}
                  >
                    {selected && <Icon icon="ph:sparkle-fill" className="text-[#FF6600] text-base shrink-0" />}
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-wrap items-baseline gap-2 justify-start sm:justify-center text-lg sm:text-xl">
            <span className="text-[var(--text-heading)] whitespace-nowrap">You can reach me at</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              placeholder="email address"
              className="w-36 sm:w-64 border-b-2 border-[var(--border-primary)] focus:border-[#FF6600] bg-transparent focus:outline-none text-[var(--text-body)] text-center placeholder:text-sm placeholder:text-[var(--text-faint)] placeholder:font-normal px-1 py-1 transition-colors duration-200"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center overflow-hidden rounded-full border border-[#0a0a0a] bg-[#0a0a0a] hover:bg-brand transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-center m-1.5 w-10 h-10 rounded-full shrink-0 bg-brand group-hover:bg-[#0a0a0a] transition-colors duration-200">
                <Icon icon="ph:paper-plane-right-fill" className="text-white text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-active:scale-90" />
              </div>
              <div className="pr-5 pl-3 text-lg font-medium text-white transition-colors duration-200">
                {isSubmitting ? "Sending..." : "Send"}
              </div>
            </button>
          </div>

          {submitStatus === "success" && (
            <p className="text-green-600">Message sent! We'll be in touch soon.</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-600">
              Something went wrong. Email us at{" "}
              <a href="mailto:info@lynksphere.com" className="underline">
                info@lynksphere.com
              </a>
            </p>
          )}
        </form>
      </div>
    </FadeInView>
  );
};

export default ContactForm;
