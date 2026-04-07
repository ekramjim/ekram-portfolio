"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Intro = () => {
  const [phase, setPhase] = useState<"sphere" | "lynk" | "text" | "done">("sphere");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("lynk"), 400);
    const t2 = setTimeout(() => setPhase("text"), 900);
    const t3 = setTimeout(() => setPhase("done"), 1800);
    const t4 = setTimeout(() => setVisible(false), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center gap-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Sphere with Lynk overlaid in the center */}
          <div className="relative flex items-center justify-center w-48 h-48">
            {/* Sphere — appears first */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src="/images/intro/circlesphere.png"
                alt="Sphere"
                width={192}
                height={192}
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Lynk — appears second, centered on top of sphere */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === "lynk" || phase === "text"
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src="/images/intro/lynkL.png"
                alt="Lynk"
                width={150}
                height={170}
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* LynkSphere text — whole word fades up together */}
          <motion.span
            className="text-5xl font-normal text-black"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              phase === "text" ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            LynkSphere
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Intro;
