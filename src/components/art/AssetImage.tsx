"use client";

import { useState, type ReactNode } from "react";

interface AssetImageProps {
  /** Filename inside /public/assets/, e.g. "fire-truck.png" */
  src: string;
  alt: string;
  className?: string;
  /** Built-in SVG artwork shown if the custom asset is missing or fails to load. */
  fallback: ReactNode;
}

/**
 * Tries to render a user-supplied illustration from /public/assets/. If the
 * file hasn't been provided (or fails to load for any reason) it silently
 * swaps to the hand-built SVG fallback instead of a broken image icon —
 * so the site always looks finished, with or without custom artwork.
 */
export default function AssetImage({ src, alt, className, fallback }: AssetImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <>{fallback}</>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/assets/${src}`}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
