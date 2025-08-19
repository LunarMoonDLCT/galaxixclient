// ---- Background Stars ----
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    dy: Math.random() * 0.3 + 0.05
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateStars() {
  stars.forEach(star => {
    star.y += star.dy;
    if (star.y > canvas.height) star.y = 0;
  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}
animate();

// ---- Parallax effect ----
document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  canvas.style.transform = `translate(${x}px, ${y}px)`;
});

// ---- Download Function ----
function downloadFile(type) {
  const exe = "https://github.com/LunarMoonDLCT/GalaxyClientInstaller/releases/latest/download/GalaxyClientInstaller.exe";
  const jar = "https://github.com/LunarMoonDLCT/GalaxyClientInstaller/releases/latest/download/GalaxyClientInstaller.jar";
  
  const link = document.createElement("a");
  link.href = type === "exe" ? exe : jar;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
