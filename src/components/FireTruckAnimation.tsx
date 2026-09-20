"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FireStationArt from "@/components/art/FireStationArt";
import FireTruckArt from "@/components/art/FireTruckArt";
import ZidaanCharacterArt from "@/components/art/ZidaanCharacterArt";
import SpeechBubble from "@/components/SpeechBubble";
import { useAudio } from "@/components/AudioController";

const STEP_DURATIONS_MS = [1100, 1600, 600];

interface FireTruckAnimationProps {
  onComplete: () => void;
  reducedMotion: boolean;
}

export default function FireTruckAnimation({ onComplete, reducedMotion }: FireTruckAnimationProps) {
  const [step, setStep] = useState(reducedMotion ? 3 : 0);
  const { play } = useAudio();

  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    STEP_DURATIONS_MS.forEach((duration, index) => {
      elapsed += duration;
      timers.push(setTimeout(() => setStep(index + 1), elapsed));
    });
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  useEffect(() => {
    if (step === 1) {
      play("horn");
    }
  }, [step, play]);

  const truckOut = reducedMotion || step >= 1;
  const isDriving = !reducedMotion && step === 1;
  const showZidaan = step >= 2;
  const showSpeech = step >= 3;

  function handleLetsGo() {
    play("letsGo");
    onComplete();
  }

  return (
    <section
      className="safe-x safe-top safe-bottom flex min-h-[100dvh] flex-col items-center justify-center gap-3 py-8 text-center"
      aria-label="Fire truck arriving with Zidaan"
    >
      <div className="w-full max-w-xs sm:max-w-sm">
        <FireStationArt doorOpen className="w-full" lightsFlashing={!reducedMotion && step <= 1} />
      </div>

      <div
        className={`relative h-32 w-full max-w-sm overflow-hidden sm:h-40 ${
          isDriving ? "animate-screen-shake" : ""
        }`}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 flex justify-center"
          initial={false}
          animate={{ x: truckOut ? "0%" : "-140%" }}
          transition={{ duration: reducedMotion ? 0 : 1.5, ease: "easeInOut" }}
        >
          <motion.div
            animate={isDriving ? { y: [0, -7, 0] } : { y: 0 }}
            transition={
              isDriving
                ? { duration: 0.35, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
          >
            <FireTruckArt
              lightsOn={!reducedMotion && step <= 1}
              spinning={isDriving}
              className="w-56 sm:w-72"
            />
          </motion.div>
        </motion.div>
      </div>

      <div aria-live="polite" className="h-8">
        {isDriving && (
          <p className="font-display animate-pulse text-2xl font-bold text-fire-red sm:text-3xl">
            WEE-OOO! WEE-OOO!
          </p>
        )}
      </div>

      {showZidaan && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <ZidaanCharacterArt pose="wave" className="w-28 sm:w-32" />

          {showSpeech && (
            <>
              <SpeechBubble delay={0.1}>
                Emergency! Emergency!
                <br />
                I&apos;m turning TWO! 🚒
                <br />
                I need you on my rescue crew!
                <br />
                Come celebrate with me!
              </SpeechBubble>

              <motion.button
                type="button"
                onClick={handleLetsGo}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                whileTap={{ scale: 0.95 }}
                className="font-display rounded-full border-4 border-fire-red-dark bg-fire-yellow px-8 py-4 text-lg font-bold text-navy shadow-lg sm:text-xl"
              >
                LET&apos;S GO →
              </motion.button>
            </>
          )}
        </motion.div>
      )}
    </section>
  );
}
