function todayKey(): string {
  return "ft_blocked_" + new Date().toISOString().slice(0, 10);
}

let pending = 0;
let flushTimer: number | null = null;

// Called from content script — batches writes to avoid hammering storage
export function incrementBlockedCount(): void {
  pending++;
  if (flushTimer !== null) return;
  flushTimer = window.setTimeout(async () => {
    flushTimer = null;
    const key = todayKey();
    const stored = await chrome.storage.local.get(key);
    const current = (stored[key] as number) ?? 0;
    await chrome.storage.local.set({ [key]: current + pending });
    pending = 0;
  }, 200);
}

// Called from popup
export async function getBlockedCount(): Promise<number> {
  const key = todayKey();
  const stored = await chrome.storage.local.get(key);
  return (stored[key] as number) ?? 0;
}
