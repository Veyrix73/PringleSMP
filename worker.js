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

    /*
      We use the MCSH public IP directly because the earlier
      mcsrvstat hostname lookup for pringlesmp.mcsh.io failed.
      Change this later if MCSH gives the server a new Java IP/port.
    */
    const upstream =
      "https://api.mcsrvstat.us/3/57.128.140.147:25565";

    try {
      const response = await fetch(upstream, {
        headers: {
          "User-Agent": "PringleSMP-Cloud-Status/1.0"
        }
      });

      const body = await response.text();

      return new Response(body, {
        status: response.status,
        headers: {
          ...cors,
          "Content-Type": "application/json; charset=utf-8"
        }
      });
    } catch {
      return new Response(JSON.stringify({
        online: false,
        error: "Cloud status request failed"
      }), {
        status: 502,
        headers: {
          ...cors,
          "Content-Type": "application/json; charset=utf-8"
        }
      });
    }
  }
};
