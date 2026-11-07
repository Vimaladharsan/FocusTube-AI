import { useEffect, useState } from "react";
import { isFocusModeEnabled, setFocusMode } from "../service";

export function useFocusMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    isFocusModeEnabled().then(setEnabled);
  }, []);

  async function toggle() {
    const next = !enabled;
    setEnabled(next);
    await setFocusMode(next);
  }

  return { enabled, toggle };
}
