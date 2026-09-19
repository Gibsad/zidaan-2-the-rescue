"use client";

import { useEffect, useState } from "react";

const COLORS = ["#e0302d", "#ffc02e", "#59c1f0", "#fff8ec", "#1b2436"];

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotateStart: number;
  size: number;
}

function generatePieces(pieceCount: number): ConfettiPiece[] {
  return Array.from({ length: pieceCount }, (_, id) => ({
    id,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 2.4 + Math.random() * 1.6,
    color: COLORS[id % COLORS.length],
    rotateStart: Math.random() * 360,
    size: 6 + Math.random() * 6,
  }));
}

interface ConfettiProps {
  active: boolean;
  reducedMotion?: boolean;
  pieceCount?: number;
}

export default function Confetti({ active, reducedMotion = false, pieceCount = 60 }: ConfettiProps) {
  // Generated once per mount — Confetti is only ever mounted for a single burst.
  const [pieces] = useState<ConfettiPiece[]>(() => generatePieces(pieceCount));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => setVisible(false), 4200);
    return () => clearTimeout(timeout);
  }, [active]);

  if (!active || !visible || reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="animate-confetti-fall absolute top-0 block rounded-sm"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 2.2,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotateStart}deg)`,
          }}
        />
      ))}
    </div>
  );
}
