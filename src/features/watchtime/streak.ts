const KEY_PREFIX = "ft_watchtime_";
const STREAK_KEY = "ft_streak";
const STREAK_LAST_KEY = "ft_streak_last";

function dateKey(d: Date): string {
  return KEY_PREFIX + d.toISOString().slice(0, 10);
}

function getWatchedSeconds(d: Date): number {
  return parseInt(localStorage.getItem(dateKey(d)) ?? "0", 10);
}

export function getStreak(): number {
  return parseInt(localStorage.getItem(STREAK_KEY) ?? "0", 10);
}

export function updateStreak(limitMins: number): number {
  if (limitMins <= 0) return getStreak();

  const today = new Date().toISOString().slice(0, 10);
  if (localStorage.getItem(STREAK_LAST_KEY) === today) return getStreak();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const watchedYesterday = getWatchedSeconds(yesterday);
  const underLimit = watchedYesterday <= limitMins * 60;

  const streak = underLimit ? getStreak() + 1 : 0;
  localStorage.setItem(STREAK_KEY, String(streak));
  localStorage.setItem(STREAK_LAST_KEY, today);
  return streak;
}

export interface DayStat {
  label: string;
  watchedSeconds: number;
  underLimit: boolean;
  isToday: boolean;
}

export function getLast7Days(limitMins: number): DayStat[] {
  const days: DayStat[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const watched = getWatchedSeconds(d);
    days.push({
      label: i === 0 ? "Today" : dayNames[d.getDay()],
      watchedSeconds: watched,
      underLimit: limitMins > 0 ? watched <= limitMins * 60 : true,
      isToday: i === 0,
    });
  }
  return days;
}
