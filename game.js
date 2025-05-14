const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gravitySlider = document.getElementById('gravity');
const gLabel = document.getElementById('gVal');
const angleSlider = document.getElementById('angle');
const angleLabel = document.getElementById('angleVal');


let gravity = parseFloat(gravitySlider.value);
let angle = parseFloat(angleSlider.value);
const speed = 13; // initial speed, can be adjusted
let projectile = getInitialProjectile();

function getInitialProjectile() {
  // Convert angle to radians
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50,
    y: 450,
    vx: speed * Math.cos(rad),
    vy: -speed * Math.sin(rad),
    radius: 10,
    launched: false
  };
}


gravitySlider.oninput = () => {
  gravity = parseFloat(gravitySlider.value);
  gLabel.textContent = gravity;
};

angleSlider.oninput = () => {
  angle = parseFloat(angleSlider.value);
  angleLabel.textContent = angle;
  if (!projectile.launched) {
    projectile = getInitialProjectile();
    drawProjectile();
  }
};


canvas.addEventListener('click', () => {
  if (!projectile.launched) {
    projectile.launched = true;
  }
});


function reset() {
  projectile = getInitialProjectile();
}


function drawTube() {
  // Tube base position (same as projectile start)
  const baseX = 50;
  const baseY = 450;
  const tubeLength = 50;
  const tubeWidth = 16;
  // Angle in radians
  const rad = (angle * Math.PI) / 180;

  ctx.save();
  ctx.translate(baseX, baseY);
  ctx.rotate(-rad); // negative because y axis is down
  ctx.fillStyle = '#888';
  ctx.fillRect(0, -tubeWidth/2, tubeLength, tubeWidth);
  ctx.restore();
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

  drawTube();

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