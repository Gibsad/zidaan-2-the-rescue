"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SoundName = "siren" | "horn" | "celebration" | "letsGo";

const SOUND_SOURCES: Record<SoundName, string> = {
  siren: "/audio/siren.mp3",
  horn: "/audio/truck-horn.mp3",
  celebration: "/audio/celebration.mp3",
  letsGo: "/audio/lets-go.mp3",
};

interface AudioContextValue {
  muted: boolean;
  toggleMuted: () => void;
  play: (sound: SoundName) => void;
  hasStarted: boolean;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem("zidaan-audio-muted") === "true";
    } catch {
      // localStorage unavailable (private mode, etc.) — default to unmuted.
      return false;
    }
  });
  const [hasStarted, setHasStarted] = useState(false);
  const elementsRef = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});

  const getElement = useCallback((sound: SoundName) => {
    if (typeof window === "undefined") return null;
    let el = elementsRef.current[sound];
    if (!el) {
      el = new Audio(SOUND_SOURCES[sound]);
      el.preload = "auto";
      elementsRef.current[sound] = el;
    }
    return el;
  }, []);

  const play = useCallback(
    (sound: SoundName) => {
      setHasStarted(true);
      if (muted) return;
      const el = getElement(sound);
      if (!el) return;
      try {
        el.currentTime = 0;
        el.play().catch(() => {
          // Placeholder/missing audio file or blocked autoplay — fail silently.
        });
      } catch {
        // Never let a missing/broken audio asset break the experience.
      }
    },
    [getElement, muted]
  );

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (next) {
        Object.values(elementsRef.current).forEach((el) => {
          el?.pause();
        });
      }
      try {
        window.localStorage.setItem("zidaan-audio-muted", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ muted, toggleMuted, play, hasStarted }),
    [muted, toggleMuted, play, hasStarted]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return ctx;
}

export function MuteButton() {
  const { muted, toggleMuted, hasStarted } = useAudio();

  if (!hasStarted) return null;

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      aria-pressed={muted}
      className="safe-top fixed right-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy bg-cream text-xl shadow-md transition-transform active:scale-95 sm:right-4 sm:top-4"
      style={{ marginTop: "max(0.5rem, env(safe-area-inset-top, 0px))" }}
    >
      <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
    </button>
  );
}
