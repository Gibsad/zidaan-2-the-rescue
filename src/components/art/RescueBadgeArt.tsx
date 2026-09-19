export default function RescueBadgeArt({
  className = "",
  label = "RESCUE CREW",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 180"
      className={className}
      role="img"
      aria-label="Zidaan Rescue Crew badge with a flame emblem"
    >
      <path
        d="M80 4 L150 30 V88 C150 132 120 160 80 176 C40 160 10 132 10 88 V30 Z"
        fill="#1b2436"
        stroke="#ffc02e"
        strokeWidth="6"
      />
      <path
        d="M80 16 L138 38 V88 C138 124 113 148 80 162 C47 148 22 124 22 88 V38 Z"
        fill="#2c3a54"
      />
      <path
        d="M80 50c14 16 22 26 22 40a22 22 0 1 1-44 0c0-6 2-13 6-19 2 11 7 13 11 9 2-7 0-18 5-30z"
        fill="#ffc02e"
      />
      <path
        d="M80 68c7 9 11 14 11 21a11 11 0 1 1-22 0c0-3 1-6 3-9 1 5 3 6 5 4 1-3 0-8 3-16z"
        fill="#e0302d"
      />
      <text
        x="80"
        y="140"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="#ffc02e"
        letterSpacing="1"
        fontFamily="var(--font-display, sans-serif)"
      >
        {label}
      </text>
    </svg>
  );
}
