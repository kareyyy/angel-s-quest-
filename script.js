// ====== LEVELS ======
const LEVELS = [
  {
    tiles:[
      {x:150,y:150},{x:700,y:150},{x:425,y:300},
      {x:200,y:480},{x:650,y:480},{x:350,y:500},{x:500,y:300}
    ],
    enemy: {x:200, y:100, speed:1.7}
  }
];

// ====== STATE ======
const gameState = {
  playerX:425, playerY:520, playerSpeed:3.2,
  score:0, currentLevel:0, tiles:[],
  enemyX: 0, enemyY: 0, enemySpeed: 1.7, enemyActive: false
};

// ====== DOM ======
const playerEl  = document.getElementById('player');
const scoreEl   = document.getElementById('score');
const levelEl   = document.getElementById('level');
const titleScreen = document.getElementById('title-screen');
const gameContainer = document.getElementById('game-container');
const starfield  = document.getElementById('starfield');
const enemyEl = document.getElementById('enemy');
const controls = document.getElementById('controls');
const mobileControls = document.getElementById('mobile-controls');

// ====== Starfield ======
function createStarfield(){
  for(let i=0;i<30;i++){
    const s=document.createElement('div'); s.className='star';
    const size=Math.random()*3+1;
    s.style.width=s.style.height=size+'px';
    s.style.left=Math.random()*100+'%';
    s.style.top=Math.random()*100+'%';
    s.style.animationDelay=Math.random()*3+'s';
    starfield.appendChild(s);
  }
}
createStarfield();

// ====== Adjust Scaling on Resize (for touch, phone/tablet, etc) ======
function updateScale() {
  // This ensures all elements scale smoothly if container size changes (esp mobile)
  // (You can expand this for more advanced layouts)
  // Currently handlded mainly in CSS clamp() for font sizes and dimensions!
}
window.addEventListener('resize', updateScale);
updateScale();

// ====== Responsive Controls Hint ======
function updateControlsForDevice() {
  // Handled by CSS, but keep for future custom logic if needed.
}
window.addEventListener('resize', updateControlsForDevice);
updateControlsForDevice();

// ====== UI Flow ======
document.getElementById('start-btn').addEventListener('click', ()=>{
  titleScreen.style.display='none';
  startGame();
});

function startGame(){
  // Set up state and UI
  gameState.score = 0;
  scoreEl.textContent = `Tiles: 0 / ${LEVELS[0].tiles.length}`;
  levelEl.textContent = "Level: 1";
  // Slightly center for narrower screens
  let w = gameContainer.clientWidth, h = gameContainer.clientHeight;
  gameState.playerX = Math.floor(w/2-30); gameState.playerY = Math.floor(h*0.8-30);
  playerEl.style.left = gameState.playerX+'px'; playerEl.style.top = gameState.playerY+'px';
  document.querySelectorAll('.tile').forEach(el=>el.remove());
  gameState.tiles = [];
  LEVELS[0].tiles.forEach((t,i)=>{
    const el=document.createElement('div');
    el.className='tile gem';
    el.style.left=t.x/(900/w)+'px'; el.style.top=t.y/(650/h)+'px';
    gameContainer.appendChild(el);
    gameState.tiles.push({element:el,
      x:t.x/(900/w), y:t.y/(650/h), collected:false});
  });
  // Enemy setup
  const enemyData = LEVELS[0].enemy;
  gameState.enemyX = enemyData.x/(900/w);
  gameState.enemyY = enemyData.y/(650/h);
  gameState.enemySpeed = enemyData.speed*Math.max(w/900, h/650); // scale speed
  enemyEl.style.left = `${gameState.enemyX}px`;
  enemyEl.style.top  = `${gameState.enemyY}px`;
  enemyEl.style.display = 'block';
  gameState.enemyActive = true;
  requestAnimationFrame(gameLoop);
}

