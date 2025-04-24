const messages = [
  'Anh nhớ Em Bé nhiều lắm 💖',
  'Em Bé là cục dàng của anh 🌟',
  'Trái tim anh chỉ có Em Bé ❤️',
  'My ơi, anh yêu em nhiều lắm 🥰',
  'Cùng Cục Dàng, mọi khoảnh khắc đều ngọt ngào 🍬',
];
const notificationCount = 50;
let createdNotifications = 0;

const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

audioPlayer.volume = 0.5;

playButton.addEventListener('click', () => {
  generateRandomNotifications();
  if (!isPlaying) {
    audioPlayer.play();
    musicToggle.textContent = '🔊';
    isPlaying = true;
  }
});

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    audioPlayer.pause();
    musicToggle.textContent = '🔇';
  } else {
    audioPlayer.play();
    musicToggle.textContent = '🔊';
  }
  isPlaying = !isPlaying;
});

function generateRandomNotifications() {
  playButton.style.display = 'none';
  const isMobile = window.innerWidth <= 767;
  const notificationWidth = isMobile ? 160 : 280; // Match CSS notification width
  const notificationHeight = isMobile ? 120 : 200; // Match CSS notification height
  const safeMargin = 10; // Margin to keep notifications within viewport
  const maxX = window.innerWidth - notificationWidth - safeMargin;
  const maxY = window.innerHeight - notificationHeight - safeMargin;
  const gridSize = isMobile ? 2 : 4; // Fewer grid cells on mobile to reduce overlap
  const cellWidth = window.innerWidth / gridSize;
  const cellHeight = window.innerHeight / gridSize;
  const usedPositions = new Set();

  for (let i = 0; i < notificationCount; i++) {
    setTimeout(() => {
      const notification = document.createElement('div');
      notification.className = 'notification';
      const message = messages[Math.floor(Math.random() * messages.length)];
      notification.innerHTML = `
        <div class="notification-header">
          <span>Trái Tim Anh</span>
          <button class="minimize-btn" onclick="minimizeNotification(this)">–</button>
        </div>
        <p>${message}</p>
      `;

      let x, y, positionKey;
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loops

      do {
        // Randomly select a grid cell
        const cellX = Math.floor(Math.random() * gridSize);
        const cellY = Math.floor(Math.random() * gridSize);
        // Calculate position within the cell
        x = Math.max(
          safeMargin,
          Math.min(
            maxX,
            cellX * cellWidth + Math.random() * (cellWidth - notificationWidth)
          )
        );
        y = Math.max(
          safeMargin,
          Math.min(
            maxY,
            cellY * cellHeight +
              Math.random() * (cellHeight - notificationHeight)
          )
        );
        positionKey = `${Math.floor(x / 50)}-${Math.floor(y / 50)}`; // Coarse grid to check for overlap
        attempts++;
      } while (usedPositions.has(positionKey) && attempts < maxAttempts);

      if (attempts < maxAttempts) {
        usedPositions.add(positionKey);
      }

      notification.style.left = x + 'px';
      notification.style.top = y + 'px';
      document.body.appendChild(notification);
      createdNotifications++;
    }, i * 200);
  }
}

function minimizeNotification(button) {
  const notification = button.closest('.notification');
  notification.style.display = 'none';
}

function redirectToNewPage() {
  window.location.href = 'https://panbap.github.io/heart02/';
}

// Heart particles
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = window.innerWidth <= 767 ? 30 : 50; // Reduce particles on mobile

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = Math.random() * 2 + 1;
    this.size = Math.random() * (window.innerWidth <= 767 ? 8 : 10) + 5;
    this.alpha = 1;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 105, 145, ${this.alpha})`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(
      this.x - this.size / 2,
      this.y - this.size,
      this.x,
      this.y + this.size
    );
    ctx.quadraticCurveTo(
      this.x + this.size / 2,
      this.y - this.size,
      this.x,
      this.y
    );
    ctx.fill();
  }

  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.alpha -= 0.005;
    if (this.y > canvas.height || this.alpha <= 0) this.reset();
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
