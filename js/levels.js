/*
  Each level has:
    - text: yap
    - spawn: {x, y}
    - platforms: [{x,y,w,h}, ...]
    - spikes: [{x,y,w,h,direction}, ...] (direction: 'up', 'down', 'left', 'right')
    - stars: [{x,y,w,h,moveX,moveY,speed}, ...] optional collectible stars
    - goal: {x,y,w,h}
*/

window.LEVELS = [
  {
    text: 'Welcome to my Blahaj Platformer!',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 1000, h: 50 },
      { x: 220, y: 320, w: 120, h: 16 },
      { x: 380, y: 260, w: 140, h: 16 }
    ],
    spikes: [],
    stars: [],
    goal: { x: 540, y: 220, w: 36, h: 36 }
  },
  {
    text: 'The grass is always greener on the other platform',
    spawn: { x: 40, y: 320 },
    platforms: [
      { x: 0, y: 420, w: 1000, h: 50 },
      { x: 120, y: 330, w: 100, h: 16 },
      { x: 260, y: 260, w: 90, h: 16 },
      { x: 380, y: 200, w: 110, h: 16 },
      { x: 530, y: 140, w: 160, h: 16 }
    ],
    spikes: [],
    stars: [],
    goal: { x: 700, y: 100, w: 36, h: 36 }
  },
  {
    text: 'Starting off easy...',
    spawn: { x: 60, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 300, h: 50 },
      { x: 360, y: 360, w: 120, h: 16 },
      { x: 520, y: 320, w: 180, h: 16 },
      { x: 260, y: 300, w: 120, h: 16, moveX: 180, speed: 2 }
    ],
    spikes: [],
    goal: { x: 560, y: 220, w: 36, h: 36 }
  },
  {
    text: 'Timing is key',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 1000, h: 50 },
      { x: 220, y: 100, w: 600, h: 16 },
      { x: 380, y: 260, w: 140, h: 16 },
      { x: 120, y: 320, w: 120, h: 16, moveY: 60, speed: 1.5 }
    ],
    spikes: [],
    goal: { x: 540, y: 220, w: 36, h: 36 }
  },
  {
    text: 'Who gave that platform caffiene?!',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 800, h: 50 },
      { x: 120, y: 275, w: 1100, h: 16 },
      { x: 118, y: 340, w: 120, h: 16, moveY: 20, speed: 5 }
    ],
    spikes: [],
    goal: { x: 540, y: 239, w: 36, h: 36 }
  },
  {
    text: 'What could this be?',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 1000, h: 50 },
    ],
    spikes: [
      { x: 220, y: 382, w: 60, h: 18, direction: 'up' }
    ],
    stars: [],
    trampolines: [],
    goal: { x: 540, y: 239, w: 36, h: 36 }
  },
  {
    text: 'Uh oh, where did they all come from?',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 1000, h: 50 },
    ],
    spikes: [
      { x: 120, y: 382, w: 20, h: 18, direction: 'up' },
      { x: 200, y: 382, w: 20, h: 18, direction: 'up' },
      { x: 280, y: 382, w: 20, h: 18, direction: 'up' },
      { x: 360, y: 382, w: 20, h: 18, direction: 'up' }
    ],
    stars: [],
    trampolines: [],
    goal: { x: 540, y: 239, w: 36, h: 36 }
  },
  {
    text: 'Very bouncy!',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 1000, h: 50 },
    ],
    spikes: [],
    trampolines: [
      { x: 540, y: 360, w: 60, h: 16, bounce: 18 },
    ],
    goal: { x: 540, y: 65, w: 36, h: 36 }
  },
  {
    text: 'You can do it!',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 1000, h: 50 },
    ],
    spikes: [
      { x: 220, y: 382, w: 210, h: 18, direction: 'up' }
    ],
    trampolines: [
      { x: 120, y: 360, w: 60, h: 16, bounce: 18 },
      { x: 440, y: 360, w: 60, h: 16, bounce: 18 }
    ],
    goal: { x: 540, y: 239, w: 36, h: 36 }
  },
  {
    text: 'Don\'t look down...',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 400, w: 1000, h: 50 },
      { x: 440, y: 300, w: 120, h: 16, moveY: 20, speed: 1.5 }
    ],
    spikes: [
      { x: 220, y: 382, w: 210, h: 18, direction: 'up' }
    ],
    trampolines: [
      { x: 120, y: 360, w: 60, h: 16, bounce: 18 },
      { x: 340, y: 260, w: 60, h: 16, bounce: 18 }
    ],
    goal: { x: 690, y: 200, w: 36, h: 36 }
  },
  {
    text: 'Not food.',
    spawn: { x: 40, y: 350 },
    platforms: [
      { x: 0, y: 420, w: 1000, h: 50 },
      { x: 140, y: 340, w: 80, h: 16 },
      { x: 260, y: 300, w: 80, h: 16 },
      { x: 380, y: 260, w: 80, h: 16 },
      { x: 500, y: 220, w: 80, h: 16 }
    ],
    spikes: [
      { x: 200, y: 402, w: 80, h: 18, direction: 'up' },
      { x: 320, y: 282, w: 20, h: 18, direction: 'up' },
      { x: 440, y: 242, w: 20, h: 18, direction: 'up' }
    ],
    stars: [],
    goal: { x: 540, y: 184, w: 36, h: 36 }
  },
  {
    text: 'A tale of two platforms...',
    spawn: { x: 80, y: 350 },
    platforms: [
      { x: 0, y: 420, w: 1000, h: 50 },
      { x: 120, y: 330, w: 180, h: 16, moveX: 200, speed: 1.6 },
      { x: 420, y: 260, w: 160, h: 16, moveY: 60, speed: 1.2 },
      { x: 620, y: 200, w: 120, h: 16 }
    ],
    spikes: [
      { x: 300, y: 400, w: 60, h: 18, direction: 'up' }
    ],
    stars: [],
    goal: { x: 700, y: 164, w: 36, h: 36 }
  },
  {
    text: 'They... they... shrunk them!',
    spawn: { x: 40, y: 350 },
    platforms: [
      { x: 0, y: 420, w: 1000, h: 50 },
      { x: 160, y: 340, w: 5, h: 16 },
      { x: 260, y: 300, w: 5, h: 16 },
      { x: 360, y: 260, w: 5, h: 16 },
      { x: 460, y: 220, w: 5, h: 16 }
    ],
    spikes: [],
    stars: [],
    goal: { x: 520, y: 180, w: 36, h: 36 }
  },
  {
    text: 'The haj better have good reflexes',
    spawn: { x: 40, y: 150 },
    platforms: [
      { x: 0, y: 420, w: 1000, h: 50 },
      { x: 160, y: 340, w: 120, h: 16 },
      { x: 290, y: 340, w: 120, h: 16 },
      { x: 290, y: 150, w: 120, h: 16 }
    ],
    spikes: [
      { x: 0, y: 402, w: 1000, h: 18, direction: 'up' },
      { x: 290, y: 166, w: 80, h: 18, direction: 'down' }
    ],
    stars: [],
    trampolines: [
      { x: 290, y: 323, w: 60, h: 16, bounce: 20 }
    ],
    goal: { x: 500, y: 190, w: 36, h: 36 }
  },
  {
    text: 'Moving Gauntlet',
    spawn: { x: 60, y: 350 },
    platforms: [
      { x: 0, y: 420, w: 1200, h: 50 },
      { x: 160, y: 320, w: 120, h: 16, moveX: 300, speed: 2.2 },
      { x: 360, y: 260, w: 120, h: 16, moveX: -200, speed: 1.6 },
      { x: 560, y: 200, w: 120, h: 16, moveX: 240, speed: 2.6 }
    ],
    spikes: [
      { x: 280, y: 402, w: 80, h: 18, direction: 'up' },
      { x: 440, y: 242, w: 80, h: 18, direction: 'up' }
    ],
    stars: [],
    goal: { x: 720, y: 160, w: 36, h: 36 }
  },
  {
    text: 'The Elevator Shaft',
    spawn: { x: 480, y: 380 },
    platforms: [
      { x: 0, y: 420, w: 1000, h: 50 },
      { x: 468, y: 180, w: 120, h: 16, moveY: 180, speed: 1.2 },
      { x: 460, y: 100, w: 120, h: 16 }
    ],
    spikes: [
      { x: 460, y: 83, w: 40, h: 18, direction: 'up' }
    ],
    stars: [],
    goal: { x: 520, y: 63, w: 36, h: 36 }
  },
  {
    text: 'Get the haj over the finish line!',
    spawn: { x: 80, y: 360 },
    platforms: [
      { x: 0, y: 420, w: 1200, h: 50 },
      { x: 200, y: 340, w: 140, h: 16 },
      { x: 380, y: 300, w: 120, h: 16, moveY: 80, speed: 1 },
      { x: 560, y: 240, w: 100, h: 16 }
    ],
    spikes: [
      { x: 320, y: 402, w: 80, h: 18, direction: 'up' }
    ],
    stars: [],
    trampolines: [
      { x: 740, y: 360, w: 60, h: 16, bounce: 20 }
    ],
    goal: { x: 520, y: 60, w: 48, h: 48 }
  }
];
