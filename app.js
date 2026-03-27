// ─────────────────────────────────────────
//  app.js  —  Dharshini Birthday Project
// ─────────────────────────────────────────

// ─── PASSWORD CHECK ───
function checkPassword() {
  const val = document.getElementById('pw-input').value.trim();
  const err = document.getElementById('error-msg');

  if (val === '08.04.2007') {
    err.textContent = '';
    showBirthday();
  } else {
    err.textContent = '✦  incorrect key — try again  ✦';
    const input = document.getElementById('pw-input');
    input.style.borderColor = '#c09080';
    setTimeout(() => (input.style.borderColor = ''), 1200);
  }
}

// Allow Enter key on password input
document.getElementById('pw-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPassword();
});

// ─── SHOW BIRTHDAY PAGE ───
function showBirthday() {
  document.getElementById('login-page').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('birthday-page').classList.remove('hidden');
    launchConfetti();
  }, 600);
}

// ─── CONFETTI ───
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const palette = ['#c9a96e', '#e8d5b0', '#f5ecd8', '#a0856a', '#d4b896'];

  const pieces = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: 4 + Math.random() * 5,
    h: 2 + Math.random() * 3,
    color: palette[Math.floor(Math.random() * palette.length)],
    vy: 2 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 1,
    rot: Math.random() * Math.PI * 2,
    rotv: (Math.random() - 0.5) * 0.06,
    opacity: 0.6 + Math.random() * 0.3,
  }));

  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.opacity * Math.max(0, 1 - frame / 120);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.rotv;
    });
    frame++;
    if (frame < 140) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw();
}
