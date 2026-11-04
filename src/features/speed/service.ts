import { getSettings, saveSettings } from "../settings";

export async function getVideoSpeed(): Promise<number> {
  const settings = await getSettings();
  return settings.videoSpeed;
}

export async function setVideoSpeed(speed: number): Promise<void> {
  const settings = await getSettings();
  settings.videoSpeed = speed;
  await saveSettings(settings);
}
