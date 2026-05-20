import TerminalCursor from "./TerminalCursor";

interface Props {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  showCursor?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { prompt: "text-[13px]", text: "text-[12px]" },
  md: { prompt: "text-[16px]", text: "text-[14px]" },
  lg: { prompt: "text-[22px]", text: "text-[2rem] sm:text-[2.6rem] tracking-tight" },
};

export default function TerminalPromptLine({ children, size = "md", showCursor = false, className = "" }: Props) {
  const { prompt, text } = sizeMap[size];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className={`text-[#FF6600] leading-none select-none ${prompt}`}>❯</span>
      {children && (
        <span className={`text-[#d0d0d0] leading-none ${text}`}>{children}</span>
      )}
      {showCursor && <TerminalCursor className={`leading-none ${text}`} />}
    </div>
  );
}
