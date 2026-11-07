import { useEffect, useState } from "react";
import { isHideCommentsEnabled, setHideComments } from "../service";

export function useHideComments() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    isHideCommentsEnabled().then(setEnabled);
  }, []);

  async function toggle() {
    const next = !enabled;
    setEnabled(next);
    await setHideComments(next);
  }

  return { enabled, toggle };
}
