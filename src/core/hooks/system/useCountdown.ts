"use client";

import { useCallback, useEffect, useState } from "react";

const useCountdown = (initialSeconds: number = 120) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const start = useCallback(
    (secs?: number) => {
      setSeconds(secs ?? initialSeconds);
      setRunning(true);
    },
    [initialSeconds]
  );

  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setRunning(true);
  }, [initialSeconds]);

  const stop = useCallback(() => setRunning(false), []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const isFinished = seconds === 0;

  return { seconds, running, start, reset, stop, mm, ss, isFinished };
};

export default useCountdown;
