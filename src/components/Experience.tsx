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

  return (
    <>
      <BackgroundScene />
      <MuteButton />

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div key="intro" exit={{ opacity: 0 }}>
            <FireStationIntro onAlarm={handleAlarm} />
          </motion.div>
        )}

        {stage === "sequence" && (
          <motion.div key="sequence" exit={{ opacity: 0 }}>
            <FireTruckAnimation
              reducedMotion={reducedMotion}
              onComplete={() => setStage("invitation")}
            />
          </motion.div>
        )}

        {stage === "invitation" && (
          <motion.div key="invitation" exit={{ opacity: 0 }}>
            <Invitation onRsvp={() => setStage("rsvp")} />
          </motion.div>
        )}

        {stage === "rsvp" && (
          <motion.div key="rsvp" exit={{ opacity: 0 }}>
            <RSVPForm
              onSubmitted={(attending) => setStage(attending ? "success" : "declined")}
            />
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div key="success" exit={{ opacity: 0 }}>
            <RSVPSuccess reducedMotion={reducedMotion} />
          </motion.div>
        )}

        {stage === "declined" && (
          <motion.div key="declined" exit={{ opacity: 0 }}>
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
