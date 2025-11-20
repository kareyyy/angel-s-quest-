// ====== LEVELS ======
const LEVELS = [
  {
    tiles:[
      {x:150,y:150},{x:700,y:150},{x:425,y:300},
      {x:200,y:480},{x:650,y:480},{x:350,y:500},{x:500,y:300}
    ]
  }
];

// ====== STATE ======
const gameState = {
  playerX:425, playerY:520, playerSpeed:3.2,
  score:0, currentLevel:0, tiles:[]
};

// ====== DOM ======
const playerEl  = document.getElementById('player');
const scoreEl   = document.getElementById('score');
const levelEl   = document.getElementById('level');
const titleScreen = document.getElementById('title-screen');
const gameContainer = document.getElementById('game-container');
const starfield  = document.getElementById('starfield');

// ====== Starfield ======
function createStarfield(){ for(let i=0;i<30;i++){ const s=document.createElement('div'); s.className='star'; const size=Math.random()*3+1; s.style.width=s.style.height=size+'px'; s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%'; s.style.animationDelay=Math.random()*3+'s'; starfield.appendChild(s);} }
createStarfield();

// ====== UI Flow ======
document.getElementById('start-btn').addEventListener('click', ()=>{ titleScreen.style.display='none'; startGame(); });

function startGame(){
  gameState.score = 0;
  scoreEl.textContent = `Tiles: 0 / ${LEVELS[0].tiles.length}`;
  levelEl.textContent = "Level: 1";
  gameState.playerX = 425; gameState.playerY = 520;
  playerEl.style.left = gameState.playerX+'px'; playerEl.style.top = gameState.playerY+'px';
  // tiles
  document.querySelectorAll('.tile').forEach(el=>el.remove());
  gameState.tiles = [];
  LEVELS[0].tiles.forEach((t,i)=>{
    const el=document.createElement('div');
    el.className='tile gem';
    el.style.left=t.x+'px'; el.style.top=t.y+'px';
    gameContainer.appendChild(el);
    gameState.tiles.push({element:el, x:t.x, y:t.y, collected:false});
  });
  requestAnimationFrame(gameLoop);
}

// ====== INPUT ======
const keys={};
window.addEventListener('keydown', e=>{ keys[e.key.toLowerCase()]=true; if(['arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase())) e.preventDefault();});
window.addEventListener('keyup',   e=>{ keys[e.key.toLowerCase()]=false; });

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
  // Contain within game area
  nx = Math.max(4, Math.min(nx, gameContainer.clientWidth-64));
  ny = Math.max(4, Math.min(ny, gameContainer.clientHeight-64));
  gameState.playerX = nx; gameState.playerY = ny;
  playerEl.style.left = gameState.playerX+'px'; playerEl.style.top = gameState.playerY+'px';

  // Tile collision
  for(const t of gameState.tiles){
    if(!t.collected){
      const dx = (gameState.playerX+30) - (t.x+19);
      const dy = (gameState.playerY+30) - (t.y+19);
      const d = Math.hypot(dx,dy);
      if(d < 36){
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

// ====== INITIALIZE ======
playerEl.style.left = gameState.playerX+'px';
playerEl.style.top  = gameState.playerY+'px';
