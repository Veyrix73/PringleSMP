# PringleSMP simple cloud status

This repo is set up for a simple cloud-backed Minecraft status page.

## Files
- `index.html` = the GitHub Pages website
- `worker.js` = the cloud Worker

## Very simple setup

1. Put `worker.js` into a Cloudflare Worker.
2. Click **Deploy**.
3. Copy the Worker URL.
4. Open `index.html`.
5. Replace:
   `PASTE_WORKER_URL_HERE`
   with your Worker URL.
6. Commit the changed `index.html`.

The website then checks the cloud Worker every 30 seconds.

Your PC does not need to run a program or stay on.

## GitHub Pages

Turn on GitHub Pages for this repository and publish the `main` branch from the root.

## Important

The Worker currently checks:
`57.128.140.147:25565`

That is the MCSH IP/Java port seen in the DNS test. If MCSH changes the server IP or port, update that one line in `worker.js`.

MCSRVSTAT's API is cached, so a 30-second page refresh does not guarantee a fresh Minecraft query every 30 seconds.
