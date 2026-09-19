"use client";

import { motion } from "framer-motion";
import FireStationArt from "@/components/art/FireStationArt";
import SoundTheAlarmButton from "@/components/SoundTheAlarmButton";

export default function FireStationIntro({ onAlarm }: { onAlarm: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="safe-x safe-top safe-bottom flex min-h-[100dvh] flex-col items-center justify-center gap-6 py-10 text-center"
      aria-label="Zidaan's Fire Station introduction"
    >
      <h1 className="font-display text-4xl font-bold leading-none tracking-tight text-fire-red drop-shadow-sm sm:text-5xl">
        ZIDAAN&apos;S
        <br />
        FIRE STATION
      </h1>

      <div className="w-full max-w-xs sm:max-w-sm">
        <FireStationArt doorOpen={false} className="w-full drop-shadow-xl" />
      </div>

      <p className="font-display text-lg text-navy sm:text-xl">
        Something special is coming&hellip;
      </p>

      <SoundTheAlarmButton onPress={onAlarm} />
    </motion.section>
  );
}
