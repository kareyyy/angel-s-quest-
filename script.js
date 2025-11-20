const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");
const sprite = player.querySelector(".sprite");

let posX = 46;
let posY = 70;

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  player.classList.remove("hidden");
});

// Movement
document.addEventListener("keydown", (e) => {
  let moved = false;

  sprite.classList.remove("idle");
  sprite.className = "sprite";

  if (e.key === "a" || e.key === "A") {
    posX -= 1;
    sprite.classList.add("walk-left");
    moved = true;
  }
  if (e.key === "d" || e.key === "D") {
    posX += 1;
    sprite.classList.add("walk-right");
    moved = true;
  }
  if (e.key === "w" || e.key === "W") {
    posY -= 1;
    sprite.classList.add("walk-up");
    moved = true;
  }
  if (e.key === "s" || e.key === "S") {
    posY += 1;
    sprite.classList.add("walk-down");
    moved = true;
  }

  if (moved) {
    player.style.left = posX + "%";
    player.style.top = posY + "%";
  }
});

document.addEventListener("keyup", () => {
  sprite.className = "sprite idle";
});
