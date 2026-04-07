"use client";

const AnimatedWave = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <svg
        className="relative w-full h-32 md:h-40"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="waves">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            className="fill-blue-500/20"
            style={{
              animation: "wave1 3s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite",
            }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="2"
            className="fill-purple-500/20"
            style={{
              animation: "wave2 2.5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite",
            }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="4"
            className="fill-cyan-500/25"
            style={{
              animation: "wave3 2s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.25s infinite",
            }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            className="fill-indigo-500/30"
            style={{
              animation: "wave4 2.75s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.375s infinite",
            }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="6"
            className="fill-teal-500/25"
            style={{
              animation: "wave5 2.25s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.5s infinite",
            }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            className="fill-black/80"
            style={{
              animation: "wave6 1.5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.625s infinite",
            }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="8"
            className="fill-black"
            style={{
              animation: "wave7 2.5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.75s infinite",
            }}
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes wave1 {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes wave2 {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-15%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes wave3 {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-30%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes wave4 {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes wave5 {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-18%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes wave6 {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-12%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes wave7 {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-10%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedWave;
