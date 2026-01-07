// Game configuration
const WORLD_WIDTH = 1800;
const WORLD_HEIGHT = 1400;
const VIEWPORT_WIDTH = 900;
const VIEWPORT_HEIGHT = 650;

const LEVELS = [
    {
        name: "Twilight Meadow",
        tiles: [
            { x: 300, y: 300, type: 'gold', icon: '⭐' },
            { x: 700, y: 300, type: 'gold', icon: '⭐' },
            { x: 1200, y: 300, type: 'gold', icon: '⭐' },
            { x: 500, y: 600, type: 'gold', icon: '⭐' },
            { x: 900, y: 600, type: 'gold', icon: '⭐' },
            { x: 1400, y: 600, type: 'gold', icon: '⭐' },
            { x: 300, y: 900, type: 'gold', icon: '⭐' },
            { x: 700, y: 900, type: 'gold', icon: '⭐' },
            { x: 1200, y: 900, type: 'gold', icon: '⭐' },
            { x: 400, y: 1200, type: 'gold', icon: '⭐' },
            { x: 800, y: 1200, type: 'gold', icon: '⭐' },
            { x: 1200, y: 1200, type: 'gold', icon: '⭐' },
            { x: 600, y: 450, type: 'gold', icon: '⭐' },
            { x: 1000, y: 800, type: 'gold', icon: '⭐' },
            { x: 500, y: 1050, type: 'gold', icon: '⭐' }
        ],
        enemies: [
            { x: 500, y: 400, patrol: [[500, 400], [800, 400]], speed: 1.5 },
            { x: 1000, y: 700, patrol: [[1000, 700], [1000, 1000]], speed: 1.2 },
            { x: 600, y: 1000, patrol: [[400, 1000], [900, 1000]], speed: 1.8 }
        ],
        obstacles: [
            { x: 200, y: 500, w: 150, h: 80 },
            { x: 1100, y: 500, w: 180, h: 80 },
            { x: 600, y: 750, w: 200, h: 100 },
            { x: 350, y: 1100, w: 120, h: 120 }
        ],
        safeZones: [
            { x: 100, y: 100, w: 250, h: 150 },
            { x: 1450, y: 1200, w: 250, h: 150 }
        ]
    },
    {
        name: "Shadow Labyrinth",
        tiles: [
            { x: 250, y: 250, type: 'crystal', icon: '💎' },
            { x: 1500, y: 250, type: 'crystal', icon: '💎' },
            { x: 900, y: 400, type: 'crystal', icon: '💎' },
            { x: 400, y: 600, type: 'crystal', icon: '💎' },
            { x: 1300, y: 600, type: 'crystal', icon: '💎' },
            { x: 700, y: 800, type: 'crystal', icon: '💎' },
            { x: 300, y: 1000, type: 'crystal', icon: '💎' },
            { x: 1100, y: 1000, type: 'crystal', icon: '💎' },
            { x: 1500, y: 1150, type: 'crystal', icon: '💎' },
            { x: 500, y: 450, type: 'crystal', icon: '💎' },
            { x: 1200, y: 850, type: 'crystal', icon: '💎' },
            { x: 800, y: 1150, type: 'crystal', icon: '💎' },
            { x: 600, y: 300, type: 'crystal', icon: '💎' },
            { x: 950, y: 650, type: 'crystal', icon: '💎' },
            { x: 450, y: 1250, type: 'crystal', icon: '💎' }
        ],
        enemies: [
            { x: 600, y: 500, patrol: [[600, 500], [1000, 500]], speed: 2 },
            { x: 800, y: 900, patrol: [[500, 900], [1100, 900]], speed: 2.2 },
            { x: 400, y: 700, patrol: [[400, 500], [400, 900]], speed: 1.8 },
            { x: 1300, y: 800, patrol: [[1300, 600], [1300, 1000]], speed: 2 },
            { x: 900, y: 300, patrol: [[700, 300], [1100, 300]], speed: 1.9 }
        ],
        obstacles: [
            { x: 400, y: 350, w: 100, h: 200 },
            { x: 700, y: 550, w: 300, h: 80 },
            { x: 1200, y: 400, w: 100, h: 250 },
            { x: 500, y: 950, w: 250, h: 100 },
            { x: 1000, y: 1100, w: 150, h: 150 }
        ],
        safeZones: [
            { x: 150, y: 150, w: 200, h: 200 },
            { x: 1500, y: 50, w: 200, h: 200 }
        ]
    },
    {
        name: "Astral Sanctum",
        tiles: [
            { x: 300, y: 200, type: 'star', icon: '🌟' },
            { x: 1400, y: 200, type: 'star', icon: '🌟' },
            { x: 850, y: 350, type: 'star', icon: '🌟' },
            { x: 500, y: 550, type: 'star', icon: '🌟' },
            { x: 1200, y: 550, type: 'star', icon: '🌟' },
            { x: 350, y: 800, type: 'star', icon: '🌟' },
            { x: 900, y: 750, type: 'star', icon: '🌟' },
            { x: 1450, y: 800, type: 'star', icon: '🌟' },
            { x: 650, y: 1000, type: 'star', icon: '🌟' },
            { x: 1100, y: 1050, type: 'star', icon: '🌟' },
            { x: 400, y: 1250, type: 'star', icon: '🌟' },
            { x: 1300, y: 1250, type: 'star', icon: '🌟' },
            { x: 700, y: 450, type: 'star', icon: '🌟' },
            { x: 1050, y: 850, type: 'star', icon: '🌟' },
            { x: 850, y: 1200, type: 'star', icon: '🌟' }
        ],
        enemies: [
            { x: 700, y: 400, patrol: [[500, 400], [1000, 400]], speed: 2.5 },
            { x: 900, y: 650, patrol: [[700, 500], [1100, 800]], speed: 2.3 },
            { x: 500, y: 900, patrol: [[300, 700], [700, 1100]], speed: 2.4 },
            { x: 1300, y: 700, patrol: [[1200, 500], [1400, 900]], speed: 2.6 },
            { x: 850, y: 1100, patrol: [[600, 1100], [1100, 1100]], speed: 2.2 },
            { x: 400, y: 450, patrol: [[400, 300], [400, 600]], speed: 2.1 }
        ],
        obstacles: [
            { x: 600, y: 300, w: 150, h: 150 },
            { x: 1000, y: 500, w: 200, h: 100 },
            { x: 450, y: 650, w: 100, h: 200 },
            { x: 1250, y: 950, w: 150, h: 150 },
            { x: 750, y: 1050, w: 180, h: 80 },
            { x: 350, y: 1100, w: 120, h: 120 }
        ],
        safeZones: [
            { x: 100, y: 100, w: 250, h: 200 },
            { x: 1450, y: 50, w: 250, h: 200 },
            { x: 800, y: 1280, w: 200, h: 100 }
        ]
    }
];

