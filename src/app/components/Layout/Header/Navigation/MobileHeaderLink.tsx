import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderItem } from "../../../../types/menu";
import { parseHref, scrollToHash } from "../navUtils";

const MobileHeaderLink: React.FC<{
  item: HeaderItem;
  onLinkClick?: () => void;
}> = ({ item, onLinkClick }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const router = useRouter();
  const { hash: itemHash } = useMemo(() => parseHref(item.href), [item.href]);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={(e) => {
          if (item.submenu) {
            handleToggle();
          } else {
            if (itemHash) {
              e.preventDefault();
              onLinkClick?.();
              // Wait for close animation before scrolling
              setTimeout(() => {
                const scrolled = scrollToHash(itemHash);
                if (!scrolled) router.push(item.href);
              }, 300);
            } else {
              onLinkClick?.();
            }
          }
        }}
        className="flex items-center justify-between w-full py-2 text-[#aaaaaa] hover:text-white focus:outline-hidden"
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
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
      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className="block py-2 text-black hover:bg-gray-200"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
