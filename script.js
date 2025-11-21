// ======= LEVEL CONFIG =======
const LEVELS = [
  {
    name: "Meadow of Beginnings",
    story: "The Meadow of Beginnings awaits. Gather the golden tiles that hold ancient wisdom...",
    tiles: [
      {x:150,y:150,type:'gold'}, {x:700,y:150,type:'gold'}, {x:425,y:300,type:'gold'},
      {x:200,y:480,type:'gold'}, {x:650,y:480,type:'gold'}, {x:350,y:500,type:'gold'},
      {x:500,y:500,type:'gold'}
    ],
    orbCount: 1
  },
  {
    name: "Crystal Caverns",
    story: "Deep within the Crystal Caverns, mystical gems await your discovery. Navigate carefully...",
    tiles: [
      {x:120,y:120,type:'crystal'}, {x:730,y:120,type:'crystal'}, {x:425,y:200,type:'crystal'},
      {x:250,y:400,type:'crystal'}, {x:600,y:400,type:'crystal'}, {x:425,y:520,type:'crystal'},
      {x:150,y:300,type:'crystal'}
    ],
    orbCount: 2
  },
  {
    name: "Starlight Sanctuary",
    story: "You've reached the final realm — the Starlight Sanctuary. Collect the celestial stars to complete your quest!",
    tiles: [
      {x:100,y:100,type:'star'}, {x:750,y:100,type:'star'}, {x:425,y:150,type:'star'},
      {x:200,y:450,type:'star'}, {x:650,y:450,type:'star'}, {x:300,y:300,type:'star'},
      {x:550,y:300,type:'star'}
    ],
    orbCount: 3
  }
];

// ======= GAME STATE =======
const state = {
  playerX: 425, playerY: 520, speed: 3.2, // slow movement
  score: 0, totalScore: 0, level: 0,
  tiles: [], orbs: [], gameStarted: false
};

// ======= DOM =======
const playerEl = document.getElementById('player');
const playerImg = null; // sprite is CSS-based
const tilesContainer = document.getElementById('tiles');
const orbsContainer = document.getElementById('orbs');
const particles = document.getElementById('particles');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const titleScreen = document.getElementById('title-screen');
const storyScreen = document.getElementById('story-screen');
const storyTitle = document.getElementById('story-title');
const storyText = document.getElementById('story-text');
const winScreen = document.getElementById('win-screen');

// starfield small helper
function createStarfield(){
  const field = document.getElementById('starfield');
  for(let i=0;i<28;i++){
    const s = document.createElement('div'); s.className='star';
    const size = Math.random()*3 + 1;
    s.style.width = s.style.height = size + 'px';
    s.style.left = Math.random()*100 + '%';
    s.style.top = Math.random()*100 + '%';
    s.style.animationDelay = Math.random()*3 + 's';
    field.appendChild(s);
  }
}
createStarfield();

// ======= UI Flow =======
document.getElementById('start-btn').addEventListener('click', () => {
  titleScreen.classList.add('hidden');
  showStory();
});
document.getElementById('continue-btn').addEventListener('click', () => {
  storyScreen.classList.add('hidden');
  if(!state.gameStarted){
    state.gameStarted = true;
    loadLevel(0);
    requestAnimationFrame(loop);
  } else {
    loadLevel(state.level);
  }
});
document.getElementById('replay-btn').addEventListener('click', ()=> location.reload());

function showStory(){
  const lvl = LEVELS[state.level];
  storyTitle.textContent = `Chapter ${state.level+1}: ${lvl.name}`;
  storyText.textContent = lvl.story;
  storyScreen.classList.remove('hidden');
}

// ======= Level / spawn logic =======
function clearLevel(){
  document.querySelectorAll('.tile').forEach(e => e.remove());
  document.querySelectorAll('.orb').forEach(e => e.remove());
  state.tiles = []; state.orbs = [];
}

