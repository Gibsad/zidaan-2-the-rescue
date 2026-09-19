export default function BackgroundScene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky via-sky-light to-cream" />

      {/* Sun */}
      <div className="absolute right-6 top-10 h-16 w-16 rounded-full bg-fire-yellow opacity-90 shadow-[0_0_40px_10px_rgba(255,192,46,0.5)] sm:h-20 sm:w-20" />

      {/* Clouds */}
      <Cloud className="left-[-10%] top-16 w-28 opacity-90 animate-cloud-drift" />
      <Cloud
        className="left-[40%] top-8 w-20 opacity-80 animate-cloud-drift"
        style={{ animationDuration: "24s", animationDelay: "-6s" }}
      />
      <Cloud
        className="left-[70%] top-28 w-24 opacity-70 animate-cloud-drift"
        style={{ animationDuration: "14s", animationDelay: "-3s" }}
      />

      {/* City skyline */}
      <svg
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        className="absolute bottom-[18vh] left-0 h-24 w-full opacity-40 sm:bottom-[22vh]"
        aria-hidden="true"
      >
        <rect x="0" y="40" width="40" height="60" fill="#2c3a54" />
        <rect x="45" y="20" width="30" height="80" fill="#1b2436" />
        <rect x="80" y="55" width="45" height="45" fill="#2c3a54" />
        <rect x="130" y="30" width="35" height="70" fill="#1b2436" />
        <rect x="170" y="50" width="30" height="50" fill="#2c3a54" />
        <rect x="205" y="15" width="30" height="85" fill="#1b2436" />
        <rect x="240" y="45" width="40" height="55" fill="#2c3a54" />
        <rect x="285" y="60" width="35" height="40" fill="#1b2436" />
        <rect x="325" y="35" width="30" height="65" fill="#2c3a54" />
        <rect x="360" y="55" width="40" height="45" fill="#1b2436" />
      </svg>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 h-[20vh] w-full bg-navy sm:h-[24vh]" />
      <div className="absolute bottom-[19vh] left-0 h-2 w-full bg-fire-yellow/70 sm:bottom-[23vh]" />
    </div>
  );
}

function Cloud({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 50"
      className={`absolute text-white drop-shadow-sm ${className}`}
      style={style}
      aria-hidden="true"
    >
      <ellipse cx="30" cy="30" rx="24" ry="16" fill="currentColor" />
      <ellipse cx="55" cy="22" rx="20" ry="18" fill="currentColor" />
      <ellipse cx="75" cy="32" rx="18" ry="13" fill="currentColor" />
      <ellipse cx="45" cy="35" rx="28" ry="14" fill="currentColor" />
    </svg>
  );
}
