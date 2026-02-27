import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';

type GameState = 'idle' | 'playing' | 'won' | 'lost';

export default function PenaltyGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [ballPos, setBallPos] = useState({ x: 50, y: 90, scale: 1, rotation: 0 });
  const [showBall, setShowBall] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setGameState('playing');
    
    const paths = [
      // Path 1: Zig Zag (White)
      {
        start: { x: 50, y: 90 },
        points: [
          { x: 85, y: 75 },
          { x: 15, y: 55 },
          { x: 80, y: 35 },
          { x: 35, y: 25 },
          { x: 50, y: 15 }
        ]
      },
      // Path 2: Complex (Red)
      {
        start: { x: 50, y: 90 },
        points: [
          { x: 85, y: 70 },
          { x: 20, y: 55 },
          { x: 40, y: 45 },
          { x: 80, y: 30 },
          { x: 45, y: 15 }
        ]
      },
      // Path 3: Wavy (Purple)
      {
        start: { x: 30, y: 90 },
        points: [
          { x: 75, y: 65 },
          { x: 25, y: 45 },
          { x: 60, y: 30 },
          { x: 45, y: 20 },
          { x: 50, y: 10 }
        ]
      }
    ];
    
    const isMobile = window.innerWidth < 768;
    const selectedPath = paths[Math.floor(Math.random() * paths.length)];
    
    setBallPos({ x: selectedPath.start.x, y: selectedPath.start.y, scale: 1, rotation: 0 });
    setShowBall(true);

    let bounceCount = 0;
    const maxBounces = 4;
    const bounceDuration = 800; // Slower bounce

    const bounce = () => {
      bounceCount++;
      if (bounceCount > maxBounces) {
        // Final shot towards the goal
        let targetX = selectedPath.points[4].x;
        let targetY = selectedPath.points[4].y;
        
        if (!isMobile) {
          targetX = Math.floor(Math.random() * 60) + 20;
          targetY = Math.floor(Math.random() * 30) + 20;
        }

        const rotation = bounceCount * 720;
        setBallPos({ x: targetX, y: targetY, scale: 0.4, rotation });

        timeoutRef.current = setTimeout(() => {
          setGameState(prev => {
            if (prev === 'playing') {
              setShowBall(false);
              return 'lost';
            }
            return prev;
          });
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
        setBallPos({ x: targetX, y: targetY, scale, rotation });
        
        timeoutRef.current = setTimeout(bounce, bounceDuration);
      }
    };

    // Small delay to allow CSS transition to reset, then shoot
    setTimeout(bounce, 50);
  };

  const catchBall = (e: React.PointerEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (gameState !== 'playing') return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowBall(false);
    setGameState('won');
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#10B981', '#FFFFFF']
    });
  };

  const resetGame = () => {
    setGameState('idle');
    setShowBall(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const closeGame = () => {
    setIsOpen(false);
    resetGame();
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`¡Código ${code} copiado!`);
    closeGame();
  };

  return (
    <>
      {/* Floating Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-105 transition-transform z-50 animate-bounce"
        >
          ⚽ ¡Ataja y Gana!
        </button>
      )}

      {/* Game Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center md:p-4 backdrop-blur-sm">
          <div 
            className="w-full h-full md:h-auto md:max-w-4xl md:aspect-[9/16] bg-zinc-900 md:rounded-2xl overflow-hidden relative shadow-2xl md:border border-zinc-800 mx-auto"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1553152531-79813ce4c771?auto=format&fit=crop&q=80&w=800')`, // Fallback placeholder
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: gameState === 'playing' ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" style="font-size:48px"><text y="40">🧤</text></svg>') 24 24, auto` : 'default'
            }}
          >
            <button 
              onClick={closeGame}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-20 bg-black/40 rounded-full p-1 backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Start Screen */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 md:p-6 text-center backdrop-blur-sm z-10">
                <span className="text-5xl md:text-6xl mb-2 md:mb-4">🧤</span>
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-yellow-400 uppercase italic">¡Ataja el penal!</h2>
                <p className="text-base md:text-xl mb-6 md:mb-8 max-w-md">
                  Atrapa el balón haciendo clic sobre él antes de que entre a la portería y gana un <strong className="text-yellow-400">15% de descuento</strong>.
                </p>
                <button 
                  onClick={startGame}
                  className="bg-yellow-400 text-black px-6 md:px-8 py-3 rounded-full font-bold text-base md:text-lg hover:bg-yellow-300 transition-colors uppercase tracking-wider"
                >
                  Jugar ahora
                </button>
              </div>
            )}

            {/* The Ball */}
            {showBall && (
              <div 
                onPointerDown={catchBall}
                className="absolute text-6xl md:text-7xl select-none flex items-center justify-center cursor-pointer z-10"
                style={{
                  left: `${ballPos.x}%`,
                  top: `${ballPos.y}%`,
                  transform: `translate(-50%, -50%) scale(${ballPos.scale}) rotate(${ballPos.rotation}deg)`,
                  transition: ballPos.scale === 1 ? 'none' : 'left 0.8s linear, top 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s linear',
                  textShadow: '0 10px 20px rgba(0,0,0,0.5)',
                  width: '100px',
                  height: '100px',
                  touchAction: 'none'
                }}
              >
                ⚽
              </div>
            )}

            {/* Win Screen */}
            {gameState === 'won' && (
              <div className="absolute inset-0 bg-emerald-900/80 flex flex-col items-center justify-center text-white p-4 md:p-6 text-center backdrop-blur-md animate-in fade-in duration-300 z-10">
                <span className="text-5xl md:text-6xl mb-2 md:mb-4">🏆</span>
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-yellow-400 uppercase italic">¡ATAJADÓN!</h2>
                <p className="text-base md:text-xl mb-4 md:mb-6">¡Felicidades! Tienes reflejos de acero.</p>
                <div className="bg-black/50 p-3 md:p-4 rounded-xl border border-emerald-500/30 mb-4 md:mb-6">
                  <p className="text-xs md:text-sm text-emerald-200 mb-1 uppercase tracking-wider">Tu código de 15% OFF</p>
                  <p className="text-2xl md:text-3xl font-mono font-bold text-white">MUNDIAL15</p>
                </div>
                <button 
                  onClick={() => copyCode('MUNDIAL15')}
                  className="bg-yellow-400 text-black px-6 md:px-8 py-3 rounded-full font-bold text-base md:text-lg hover:bg-yellow-300 transition-colors uppercase tracking-wider"
                >
                  Copiar y Comprar
                </button>
              </div>
            )}

            {/* Lose Screen */}
            {gameState === 'lost' && (
              <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center text-white p-4 md:p-6 text-center backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto z-10">
                <span className="text-5xl md:text-6xl mb-2 md:mb-4">🥅</span>
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-red-400 uppercase italic">¡GOL EN CONTRA!</h2>
                <p className="text-sm md:text-lg mb-4 md:mb-6 max-w-md">No lograste atajarlo, pero aún así te llevas un premio de consolación.</p>
                
                <div className="bg-black/50 p-3 md:p-4 rounded-xl border border-red-500/30 mb-4 md:mb-6 w-full max-w-sm">
                  <p className="text-xs md:text-sm text-red-200 mb-1 uppercase tracking-wider">Tu código de 5% OFF</p>
                  <p className="text-xl md:text-2xl font-mono font-bold text-white">MUNDIAL5</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <button 
                    onClick={startGame}
                    className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded-full font-bold hover:bg-zinc-700 transition-colors border border-zinc-600 text-sm md:text-base"
                  >
                    Reintentar
                  </button>
                  <button 
                    onClick={() => copyCode('MUNDIAL5')}
                    className="flex-1 bg-yellow-400 text-black px-4 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors text-sm md:text-base"
                  >
                    Usar 5%
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
