import { useEffect, useState } from "react";
import { getVideoSpeed, setVideoSpeed } from "../service";

const MIN = 0.25;
const MAX = 16;
const STEP = 0.25;

export function useVideoSpeed() {
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    getVideoSpeed().then(setSpeed);
  }, []);

  async function decrease() {
    const next = Math.max(MIN, Math.round((speed - STEP) * 100) / 100);
    setSpeed(next);
    await setVideoSpeed(next);
  }

  async function increase() {
    const next = Math.min(MAX, Math.round((speed + STEP) * 100) / 100);
    setSpeed(next);
    await setVideoSpeed(next);
  }

  async function reset() {
    setSpeed(1);
    await setVideoSpeed(1);
  }

  return { speed, decrease, increase, reset };
}
