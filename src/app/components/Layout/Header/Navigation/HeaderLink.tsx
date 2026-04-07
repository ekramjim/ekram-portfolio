"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname, useRouter } from "next/navigation";
import { parseHref, scrollToHash } from "../navUtils";

const HeaderLink: React.FC<{
  item: HeaderItem;
  index: number;
  activeSectionIndex: number | null;
}> = ({ item, index, activeSectionIndex }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const pathname = usePathname() || "/";
  const router = useRouter();
  const { pathname: itemPathname, hash: itemHash } = useMemo(
    () => parseHref(item.href),
    [item.href],
  );

  // Consider the link "active" if it matches the route OR if its target section is visible
  const routeActive = pathname === itemPathname && !itemHash; // exact page match for non-hash link
  const sectionActive = activeSectionIndex === index && itemHash;
  const combinedActive = routeActive || sectionActive;

  const handleMouseEnter = () => {
    if (item.submenu) setSubmenuOpen(true);
  };
  const handleMouseLeave = () => setSubmenuOpen(false);

  const handleClick = (e: React.MouseEvent) => {
    if (itemHash) {
      e.preventDefault();
      const scrolled = scrollToHash(itemHash);
      if (!scrolled) {
        router.push(`/#${itemHash}`);
      }
    }
  };

  const baseClasses =
    "text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors duration-200 font-medium";
  const activeClasses = "bg-[#FF6600]/15 text-[#FF6600]";
  const inactiveClasses = "text-[#aaaaaa] hover:text-white hover:bg-white/5";

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`${baseClasses} ${combinedActive ? activeClasses : inactiveClasses}`}
        onClick={handleClick}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25em"
            height="1.25em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>

      {submenuOpen && (
        <div
          className="absolute py-2 left-0 mt-0.5 w-60 bg-white shadow-lg rounded-lg"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {item.submenu?.map((subItem, index) => {
            const { pathname: subPath, hash: subHash } = parseHref(
              subItem.href,
            );
            const subRouteActive = pathname === subPath && !subHash;
            // We won’t observe submenu sections here; keep route-only or extend similarly if needed
            const subIsActive = subRouteActive;

            return (
              <Link
                key={index}
                href={subItem.href}
                className={`block px-4 py-2 ${
                  subIsActive
                    ? "text-white bg-primary"
                    : "text-black hover:bg-primary"
                }`}
                onClick={(e) => {
                  if (subHash) {
                    e.preventDefault();
                    const scrolled = scrollToHash(subHash);
                    if (!scrolled) {
                      router.push(subItem.href);
                    }
                  }
                }}
              >
                {subItem.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
