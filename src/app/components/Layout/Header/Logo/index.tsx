import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-normal text-black"
    >
      <span className="font-[family-name:var(--font-space-mono)] font-bold tracking-tight text-[#f5f5f5]">
        EKRAMUL<span className="text-[#FF6600]">.</span>
      </span>
    </Link>
  );
};

export default Logo;
