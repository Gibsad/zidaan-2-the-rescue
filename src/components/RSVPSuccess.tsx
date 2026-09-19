"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Confetti from "@/components/Confetti";
import ZidaanCharacterArt from "@/components/art/ZidaanCharacterArt";
import SpeechBubble from "@/components/SpeechBubble";
import { useAudio } from "@/components/AudioController";
import { downloadIcsFile } from "@/lib/ics";
import { MAPS_URL } from "@/lib/event";

export default function RSVPSuccess({ reducedMotion }: { reducedMotion: boolean }) {
  const { play } = useAudio();

  useEffect(() => {
    play("celebration");
    // Only fire once, right when the success screen mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="safe-x safe-top safe-bottom relative flex min-h-[100dvh] flex-col items-center justify-center gap-5 overflow-hidden py-10 text-center"
      aria-label="RSVP confirmed"
    >
      <Confetti active reducedMotion={reducedMotion} />

      <div
        className={`h-4 w-4 rounded-full bg-fire-red ${
          reducedMotion ? "" : "animate-beacon-flash"
        }`}
        aria-hidden="true"
      />

      <motion.h2
        initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="font-display text-3xl font-black text-fire-red sm:text-4xl"
      >
        🚨 RESCUE CREW CONFIRMED! 🚨
      </motion.h2>

      <p className="max-w-xs text-base font-semibold text-navy sm:text-lg">
        Thank you for RSVPing!
        <br />
        We can&apos;t wait to celebrate with you at Zidaan&apos;s Fire Station!
      </p>

      <ZidaanCharacterArt pose="celebrate" className="w-32 sm:w-36" />

      <SpeechBubble>You&apos;re officially part of my Rescue Crew! ❤️</SpeechBubble>

      <div className="mt-2 flex w-full max-w-xs flex-col gap-3">
        <button
          type="button"
          onClick={() => downloadIcsFile()}
          className="font-display rounded-full border-4 border-fire-red-dark bg-fire-yellow px-6 py-4 text-base font-bold text-navy shadow-lg sm:text-lg"
        >
          📅 ADD TO CALENDAR
        </button>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display rounded-full border-4 border-navy bg-white px-6 py-4 text-base font-bold text-navy shadow-lg sm:text-lg"
        >
          🗺️ GET DIRECTIONS
        </a>
      </div>
    </section>
  );
}
