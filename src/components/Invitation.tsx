"use client";

import { motion } from "framer-motion";
import EventDetails from "@/components/EventDetails";
import FireHydrantArt from "@/components/art/FireHydrantArt";
import { EVENT } from "@/lib/event";

const titleContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const titleItem = {
  hidden: { opacity: 0, scale: 0.4, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 16 },
  },
};

export default function Invitation({
  onRsvp,
  reducedMotion = false,
}: {
  onRsvp: () => void;
  reducedMotion?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="safe-x safe-top safe-bottom flex min-h-[100dvh] flex-col items-center justify-center gap-6 py-10 text-center"
      aria-label="Birthday invitation details"
    >
      <motion.div
        variants={reducedMotion ? undefined : titleContainer}
        initial={reducedMotion ? false : "hidden"}
        animate={reducedMotion ? undefined : "visible"}
        className="flex flex-col items-center leading-[0.9]"
      >
        <motion.span
          variants={reducedMotion ? undefined : titleItem}
          className="font-display text-3xl font-bold tracking-wide text-navy sm:text-4xl"
        >
          {EVENT.childName.toUpperCase()}
        </motion.span>
        <motion.span
          variants={reducedMotion ? undefined : titleItem}
          className="font-display text-7xl font-black text-fire-red drop-shadow-sm sm:text-8xl"
        >
          {EVENT.age}
        </motion.span>
        <motion.span
          variants={reducedMotion ? undefined : titleItem}
          className="font-display text-2xl font-bold tracking-[0.3em] text-navy sm:text-3xl"
        >
          THE
        </motion.span>
        <motion.span
          variants={reducedMotion ? undefined : titleItem}
          className="font-display text-4xl font-black tracking-wide text-fire-red sm:text-5xl"
        >
          RESCUE
        </motion.span>
      </motion.div>

      <p className="font-body max-w-xs text-base font-semibold text-navy sm:text-lg">
        Join us in celebrating
        <br />
        {EVENT.childName}&apos;s {EVENT.age}nd birthday!
      </p>

      <EventDetails />

      <p className="font-display text-sm font-bold tracking-wide text-fire-red-dark sm:text-base">
        🚨 {EVENT.rsvpByLabel} 🚨
      </p>

      <motion.button
        type="button"
        onClick={onRsvp}
        whileTap={{ scale: 0.95 }}
        className="animate-pulse-glow font-display rounded-full border-4 border-fire-red-dark bg-fire-red px-8 py-5 text-lg font-bold text-white shadow-xl sm:px-10 sm:text-xl"
      >
        🚒 JOIN THE RESCUE CREW
      </motion.button>

      <FireHydrantArt className="w-16 opacity-80 sm:w-20" />
    </motion.section>
  );
}
