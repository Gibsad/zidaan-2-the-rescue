"use client";

import { motion } from "framer-motion";

export default function SoundTheAlarmButton({ onPress }: { onPress: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onPress}
      whileTap={{ scale: 0.94 }}
      className="animate-pulse-glow font-display safe-x rounded-full border-4 border-fire-red-dark bg-fire-red px-8 py-5 text-lg font-bold tracking-wide text-white shadow-xl transition-transform sm:px-10 sm:py-6 sm:text-xl"
    >
      🚨 SOUND THE ALARM 🚨
    </motion.button>
  );
}
