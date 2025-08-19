const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 400; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.8,
    dy: Math.random() * 0.5 + 0.1
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

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 25;
  const y = (e.clientY / window.innerHeight - 0.5) * 25;
  canvas.style.transform = `translate(${x}px, ${y}px)`;
});

async function downloadFile(type) {
  try {
    const response = await fetch("https://api.github.com/repos/LunarMoonDLCT/GalaxiXClientInstaller/releases/latest");
    const release = await response.json();
    let asset = type === "exe" ? release.assets.find(a => a.name.endsWith(".exe")) : release.assets.find(a => a.name.endsWith(".jar"));
    if (asset) {
      const link = document.createElement("a");
      link.href = asset.browser_download_url;
      link.setAttribute("download", asset.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Không tìm thấy file download!");
    }
  } catch (err) {
    console.error("Download error:", err);
    alert("Không thể tải release mới nhất!");
  }
}
