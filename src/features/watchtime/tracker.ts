const KEY_PREFIX = "ft_watchtime_";

export function getTodayKey(): string {
  return KEY_PREFIX + new Date().toISOString().slice(0, 10);
}

export function getTodaySeconds(): number {
  return parseInt(localStorage.getItem(getTodayKey()) ?? "0", 10);
}

export function getTodayMinutes(): number {
  return Math.floor(getTodaySeconds() / 60);
}

function getVideo(): HTMLVideoElement | null {
  return (
    Array.from(document.querySelectorAll<HTMLVideoElement>("video")).find(
      (v) => !v.paused && v.readyState > 0
    ) ?? null
  );
}

function isAdPlaying(): boolean {
  return document.documentElement.classList.contains("ad-showing");
}

let tickInterval: number | null = null;
let onLimitHit: (() => void) | null = null;
let limitSeconds = 0;
let syncCounter = 0;
const SYNC_INTERVAL = 30;

function syncToStorage(seconds: number): void {
  const key = getTodayKey();
  chrome.storage.local.set({ [key]: seconds });
}

function tick() {
  const video = getVideo();
  if (!video || isAdPlaying()) return;

  const today = getTodayKey();
  const current = parseInt(localStorage.getItem(today) ?? "0", 10);
  const next = current + 1;
  localStorage.setItem(today, String(next));

  syncCounter++;
  if (syncCounter >= SYNC_INTERVAL) {
    syncCounter = 0;
    syncToStorage(next);
  }

  if (limitSeconds > 0 && next >= limitSeconds) {
    onLimitHit?.();
  }
}

export function startTracker(limitMins: number, onLimit: () => void): void {
  if (tickInterval !== null) return;
  limitSeconds = limitMins * 60;
  onLimitHit = onLimit;
  tickInterval = window.setInterval(tick, 1000);
}

export function updateLimit(limitMins: number): void {
  limitSeconds = limitMins * 60;
}

export function stopTracker(): void {
  if (tickInterval === null) return;
  clearInterval(tickInterval);
  tickInterval = null;
}
