const canvas = document.querySelector("#gold-grid");
const ctx = canvas.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let points = [];
let animationFrame;

function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createPoints();
}

function createPoints() {
  const count = Math.min(42, Math.floor(window.innerWidth / 32));
  points = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * Math.min(window.innerHeight, 760),
    radius: Math.random() * 1.2 + 0.5,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12
  }));
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "rgba(215, 173, 80, 0.42)";
  ctx.strokeStyle = "rgba(215, 173, 80, 0.08)";

  points.forEach((point, index) => {
    if (!prefersReducedMotion.matches) {
      point.x += point.vx;
      point.y += point.vy;
    }

    if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
    if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    ctx.fill();

    for (let next = index + 1; next < points.length; next += 1) {
      const other = points[next];
      const distance = Math.hypot(point.x - other.x, point.y - other.y);

      if (distance < 150) {
        ctx.globalAlpha = 1 - distance / 150;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  });

  animationFrame = requestAnimationFrame(draw);
}

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter-button").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

window.addEventListener("resize", resizeCanvas);
prefersReducedMotion.addEventListener("change", () => {
  cancelAnimationFrame(animationFrame);
  draw();
});

resizeCanvas();
draw();