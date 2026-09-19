export default function HelmetArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 90"
      className={className}
      role="img"
      aria-label="Firefighter helmet icon"
    >
      <path
        d="M18 46 a42 38 0 0 1 84 0 z"
        fill="#ffc02e"
        stroke="#e6a300"
        strokeWidth="3"
      />
      <rect x="6" y="42" width="108" height="14" rx="7" fill="#e0302d" stroke="#a91f1d" strokeWidth="2" />
      <circle cx="60" cy="28" r="11" fill="#e0302d" stroke="#a91f1d" strokeWidth="2" />
      <path
        d="M60 20c3.5 4.5 5.5 7 5.5 10.5a5.5 5.5 0 1 1-11 0c0-1.3.5-3 1.6-4.8.6 2.6 1.6 3.2 2.6 2 .6-1.6 0-4.3 1.3-7.7z"
        fill="#ffc02e"
      />
    </svg>
  );
}
