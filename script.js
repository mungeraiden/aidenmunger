const $=s=>document.querySelector(s);
const windows=$("#windows");
let z=10, discovered=JSON.parse(localStorage.getItem("aidenSecrets")||"[]");
let unlocked=localStorage.getItem("classifiedUnlocked")==="1";

const bootLines=[
 "Initializing system...",
 "Loading personality........ OK",
 "Loading memories........... OK",
 "Checking questionable decisions... OK",
 "Searching for purpose...... NOT FOUND",
 "Starting AIDEN MUNGER OS..."
];

let i=0;
const bootText=$("#bootText"), bar=$("#progressBar"), status=$("#bootStatus"), enter=$("#enterBtn");
const bootTimer=setInterval(()=>{
  if(i<bootLines.length){bootText.textContent=bootLines[i];bar.style.width=((i+1)/bootLines.length*100)+"%";i++}
  else{clearInterval(bootTimer);status.textContent="SYSTEM READY";enter.classList.remove("hidden")}
},650);

enter.onclick=()=>{$("#boot").classList.add("hidden");$("#desktop").classList.remove("hidden");toast("SYSTEM ONLINE");localStorage.setItem("visited","1")};

const content={
about:`<h2>AIDEN</h2>
<div class="stat"><b>NAME</b><span>Aiden Munger</span></div>
<div class="stat"><b>STATUS</b><span class="green">Somewhere out there</span></div>
<div class="stat"><b>SPECIES</b><span>Human (allegedly)</span></div>
<div class="stat"><b>OPERATING SYSTEM</b><span>Aiden Munger OS</span></div>
<h3>ABOUT</h3><p>Welcome to the least necessary operating system on the internet.</p><p class="dim">This file is intentionally incomplete.</p>`,
lore:`<h2>THE LORE</h2><div class="card">Chapter 01 — <b>THE BEGINNING</b><p class="dim">Information redacted.</p></div><div class="card">Chapter 02 — <b>THE INCIDENT</b><p class="dim">You need higher clearance.</p></div><div class="card">Chapter 03 — <b>THE FUTURE</b><p class="dim">File not yet written.</p></div>`,
photos:`<h2>PHOTO ARCHIVE</h2><div class="fake-photo">📷</div><p>IMAGE_001.jpg — unavailable</p><p class="dim">The archive is waiting for content.</p>`,
games:`<h2>GAMES</h2><div class="card"><b>GUESS THE NUMBER</b><p>I'm thinking of a number from 1–10.</p><button id="guessBtn">MAKE A GUESS</button></div><div class="card"><b>COMING SOON</b><p class="dim">More questionable games will be installed.</p></div>`,
music:`<h2>MUSIC</h2><p>♫ Aiden's highly classified soundtrack.</p><div class="card">TRACK_01 — <span class="dim">REDACTED</span></div><div class="card">TRACK_02 — <span class="dim">REDACTED</span></div>`,
archives:`<h2>ARCHIVES</h2><p class="dim">Old files. Weird memories. Things that should probably stay buried.</p><div class="card">ARCHIVE_001 — STATUS: LOCKED</div><div class="card">ARCHIVE_002 — STATUS: LOCKED</div><div class="card">ARCHIVE_003 — STATUS: LOCKED</div>`,
trash:`<h2>TRASH</h2><p>There are currently <b>0</b> deleted files.</p><p class="warning">That's not true.</p><p class="dim">Try the terminal.</p>`,
classified:`<h2>CLASSIFIED</h2><p class="warning">UNAUTHORIZED ACCESS DETECTED.</p><div class="card">SUBJECT: AIDEN MUNGER<br>THREAT LEVEL: ████████<br>STATUS: UNKNOWN</div><p>You've found something you weren't supposed to find.</p><p class="dim">This is only the beginning.</p>`
};

function openWindow(type){
 if(type==="terminal"){openTerminal();return}
 const id="w-"+type;
 if(document.getElementById(id)){focusWin(document.getElementById(id));return}
 const w=document.createElement("div");w.className="window";w.id=id;w.style.left=Math.max(20,Math.random()*35+22)+"vw";w.style.top=Math.max(35,Math.random()*20+12)+"vh";w.style.zIndex=++z;
 w.innerHTML=`<div class="titlebar"><b>${type.toUpperCase()} // AIDEN MUNGER OS</b><div class="win-buttons"><button class="min">—</button><button class="close">×</button></div></div><div class="window-content">${content[type]}</div>`;
 windows.appendChild(w); makeDraggable(w); addTask(type,id);
 w.querySelector(".close").onclick=()=>{w.remove();document.getElementById("task-"+type)?.remove()};
 w.querySelector(".min").onclick=()=>w.style.display="none";
 if(type==="games") w.querySelector("#guessBtn").onclick=()=>{const n=Math.ceil(Math.random()*10);const g=prompt("Guess 1–10:");toast(Number(g)===n?`Correct. It was ${n}.`:`Nope. It was ${n}.`)};
}

