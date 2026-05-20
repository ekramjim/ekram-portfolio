import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Ekram",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]">
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M0 120 L180 120 L180 300 L420 300 L420 180 L640 180 L640 520 L920 520 L920 360 L1200 360"
          stroke="#FF6600"
          strokeWidth="1"
          strokeOpacity="0.08"
        />
        <path
          d="M160 0 L160 700 M520 0 L520 700 M900 0 L900 700"
          stroke="#FF6600"
          strokeWidth="0.5"
          strokeOpacity="0.04"
        />
      </svg>

      <section className="relative z-10 flex min-h-screen items-center px-6 py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF6600] font-[family-name:var(--font-space-mono)]">
              <span className="h-[2px] w-6 bg-[#FF6600]" />
              404
            </p>
            <h1 className="mb-6 text-5xl font-normal leading-tight text-[var(--text-heading)] sm:text-7xl">
              Page not found
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--text-body)] sm:text-lg">
              The route you requested does not exist, moved, or was never shipped.
            </p>
          </div>

          <div className="border border-[#1e1e1e] bg-[#0d0d0d]" style={{ borderRadius: 6 }}>
            <div className="flex items-center gap-2 border-b border-[#191919] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#FF6600]" />
              <span className="h-3 w-3 rounded-full bg-[#222]" />
              <span className="h-3 w-3 rounded-full bg-[#222]" />
              <span className="ml-3 text-[9px] uppercase tracking-[0.35em] text-[#666] font-[family-name:var(--font-space-mono)]">
                zsh - route@portfolio ~ 404
              </span>
            </div>

            <div className="p-5 font-[family-name:var(--font-space-mono)] sm:p-6">
              <div className="mb-5 space-y-2 text-[12px] leading-relaxed sm:text-[13px]">
                <p>
                  <span className="text-[#FF6600]">status</span>
                  <span className="mx-2 text-[#333]">~</span>
                  <span className="text-[#a0a0a0]">404</span>
                </p>
                <p>
                  <span className="text-[#FF6600]">error</span>
                  <span className="mx-2 text-[#333]">~</span>
                  <span className="text-[#a0a0a0]">route_not_found</span>
                </p>
                <p>
                  <span className="text-[#FF6600]">next</span>
                  <span className="mx-2 text-[#333]">~</span>
                  <span className="text-[#a0a0a0]">return_home_or_view_projects</span>
                </p>
              </div>

              <div className="mb-6 h-px bg-[#1e1e1e]" />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="flex items-center justify-between gap-4 border border-[#FF6600] bg-[#0f0f0f] px-4 py-2.5 text-[13px] text-[#f0f0f0] transition-colors duration-200 hover:text-[#FF6600] font-[family-name:var(--font-space-mono)]"
                  style={{ borderRadius: 4 }}
                >
                  <span>
                    <span className="text-[#FF6600]">❯</span> cd /
                  </span>
                  <span className="text-[10px] tracking-widest text-[#FF6600]">HOME</span>
                </Link>
                <Link
                  href="/#Projects"
                  className="flex items-center justify-between gap-4 border border-[#1e1e1e] bg-[#0f0f0f] px-4 py-2.5 text-[13px] text-[#c0c0c0] transition-colors duration-200 hover:border-[#FF6600] hover:text-[#FF6600] font-[family-name:var(--font-space-mono)]"
                  style={{ borderRadius: 4 }}
                >
                  <span>
                    <span className="text-[#FF6600]">❯</span> open projects
                  </span>
                  <span className="text-[10px] tracking-widest text-[#333]">↵</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
