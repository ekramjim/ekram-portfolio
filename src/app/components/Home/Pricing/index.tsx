"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeInView from "@/app/components/Common/FadeInView";


const plans = [
  {
    title: "Monthly Instalments",
    icon: "ph:calendar-dots",
    description:
      "Pay for your project progressively on a monthly basis. Spread the cost over a timeline that works for your budget.",
    features: [
      "Fixed monthly payment schedule",
      "Full project scoped upfront",
      "Work begins immediately",
      "No large upfront commitment",
    ],
    price: null,
  },
  {
    title: "Subscription",
    icon: "ph:arrows-clockwise",
    description:
      "Ongoing access to our team for continuous development, maintenance, and improvements at a flat monthly rate.",
    features: [
      "Dedicated team hours per month",
      "Rolling feature development",
      "Priority support & fixes",
      "Cancel or pause anytime",
    ],
    price: null,
  },
  {
    title: "Milestone Basis",
    icon: "ph:flag-pennant",
    description:
      "Pay at agreed project milestones. Each payment is tied to a deliverable so you only pay when work is done.",
    features: [
      "Clear deliverables per milestone",
      "Payment tied to progress",
      "Full transparency at every stage",
      "Ideal for larger projects",
    ],
    price: null,
  },
  {
    title: "Hourly Rate",
    icon: "ph:clock",
    description:
      "Need something small done fast? Book us by the hour, ideal for quick fixes, consultations, or one-off tasks.",
    features: [
      "No minimum commitment",
      "Pay only for hours used",
      "Ideal for quick tasks & fixes",
      "Book as little as 1 hour",
    ],
    price: "$50 AUD / hr",
  },
];

const startupSteps = [
  {
    label: "Mind Meld",
    desc: "We run a structured onboarding to get deep into your product, industry and users. This gives us the context to understand your goals and deliver meaningful value from day one.",
  },
  {
    label: "Weekly Jam",
    desc: "We run weekly sessions, in-person where location allows, to go through design feedback, align on priorities and brief new work.",
  },
  {
    label: "Brainstorming",
    desc: "The messy middle of any project needs more than a weekly touchpoint. We jump on Slack huddles and ad-hoc calls throughout the week to stay unblocked and in context.",
  },
  {
    label: "Wireframes",
    desc: "We pull from your brief, existing user research and competitor analysis to map out product direction. Expect options, not just one answer.",
  },
  {
    label: "User Interviews",
    desc: "We speak directly with your users or help you run sessions so every design decision is grounded in real behaviour, not assumptions.",
  },
  {
    label: "Competitor Analysis",
    desc: "We map the landscape across your direct and adjacent competitors to find the gaps and inform where your product can stand out.",
  },
  {
    label: "High Fidelity",
    desc: "We bring designs to life from wireframes using consistent design system components and end-to-end annotated flows built for clean engineer handoff.",
  },
  {
    label: "Prototypes",
    desc: "We add interactivity to lo-fi or hi-fi designs so you can test decisions with real users before a line of code is written.",
  },
  {
    label: "Coding",
    desc: "Clean, well-structured code that matches the designs exactly. We work closely with your engineers or handle it end-to-end.",
  },
  {
    label: "Production",
    desc: "Shipped, tested and live. We stay close through launch to catch anything and make sure nothing falls through the cracks.",
  },
];