// ====== INPUT ======
const keys={};
window.addEventListener('keydown', e=>{
  keys[e.key.toLowerCase()]=true;
  if(['arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase())) e.preventDefault();
});
window.addEventListener('keyup',   e=>{ keys[e.key.toLowerCase()]=false; });

// On-screen mobile controls
document.querySelectorAll('.control-btn').forEach(btn=>{
  btn.addEventListener('touchstart', e=>{ e.preventDefault(); keys[btn.dataset.key]=true;});
  btn.addEventListener('touchend', e=>{ e.preventDefault(); keys[btn.dataset.key]=false;});
  btn.addEventListener('mousedown', e=>{ keys[btn.dataset.key]=true;});
  btn.addEventListener('mouseup', e=>{ keys[btn.dataset.key]=false;});
  btn.addEventListener('mouseleave', e=>{ keys[btn.dataset.key]=false;});
});

// ====== GAME LOOP ======
function gameLoop(){
  // Movement
  let nx = gameState.playerX, ny = gameState.playerY, moving=false;
  playerEl.classList.remove('walk-left','walk-right','walk-up','walk-down','idle');
  if(keys['w']||keys['arrowup'])  { ny-=gameState.playerSpeed;   moving=true; playerEl.classList.add('walk-up'); }
  if(keys['s']||keys['arrowdown']){ ny+=gameState.playerSpeed;   moving=true; playerEl.classList.add('walk-down');}
  if(keys['a']||keys['arrowleft']){ nx-=gameState.playerSpeed;   moving=true; playerEl.classList.add('walk-left'); }
  if(keys['d']||keys['arrowright']){nx+=gameState.playerSpeed;   moving=true; playerEl.classList.add('walk-right'); }
  if(!moving) playerEl.classList.add('idle');
  // contain within game area
  let w = gameContainer.clientWidth, h = gameContainer.clientHeight;
  let playerW = playerEl.offsetWidth, playerH = playerEl.offsetHeight;
  nx = Math.max(4, Math.min(nx, w-playerW-4));
  ny = Math.max(4, Math.min(ny, h-playerH-4));
  gameState.playerX = nx; gameState.playerY = ny;
  playerEl.style.left = gameState.playerX+'px'; playerEl.style.top = gameState.playerY+'px';

  // Enemy movement
  if (gameState.enemyActive) {
    let ex = gameState.enemyX, ey = gameState.enemyY;
    const dx = gameState.playerX - ex, dy = gameState.playerY - ey;
    const dist = Math.hypot(dx,dy) || 1;
    const spd = gameState.enemySpeed;
    ex += (dx/dist)*spd; ey += (dy/dist)*spd;
    let ew = enemyEl.offsetWidth, eh = enemyEl.offsetHeight;
    ex = Math.max(0, Math.min(ex, w-ew)); ey = Math.max(0, Math.min(ey, h-eh));
    gameState.enemyX = ex; gameState.enemyY = ey;
    enemyEl.style.left = `${ex}px`; enemyEl.style.top = `${ey}px`;
    // check collision with player
    if (rectsOverlap(gameState.playerX,gameState.playerY,playerEl.offsetWidth,playerEl.offsetHeight,ex,ey,ew,eh)) {
      enemyEl.classList.add('hit');
      setTimeout(()=>enemyEl.classList.remove('hit'),300);
      setTimeout(resetLevel,360);
      return;
    }
  }

  // Tile collision (proportional position)
  for(const t of gameState.tiles){
    if(!t.collected){
      const dx = (gameState.playerX+playerEl.offsetWidth/2) - (t.x+t.element.offsetWidth/2);
      const dy = (gameState.playerY+playerEl.offsetHeight/2) - (t.y+t.element.offsetHeight/2);
      const d = Math.hypot(dx,dy);
      if(d < t.element.offsetWidth+10){
        t.collected = true;
        t.element.classList.add('collected');
        setTimeout(()=>t.element.remove(),250);
        gameState.score++;
        scoreEl.textContent = `Tiles: ${gameState.score} / ${LEVELS[0].tiles.length}`;
      }
    }
  }

  // Win check
  if(gameState.score === LEVELS[0].tiles.length){
    setTimeout(()=>{
      alert("Well done, Traveler!\nYou collected all the tiles!");
      location.reload();
    },400);
    return;
  }

  requestAnimationFrame(gameLoop);
}

// ====== Helpers ======
function rectsOverlap(ax,ay,aw,ah,bx,by,bw,bh){
  return !(ax+aw < bx || ax > bx+bw || ay+ah < by || ay > by+bh);
}

function resetLevel() { startGame(); }

// ====== INITIALIZE ======
playerEl.style.left = gameState.playerX+'px';
playerEl.style.top  = gameState.playerY+'px';
enemyEl.style.display = 'none';
