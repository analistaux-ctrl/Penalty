import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, Code } from 'lucide-react';
import PenaltyGame from './components/PenaltyGame';
import ShopifyCode from './components/ShopifyCode';

export default function App() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <Menu className="w-6 h-6 text-zinc-400" />
          <div className="text-2xl font-bold text-yellow-400 tracking-widest">INVICTA</div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-zinc-400" />
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-zinc-400" />
              <span className="absolute -top-1 -right-2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
            </div>
          </div>
        </div>
        <div className="bg-yellow-400 text-black text-center text-xs font-bold py-1.5 tracking-wide">
          ENVÍO GRATIS EN RELOJES EXCLUSIVOS INVICTA
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="relative h-[600px] w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/40 to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200" 
            alt="Watch" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          
          <div className="relative z-20 text-center px-4">
            <div className="inline-block border-t-2 border-b-2 border-yellow-400 py-2 mb-4">
              <h2 className="text-xl md:text-3xl font-bold tracking-widest">¡EXCLUSIVO ONLINE!</h2>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-2">
              <span className="text-yellow-400">10% OFF</span> ADICIONAL
            </h1>
            <h3 className="text-xl md:text-2xl font-bold mb-6 tracking-widest">EN TU PRIMERA COMPRA</h3>
            <div className="inline-block bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-400/30">
              <span className="text-lg">CON EL CÓDIGO </span>
              <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded ml-2">VIVAMEXICO</span>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Code */}
      <button 
        onClick={() => setShowCode(true)}
        className="fixed bottom-24 right-4 bg-zinc-800 text-white p-3 rounded-full shadow-lg border border-zinc-700 z-40 flex items-center gap-2 hover:bg-zinc-700 transition-colors"
      >
        <Code className="w-5 h-5" />
        <span className="text-sm font-medium pr-2">Ver código Shopify</span>
      </button>

      {/* Penalty Game Widget */}
      <PenaltyGame />

      {/* Code Modal */}
      {showCode && <ShopifyCode onClose={() => setShowCode(false)} />}
    </div>
  );
}