const scaleupsSteps = [
  {
    label: "Rituals",
    desc: "We embed into your team's existing ceremonies, standups, planning and retros, so we're aligned without adding overhead.",
  },
  {
    label: "Wireframes",
    desc: "Rapid structural layouts mapped to your roadmap priorities. Built to get stakeholder sign-off fast before full design investment.",
  },
  {
    label: "Design System",
    desc: "Scalable component libraries, token systems and documentation that keep your product consistent as the team and surface area grows.",
  },
  {
    label: "High Fidelity",
    desc: "Production-ready designs across every surface, built on your existing system and reviewed against your engineering constraints.",
  },
  {
    label: "Prototypes",
    desc: "High-fidelity interactive prototypes for stakeholder reviews, investor demos and usability testing at scale.",
  },
  {
    label: "Coding",
    desc: "Senior engineers shipping alongside your team, fitting your stack, your standards and your pace.",
  },
  {
    label: "Production",
    desc: "Continuous delivery with no drop in quality. We hold a high bar regardless of volume or velocity.",
  },
];

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<"startups" | "scaleups">("scaleups");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="overflow-hidden py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <FadeInView>
          <p className="text-sm font-bold mb-4 tracking-[0.3em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] flex items-center gap-3">
            <span className="w-8 h-[2px] bg-brand" />
            Pricing
          </p>
          <h2 className="text-[var(--text-heading)] max-w-2xl mb-16">
            Flexible ways to work with us.
          </h2>
        </FadeInView>

        <div
          className="flex gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {plans.map((plan, index) => {
            const isHourly = plan.price !== null;
            const isHov = hoveredCard === index;
            return (
              <FadeInView key={plan.title} delay={index * 0.1}>
                <motion.div
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  animate={{ x: isHov ? -4 : 0, y: isHov ? -4 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="p-5 flex flex-col justify-between h-full min-w-[78vw] sm:min-w-0 border-2 bg-[var(--bg-card)]"
                  style={{
                    scrollSnapAlign: "start",
                    minHeight: "20rem",
                    borderRadius: "4px",
                    borderColor: isHov ? "#FF6600" : "var(--border-primary)",
                    boxShadow: isHov ? "6px 6px 0px #FF6600" : "none",
                    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  <div>
                    <div className="w-10 h-10 flex items-center justify-center mb-5 text-[#FF6600] border-2 border-[#FF6600]" style={{ borderRadius: "4px" }}>
                      <Icon icon={plan.icon} className="text-xl" />
                    </div>

                    <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2 text-[var(--text-muted)] font-[family-name:var(--font-space-mono)]">
                      {plan.title}
                    </p>

                    {isHourly && (
                      <p className="text-base font-bold text-[#FF6600] mb-2 tracking-wide font-[family-name:var(--font-space-mono)]">
                        {plan.price}
                      </p>
                    )}

                    <p className="text-sm leading-relaxed mb-5 text-[var(--text-body)]">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2 mb-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Icon icon="ph:check-circle-fill" className="text-base mt-0.5 shrink-0 text-[#FF6600]" />
                        <span className="text-[var(--text-body)]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Enquire button */}
                  <Link href="#joinus">
                    <button className="group flex items-center overflow-hidden rounded-full border border-[var(--border-primary)] bg-[var(--bg-primary)] hover:bg-brand transition-colors duration-200 cursor-pointer">
                      <div className="flex items-center justify-center m-1.5 w-8 h-8 rounded-full shrink-0 bg-brand group-hover:bg-white transition-colors duration-200">
                        <Icon icon="ph:chat-circle-dots-fill" className="text-white group-hover:text-[#FF6600] text-base transition-transform duration-300 group-hover:scale-125 group-active:scale-90" />
                      </div>
                      <div className="pr-4 pl-2.5 text-base font-medium text-[var(--text-heading)] group-hover:text-white transition-colors duration-200">
                        Enquire
                      </div>
                    </button>
                  </Link>
                </motion.div>
              </FadeInView>
            );
          })}
        </div>

        <FadeInView delay={0.5}>
          <div className="mt-10 flex items-center justify-center gap-2.5">
            <Icon icon="ph:seal-check-fill" className="text-2xl text-[#FF6600]" />
            <p className="text-base font-normal text-[var(--text-body)]">
              No hidden costs. No surprise invoices. What we quote is what you pay.
            </p>
          </div>
        </FadeInView>

        {/* Tabs */}
        <FadeInView delay={0.6}>
          <div className="mt-16">
            {/* Tab buttons — folder-tab style, open into the content box */}
            <div className="flex items-end">
              {(["scaleups", "startups"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative px-4 sm:px-8 py-3 sm:py-5 text-2xl sm:text-4xl lg:text-[48px] font-normal cursor-pointer transition-colors duration-200 border-t border-l border-r"
                    style={{
                      lineHeight: 1.1,
                      borderRadius: "4px 4px 0 0",
                      backgroundColor: isActive ? "var(--bg-secondary)" : "var(--bg-tertiary)",
                      borderColor: "var(--border-primary)",
                      color: isActive ? "var(--text-heading)" : "var(--text-faint)",
                      marginBottom: isActive ? "-1px" : "0",
                      zIndex: isActive ? 1 : 0,
                    }}
                  >
                    {tab === "startups" ? "Startups" : "Scale-ups"}
                    {isActive && (
                      <motion.div
                        layoutId="tab-top-bar"
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{ backgroundColor: "#FF6600", borderRadius: "4px 4px 0 0" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content box - shares border with active tab */}
            <div
              className="border rounded-tl-none"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-primary)", borderRadius: "0 4px 4px 4px" }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="p-4 sm:p-10"
                >
                  {activeTab === "startups" ? (
                    <div>
                      <div className="mb-10">
                        <p className="uppercase tracking-[0.3em] mb-4 text-[#FF6600] text-sm sm:text-base font-bold font-[family-name:var(--font-space-mono)]">Who this is for</p>
                        <p className="text-2xl font-normal text-[var(--text-heading)] max-w-5xl leading-snug">
                          You've raised $2–20m. You need a design and engineering team that ships fast, asks the right questions, and won't slow you down.
                        </p>
                        <p className="text-2xl font-normal text-[var(--text-heading)] max-w-2xl leading-snug mt-4">
                          You'll be working with Monash University graduates.
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <tbody>
                            {startupSteps.map((step, i) => (
                              <tr
                                key={step.label}
                                style={
                                  i < startupSteps.length - 1
                                    ? { borderBottom: "1px solid rgba(0,0,0,0.08)" }
                                    : undefined
                                }
                              >
                                <td className="py-3 sm:py-6 pr-4 sm:pr-12 font-normal text-[var(--text-heading)] align-top text-lg sm:text-2xl lg:text-[32px]" style={{ lineHeight: 1.2 }}>{step.label}</td>
                                <td className="py-3 sm:py-6 text-[var(--text-body)] leading-relaxed align-top text-sm sm:text-base lg:text-[20px]">{step.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-10">
                        <p className="uppercase tracking-[0.3em] mb-4 text-[#FF6600] text-sm sm:text-base font-bold font-[family-name:var(--font-space-mono)]">Who this is for</p>
                        <p className="text-2xl font-normal text-[var(--text-heading)] max-w-5xl leading-snug">
                          You've raised $50m+. You need a senior design and engineering team embedded in your product org to keep your roadmap moving at pace.
                        </p>
                        <p className="text-2xl font-normal text-[var(--text-heading)] max-w-2xl leading-snug mt-4">
                          You'll be working with Monash University graduates.
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <tbody>
                            {scaleupsSteps.map((step, i) => (
                              <tr
                                key={step.label}
                                style={
                                  i < scaleupsSteps.length - 1
                                    ? { borderBottom: "1px solid rgba(0,0,0,0.08)" }
                                    : undefined
                                }
                              >
                                <td className="py-3 sm:py-6 pr-4 sm:pr-12 font-normal text-[var(--text-heading)] align-top text-lg sm:text-2xl lg:text-[32px]" style={{ lineHeight: 1.2 }}>{step.label}</td>
                                <td className="py-3 sm:py-6 text-[var(--text-body)] leading-relaxed align-top text-sm sm:text-base lg:text-[20px]">{step.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeInView>

        {/* Dark CTA card */}
        <FadeInView delay={0.3}>
          <div className="mt-16 bg-[#0a0a0a] border-2 border-[#FF6600] px-6 sm:px-12 py-8 sm:py-12" style={{ borderRadius: "4px" }}>

            {/* Header */}
            <p className="text-2xl sm:text-4xl md:text-5xl font-normal leading-tight mb-10 sm:mb-20 text-white">
              Don't slow down your progress to hire,<br />Keep work going.
            </p>

            {/* WITH LYNKSPHERE + 4 bars */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-2">
              <span className="text-sm sm:text-base font-bold whitespace-nowrap sm:w-40 text-[#FF6600] font-[family-name:var(--font-space-mono)]">WITH LYNKSPHERE</span>
              <div className="flex gap-1.5 flex-1 sm:max-w-2xl">
                {[
                  { label: "DESIGN", flex: 20 },
                  { label: "CODE", flex: 60 },
                  { label: "TEST", flex: 10 },
                  { label: "LAUNCH", flex: 10 },
                ].map(({ label, flex }) => (
                  <div key={label} className="bg-brand px-1.5 sm:px-4 py-1.5 flex items-center min-w-0" style={{ flex, borderRadius: "2px" }}>
                    <span className="text-white text-[10px] sm:text-base font-bold truncate font-[family-name:var(--font-space-mono)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* IN-HOUSE + HIRING bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-4 sm:mt-6">
              <span className="text-sm sm:text-base font-bold whitespace-nowrap sm:w-40 text-[#888888] font-[family-name:var(--font-space-mono)]">IN-HOUSE</span>
              <div className="flex-1 sm:max-w-2xl">
                <div className="bg-[#1a1a1a] border border-[#333333] px-4 py-1.5 flex items-center" style={{ borderRadius: "2px" }}>
                  <span className="text-[#888888] text-sm sm:text-base font-bold font-[family-name:var(--font-space-mono)]">HIRING</span>
                </div>
              </div>
            </div>

          </div>
        </FadeInView>
      </div>
    </section>
  );
};

export default Pricing;
