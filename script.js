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
      const x = Math.random() * (window.innerWidth - 250);
      const y = Math.random() * (window.innerHeight - 180);
      notification.style.left = x + 'px';
      notification.style.top = y + 'px';
      document.body.appendChild(notification);
      createdNotifications++;
      if (createdNotifications === notificationCount) showFinalMessage();
    }, i * 200);
  }
}

function minimizeNotification(button) {
  const notification = button.closest('.notification');
  notification.style.display = 'none';
}

function showFinalMessage() {
  const finalMessage = document.getElementById('finalMessage');
  finalMessage.style.display = 'block';
  setTimeout(() => {
    const extraButton = document.getElementById('extraButton');
    if (extraButton) extraButton.style.display = 'block';
  }, 2000);
}

function redirectToNewPage() {
  window.location.href = 'https://panbap.github.io/heart02/';
}

// Text morphing
const elts = {
  text1: document.getElementById('text1'),
  text2: document.getElementById('text2'),
};

const texts = ['Nhấn', 'vào', 'Trái', 'Tim', '❤️'];
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;
  let fraction = morph / morphTime;
  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }
  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;
  elts.text2.style.filter = '';
  elts.text2.style.opacity = '100%';
  elts.text1.style.filter = '';
  elts.text1.style.opacity = '0%';
}

function animateText() {
  requestAnimationFrame(animateText);
  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;
  cooldown -= dt;
  if (cooldown <= 0) {
    if (shouldIncrementIndex) textIndex++;
    doMorph();
  } else {
    doCooldown();
  }
}

animateText();

// Heart particles
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = Math.random() * 2 + 1;
    this.size = Math.random() * 10 + 5;
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
