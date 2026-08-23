(function(){
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const levelSelect = document.getElementById('levelSelect');
  const messageEl = document.getElementById('message');

  // Set canvas to fill screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const keys = {};
  window.addEventListener('keydown', e => keys[e.key] = true);
  window.addEventListener('keyup', e => keys[e.key] = false);

  const playerImg = new Image();
  playerImg.src = 'assets/player.png';

  function rectsOverlap(a,b){
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function initLevelPlatforms(level){
    for (const p of level.platforms){
      if (p.moveX || p.moveY){
        if (p.origX === undefined) p.origX = p.x;
        if (p.origY === undefined) p.origY = p.y;
        p.x = p.origX;
        p.y = p.origY;
        p.dirX = 1;
        p.dirY = 1;
        p.speed = p.speed || 2;
      } else {
        if (p.origX !== undefined) p.x = p.origX;
        if (p.origY !== undefined) p.y = p.origY;
      }
      p.vx = 0;
      p.vy = 0;
    }
    if (level.spikes){
      for (const s of level.spikes){
        if (s.moveX || s.moveY){
          if (s.origX === undefined) s.origX = s.x;
          if (s.origY === undefined) s.origY = s.y;
          s.x = s.origX;
          s.y = s.origY;
          s.dirX = 1;
          s.dirY = 1;
          s.speed = s.speed || 2;
        }
        s.vx = 0;
        s.vy = 0;
      }
    }

    if (level.trampolines){
      for (const t of level.trampolines){
        if (t.moveX || t.moveY){
          if (t.origX === undefined) t.origX = t.x;
          if (t.origY === undefined) t.origY = t.y;
          t.x = t.origX;
          t.y = t.origY;
          t.dirX = 1;
          t.dirY = 1;
          t.speed = t.speed || 2;
        }
        t.vx = 0;
        t.vy = 0;
      }
    }
  }

  function initLevelStars(level){
    if (!level.stars) return;
    for (const s of level.stars){
      s.collected = false;
      if (s.moveX || s.moveY){
        if (s.origX === undefined) s.origX = s.x;
        if (s.origY === undefined) s.origY = s.y;
        s.x = s.origX;
        s.y = s.origY;
        s.dirX = 1;
        s.dirY = 1;
        s.speed = s.speed || 2;
      }
      s.vx = 0;
      s.vy = 0;
    }
  }

  function updatePlatforms(level){
    for (const p of level.platforms){
      p.vx = 0;
      p.vy = 0;
      if (!p.moveX && !p.moveY) continue;

      if (p.origX === undefined) p.origX = p.x;
      if (p.origY === undefined) p.origY = p.y;

      if (p.moveX){
        let nextX = p.x + p.speed * p.dirX;
        if (nextX < p.origX){ nextX = p.origX; p.dirX = 1; }
        else if (nextX > p.origX + p.moveX){ nextX = p.origX + p.moveX; p.dirX = -1; }
        p.vx = nextX - p.x;
        p.x = nextX;
      }

      if (p.moveY){
        let nextY = p.y + p.speed * p.dirY;
        if (nextY < p.origY){ nextY = p.origY; p.dirY = 1; }
        else if (nextY > p.origY + p.moveY){ nextY = p.origY + p.moveY; p.dirY = -1; }
        p.vy = nextY - p.y;
        p.y = nextY;
      }
    }
  }

  function updateSpikes(level){
    if (!level.spikes) return;
    for (const s of level.spikes){
      s.vx = 0;
      s.vy = 0;
      if (!s.moveX && !s.moveY) continue;

      if (s.origX === undefined) s.origX = s.x;
      if (s.origY === undefined) s.origY = s.y;

      if (s.moveX){
        let nextX = s.x + s.speed * s.dirX;
        if (nextX < s.origX){ nextX = s.origX; s.dirX = 1; }
        else if (nextX > s.origX + s.moveX){ nextX = s.origX + s.moveX; s.dirX = -1; }
        s.vx = nextX - s.x;
        s.x = nextX;
      }

      if (s.moveY){
        let nextY = s.y + s.speed * s.dirY;
        if (nextY < s.origY){ nextY = s.origY; s.dirY = 1; }
        else if (nextY > s.origY + s.moveY){ nextY = s.origY + s.moveY; s.dirY = -1; }
        s.vy = nextY - s.y;
        s.y = nextY;
      }
    }
  }

  function updateTrampolines(level){
    if (!level.trampolines) return;
    for (const t of level.trampolines){
      t.vx = 0;
      t.vy = 0;
      if (!t.moveX && !t.moveY) continue;

      if (t.origX === undefined) t.origX = t.x;
      if (t.origY === undefined) t.origY = t.y;

      if (t.moveX){
        let nextX = t.x + t.speed * t.dirX;
        if (nextX < t.origX){ nextX = t.origX; t.dirX = 1; }
        else if (nextX > t.origX + t.moveX){ nextX = t.origX + t.moveX; t.dirX = -1; }
        t.vx = nextX - t.x;
        t.x = nextX;
      }

      if (t.moveY){
        let nextY = t.y + t.speed * t.dirY;
        if (nextY < t.origY){ nextY = t.origY; t.dirY = 1; }
        else if (nextY > t.origY + t.moveY){ nextY = t.origY + t.moveY; t.dirY = -1; }
        t.vy = nextY - t.y;
        t.y = nextY;
      }
    }
  }

  class Player {
    constructor(x,y){
      this.x = x; this.y = y; this.w = 32; this.h = 32;
      this.vx = 0; this.vy = 0; this.onGround = false;
      this.supportedPlatform = null;
      this.score = 0;
    }

    update(level){
      if (this.onGround && this.supportedPlatform){
        this.x += this.supportedPlatform.vx;
        this.y += this.supportedPlatform.vy;
      }

      const accel = 0.7; const maxSpeed = 5; const damping = 0.8;
      if (keys['ArrowLeft'] || keys['a'] || keys['A']) this.vx = Math.max(this.vx - accel, -maxSpeed);
      else if (keys['ArrowRight'] || keys['d'] || keys['D']) this.vx = Math.min(this.vx + accel, maxSpeed);
      else this.vx *= damping;

      if ((keys[' '] || keys['w'] || keys['W'] || keys['ArrowUp']) && this.onGround){
        this.vy = -11; this.onGround = false;
      }

      this.vy += 0.6; if (this.vy > 20) this.vy = 20;

      this.x += this.vx;
      const collidables = level.platforms.concat(level.trampolines || []);
      this._collideHorizontal(collidables);
      this.y += this.vy;
      this._collideVertical(collidables);

      if (this.x < 0) { this.x = 0; this.vx = 0; }
      if (this.x + this.w > canvas.width) { this.x = canvas.width - this.w; this.vx = 0; }

      // Check spike collision
      if (level.spikes && this._checkSpikeCollision(level.spikes)){
        this.respawn(level.spawn);
        return;
      }

      if (level.stars) this._collectStars(level.stars);

      // Fell below game -> respawn
      if (this.y > canvas.height + 200) this.respawn(level.spawn);
    }

    _collideHorizontal(platforms){
      for (const p of platforms){
        if (rectsOverlap(this, p)){
          if (this.vx > 0) this.x = p.x - this.w;
          else if (this.vx < 0) this.x = p.x + p.w;
          this.vx = 0;
        }
      }
    }

    _collideVertical(platforms){
      this.onGround = false;
      this.supportedPlatform = null;
      for (const p of platforms){
        if (rectsOverlap(this, p)){
          if (this.vy > 0){
            this.y = p.y - this.h;
            if (p.bounce){
              this.vy = -(p.bounce || 16);
              this.onGround = false;
              this.supportedPlatform = null;
            } else {
              this.vy = 0;
              this.onGround = true;
              this.supportedPlatform = p;
            }
          } else if (this.vy < 0){
            this.y = p.y + p.h; this.vy = 0;
          }
        }
      }
    }

    _checkSpikeCollision(spikes){
      for (const s of spikes){
        if (rectsOverlap(this, s)) return true;
      }
      return false;
    }

    _collectStars(stars){
      for (const s of stars){
        if (!s.collected && rectsOverlap(this, s)){
          s.collected = true;
          this.score += 1;
        }
      }
    }

    draw(ctx){
      if (playerImg.complete && playerImg.naturalWidth){
        ctx.drawImage(playerImg, this.x, this.y, this.w, this.h);
      } else {
        ctx.fillStyle = '#ff3366'; ctx.fillRect(this.x, this.y, this.w, this.h);
      }
    }

    respawn(spawn){ this.x = spawn.x; this.y = spawn.y; this.vx = 0; this.vy = 0; this.onGround = false; }
  }

  let currentLevel = 0;
  let player = null;
  let completionTimer = null;
  let levelCompleted = false;

  function populateLevelSelect(){
    levelSelect.innerHTML = '';
    window.LEVELS.forEach((l,i)=>{
      const o = document.createElement('option'); o.value = i; o.textContent = l.text || `Level ${i+1}`; levelSelect.appendChild(o);
    });
  }

  function loadLevel(n){
    currentLevel = n; const level = window.LEVELS[n];
    if (!level) return;
    if (!level.spawn) level.spawn = {x:40,y:300};
    if (completionTimer){ clearTimeout(completionTimer); completionTimer = null; }
    levelCompleted = false;
    initLevelPlatforms(level);
    initLevelStars(level);
    player = new Player(level.spawn.x, level.spawn.y);
    messageEl.textContent = '';
    levelSelect.value = n;
  }

  function updateStars(level){
    if (!level.stars) return;
    for (const s of level.stars){
      s.vx = 0;
      s.vy = 0;
      if (!s.moveX && !s.moveY) continue;

      if (s.origX === undefined) s.origX = s.x;
      if (s.origY === undefined) s.origY = s.y;

      if (s.moveX){
        let nextX = s.x + s.speed * s.dirX;
        if (nextX < s.origX){ nextX = s.origX; s.dirX = 1; }
        else if (nextX > s.origX + s.moveX){ nextX = s.origX + s.moveX; s.dirX = -1; }
        s.vx = nextX - s.x;
        s.x = nextX;
      }

      if (s.moveY){
        let nextY = s.y + s.speed * s.dirY;
        if (nextY < s.origY){ nextY = s.origY; s.dirY = 1; }
        else if (nextY > s.origY + s.moveY){ nextY = s.origY + s.moveY; s.dirY = -1; }
        s.vy = nextY - s.y;
        s.y = nextY;
      }
    }
  }

  document.getElementById('restart').addEventListener('click', ()=> loadLevel(currentLevel));
  levelSelect.addEventListener('change', ()=> loadLevel(parseInt(levelSelect.value,10)));

  function update(){
    const level = window.LEVELS[currentLevel];
    if (!level) return;
    updatePlatforms(level);
    updateSpikes(level);
    updateTrampolines(level);
    updateStars(level);
    player.update(level);

    if (!levelCompleted && rectsOverlap(player, level.goal)){
      levelCompleted = true;
      if (currentLevel + 1 < window.LEVELS.length){
        messageEl.textContent = 'Level complete!';
        completionTimer = setTimeout(()=>{
          completionTimer = null;
          loadLevel(currentLevel+1);
        }, 350);
      } else {
        messageEl.textContent = 'Game complete!';
      }
    }
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // sky
    ctx.fillStyle = '#87CEEB'; ctx.fillRect(0,0,canvas.width,canvas.height);

    const level = window.LEVELS[currentLevel]; if (!level) return;

    // platforms
    for (const p of level.platforms){
      ctx.fillStyle = p.moveX || p.moveY ? '#4a8fbd' : '#6b4f3c';
      ctx.fillRect(p.x, p.y, p.w, p.h);
    }

    // trampolines
    if (level.trampolines){
      for (const t of level.trampolines){
        drawTrampoline(ctx, t);
      }
    }

    // stars
    if (level.stars){
      for (const s of level.stars){
        if (!s.collected) drawStar(ctx, s);
      }
    }

    // spikes
    if (level.spikes){
      for (const s of level.spikes){
        drawSpikes(ctx, s.x, s.y, s.w, s.h, s.direction || 'up');
      }
    }

    // goal
    ctx.fillStyle = 'gold'; ctx.fillRect(level.goal.x, level.goal.y, level.goal.w, level.goal.h);

    player.draw(ctx);

    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.font='14px system-ui';
  }

  function drawSpikes(ctx, x, y, w, h, direction){
    ctx.fillStyle = '#cc2200';
    const density = Math.max(2, Math.floor((direction === 'left' || direction === 'right' ? h : w) / 20));
    const step = (direction === 'left' || direction === 'right' ? h : w) / density;

    for (let i = 0; i < density; i++){
      ctx.beginPath();
      if (direction === 'up'){
        ctx.moveTo(x + i * step, y + h);
        ctx.lineTo(x + i * step + step / 2, y);
        ctx.lineTo(x + (i + 1) * step, y + h);
      } else if (direction === 'down'){
        ctx.moveTo(x + i * step, y);
        ctx.lineTo(x + i * step + step / 2, y + h);
        ctx.lineTo(x + (i + 1) * step, y);
      } else if (direction === 'left'){
        ctx.moveTo(x + w, y + i * step);
        ctx.lineTo(x, y + i * step + step / 2);
        ctx.lineTo(x + w, y + (i + 1) * step);
      } else if (direction === 'right'){
        ctx.moveTo(x, y + i * step);
        ctx.lineTo(x + w, y + i * step + step / 2);
        ctx.lineTo(x, y + (i + 1) * step);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawStar(ctx, s){
    const cx = s.x + s.w / 2;
    const cy = s.y + s.h / 2;
    const radius = Math.min(s.w, s.h) / 2;
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = '#ffa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 5; i++){
      const angle = i * Math.PI * 2 / 5 - Math.PI / 2;
      const outerX = cx + Math.cos(angle) * radius;
      const outerY = cy + Math.sin(angle) * radius;
      const innerAngle = angle + Math.PI / 5;
      const innerX = cx + Math.cos(innerAngle) * radius * 0.5;
      const innerY = cy + Math.sin(innerAngle) * radius * 0.5;
      if (i === 0) ctx.moveTo(outerX, outerY);
      ctx.lineTo(innerX, innerY);
      ctx.lineTo(
        cx + Math.cos(angle + Math.PI * 2 / 5) * radius,
        cy + Math.sin(angle + Math.PI * 2 / 5) * radius
      );
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawTrampoline(ctx, t){
    ctx.fillStyle = '#6ff';
    ctx.fillRect(t.x, t.y, t.w, t.h);
    ctx.strokeStyle = '#1aa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(t.x + 4, t.y + t.h / 2);
    ctx.quadraticCurveTo(t.x + t.w / 2, t.y - t.h, t.x + t.w - 4, t.y + t.h / 2);
    ctx.stroke();
    ctx.fillStyle = '#1aa';
    ctx.font = '12px system-ui';
    ctx.fillText('', t.x + 6, t.y + t.h / 2 - 2);
  }

  function loop(){ update(); draw(); requestAnimationFrame(loop); }

  if (!window.LEVELS || !window.LEVELS.length){
    messageEl.textContent = 'No levels found... go buy an irl blahaj instead';
    console.error('No levels present in window.LEVELS');
  } else {
    populateLevelSelect(); loadLevel(0); requestAnimationFrame(loop);
  }

})();
