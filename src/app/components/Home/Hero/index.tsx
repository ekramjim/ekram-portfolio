"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const techIcons = [
  { src: "/animation/angular.png", alt: "Angular" },
  { src: "/animation/davinci.png", alt: "DaVinci" },
  { src: "/animation/figma.svg.png", alt: "Figma" },
  { src: "/animation/flutter.png", alt: "Flutter" },
  { src: "/animation/power bi.png", alt: "Power BI" },
  { src: "/animation/python.png", alt: "Python" },
  { src: "/animation/react.png", alt: "React" },
  { src: "/animation/swift.png", alt: "Swift" },
  { src: "/animation/javascript.png", alt: "JavaScript" },
];

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [containerSize, setContainerSize] = useState(0);
  const [time, setTime] = useState(new Date());
  const animationRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);


  // Measure container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const size = Math.min(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight,
        );
        setContainerSize(size);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Cycle through expanded icons
  useEffect(() => {
    const interval = setInterval(() => {
      setExpandedIndex((prev) => (prev + 1) % techIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Update time at 60fps for smooth clock and icon orbit
  useEffect(() => {
    const animate = () => {
      setTime(new Date());
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";
  const logoSrc = isDark
    ? "/animation/logoLight.png"
    : "/animation/logoLight.png";

  // Responsive sizing based on container
  const circleRadius = containerSize * 0.38;
  const iconSize = Math.max(32, containerSize * 0.1);
  const logoSize = Math.max(80, containerSize * 0.45);

  // Rotation synced to seconds hand: one full orbit per 60 seconds
  const secRotation = (time.getSeconds() + time.getMilliseconds() / 1000) * 6;

  // Calculate position for each icon
  // Offset by half a step so the second hand always sweeps between icons
  const halfStep = 360 / techIcons.length / 2;
  const getIconPosition = (index: number) => {
    const baseAngle = (index * 360) / techIcons.length - 90 + halfStep;
    const angle = ((baseAngle + secRotation) * Math.PI) / 180;
    return {
      x: Math.cos(angle) * circleRadius,
      y: Math.sin(angle) * circleRadius,
    };
  };

  return (
    <section className="relative overflow-hidden z-1">
      <div className="container mx-auto pt-24 max-w-7xl px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div
            className="w-full lg:w-1/2 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[3px] bg-brand" />
              <span className="text-sm font-bold tracking-wider text-[#FF6600] uppercase">
                Software Company Melbourne
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight text-[var(--text-heading)]">
              Scalable software for startups<br />and growing teams
            </h1>
            <p className="block text-lg md:text-xl text-[var(--text-body)] mb-8 border-l-4 border-[#FF6600] pl-5">
              We craft technology that feels effortless, precise, and purposeful all over the world
            </p>
            <Link href={"#joinus"}>
              <button className="group flex items-center overflow-hidden rounded-full border border-[#0a0a0a] bg-[#0a0a0a] hover:bg-brand transition-colors duration-200 cursor-pointer shadow-sm">
                <div className="flex items-center justify-center m-1.5 w-10 h-10 rounded-full shrink-0 bg-brand group-hover:bg-[#0a0a0a] transition-colors duration-200">
                  <Icon icon="ph:chat-circle-dots-fill" className="text-white text-xl transition-transform duration-300 group-hover:scale-125 group-active:scale-90" />
                </div>
                <div className="pr-5 pl-3 text-lg font-medium text-white transition-colors duration-200">
                  Let's Chat
                </div>
              </button>
            </Link>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div
              ref={containerRef}
              className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-none mx-auto flex items-center justify-center"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* Central Logo - only show after container measured */}
              {/* Antigravity removed */}

              {containerSize > 0 && (() => {
                const size = Math.max(80, logoSize);
                const cx = size / 2;
                const r = size / 2 - 4;
                // Use Melbourne local time
                const melb = new Date(time.toLocaleString("en-US", { timeZone: "Australia/Melbourne" }));
                const h = melb.getHours() % 12;
                const m = melb.getMinutes();
                const s = melb.getSeconds();
                const hourDeg = (h + m / 60) * 30 - 90;
                const minDeg = (m + s / 60) * 6 - 90;
                const ms = time.getMilliseconds();
                const secDeg = (s + ms / 1000) * 6 - 90;
                const toXY = (deg: number, len: number) => ({
                  x: cx + len * Math.cos((deg * Math.PI) / 180),
                  y: cx + len * Math.sin((deg * Math.PI) / 180),
                });
                const hour = toXY(hourDeg, r * 0.5);
                const min = toXY(minDeg, r * 0.7);
                const sec = toXY(secDeg, r * 0.8);
                return (
                  <div className="absolute z-10">
                    <div
                      className="relative rounded-full overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,185,120,0.68) 0%, rgba(255,105,25,0.38) 55%, rgba(255,155,70,0.58) 100%)',
                        backdropFilter: 'blur(28px) saturate(220%)',
                        WebkitBackdropFilter: 'blur(28px) saturate(220%)',
                        border: '1.5px solid rgba(255,181,100,0.85)',
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)',
                      }}
                    >
                      {/* Glass specular highlight */}
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background: 'radial-gradient(ellipse at 38% 26%, rgba(255,255,255,0.48) 0%, transparent 60%)',
                          zIndex: 1,
                        }}
                      />
                      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'relative', zIndex: 2 }}>
                          {/* Face — transparent so frosted glass shows through */}
                          <circle cx={cx} cy={cx} r={r} fill="transparent" />
                          {/* Hour markers */}
                          {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * 30 - 90) * Math.PI / 180;
                            const x1 = cx + (r - 6) * Math.cos(a);
                            const y1 = cx + (r - 6) * Math.sin(a);
                            const x2 = cx + (r - 12) * Math.cos(a);
                            const y2 = cx + (r - 12) * Math.sin(a);
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(175,75,15,0.65)" strokeWidth="2" strokeLinecap="round" />;
                          })}
                          {/* MELB label inside clock */}
                          <text
                            x={cx}
                            y={cx + r * 0.52}
                            textAnchor="middle"
                            fontSize={Math.max(7, r * 0.11)}
                            fill="rgba(155,65,10,0.78)"
                            fontFamily="system-ui, sans-serif"
                            letterSpacing="2"
                            fontWeight="500"
                          >
                            MELB
                          </text>
                          {/* Hour hand */}
                          <line x1={cx} y1={cx} x2={hour.x} y2={hour.y} stroke="rgba(95,38,5,0.92)" strokeWidth="3" strokeLinecap="round" />
                          {/* Minute hand */}
                          <line x1={cx} y1={cx} x2={min.x} y2={min.y} stroke="rgba(115,50,8,0.88)" strokeWidth="2" strokeLinecap="round" />
                          {/* Second hand */}
                          <line x1={cx} y1={cx} x2={sec.x} y2={sec.y} stroke="#ff5e0e" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Center dot */}
                          <circle cx={cx} cy={cx} r="3" fill="#ff5e0e" />
                        </svg>
                    </div>
                  </div>
                );
              })()}

              {/* Orbiting Tech Icons */}
              {containerSize > 0 &&
                techIcons.map((icon, index) => {
                  const position = getIconPosition(index);
                  const isExpanded = index === expandedIndex;

                  return (
                    <div
                      key={icon.alt}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(${position.x - iconSize / 2}px, ${position.y - iconSize / 2}px)`,
                      }}
                    >
                      <div
                        style={{
                          transform: isExpanded ? "scale(1.75)" : "scale(1)",
                          transition: "transform 0.5s ease-in-out",
                        }}
                      >
                        <Image
                          src={icon.src}
                          alt={icon.alt}
                          width={iconSize}
                          height={iconSize}
                          className="object-contain"
                          style={{ width: iconSize, height: iconSize }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
