export default function FireHydrantArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      role="img"
      aria-label="Cartoon red fire hydrant"
    >
      <ellipse cx="50" cy="132" rx="30" ry="7" fill="#0f1524" opacity="0.15" />
      <rect x="30" y="100" width="40" height="28" rx="6" fill="#a91f1d" />
      <rect x="20" y="50" width="60" height="60" rx="16" fill="#e0302d" stroke="#a91f1d" strokeWidth="4" />
      <rect x="10" y="66" width="18" height="18" rx="8" fill="#e0302d" stroke="#a91f1d" strokeWidth="3" />
      <rect x="72" y="66" width="18" height="18" rx="8" fill="#e0302d" stroke="#a91f1d" strokeWidth="3" />
      <circle cx="19" cy="75" r="5" fill="#ffc02e" />
      <circle cx="81" cy="75" r="5" fill="#ffc02e" />
      <rect x="34" y="24" width="32" height="30" rx="10" fill="#e0302d" stroke="#a91f1d" strokeWidth="4" />
      <rect x="40" y="10" width="20" height="16" rx="6" fill="#ffc02e" stroke="#e6a300" strokeWidth="3" />
      <rect x="18" y="90" width="64" height="10" rx="4" fill="#a91f1d" />
    </svg>
  );
}