// Game state
const gameState = {
    playerX: 200,
    playerY: 200,
    playerSpeed: 3.5,
    lives: 3,
    score: 0,
    totalScore: 0,
    currentLevel: 0,
    tiles: [],
    enemies: [],
    obstacles: [],
    gameStarted: false,
    isInvulnerable: false,
    cameraX: 0,
    cameraY: 0
};

// DOM elements
const world = document.getElementById('world');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const livesDisplay = document.getElementById('lives');
const titleScreen = document.getElementById('title-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const winScreen = document.getElementById('win-screen');
const gameContainer = document.getElementById('game-container');
const starfield = document.getElementById('starfield');

// Keyboard state
const keys = {};

// Create starfield
function createStarfield() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * WORLD_WIDTH + 'px';
        star.style.top = Math.random() * WORLD_HEIGHT + 'px';
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }
}

createStarfield();

// Event listeners
document.getElementById('start-btn').addEventListener('click', () => {
    titleScreen.classList.add('hidden');
    gameState.gameStarted = true;
    loadLevel(0);
    gameLoop();
});

document.getElementById('retry-btn').addEventListener('click', () => {
    location.reload();
});

document.getElementById('replay-btn').addEventListener('click', () => {
    location.reload();
});

// Load level
function loadLevel(levelIndex) {
    gameState.currentLevel = levelIndex;
    gameState.score = 0;
    gameState.tiles = [];
    gameState.enemies = [];
    gameState.obstacles = [];

    // Clear existing elements
    document.querySelectorAll('.tile, .enemy, .obstacle, .ground, .safe-zone').forEach(el => el.remove());

    const level = LEVELS[levelIndex];
    levelDisplay.textContent = `🌟 Realm: ${levelIndex + 1}`;
    scoreDisplay.textContent = `✨ Relics: 0 / ${level.tiles.length}`;

    // Reset player position
    gameState.playerX = 200;
    gameState.playerY = 200;

    // Add ground tiles
    for (let x = 0; x < WORLD_WIDTH; x += 100) {
        for (let y = 0; y < WORLD_HEIGHT; y += 100) {
            const ground = document.createElement('div');
            ground.className = 'ground';
            ground.style.left = x + 'px';
            ground.style.top = y + 'px';
            ground.style.width = '100px';
            ground.style.height = '100px';
            world.appendChild(ground);
        }
    }

    // Add safe zones
    level.safeZones.forEach(zone => {
        const safeZone = document.createElement('div');
        safeZone.className = 'ground safe-zone';
        safeZone.style.left = zone.x + 'px';
        safeZone.style.top = zone.y + 'px';
        safeZone.style.width = zone.w + 'px';
        safeZone.style.height = zone.h + 'px';
        world.appendChild(safeZone);
    });

    // Spawn tiles
    level.tiles.forEach((tileData, index) => {
        const tile = document.createElement('div');
        tile.className = `tile ${tileData.type}`;
        tile.textContent = tileData.icon;
        tile.style.left = tileData.x + 'px';
        tile.style.top = tileData.y + 'px';
        tile.dataset.index = index;
        tile.style.animationDelay = index * 0.15 + 's';
        world.appendChild(tile);
        gameState.tiles.push({ 
            element: tile, 
            x: tileData.x, 
            y: tileData.y, 
            collected: false 
        });
    });

    // Spawn obstacles
    level.obstacles.forEach((obs) => {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.style.left = obs.x + 'px';
        obstacle.style.top = obs.y + 'px';
        obstacle.style.width = obs.w + 'px';
        obstacle.style.height = obs.h + 'px';
        world.appendChild(obstacle);
        gameState.obstacles.push({
            x: obs.x,
            y: obs.y,
            w: obs.w,
            h: obs.h
        });
    });

    // Spawn enemies
    level.enemies.forEach((enemyData, index) => {
        const enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.left = enemyData.x + 'px';
        enemy.style.top = enemyData.y + 'px';
        enemy.innerHTML = '<div class="enemy-sprite"></div>';
        world.appendChild(enemy);
        
        gameState.enemies.push({
            element: enemy,
            x: enemyData.x,
            y: enemyData.y,
            patrol: enemyData.patrol,
            patrolIndex: 0,
            speed: enemyData.speed,
            direction: 1
        });
    });

    updateCamera();
}