function openTerminal(){
 const id="w-terminal";if(document.getElementById(id)){focusWin(document.getElementById(id));return}
 const w=document.createElement("div");w.className="window";w.id=id;w.style.left="25vw";w.style.top="18vh";w.style.zIndex=++z;
 w.innerHTML=`<div class="titlebar"><b>TERMINAL // ROOT</b><div class="win-buttons"><button class="min">—</button><button class="close">×</button></div></div>
 <div class="window-content"><div class="terminal-output" id="termOut">AIDEN MUNGER OS TERMINAL v2.026\nType <span class="green">help</span> for available commands.\n\n</div><div class="cmdline"><span>guest@aiden:~$</span><input id="terminalInput" autocomplete="off" autofocus></div></div>`;
 windows.appendChild(w);makeDraggable(w);addTask("terminal",id);
 w.querySelector(".close").onclick=()=>{w.remove();document.getElementById("task-terminal")?.remove()};
 w.querySelector(".min").onclick=()=>w.style.display="none";
 const input=w.querySelector("#terminalInput");input.focus();input.onkeydown=e=>{if(e.key==="Enter"){runCmd(input.value.trim());input.value=""}};focusWin(w);
}
function runCmd(cmd){
 const out=$("#termOut"); if(!out)return;
 const c=cmd.toLowerCase();
 let r="";
 if(c==="help")r="AVAILABLE COMMANDS\nhelp   about   clear   ls   whoami   status   unlock\n";
 else if(c==="about")r="AIDEN MUNGER OS\nA questionable website by Aiden.\n";
 else if(c==="whoami")r="guest\nclearance: low\ncuriosity: high\n";
 else if(c==="status")r="SYSTEM: ONLINE\nSECRETS FOUND: "+discovered.length+"\nCLASSIFIED: "+(unlocked?"UNLOCKED":"LOCKED");
 else if(c==="ls")r="AIDEN/\nLORE/\nARCHIVES/\nCLASSIFIED/\n???\n";
 else if(c==="clear"){out.textContent="";return}
 else if(c==="unlock"){unlocked=true;localStorage.setItem("classifiedUnlocked","1");$("#classifiedIcon").classList.remove("hidden");r="ACCESS GRANTED.\nCLASSIFIED FILES ARE NOW VISIBLE.";toast("NEW AREA UNLOCKED")}
 else if(c==="sudo")r="Nice try.";
 else if(c==="rm -rf /")r="Absolutely not.";
 else if(c==="secret"||c==="???"){unlockSecret("terminal");r="You found something.\nLook around the desktop."}
 else r=`command not found: ${cmd}`;
 out.textContent+=`guest@aiden:~$ ${cmd}\n${r}\n\n`;
 out.scrollTop=out.scrollHeight;
}
function unlockSecret(key){if(!discovered.includes(key)){discovered.push(key);localStorage.setItem("aidenSecrets",JSON.stringify(discovered));toast("SECRET DISCOVERED");}}

function addTask(type,id){const b=document.createElement("button");b.className="task";b.id="task-"+type;b.textContent=type.toUpperCase();b.onclick=()=>{const w=$("#"+id);w.style.display="block";focusWin(w)};$("#taskItems").appendChild(b)}
function focusWin(w){w.style.zIndex=++z}
function makeDraggable(w){
 const bar=w.querySelector(".titlebar");let drag=false,dx=0,dy=0;
 bar.onmousedown=e=>{drag=true;focusWin(w);dx=e.clientX-w.offsetLeft;dy=e.clientY-w.offsetTop;bar.style.cursor="grabbing"};
 document.onmousemove=e=>{if(drag){w.style.left=Math.max(0,Math.min(innerWidth-w.offsetWidth,e.clientX-dx))+"px";w.style.top=Math.max(0,Math.min(innerHeight-70,e.clientY-dy))+"px"}};
 document.onmouseup=()=>{drag=false;bar.style.cursor="grab"};
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("toast-show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("toast-show"),2200)}
document.querySelectorAll(".icon[data-window]").forEach(b=>b.onclick=()=>openWindow(b.dataset.window));
$("#classifiedIcon").onclick=()=>unlocked?openWindow("classified"):(toast("ACCESS DENIED — FIND THE KEY"),unlockSecret("classified-clue"));
$("#startBtn").onclick=()=>$("#startMenu").classList.toggle("hidden");
document.querySelectorAll("#startMenu [data-window]").forEach(b=>b.onclick=()=>{$("#startMenu").classList.add("hidden");openWindow(b.dataset.window)});
$("#shutdown").onclick=()=>{document.querySelector("#desktop").classList.add("hidden");$("#boot").classList.remove("hidden");enter.classList.add("hidden");status.textContent="SYSTEM OFFLINE";bar.style.width="0";setTimeout(()=>{bar.style.width="100%";enter.classList.remove("hidden")},700)};
setInterval(()=>$("#clock").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"}),1000);

// Konami-ish keyboard easter egg
let seq="";
document.addEventListener("keydown",e=>{
 seq=(seq+e.key.toLowerCase()).slice(-12);
 if(seq.includes("aiden")){unlockSecret("aiden");toast("WHY DID YOU TYPE THAT?");openWindow("classified")}
});