function createSVG(type){
  if(type==='gold') return `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#ffd86d" d="M12 2l2.4 5.5L20 10l-5 3.6L16 20 12 16.8 8 20l1-6.4L4 10l5.6-2.5L12 2z"/></svg>`;
  if(type==='crystal') return `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#a8edea" d="M12 2l4 6 6 2-6 4-4 6-4-6L2 10l6-2 4-6z"/></svg>`;
  return `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#ffe9a8" d="M12 .9l3.1 6.3L22 8.2l-5 4.8L18.2 22 12 18.6 5.8 22 7 13 2 8.2l6.9-1L12 .9z"/></svg>`;
}

function loadLevel(index){
  clearLevel();
  state.level = index;
  state.score = 0;
  const lvl = LEVELS[index];
  levelEl.textContent = `Level: ${index+1}`;
  scoreEl.textContent = `Tiles: 0 / ${lvl.tiles.length}`;

  // place player center-ish
  const gc = document.getElementById('game-container');
  state.playerX = Math.floor(gc.clientWidth/2 - 32);
  state.playerY = Math.floor(gc.clientHeight * 0.8 - 32);
  updatePlayer();

  // spawn tiles
  for(let i=0;i<lvl.tiles.length;i++){
    const t = lvl.tiles[i];
    const el = document.createElement('div');
    el.className = 'tile ' + t.type;
    el.innerHTML = createSVG(t.type);
    // If the level size is the design size (900x650), we stamp those coords relative to container size
    const ratioX = gc.clientWidth / 900;
    const ratioY = gc.clientHeight / 650;
    const px = Math.round(t.x * ratioX);
    const py = Math.round(t.y * ratioY);
    el.style.left = px + 'px';
    el.style.top = py + 'px';
    tilesContainer.appendChild(el);
    state.tiles.push({element: el, x: px, y: py, collected: false});
  }

  // spawn orbs (enemies)
  for(let i=0;i<lvl.orbCount;i++){
    spawnOrb();
  }
}

// spawn orb at random edge
function spawnOrb(){
  const gc = document.getElementById('game-container');
  const side = Math.floor(Math.random()*4);
  let x,y;
  if(side===0){ x = -40; y = rand(20, gc.clientHeight - 40); }
  else if(side===1){ x = gc.clientWidth + 40; y = rand(20, gc.clientHeight - 40); }
  else if(side===2){ x = rand(20, gc.clientWidth - 40); y = -40; }
  else { x = rand(20, gc.clientWidth - 40); y = gc.clientHeight + 40; }
  const el = document.createElement('div'); el.className = 'orb';
  el.style.left = x + 'px'; el.style.top = y + 'px';
  orbsContainer.appendChild(el);
  const speed = 0.6 + 0.2 * state.level + Math.random()*0.6;
  state.orbs.push({el,x,y,speed});
}

