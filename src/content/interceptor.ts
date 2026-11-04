function stripAds(data: Record<string, unknown>): void {
  if ("adPlacements" in data) data.adPlacements = [];
  if ("playerAds" in data) data.playerAds = [];
  if ("adSlots" in data) data.adSlots = [];
}

function isEnabled(): boolean {
  return localStorage.getItem("focustube_adblock") !== "0";
}

// Strip ads from the inline player data YouTube sets during page load
let _initialPlayerResponse: Record<string, unknown> | undefined;

Object.defineProperty(window, "ytInitialPlayerResponse", {
  get: () => _initialPlayerResponse,
  set: (data: Record<string, unknown>) => {
    if (isEnabled()) stripAds(data);
    _initialPlayerResponse = data;
  },
  configurable: true,
});

// Strip ads from YouTube's player and next-video API responses
const _fetch = window.fetch.bind(window);

window.fetch = async function (...args: Parameters<typeof fetch>): Promise<Response> {
  const input = args[0];
  const url = input instanceof Request ? input.url : String(input);

  const response = await _fetch(...args);

  const isPlayerApi =
    url.includes("/youtubei/v1/player") || url.includes("/youtubei/v1/next");

  if (!isPlayerApi || !isEnabled()) return response;

  try {
    const data = (await response.clone().json()) as Record<string, unknown>;
    stripAds(data);
    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return response;
  }
};
