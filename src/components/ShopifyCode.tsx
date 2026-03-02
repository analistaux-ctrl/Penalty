import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

const SHOPIFY_CODE = `<!-- WIDGET PENALTY SHOOTOUT PARA SHOPIFY -->
<!-- Pega este código justo antes de la etiqueta </body> en tu archivo theme.liquid -->

<style>
  #penalty-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }
  #penalty-widget-btn {
    background: #FFD700;
    color: #000;
    border: none;
    padding: 15px 25px;
    border-radius: 50px;
    font-weight: 900;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
    font-size: 16px;
    text-transform: uppercase;
    animation: penalty-bounce 2s infinite;
  }
  @keyframes penalty-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  #penalty-modal {
    display: none;
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(5px);
    z-index: 10000;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  #penalty-game-container {
    width: 100%;
    height: 100%;
    /* 👇 REEMPLAZA ESTA URL POR EL ENLACE DE TU IMAGEN EN SHOPIFY 👇 */
    background: url('https://cdn.shopify.com/s/files/1/0848/8520/9384/files/cancha_atenuada.png?v=1771888750') center/cover;
    background-color: #111;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    #penalty-game-container {
      width: 90%;
      height: auto;
      max-width: 500px;
      aspect-ratio: 9/16;
      border-radius: 16px;
    }
  }
  .cursor-glove {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" style="font-size:48px"><text y="40">🧤</text></svg>') 24 24, auto !important;
  }
  #soccer-ball {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    font-size: 60px;
    display: none;
    user-select: none;
    text-shadow: 0 10px 20px rgba(0,0,0,0.5);
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    touch-action: none;
    z-index: 10;
  }
  .game-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    padding: 15px;
    box-sizing: border-box;
    overflow-y: auto;
    z-index: 10;
  }
  .bg-dark { background: rgba(0,0,0,0.4); }
  .bg-green { background: rgba(6, 78, 59, 0.9); }
  .bg-red { background: rgba(69, 10, 10, 0.9); }
  
  .game-overlay h2 {
    font-size: 28px;
    font-weight: 900;
    margin: 0 0 5px 0;
    color: #FFD700;
    font-style: italic;
    text-transform: uppercase;
  }
  .game-overlay p {
    font-size: 14px;
    margin: 0 0 15px 0;
    max-width: 400px;
  }
  .game-btn {
    background: #FFD700;
    color: #000;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 50px;
    text-transform: uppercase;
    transition: transform 0.2s;
    width: 100%;
  }
  .game-btn:hover { transform: scale(1.05); }
  .game-btn-secondary {
    background: #333;
    color: #fff;
    border: 1px solid #555;
  }
  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    color: white;
    font-size: 28px;
    cursor: pointer;
    z-index: 10;
    background: rgba(0,0,0,0.3);
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    line-height: 1;
  }
  .code-box {
    background: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    border: 1px solid rgba(255,255,255,0.2);
    width: 100%;
    max-width: 300px;
  }
  .code-box span {
    display: block;
    font-size: 12px;
    color: #ccc;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  .code-box strong {
    font-size: 24px;
    font-family: monospace;
    letter-spacing: 2px;
  }
  .flex-row { 
    display: flex; 
    flex-direction: column;
    gap: 10px; 
    width: 100%;
    max-width: 300px;
  }
  
  /* Countdown Styles */
  #countdown-display {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px;
    font-weight: 900;
    color: white;
    font-style: italic;
    text-shadow: 0 0 20px rgba(250,204,21,0.8);
    display: none;
    z-index: 20;
    pointer-events: none;
  }
  
  @keyframes popIn {
    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  }
  
  .start-content-wrapper {
    transition: all 0.5s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .start-content-hidden {
    opacity: 0;
    transform: translateY(40px);
    pointer-events: none;
  }
  
  #gloves-icon {
    font-size: 60px;
    margin-bottom: 10px;
    transition: all 1s ease-in-out;
  }
  
  .gloves-down {
    transform: translateY(35vh) scale(0.75);
    opacity: 0.5;
  }
  
  @media (min-width: 768px) {
    .game-overlay { padding: 20px; }
    .game-overlay h2 { font-size: 36px; margin-bottom: 10px; }
    .game-overlay p { font-size: 18px; margin-bottom: 20px; }
    .code-box { padding: 15px 30px; margin-bottom: 20px; }
    .code-box strong { font-size: 28px; }
    .game-btn { padding: 12px 30px; font-size: 16px; width: auto; }
    .flex-row { flex-direction: row; }
  }
</style>

<div id="penalty-widget">
  <button id="penalty-widget-btn">⚽ ¡Ataja y Gana!</button>
</div>

<div id="penalty-modal">
  <div id="penalty-game-container">
    <div class="close-btn" id="close-modal">&times;</div>
    
    <div id="start-screen" class="game-overlay bg-dark" style="transition: background-color 0.5s ease;">
      <div id="gloves-icon">🧤</div>
      <div id="start-content-wrapper" class="start-content-wrapper">
        <h2>¡Ataja el penal!</h2>
        <p>Atrapa el balón haciendo clic sobre él antes de que entre a la portería y gana un <strong>15% de descuento</strong>.</p>
        <button class="game-btn" id="start-game-btn">Jugar ahora</button>
      </div>
    </div>

    <div id="countdown-display"></div>

    <div id="soccer-ball">⚽</div>

    <div id="win-screen" class="game-overlay bg-green" style="display: none;">
      <div style="font-size: 60px; margin-bottom: 10px;">🏆</div>
      <h2>¡ATAJADÓN!</h2>
      <p>¡Felicidades! Tienes reflejos de acero.</p>
      <div class="code-box">
        <span>Tu código de 15% OFF</span>
        <strong>MUNDIAL15</strong>
      </div>
      <button class="game-btn" onclick="copyPenaltyCode('MUNDIAL15')">Copiar y Comprar</button>
    </div>

    <div id="lose-screen" class="game-overlay bg-red" style="display: none;">
      <div style="font-size: 60px; margin-bottom: 10px;">🥅</div>
      <h2 style="color: #ff6b6b;">¡GOL EN CONTRA!</h2>
      <p>No lograste atajarlo, pero aún así te llevas un premio de consolación.</p>
      <div class="code-box">
        <span>Tu código de 5% OFF</span>
        <strong>MUNDIAL5</strong>
      </div>
      <div class="flex-row">
        <button class="game-btn game-btn-secondary" id="retry-btn">Reintentar</button>
        <button class="game-btn" onclick="copyPenaltyCode('MUNDIAL5')">Usar 5%</button>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const widgetBtn = document.getElementById('penalty-widget-btn');
    const modal = document.getElementById('penalty-modal');
    const closeBtn = document.getElementById('close-modal');
    const startBtn = document.getElementById('start-game-btn');
    const retryBtn = document.getElementById('retry-btn');
    const ball = document.getElementById('soccer-ball');
    const container = document.getElementById('penalty-game-container');
    
    const startScreen = document.getElementById('start-screen');
    const winScreen = document.getElementById('win-screen');
    const loseScreen = document.getElementById('lose-screen');
    const countdownEl = document.getElementById('countdown-display');
    const glovesIcon = document.getElementById('gloves-icon');
    const startContentWrapper = document.getElementById('start-content-wrapper');
    
    let gameTimeout;
    let countdownTimeouts = [];
    let isPlaying = false;

    widgetBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      resetGame();
    });

    startBtn.addEventListener('click', handleStartClick);
    retryBtn.addEventListener('click', handleStartClick);

    function handleStartClick() {
      // Start countdown animation
      startContentWrapper.classList.add('start-content-hidden');
      glovesIcon.classList.add('gloves-down');
      startScreen.style.backgroundColor = 'rgba(0,0,0,0.2)';
      
      countdownEl.style.display = 'block';
      countdownEl.innerText = '3';
      countdownEl.style.animation = 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
      
      countdownTimeouts.push(setTimeout(() => {
        countdownEl.style.animation = 'none';
        void countdownEl.offsetWidth; // trigger reflow
        countdownEl.style.animation = 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        countdownEl.innerText = '2';
      }, 1000));
      
      countdownTimeouts.push(setTimeout(() => {
        countdownEl.style.animation = 'none';
        void countdownEl.offsetWidth;
        countdownEl.style.animation = 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        countdownEl.innerText = '1';
      }, 2000));
      
      countdownTimeouts.push(setTimeout(() => {
        countdownEl.style.animation = 'none';
        void countdownEl.offsetWidth;
        countdownEl.style.animation = 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        countdownEl.innerText = '¡Atrápalo!';
      }, 3000));
      
      countdownTimeouts.push(setTimeout(() => {
        countdownEl.style.display = 'none';
        startGame();
      }, 4000));
    }

    const catchBall = (e) => {
      if(!isPlaying) return;
      e.preventDefault();
      e.stopPropagation();
      clearTimeout(gameTimeout);
      isPlaying = false;
      ball.style.display = 'none';
      container.classList.remove('cursor-glove');
      winScreen.style.display = 'flex';
      
      // Trigger celebratory confetti if library is loaded
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#10B981', '#FFFFFF']
        });
      }
    };

    ball.addEventListener('mousedown', catchBall);
    ball.addEventListener('touchstart', catchBall, {passive: false});

    function resetGame() {
      isPlaying = false;
      
      // Clear countdown timeouts
      countdownTimeouts.forEach(clearTimeout);
      countdownTimeouts = [];
      
      // Reset UI elements
      startContentWrapper.classList.remove('start-content-hidden');
      glovesIcon.classList.remove('gloves-down');
      startScreen.style.backgroundColor = 'rgba(0,0,0,0.8)';
      countdownEl.style.display = 'none';
      
      startScreen.style.display = 'flex';
      winScreen.style.display = 'none';
      loseScreen.style.display = 'none';
      ball.style.display = 'none';
      ball.style.transition = 'none';
      container.classList.remove('cursor-glove');
    }

    function startGame() {
      isPlaying = true;
      startScreen.style.display = 'none';
      winScreen.style.display = 'none';
      loseScreen.style.display = 'none';
      container.classList.add('cursor-glove');
      
      const paths = [
        { start: { x: 50, y: 90 }, points: [{ x: 85, y: 75 }, { x: 15, y: 55 }, { x: 80, y: 35 }, { x: 35, y: 25 }, { x: 50, y: 15 }] },
        { start: { x: 50, y: 90 }, points: [{ x: 85, y: 70 }, { x: 20, y: 55 }, { x: 40, y: 45 }, { x: 80, y: 30 }, { x: 45, y: 15 }] },
        { start: { x: 30, y: 90 }, points: [{ x: 75, y: 65 }, { x: 25, y: 45 }, { x: 60, y: 30 }, { x: 45, y: 20 }, { x: 50, y: 10 }] }
      ];
      
      const isMobile = window.innerWidth < 768;
      const selectedPath = paths[Math.floor(Math.random() * paths.length)];

      // Reset ball position
      ball.style.transition = 'none';
      ball.style.top = selectedPath.start.y + '%';
      ball.style.left = selectedPath.start.x + '%';
      ball.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
      ball.style.display = 'block';

      // Force reflow to ensure transition works
      void ball.offsetWidth;

      let bounceCount = 0;
      const maxBounces = 4;
      const bounceDuration = 800;

      function bounce() {
        if (!isPlaying) return;
        
        bounceCount++;
        ball.style.transition = \`left \${bounceDuration}ms linear, top \${bounceDuration}ms cubic-bezier(0.25, 1, 0.5, 1), transform \${bounceDuration}ms linear\`;
        
        if (bounceCount > maxBounces) {
          // Final shot
          let targetX = selectedPath.points[4].x;
          let targetY = selectedPath.points[4].y;
          
          if (!isMobile) {
            targetX = Math.floor(Math.random() * 60) + 20;
            targetY = Math.floor(Math.random() * 15) + 5; // Always finish in the upper part
          }

          const rotation = bounceCount * 720;
          ball.style.top = targetY + '%';
          ball.style.left = targetX + '%';
          ball.style.transform = \`translate(-50%, -50%) scale(0.4) rotate(\${rotation}deg)\`;
          
          gameTimeout = setTimeout(() => {
            if(isPlaying) {
              isPlaying = false;
              ball.style.display = 'none';
              container.classList.remove('cursor-glove');
              loseScreen.style.display = 'flex';
            }
          }, bounceDuration);
        } else {
          // Bounce around the screen
          let targetX = selectedPath.points[bounceCount - 1].x;
          let targetY = selectedPath.points[bounceCount - 1].y;
          
          if (!isMobile) {
            targetX = Math.floor(Math.random() * 80) + 10;
            targetY = Math.floor(Math.random() * 60) + 20;
          }

          const scale = 1 - (bounceCount * 0.12);
          const rotation = bounceCount * 720;
          
          ball.style.top = targetY + '%';
          ball.style.left = targetX + '%';
          ball.style.transform = \`translate(-50%, -50%) scale(\${scale}) rotate(\${rotation}deg)\`;
          
          gameTimeout = setTimeout(bounce, bounceDuration);
        }
      }

      setTimeout(bounce, 50);
    }
  });

  function copyPenaltyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      alert('¡Código ' + code + ' copiado! Aplícalo en el checkout.');
      document.getElementById('penalty-modal').style.display = 'none';
    });
  }
</script>
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
`;

export default function ShopifyCode({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SHOPIFY_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-zinc-900 w-full max-w-4xl h-[80vh] rounded-2xl border border-zinc-800 flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
          <div>
            <h3 className="text-xl font-bold text-white">Código para Shopify (Liquid)</h3>
            <p className="text-sm text-zinc-400">Copia este código y pégalo en tu archivo <code className="text-yellow-400 bg-yellow-400/10 px-1 rounded">theme.liquid</code> justo antes de <code className="text-yellow-400 bg-yellow-400/10 px-1 rounded">&lt;/body&gt;</code></p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado' : 'Copiar Código'}
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-[#1e1e1e]">
          <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
            {SHOPIFY_CODE}
          </pre>
        </div>
      </div>
    </div>
  );
}
