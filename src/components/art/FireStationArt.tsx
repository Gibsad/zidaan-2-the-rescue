"use client";

import { motion } from "framer-motion";

interface FireStationArtProps {
  doorOpen?: boolean;
  className?: string;
  lightsFlashing?: boolean;
}

export default function FireStationArt({
  doorOpen = false,
  className = "",
  lightsFlashing = false,
}: FireStationArtProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      className={className}
      role="img"
      aria-label="Zidaan's cartoon fire station with a red garage door"
    >
      {/* Building */}
      <rect x="40" y="110" width="320" height="190" rx="10" fill="#c92a27" />
      <rect x="40" y="110" width="320" height="14" fill="#a91f1d" />

      {/* Roof */}
      <polygon points="20,110 200,40 380,110" fill="#1b2436" />
      <polygon points="20,110 200,40 380,110" fill="none" stroke="#0f1524" strokeWidth="4" />

      {/* Pediment badge */}
      <circle cx="200" cy="82" r="22" fill="#ffc02e" stroke="#a91f1d" strokeWidth="4" />
      <path
        d="M200 68c6 8 10 12 10 19a10 10 0 1 1-20 0c0-3 1-6 3-9 1 5 3 6 5 4 1-3 0-8 2-14z"
        fill="#e0302d"
      />

      {/* Side lamps */}
      <g>
        <rect x="55" y="150" width="6" height="34" fill="#0f1524" />
        <circle
          cx="58"
          cy="146"
          r="9"
          fill="#ffc02e"
          className={lightsFlashing ? "animate-beacon-flash" : ""}
        />
      </g>
      <g>
        <rect x="339" y="150" width="6" height="34" fill="#0f1524" />
        <circle
          cx="342"
          cy="146"
          r="9"
          fill="#ffc02e"
          className={lightsFlashing ? "animate-beacon-flash" : ""}
        />
      </g>

      {/* Windows */}
      <rect x="60" y="200" width="34" height="34" rx="4" fill="#cdeeff" stroke="#1b2436" strokeWidth="3" />
      <rect x="306" y="200" width="34" height="34" rx="4" fill="#cdeeff" stroke="#1b2436" strokeWidth="3" />

      {/* Sign */}
      <rect x="130" y="125" width="140" height="26" rx="6" fill="#fff8ec" stroke="#1b2436" strokeWidth="3" />
      <text
        x="200"
        y="143"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#e0302d"
        fontFamily="var(--font-display, sans-serif)"
      >
        FIRE STATION
      </text>

      {/* Garage opening + door */}
      <rect x="120" y="160" width="160" height="140" fill="#0f1524" />
      <clipPath id="garage-opening">
        <rect x="120" y="160" width="160" height="140" />
      </clipPath>
      <g clipPath="url(#garage-opening)">
        <motion.g
          initial={false}
          animate={{ y: doorOpen ? -150 : 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <rect x="120" y="160" width="160" height="150" fill="#e0302d" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x="120"
              y={160 + i * 25}
              width="160"
              height="22"
              fill={i % 2 === 0 ? "#c92a27" : "#d43230"}
              stroke="#a91f1d"
              strokeWidth="1.5"
            />
          ))}
          <rect x="120" y="160" width="160" height="150" fill="none" stroke="#a91f1d" strokeWidth="4" />
        </motion.g>
      </g>
      <rect x="120" y="160" width="160" height="140" fill="none" stroke="#1b2436" strokeWidth="6" rx="4" />

      {/* Ground shadow */}
      <ellipse cx="200" cy="304" rx="170" ry="10" fill="#0f1524" opacity="0.15" />
    </svg>
  );
}
