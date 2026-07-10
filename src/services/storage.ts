export async function get<T>(key: string): Promise<T | undefined> {
  const result = await chrome.storage.sync.get(key);
  return result[key] as T | undefined;
}

export async function set<T>(key: string, value: T): Promise<void> {
  await chrome.storage.sync.set({
    [key]: value,
  });
}

export async function remove(key: string): Promise<void> {
  await chrome.storage.sync.remove(key);
}