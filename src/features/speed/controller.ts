function applyRate(speed: number) {
  const video = document.querySelector<HTMLVideoElement>("video.html5-main-video");
  if (video) video.playbackRate = speed;
}

export function applyVideoSpeed(speed: number) {
  applyRate(speed);

  document.addEventListener("yt-navigate-finish", () => applyRate(speed));
  window.addEventListener("loadedmetadata", () => applyRate(speed), true);
}
