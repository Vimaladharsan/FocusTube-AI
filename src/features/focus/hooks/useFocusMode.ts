import { useEffect, useState } from "react";
import type { FocusMode } from "../../../types/settings";
import { getFocusMode, setFocusMode } from "../service";

export function useFocusMode() {
  const [mode, setMode] = useState<FocusMode>("off");

  useEffect(() => {
    getFocusMode().then(setMode);
  }, []);

  async function selectMode(next: FocusMode) {
    setMode(next);
    await setFocusMode(next);
  }

  return { mode, selectMode };
}
