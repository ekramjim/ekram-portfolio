"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HeaderItem } from "@/app/types/menu";
import Logo from "./Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import { Icon } from "@iconify/react";
import { scrollToHash } from "./navUtils";
import TerminalButton from "@/components/ui/TerminalButton";
import { AnimatePresence, motion } from "framer-motion";

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const intersectingRef = useRef<Set<number>>(new Set());
  const pillRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollable = document.body.scrollHeight - window.innerHeight;
    setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
  };

  const scrollToContact = () => {
    if (isHomePage) {
      document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#Contact");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (pillRef.current && !pillRef.current.contains(event.target as Node) && navbarOpen) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const headerData: HeaderItem[] = [
    { label: "About", href: isHomePage ? "#About" : "/#About" },
    { label: "Skills", href: isHomePage ? "#Skills" : "/#Skills" },
    { label: "Projects", href: isHomePage ? "#Projects" : "/#Projects" },
    { label: "Leadership", href: isHomePage ? "#Leadership" : "/#Leadership" },
    { label: "Experience", href: isHomePage ? "#Experience" : "/#Experience" },
    { label: "Contact", href: isHomePage ? "#Contact" : "/#Contact" },
  ];

  useEffect(() => {
    if (!isHomePage) {
      setActiveSectionIndex(null);
      return;
    }

    const hashToIndex = new Map<string, number>();
    headerData.forEach((item, index) => {
      const hash = item.href.split("#")[1];
      if (hash) hashToIndex.set(hash, index);
    });

    observerRef.current?.disconnect();
    intersectingRef.current.clear();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const hash = entry.target.id;
          const index = hashToIndex.get(hash);
          if (index === undefined) return;
          if (entry.isIntersecting) intersectingRef.current.add(index);
          else intersectingRef.current.delete(index);
        });
        if (intersectingRef.current.size === 0) setActiveSectionIndex(null);
        else setActiveSectionIndex(Math.min(...intersectingRef.current));
      },
      { root: null, threshold: 0, rootMargin: "0px 0px -50% 0px" },
    );

    headerData.forEach((item) => {
      const hash = item.href.split("#")[1];
      if (hash) {
        const el = document.getElementById(hash);
        if (el) observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [isHomePage, headerData]);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const timeout = setTimeout(() => scrollToHash(id), 50);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent z-50">
        <div
          className="h-full bg-[#FF6600] transition-none"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <div
        ref={pillRef}
        className="pointer-events-auto mx-4 mt-4 lg:mt-5 lg:mx-auto max-w-7xl bg-[#0d0d0d]/95 backdrop-blur-xl border border-[#1e1e1e] rounded-xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <Logo />

          <nav className="hidden lg:flex items-center gap-0">
            {headerData.map((item, index) => (
              <HeaderLink
                key={index}
                item={item}
                index={index}
                activeSectionIndex={activeSectionIndex}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <TerminalButton cmd="./contact.sh" onClick={scrollToContact} compact />
            </div>

            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <Icon
                icon={navbarOpen ? "ph:x" : "ph:list"}
                className="text-2xl text-white"
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown — expands from the pill */}
        <AnimatePresence>
          {navbarOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 flex flex-col gap-1 border-t border-[#1e1e1e]">
                {headerData.map((item, index) => (
                  <MobileHeaderLink
                    key={index}
                    item={item}
                    onLinkClick={() => setNavbarOpen(false)}
                  />
                ))}
                <div className="mt-3">
                  <TerminalButton cmd="./contact.sh" onClick={() => { setNavbarOpen(false); setTimeout(scrollToContact, 300); }} compact />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
