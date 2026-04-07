"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Only render theme-dependent UI after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => setTheme(isDark ? "light" : "dark");

  // Render a placeholder with the same dimensions during SSR to avoid layout shift
  if (!mounted) {
    return (
      <button
        aria-label="theme toggler"
        type="button"
        className="text-black flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5 hover:text-black cursor-pointer"
        disabled
      >
        <span className="flex items-center justify-center w-[22px] h-[22px]" />
      </button>
    );
  }

  return (
    <button
      aria-label="theme toggler"
      aria-pressed={isDark}
      type="button"
      onClick={handleToggle}
      className="text-black flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5 hover:text-black cursor-pointer"
    >
      <span className="flex items-center justify-center">
        {isDark ? (
          // Sun icon for dark mode (click to switch to light)
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-400 transition-transform duration-200"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          // Moon icon for light mode (click to switch to dark)
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black transition-transform duration-200"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggler;
