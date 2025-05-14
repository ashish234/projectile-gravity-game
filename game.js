const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const gravitySlider = document.getElementById('gravity');
const gLabel = document.getElementById('gVal');

let gravity = parseFloat(gravitySlider.value);
let projectile = { x: 50, y: 450, vx: 5, vy: -12, radius: 10, launched: false };

gravitySlider.oninput = () => {
  gravity = parseFloat(gravitySlider.value);
  gLabel.textContent = gravity;
};

canvas.addEventListener('click', () => {
  if (!projectile.launched) {
    projectile.launched = true;
  }
});

function reset() {
  projectile = { x: 50, y: 450, vx: 5, vy: -12, radius: 10, launched: false };
}

function drawProjectile() {
  ctx.beginPath();
  ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'lime';
  ctx.fill();
}

function update() {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (projectile.launched) {
    projectile.x += projectile.vx;
    projectile.y += projectile.vy;
    projectile.vy += gravity;
  }

  if (projectile.y > canvas.height - projectile.radius) {
    projectile.y = canvas.height - projectile.radius;
    projectile.vy *= -0.6; // bounce effect
  }

  drawProjectile();
  requestAnimationFrame(update);
}

update();