export async function getPopupWatchSeconds(): Promise<number> {
  const key = "ft_watchtime_" + new Date().toISOString().slice(0, 10);
  const data = await chrome.storage.local.get(key);
  return (data[key] as number) ?? 0;
}
