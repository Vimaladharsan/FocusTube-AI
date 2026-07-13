import { useEffect, useState } from "react";
import {
  isAdBlockEnabled,
  setAdBlockEnabled,
} from "../service";

export function useAdBlock() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    isAdBlockEnabled().then(setEnabled);
  }, []);

  async function toggle() {
    const next = !enabled;

    setEnabled(next);

    await setAdBlockEnabled(next);
  }

  return {
    enabled,
    toggle,
  };
}