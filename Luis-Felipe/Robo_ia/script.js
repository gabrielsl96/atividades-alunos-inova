const robot  = document.getElementById('robot');
const head   = document.getElementById('face');
const status = document.getElementById('status');
let currentMood = 'neutral', lastLook = 0, poking = false;
 
/* ---------- Public functions ----------
   Your future ESP32 code can call these same functions
   (for example from WebSocket messages, see below). */
 
function setMood(mood) {
  robot.dataset.mood = mood;
  currentMood = mood;
  document.querySelectorAll('#moodButtons button')
    .forEach(b => b.classList.toggle('on', b.dataset.mood === mood));
  status.textContent = 'Mood: ' + mood;
}
 
function lookAt(dir, auto = false) {      // 'left' | 'center' | 'right'
  const x    = { left: '-18%', center: '0%', right: '18%' }[dir] ?? '0%';
  const tilt = { left: '-4deg', center: '0deg', right: '4deg' }[dir] ?? '0deg';
  robot.style.setProperty('--lx', x);
  robot.style.setProperty('--tilt', tilt);
  if (!auto) { lastLook = Date.now(); status.textContent = 'Looking ' + dir; }
}
 
function flash(el, cls, ms) {
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), ms);
}
function blink() { flash(robot, 'blink', 140); }
function wink()  { flash(robot, 'wink', 350); }
function talk(ms = 2500) { flash(robot, 'talk', ms); status.textContent = 'Talking…'; }
function dance(ms = 3000) { flash(robot, 'dance', ms); status.textContent = 'Dancing'; }
 
let waving = false;
function wave(ms = 2400) {                // smile, wave the hand, show "Hi!"
  if (waving) return;
  waving = true;
  const prev = currentMood;
  setMood('happy');
  flash(robot, 'wave', ms);
  flash(robot, 'talk', 1400);
  status.textContent = 'Waving';
  setTimeout(() => { setMood(prev); waving = false; }, ms);
}
 
/* ---------- Auto blink ---------- */
let autoBlink = true, blinkTimer;
function scheduleBlink() {
  clearTimeout(blinkTimer);
  blinkTimer = setTimeout(() => {
    if (autoBlink) blink();
    scheduleBlink();
  }, 2000 + Math.random() * 3000);
}
 
/* ---------- Buttons ---------- */
document.querySelectorAll('#moodButtons button')
  .forEach(b => b.addEventListener('click', () => setMood(b.dataset.mood)));
 
document.getElementById('btnLeft').onclick   = () => lookAt('left');
document.getElementById('btnCenter').onclick = () => lookAt('center');
document.getElementById('btnRight').onclick  = () => lookAt('right');
document.getElementById('btnBlink').onclick  = blink;
document.getElementById('btnWink').onclick   = wink;
document.getElementById('btnTalk').onclick   = () => talk();
document.getElementById('btnDance').onclick  = () => dance();
document.getElementById('btnWave').onclick   = () => wave();
document.getElementById('btnAuto').onclick   = e => {
  autoBlink = !autoBlink;
  e.target.textContent = 'Auto blink: ' + (autoBlink ? 'on' : 'off');
};
 
/* ---------- Alive: eyes follow the pointer, random glances, poke the head ---------- */
document.addEventListener('pointermove', e => {
  const r = head.getBoundingClientRect();
  const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
  const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
  robot.style.setProperty('--ex', (dx * 16) + 'px');
  robot.style.setProperty('--ey', (dy * 10) + 'px');
});
 
setInterval(() => {                       // glance around if nobody pressed look
  if (Date.now() - lastLook > 6000)
    lookAt(['left', 'center', 'right'][Math.floor(Math.random() * 3)], true);
}, 4000);
 
head.addEventListener('click', () => {    // poke!
  if (poking) return;
  poking = true;
  const prev = currentMood;
  setMood('surprised');
  setTimeout(() => { setMood(prev); poking = false; }, 900);
});
 
/* ---------- Future ESP32 hook (disabled for now) ----------
   When your ESP32 runs a WebSocket server, uncomment this and
   send simple text commands such as "mood:happy", "look:left", "blink".
 
const ws = new WebSocket('ws://192.168.4.1:81');
ws.onmessage = (ev) => {
  const [cmd, value] = ev.data.split(':');
  if (cmd === 'mood')  setMood(value);
  if (cmd === 'look')  lookAt(value);
  if (cmd === 'blink') blink();
  if (cmd === 'wink')  wink();
  if (cmd === 'talk')  talk();
  if (cmd === 'dance') dance();
  if (cmd === 'wave')  wave();
};
*/
 
setMood('neutral');
scheduleBlink();
 