// Keyboard input
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Update camera position
function updateCamera() {
    gameState.cameraX = Math.max(0, Math.min(gameState.playerX - VIEWPORT_WIDTH / 2, WORLD_WIDTH - VIEWPORT_WIDTH));
    gameState.cameraY = Math.max(0, Math.min(gameState.playerY - VIEWPORT_HEIGHT / 2, WORLD_HEIGHT - VIEWPORT_HEIGHT));
    
    world.style.transform = `translate(${-gameState.cameraX}px, ${-gameState.cameraY}px)`;
}

// Check collision with obstacles
function checkObstacleCollision(newX, newY) {
    const playerRect = {
        x: newX,
        y: newY,
        w: 50,
        h: 50
    };

    for (let obs of gameState.obstacles) {
        if (playerRect.x < obs.x + obs.w &&
            playerRect.x + playerRect.w > obs.x &&
            playerRect.y < obs.y + obs.h &&
            playerRect.y + playerRect.h > obs.y) {
            return true;
        }
    }
    return false;
}

// Create particle effect
function createParticles(x, y, color = '#ffd700') {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 40 + Math.random() * 30;
        particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        
        world.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }
}

// Update player position
function updatePlayerPosition() {
    player.style.left = gameState.playerX + 'px';
    player.style.top = gameState.playerY + 'px';
}

// Update enemy positions
function updateEnemies() {
    gameState.enemies.forEach(enemy => {
        const target = enemy.patrol[enemy.patrolIndex];
        const dx = target[0] - enemy.x;
        const dy = target[1] - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
            enemy.patrolIndex = (enemy.patrolIndex + 1) % enemy.patrol.length;
        } else {
            enemy.x += (dx / distance) * enemy.speed;
            enemy.y += (dy / distance) * enemy.speed;
            enemy.element.style.left = enemy.x + 'px';
            enemy.element.style.top = enemy.y + 'px';
        }
    });
}

