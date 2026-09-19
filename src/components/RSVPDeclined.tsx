"use client";

import { motion } from "framer-motion";
import ZidaanCharacterArt from "@/components/art/ZidaanCharacterArt";

export default function RSVPDeclined() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="safe-x safe-top safe-bottom flex min-h-[100dvh] flex-col items-center justify-center gap-5 py-10 text-center"
      aria-label="RSVP received"
    >
      <ZidaanCharacterArt pose="stand" className="w-28 sm:w-32" />

      <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
        Thanks for letting us know! ❤️
      </h2>

      <p className="max-w-xs text-base font-semibold text-navy/80 sm:text-lg">
        Zidaan will miss you at the station! We&apos;ll be thinking of you on October
        31st.
      </p>
    </motion.section>
  );
}
