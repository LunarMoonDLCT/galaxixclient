// --- Nền sao rơi ---
const canvas = document.getElementById("nen-sao");
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
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}
animate();

// --- Parallax effect ---
let offsetX = 0, offsetY = 0;

// PC: di chuyển theo chuột
document.addEventListener("mousemove", e => {
  offsetX = (e.clientX / window.innerWidth - 0.5) * 25;
  offsetY = (e.clientY / window.innerHeight - 0.5) * 25;
  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});


document.addEventListener("touchmove", e => {
  const touch = e.touches[0];
  offsetX = (touch.clientX / window.innerWidth - 0.5) * 25;
  offsetY = (touch.clientY / window.innerHeight - 0.5) * 25;
  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}, { passive: true });


async function taiFile(type) {
  try {
    const response = await fetch("https://api.github.com/repos/LunarMoonDLCT/GalaxiXClientInstaller/releases/latest");
    const release = await response.json();
    let asset = type === "exe"
      ? release.assets.find(a => a.name.endsWith(".exe"))
      : release.assets.find(a => a.name.endsWith(".jar"));
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



const modal = document.getElementById("downloadModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close-btn");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// Mở modal
openBtn.onclick = () => modal.classList.add("show");

// Đóng modal
closeBtn.onclick = () => modal.classList.remove("show");
modal.onclick = (e) => {
  if (e.target === modal) modal.classList.remove("show");
};

// Tabs
tabBtns.forEach(btn => {
  btn.onclick = () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

// Detect OS
let userOS = "others";
if (navigator.userAgent.includes("Win")) {
  userOS = "windows";
}
document.querySelector(`[data-tab="${userOS}"]`).click();

// Detect mobile để tối ưu
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
if (isMobile()) {
  document.body.style.fontSize = "14px";
  document.querySelector(".modal-box").style.width = "95%";
}

document.querySelector(".mo-ta").classList.add("hieu-ung-mo", "delay-2");
document.querySelector(".glow").classList.add("hieu-ung-mo", "delay-1");