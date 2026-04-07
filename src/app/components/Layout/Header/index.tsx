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
import { AnimatePresence, motion } from "framer-motion";

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const intersectingRef = useRef<Set<number>>(new Set());
  const pillRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
    if (window.scrollY < 80) setActiveSectionIndex(null);
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
    { label: "Experience", href: isHomePage ? "#Experience" : "/#Experience" },
    { label: "Projects", href: isHomePage ? "#Projects" : "/#Projects" },
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

  const isGlassy = sticky || navbarOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div
        ref={pillRef}
        className={`pointer-events-auto mx-auto transition-all duration-500 ease-in-out ${
          isGlassy
            ? "mt-4 mx-4 lg:mt-5 lg:mx-auto bg-[#ffb57d]/50 backdrop-blur-xl border border-[#ffb57d]/60 shadow-lg shadow-[#ffb57d]/20 rounded-3xl lg:rounded-full max-w-sm lg:max-w-3xl"
            : "max-w-7xl mt-0 bg-transparent"
        }`}
      >
        {/* Top bar */}
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isGlassy ? "px-5 py-3" : "px-6 py-6"
          }`}
        >
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
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
            <button
              className="hidden lg:block bg-black text-white text-sm font-normal px-5 py-2.5 rounded-full hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer"
              onClick={scrollToContact}
            >
              Get in Touch
            </button>

            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <Icon
                icon={navbarOpen ? "ph:x" : "ph:list"}
                className="text-2xl text-black"
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
              <div className="px-5 pb-5 pt-1 flex flex-col gap-1 border-t border-[#ffb57d]/40">
                {headerData.map((item, index) => (
                  <MobileHeaderLink
                    key={index}
                    item={item}
                    onLinkClick={() => setNavbarOpen(false)}
                  />
                ))}
                <button
                  className="group mt-3 w-fit flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white hover:bg-black transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    setNavbarOpen(false);
                    setTimeout(scrollToContact, 300);
                  }}
                >
                  <div className="flex items-center justify-center m-1.5 w-9 h-9 rounded-lg shrink-0" style={{ backgroundColor: "#ff914c" }}>
                    <Icon icon="ph:chat-circle-dots-fill" className="text-black text-base transition-transform duration-300 group-hover:scale-125 group-active:scale-90" />
                  </div>
                  <div className="pr-4 pl-2.5 text-base font-normal text-black group-hover:text-white transition-colors duration-200">
                    Get in Touch
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
