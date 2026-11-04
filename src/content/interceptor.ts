const _fetch = window.fetch.bind(window);

window.fetch = async function (...args: Parameters<typeof fetch>): Promise<Response> {
  const input = args[0];
  const url = input instanceof Request ? input.url : String(input);
  const response = await _fetch(...args);

  if (!url.includes("/youtubei/v1/player")) return response;
  if (localStorage.getItem("focustube_adblock") === "0") return response;

  try {
    const data = (await response.clone().json()) as Record<string, unknown>;

    delete data.adPlacements;
    delete data.playerAds;
    delete data.adSlots;
    delete data.adBreakHeartbeatParams;

    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch {
    return response;
  }
};