// ======= Input =======
const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
  if(['arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase())) e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

// mobile buttons
document.querySelectorAll('.control-btn').forEach(btn => {
  btn.addEventListener('touchstart', e => { e.preventDefault(); keys[btn.dataset.key] = true; });
  btn.addEventListener('touchend', e => { e.preventDefault(); keys[btn.dataset.key] = false; });
  btn.addEventListener('mousedown', e => { keys[btn.dataset.key] = true; });
  btn.addEventListener('mouseup', e => { keys[btn.dataset.key] = false; });
});

// ======= Helpers =======
function rand(a,b){ return Math.random() * (b-a) + a; }
function rectOverlap(ax,ay,aw,ah,bx,by,bw,bh){
  return !(ax+aw < bx || ax > bx + bw || ay+ah < by || ay > by + bh);
}
function updatePlayer(){
  playerEl.style.left = Math.round(state.playerX) + 'px';
  playerEl.style.top  = Math.round(state.playerY) + 'px';
}

// particles
function createParticles(cx,cy){
  for(let i=0;i<8;i++){
    const p = document.createElement('div'); p.className='p';
    p.style.left = cx + 'px'; p.style.top = cy + 'px';
    const angle = (Math.PI*2*i)/8; const dist = 18 + Math.random()*20;
    p.style.setProperty('--tx', Math.cos(angle)*dist + 'px'); p.style.setProperty('--ty', Math.sin(angle)*dist + 'px');
    particles.appendChild(p);
    setTimeout(()=>p.remove(),900);
  }
}

// ======= Main loop =======
let last = 0;
function loop(ts){
  if(!state.gameStarted) return;
  if(!last) last = ts;
  const dt = ts - last; last = ts;

  // movement
  let nx = state.playerX, ny = state.playerY;
  let moving = false;
  playerEl.classList.remove('walk-left','walk-right','walk-up','walk-down','idle');
  if(keys['w']||keys['arrowup']){ ny -= state.speed; moving = true; playerEl.classList.add('walk-up'); }
  if(keys['s']||keys['arrowdown']){ ny += state.speed; moving = true; playerEl.classList.add('walk-down'); }
  if(keys['a']||keys['arrowleft']){ nx -= state.speed; moving = true; playerEl.classList.add('walk-left'); }
  if(keys['d']||keys['arrowright']){ nx += state.speed; moving = true; playerEl.classList.add('walk-right'); }
  if(!moving) playerEl.classList.add('idle');

  // bounds
  const gc = document.getElementById('game-container');
  const pw = playerEl.offsetWidth, ph = playerEl.offsetHeight;
  nx = Math.max(4, Math.min(nx, gc.clientWidth - pw - 4));
  ny = Math.max(4, Math.min(ny, gc.clientHeight - ph - 4));
  // apply collision with obstacles? (none included now)
  state.playerX = nx; state.playerY = ny;
  updatePlayer();

  // move orbs (chase)
  for(const orb of state.orbs){
    const dx = (state.playerX - orb.x), dy = (state.playerY - orb.y);
    const dist = Math.hypot(dx,dy) || 1;
    orb.x += (dx/dist) * orb.speed;
    orb.y += (dy/dist) * orb.speed;
    orb.el.style.left = Math.round(orb.x) + 'px';
    orb.el.style.top  = Math.round(orb.y) + 'px';
    // collision with player -> reset level (penalty)
    if(rectOverlap(state.playerX, state.playerY, pw, ph, orb.x, orb.y, orb.el.offsetWidth, orb.el.offsetHeight)){
      // flash and reset
      flashAndReset();
      return;
    }
  }

  // check tiles
  for(const t of state.tiles){
    if(!t.collected){
      const dx = (state.playerX + pw/2) - (t.x + t.element.offsetWidth/2);
      const dy = (state.playerY + ph/2) - (t.y + t.element.offsetHeight/2);
      const d = Math.hypot(dx,dy);
      if(d < 46){
        t.collected = true;
        createParticles(t.x + t.element.offsetWidth/2, t.y + t.element.offsetHeight/2);
        t.element.classList.add('collected');
        setTimeout(()=> t.element.remove(), 300);
        state.score++; state.totalScore++;
        scoreEl.textContent = `Tiles: ${state.score} / ${LEVELS[state.level].tiles.length}`;
        // level complete?
        if(state.score === LEVELS[state.level].tiles.length){
          // next or win
          if(state.level < LEVELS.length - 1){
            state.gameStarted = false;
            setTimeout(()=> { state.level++; showStory(); }, 700);
            return;
          } else {
            state.gameStarted = false;
            setTimeout(()=> win(), 700);
            return;
          }
        }
      }
    }
  }

  requestAnimationFrame(loop);
}

// flash + reset logic when hit by orb
function flashAndReset(){
  const gc = document.getElementById('game-container');
  gc.style.transition = 'filter 0.12s';
  gc.style.filter = 'grayscale(.9) brightness(.6)';
  setTimeout(()=> gc.style.filter = '', 220);
  // reset current level after short pause
  setTimeout(()=> loadLevel(state.level), 350);
}

// win
function win(){
  document.getElementById('win-screen').classList.remove('hidden');
}

// ======= Boot / load =======
function loadLevel(index){
  clearTimeout(); // no-op but safe
  // clear containers
  tilesContainer.innerHTML = ''; orbsContainer.innerHTML = ''; particles.innerHTML = '';
  state.tiles = []; state.orbs = []; state.score = 0;
  const lvl = LEVELS[index]; state.level = index;
  levelEl.textContent = `Level: ${index+1}`;
  scoreEl.textContent = `Tiles: 0 / ${lvl.tiles.length}`;

  // position player
  const gc = document.getElementById('game-container');
  state.playerX = Math.round(gc.clientWidth/2 - playerEl.offsetWidth/2);
  state.playerY = Math.round(gc.clientHeight * 0.75 - playerEl.offsetHeight/2);
  updatePlayer();

  // tiles (coords scaled from design 900x650)
  for(const t of lvl.tiles){
    const el = document.createElement('div'); el.className = 'tile ' + t.type;
    el.innerHTML = createSVGPlaceholder(t.type);
    const ratioX = gc.clientWidth / 900; const ratioY = gc.clientHeight / 650;
    const px = Math.round(t.x * ratioX); const py = Math.round(t.y * ratioY);
    el.style.left = px + 'px'; el.style.top = py + 'px';
    tilesContainer.appendChild(el);
    state.tiles.push({element: el, x: px, y: py, collected: false});
  }

  // spawn orbs
  for(let i=0;i<lvl.orbCount;i++) spawnOrb();

  // start loop
  state.gameStarted = true;
  requestAnimationFrame(loop);
}

// helper to create tiny svg inside tiles (same as earlier but inline here)
function createSVGPlaceholder(type){
  if(type==='gold') return `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#ffd86d" d="M12 2l2.4 5.5L20 10l-5 3.6L16 20 12 16.8 8 20l1-6.4L4 10l5.6-2.5L12 2z"/></svg>`;
  if(type==='crystal') return `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#a8edea" d="M12 2l4 6 6 2-6 4-4 6-4-6L2 10l6-2 4-6z"/></svg>`;
  return `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#ffe9a8" d="M12 .9l3.1 6.3L22 8.2l-5 4.8L18.2 22 12 18.6 5.8 22 7 13 2 8.2l6.9-1L12 .9z"/></svg>`;
}

// tiny spawn orb uses spawnOrb function above; but ensure spawnOrb exists for loadLevel
function spawnOrb(){
  const gc = document.getElementById('game-container');
  const side = Math.floor(Math.random()*4);
  let x,y;
  if(side===0){ x = -40; y = rand(20, gc.clientHeight - 40); }
  else if(side===1){ x = gc.clientWidth + 40; y = rand(20, gc.clientHeight - 40); }
  else if(side===2){ x = rand(20, gc.clientWidth - 40); y = -40; }
  else { x = rand(20, gc.clientWidth - 40); y = gc.clientHeight + 40; }
  const el = document.createElement('div'); el.className = 'orb';
  el.style.left = x + 'px'; el.style.top = y + 'px';
  orbsContainer.appendChild(el);
  const speed = 0.6 + 0.15 * state.level + Math.random()*0.6;
  state.orbs.push({el,x,y,speed});
}

// helper duplication because used earlier (kept here for clarity)
function createSVGPlaceholder(type){ 
  if(type==='gold') return `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#ffd86d" d="M12 2l2.4 5.5L20 10l-5 3.6L16 20 12 16.8 8 20l1-6.4L4 10l5.6-2.5L12 2z"/></svg>`;
  if(type==='crystal') return `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#a8edea" d="M12 2l4 6 6 2-6 4-4 6-4-6L2 10l6-2 4-6z"/></svg>`;
  return `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#ffe9a8" d="M12 .9l3.1 6.3L22 8.2l-5 4.8L18.2 22 12 18.6 5.8 22 7 13 2 8.2l6.9-1L12 .9z"/></svg>`;
}

// ======= Start by loading first menu =======
function init(){
  // place CSS player default
  const gc = document.getElementById('game-container');
  state.playerX = Math.round(gc.clientWidth/2 - playerEl.offsetWidth/2);
  state.playerY = Math.round(gc.clientHeight * 0.75 - playerEl.offsetHeight/2);
  updatePlayer();
  // responsive mobile controls toggle
  if(window.innerWidth < 780) document.getElementById('mobile-controls').classList.remove('hidden');
}
init();