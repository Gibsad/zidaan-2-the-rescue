"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundScene from "@/components/art/BackgroundScene";
import FireStationIntro from "@/components/FireStationIntro";
import FireTruckAnimation from "@/components/FireTruckAnimation";
import Invitation from "@/components/Invitation";
import RSVPForm from "@/components/RSVPForm";
import RSVPSuccess from "@/components/RSVPSuccess";
import RSVPDeclined from "@/components/RSVPDeclined";
import { AudioProvider, MuteButton, useAudio } from "@/components/AudioController";

type Stage = "intro" | "sequence" | "invitation" | "rsvp" | "success" | "declined";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}

function ExperienceInner() {
  const [stage, setStage] = useState<Stage>("intro");
  const reducedMotion = useReducedMotion();
  const { play } = useAudio();

  function handleAlarm() {
    play("siren");
    setStage("sequence");
  }

  // A punchier spring-based slide+scale for every stage change, so screens feel
  // like they "pop" into place rather than plainly cross-fading. Falls back to
  // a quick, motion-free fade when prefers-reduced-motion is set.
  const stageMotionProps = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: 28, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -18, scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 260, damping: 24 },
      };

  return (
    <>
      <BackgroundScene />
      <MuteButton />

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div key="intro" {...stageMotionProps}>
            <FireStationIntro onAlarm={handleAlarm} />
          </motion.div>
        )}

        {stage === "sequence" && (
          <motion.div key="sequence" {...stageMotionProps}>
            <FireTruckAnimation
              reducedMotion={reducedMotion}
              onComplete={() => setStage("invitation")}
            />
          </motion.div>
        )}

        {stage === "invitation" && (
          <motion.div key="invitation" {...stageMotionProps}>
            <Invitation onRsvp={() => setStage("rsvp")} reducedMotion={reducedMotion} />
          </motion.div>
        )}

        {stage === "rsvp" && (
          <motion.div key="rsvp" {...stageMotionProps}>
            <RSVPForm
              onSubmitted={(attending) => setStage(attending ? "success" : "declined")}
            />
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div key="success" {...stageMotionProps}>
            <RSVPSuccess reducedMotion={reducedMotion} />
          </motion.div>
        )}

        {stage === "declined" && (
          <motion.div key="declined" {...stageMotionProps}>
            <RSVPDeclined />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Experience() {
  return (
    <AudioProvider>
      <ExperienceInner />
    </AudioProvider>
  );
}
