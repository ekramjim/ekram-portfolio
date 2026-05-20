interface Props {
  className?: string;
}

export default function TerminalCursor({ className = "" }: Props) {
  return (
    <span className={`animate-blink text-[#FF6600] select-none ${className}`}>|</span>
  );
}
