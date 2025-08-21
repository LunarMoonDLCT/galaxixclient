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
    dy: Math.random() * 0.5 + 0.1,
    depth: Math.random() * 1.5 + 0.5
  });
}

let offsetX = 0, offsetY = 0;

// --- Vẽ sao ---
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  stars.forEach(star => {
    ctx.beginPath();
    let parallaxX = star.x + offsetX * star.depth;
    let parallaxY = star.y + offsetY * star.depth;
    ctx.arc(parallaxX, parallaxY, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

// --- Update sao ---
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

// --- Detect device ---
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// PC: parallax theo chuột
if (!isMobile()) {
  document.addEventListener("mousemove", e => {
    offsetX = (e.clientX / window.innerWidth - 0.5) * 50;
    offsetY = (e.clientY / window.innerHeight - 0.5) * 50;
  });
} else {
  // Mobile: "kéo nền" theo quét tay
  let lastTouchX = null, lastTouchY = null;

  document.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    if (lastTouchX !== null && lastTouchY !== null) {
      let dx = touch.clientX - lastTouchX;
      let dy = touch.clientY - lastTouchY;
      offsetX += dx * 0.5; // giảm để di chuyển mượt
      offsetY += dy * 0.5;
    }
    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;
  }, { passive: true });

  document.addEventListener("touchend", () => {
    lastTouchX = null;
    lastTouchY = null;
  });
}

// --- Resize canvas ---
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// --- Download GitHub release ---
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

// --- Modal ---
const modal = document.getElementById("downloadModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close-btn");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

openBtn.onclick = () => modal.classList.add("show");
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

// Mobile style
if (isMobile()) {
  document.body.style.fontSize = "14px";
  document.querySelector(".modal-box").style.width = "95%";
}

document.querySelector(".mo-ta").classList.add("hieu-ung-mo", "delay-2");
document.querySelector(".glow").classList.add("hieu-ung-mo", "delay-1");

// --- Dropdown menu ---
const hamburger = document.getElementById("hamburger");
const dropdownMenu = document.getElementById("dropdownMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  dropdownMenu.style.display =
    dropdownMenu.style.display === "flex" ? "none" : "flex";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    dropdownMenu.style.display = "none";
    hamburger.classList.remove("active");
  }
});

// --- Dev tool block ---
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});
