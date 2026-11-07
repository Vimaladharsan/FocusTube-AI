import { useEffect, useState } from "react";
import { isHideSuggestedEnabled, setHideSuggested } from "../service";

export function useHideSuggested() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    isHideSuggestedEnabled().then(setEnabled);
  }, []);

  async function toggle() {
    const next = !enabled;
    setEnabled(next);
    await setHideSuggested(next);
  }

  return { enabled, toggle };
}
