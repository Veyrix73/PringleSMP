const CLOUD_STATUS_URL="https://pringlesmp-status.davis-zalais.workers.dev";
async function getStatus(){
 try{
  const r=await fetch(CLOUD_STATUS_URL+"?t="+Date.now(),{cache:"no-store"});
  const d=await r.json();
  const online=!!d.online;
  const count=d.players?.online??0, max=d.players?.max??0;
  document.querySelectorAll("[data-online]").forEach(e=>e.textContent=online?"ONLINE":"OFFLINE");
  document.querySelectorAll("[data-players]").forEach(e=>e.textContent=online?count:"0");
  document.querySelectorAll("[data-max]").forEach(e=>e.textContent=online?max:"—");
  const dot=document.getElementById("dot"),state=document.getElementById("state"),players=document.getElementById("players");
  if(dot)dot.className="dot "+(online?"online":"offline");
  if(state)state.textContent=online?"Online":"Offline";
  if(players)players.textContent=online?count:"0";
  const last=document.getElementById("last"); if(last)last.textContent="Updated just now";
 }catch(e){
  document.querySelectorAll("[data-online]").forEach(x=>x.textContent="UNKNOWN");
  const dot=document.getElementById("dot"),state=document.getElementById("state");
  if(dot)dot.className="dot offline"; if(state)state.textContent="Status unavailable";
 }
}
function copyIP(){navigator.clipboard?.writeText("pringlesmp.mcsh.io");const e=document.getElementById("copy");if(e){e.textContent="COPIED";setTimeout(()=>e.textContent="COPY",1200)}}
getStatus();setInterval(getStatus,30000);