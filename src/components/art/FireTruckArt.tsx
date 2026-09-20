interface FireTruckArtProps {
  className?: string;
  lightsOn?: boolean;
  spinning?: boolean;
}

export default function FireTruckArt({
  className = "",
  lightsOn = false,
  spinning = false,
}: FireTruckArtProps) {
  return (
    <svg
      viewBox="0 0 520 240"
      className={className}
      role="img"
      aria-label="Cartoon red fire truck with a yellow ladder"
    >
      {/* Ladder rail on top */}
      <rect x="100" y="58" width="300" height="14" rx="6" fill="#ffc02e" stroke="#e6a300" strokeWidth="2" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={112 + i * 34} y="58" width="6" height="14" fill="#e6a300" />
      ))}

      {/* Main body */}
      <rect x="70" y="72" width="340" height="90" rx="16" fill="#e0302d" />
      <rect x="70" y="72" width="340" height="90" rx="16" fill="none" stroke="#a91f1d" strokeWidth="4" />

      {/* Cab */}
      <path
        d="M370 72 h60 a20 20 0 0 1 20 20 v40 a10 10 0 0 1 -10 10 h-70 z"
        fill="#e0302d"
        stroke="#a91f1d"
        strokeWidth="4"
      />
      <rect x="388" y="90" width="40" height="28" rx="6" fill="#cdeeff" stroke="#1b2436" strokeWidth="3" />

      {/* White stripe */}
      <rect x="70" y="118" width="340" height="16" fill="#fff8ec" />

      {/* Door line + handle */}
      <line x1="330" y1="118" x2="330" y2="162" stroke="#a91f1d" strokeWidth="3" />
      <circle cx="345" cy="140" r="3" fill="#1b2436" />

      {/* Zidaan lettering */}
      <text
        x="200"
        y="112"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="#fff8ec"
        fontFamily="var(--font-display, sans-serif)"
      >
        ZIDAAN
      </text>

      {/* Emergency light bar */}
      <rect x="380" y="62" width="46" height="12" rx="4" fill="#1b2436" />
      <circle
        cx="391"
        cy="68"
        r="6"
        fill="#e0302d"
        className={lightsOn ? "animate-beacon-flash" : ""}
      />
      <circle
        cx="415"
        cy="68"
        r="6"
        fill="#59c1f0"
        className={lightsOn ? "animate-beacon-flash" : ""}
        style={{ animationDelay: "0.3s" }}
      />

      {/* Headlight + grille */}
      <rect x="452" y="128" width="10" height="18" rx="3" fill="#ffc02e" />
      <rect x="432" y="122" width="18" height="34" rx="3" fill="#cdeeff" opacity="0.7" />

      {/* Bumper */}
      <rect x="66" y="158" width="360" height="10" rx="4" fill="#1b2436" />

      {/* Wheels */}
      <Wheel cx={140} cy={176} spinning={spinning} />
      <Wheel cx={360} cy={176} spinning={spinning} />

      {/* Ground shadow */}
      <ellipse cx="250" cy="196" rx="230" ry="10" fill="#0f1524" opacity="0.15" />
    </svg>
  );
}

function Wheel({ cx, cy, spinning }: { cx: number; cy: number; spinning: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="26" fill="#1b2436" />
      <g
        className={spinning ? "animate-wheel-spin" : ""}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle cx={cx} cy={cy} r="12" fill="#cdcdcd" />
        <circle cx={cx} cy={cy} r="4" fill="#1b2436" />
        {[0, 90, 180, 270].map((angle) => (
          <rect
            key={angle}
            x={cx - 1.5}
            y={cy - 11}
            width="3"
            height="7"
            fill="#8a8f98"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        ))}
      </g>
    </g>
  );
}
