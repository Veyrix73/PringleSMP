export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "no-store"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405, headers: cors });
    }

    const sources = [
      "https://api.mcstatus.io/v2/status/java/pringlesmp.mcsh.io?timeout=4",
      "https://api.mcsrvstat.us/3/pringlesmp.mcsh.io"
    ];

    for (const url of sources) {
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "PringleSMP-Cloud-Status/2.0",
            "Accept": "application/json"
          }
        });

        if (!response.ok) continue;

        const data = await response.json();
        const players = data.players || {};

        return new Response(JSON.stringify({
          online: data.online === true,
          players: {
            online: Number(players.online || 0),
            max: Number(players.max || 0)
          },
          host: data.host || data.hostname || "pringlesmp.mcsh.io",
          port: data.port || 25565,
          version: data.version?.name || data.version || null,
          motd: data.motd?.clean || data.motd?.html || null,
          source: url.includes("mcstatus.io") ? "mcstatus.io" : "mcsrvstat.us",
          checkedAt: Date.now()
        }), {
          status: 200,
          headers: {
            ...cors,
            "Content-Type": "application/json; charset=utf-8"
          }
        });
      } catch {
        // Try the next status provider.
      }
    }

    return new Response(JSON.stringify({
      online: false,
      players: { online: 0, max: 0 },
      error: "Both status providers failed",
      checkedAt: Date.now()
    }), {
      status: 502,
      headers: {
        ...cors,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  }
};