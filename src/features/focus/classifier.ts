import type { FocusMode } from "../../types/settings";
import { getModeDefinition } from "./modes";

export type Classification = "show" | "hide";

export function classifyTitle(
  title: string,
  mode: FocusMode,
  customKeywords: string[]
): Classification {
  if (mode === "off") return "show";

  const lower = title.toLowerCase();

  if (mode === "custom") {
    if (customKeywords.length === 0) return "show";
    const hits = customKeywords.some((kw) => lower.includes(kw.toLowerCase()));
    return hits ? "show" : "hide";
  }

  const def = getModeDefinition(mode);
  if (!def) return "show";

  let score = 0;
  for (const kw of def.allowKeywords) {
    if (lower.includes(kw)) score++;
  }
  for (const kw of def.blockKeywords) {
    if (lower.includes(kw)) score--;
  }

  // neutral (score === 0) always shows — never over-filter
  return score < 0 ? "hide" : "show";
}