// Check enemy collision
function checkEnemyCollision() {
    if (gameState.isInvulnerable) return;

    for (let enemy of gameState.enemies) {
        const distance = Math.sqrt(
            Math.pow(gameState.playerX + 25 - (enemy.x + 22), 2) +
            Math.pow(gameState.playerY + 25 - (enemy.y + 22), 2)
        );

        if (distance < 40) {
            hitByEnemy();
            return;
        }
    }
}

// Hit by enemy
function hitByEnemy() {
    gameState.lives--;
    updateLivesDisplay();
    
    if (gameState.lives <= 0) {
        gameOver();
        return;
    }

    // Reset player position
    gameState.playerX = 200;
    gameState.playerY = 200;
    updatePlayerPosition();
    updateCamera();

    // Make invulnerable for 2 seconds
    gameState.isInvulnerable = true;
    player.style.opacity = '0.5';
    
    setTimeout(() => {
        gameState.isInvulnerable = false;
        player.style.opacity = '1';
    }, 2000);

    createParticles(gameState.playerX + 25, gameState.playerY + 25, '#ff4444');
}

// Update lives display
function updateLivesDisplay() {
    const hearts = livesDisplay.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.style.opacity = index < gameState.lives ? '1' : '0.2';
    });
}

// Game loop
function gameLoop() {
    if (!gameState.gameStarted) return;

    let newX = gameState.playerX;
    let newY = gameState.playerY;

    // Movement
    if (keys['w'] || keys['arrowup']) {
        newY = Math.max(0, gameState.playerY - gameState.playerSpeed);
    }
    if (keys['s'] || keys['arrowdown']) {
        newY = Math.min(WORLD_HEIGHT - 50, gameState.playerY + gameState.playerSpeed);
    }
    if (keys['a'] || keys['arrowleft']) {
        newX = Math.max(0, gameState.playerX - gameState.playerSpeed);
    }
    if (keys['d'] || keys['arrowright']) {
        newX = Math.min(WORLD_WIDTH - 50, gameState.playerX + gameState.playerSpeed);
    }

    // Check obstacle collision
    if (!checkObstacleCollision(newX, newY)) {
        gameState.playerX = newX;
        gameState.playerY = newY;
    } else if (!checkObstacleCollision(newX, gameState.playerY)) {
        gameState.playerX = newX;
    } else if (!checkObstacleCollision(gameState.playerX, newY)) {
        gameState.playerY = newY;
    }

    updatePlayerPosition();
    updateCamera();
    updateEnemies();
    checkEnemyCollision();

    // Check tile collisions
    gameState.tiles.forEach((tile) => {
        if (!tile.collected) {
            const distance = Math.sqrt(
                Math.pow(gameState.playerX + 25 - (tile.x + 20), 2) +
                Math.pow(gameState.playerY + 25 - (tile.y + 20), 2)
            );

            if (distance < 40) {
                tile.collected = true;
                createParticles(tile.x + 20, tile.y + 20);
                tile.element.style.transform = 'scale(0)';
                setTimeout(() => tile.element.remove(), 300);
                
                gameState.score++;
                gameState.totalScore++;
                scoreDisplay.textContent = `✨ Relics: ${gameState.score} / ${LEVELS[gameState.currentLevel].tiles.length}`;

                // Check level completion
                if (gameState.score === LEVELS[gameState.currentLevel].tiles.length) {
                    if (gameState.currentLevel < LEVELS.length - 1) {
                        setTimeout(() => {
                            gameState.currentLevel++;
                            loadLevel(gameState.currentLevel);
                        }, 1500);
                    } else {
                        setTimeout(() => winGame(), 1500);
                    }
                }
            }
        }
    });

    requestAnimationFrame(gameLoop);
}

// Game over
function gameOver() {
    gameState.gameStarted = false;
    document.getElementById('go-score').textContent = `⭐ Relics Collected: ${gameState.totalScore}`;
    document.getElementById('go-level').textContent = `🌟 Realm Reached: ${gameState.currentLevel + 1}`;
    gameoverScreen.style.display = 'flex';
}

// Win game
function winGame() {
    gameState.gameStarted = false;
    document.getElementById('final-score').textContent = `⭐ Total Relics: ${gameState.totalScore}`;
    document.getElementById('final-lives').textContent = `❤️ Lives Remaining: ${gameState.lives}`;
    winScreen.style.display = 'flex';
}
