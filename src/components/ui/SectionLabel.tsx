interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: Props) {
  return (
    <p className={`inline-flex items-center gap-2 px-3 py-1 mb-6 font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-[0.3em] uppercase text-[#f0f0f0] ${className}`}>
      <span className="text-[#FF6600] text-[11px] leading-none">❯</span>
      {children}
    </p>
  );
}
