import { useEffect, useState } from "react";
import { isHideShortsEnabled, setHideShorts } from "../service";

export function useHideShorts() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    isHideShortsEnabled().then(setEnabled);
  }, []);

  async function toggle() {
    const next = !enabled;
    setEnabled(next);
    await setHideShorts(next);
  }

  return { enabled, toggle };
}
