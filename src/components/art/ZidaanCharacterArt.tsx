export type ZidaanPose = "stand" | "wave" | "celebrate";

interface ZidaanCharacterArtProps {
  pose?: ZidaanPose;
  className?: string;
}

export default function ZidaanCharacterArt({
  pose = "stand",
  className = "",
}: ZidaanCharacterArtProps) {
  const leftArmUp = pose === "celebrate";
  const rightArmWave = pose === "wave" || pose === "celebrate";

  return (
    <svg
      viewBox="0 0 200 230"
      className={className}
      role="img"
      aria-label="Cartoon toddler firefighter Zidaan"
    >
      {/* Shadow */}
      <ellipse cx="100" cy="220" rx="55" ry="8" fill="#0f1524" opacity="0.15" />

      {/* Legs */}
      <rect x="72" y="168" width="22" height="40" rx="8" fill="#2c3a54" />
      <rect x="106" y="168" width="22" height="40" rx="8" fill="#2c3a54" />
      {/* Boots */}
      <rect x="68" y="200" width="30" height="16" rx="7" fill="#1b2436" />
      <rect x="102" y="200" width="30" height="16" rx="7" fill="#1b2436" />

      {/* Left arm (viewer's left) */}
      <g
        style={{
          transformOrigin: "69px 128px",
          transformBox: "fill-box",
          transform: leftArmUp ? "rotate(-160deg)" : "rotate(6deg)",
          transition: "transform 0.6s ease",
        }}
      >
        <rect x="60" y="122" width="18" height="46" rx="9" fill="#e0302d" />
        <circle cx="69" cy="170" r="10" fill="#f2c39d" />
      </g>

      {/* Body / jacket */}
      <rect x="62" y="110" width="76" height="70" rx="24" fill="#e0302d" />
      <rect x="62" y="110" width="76" height="70" rx="24" fill="none" stroke="#a91f1d" strokeWidth="3" />
      <rect x="72" y="132" width="56" height="10" rx="4" fill="#ffc02e" />
      <rect x="72" y="150" width="56" height="10" rx="4" fill="#ffc02e" />

      {/* Badge on chest */}
      <circle cx="100" cy="122" r="9" fill="#ffc02e" stroke="#a91f1d" strokeWidth="2" />

      {/* Right arm (waving) */}
      <g
        className={rightArmWave ? "animate-wave" : ""}
        style={{
          transformOrigin: "131px 128px",
          transformBox: "fill-box",
          transform: rightArmWave ? undefined : "rotate(-4deg)",
          transition: "transform 0.4s ease",
        }}
      >
        <rect x="122" y="122" width="18" height="46" rx="9" fill="#e0302d" />
        <circle cx="131" cy="170" r="10" fill="#f2c39d" />
      </g>

      {/* Neck + head */}
      <rect x="92" y="88" width="16" height="16" fill="#f2c39d" />
      <circle cx="100" cy="70" r="38" fill="#f2c39d" />

      {/* Ears */}
      <circle cx="63" cy="72" r="7" fill="#f2c39d" />
      <circle cx="137" cy="72" r="7" fill="#f2c39d" />

      {/* Face */}
      <circle cx="86" cy="68" r="5" fill="#1b2436" />
      <circle cx="114" cy="68" r="5" fill="#1b2436" />
      <circle cx="84" cy="66" r="1.6" fill="#fff" />
      <circle cx="112" cy="66" r="1.6" fill="#fff" />
      <path d="M84 84 q16 14 32 0" stroke="#a9563b" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="72" cy="80" r="7" fill="#e0302d" opacity="0.35" />
      <circle cx="128" cy="80" r="7" fill="#e0302d" opacity="0.35" />

      {/* Helmet */}
      <path
        d="M56 52 a44 40 0 0 1 88 0 z"
        fill="#ffc02e"
        stroke="#e6a300"
        strokeWidth="3"
      />
      <rect x="46" y="48" width="108" height="14" rx="7" fill="#e0302d" stroke="#a91f1d" strokeWidth="2" />
      <circle cx="100" cy="36" r="10" fill="#e0302d" stroke="#a91f1d" strokeWidth="2" />
      <path d="M100 29c3 4 5 6 5 9a5 5 0 1 1-10 0c0-1 .5-3 1.5-4.5.5 2.5 1.5 3 2.5 2 .5-1.5 0-4 1-6.5z" fill="#ffc02e" />
    </svg>
  );
}
