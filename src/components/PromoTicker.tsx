import React from 'react';

export default function PromoTicker() {
  const phrases = [
    'HECHO EN MADRID',
    'NUEVOS LANZAMIENTOS',
    'DOBGE UNDERGROUND',
    'COLECCIÓN ESTILO COUTURE',
    '10% DE DESCUENTO CON DOBGE10',
    'ALTA CONFECCIÓN 450 GSM',
    'ENVÍOS EXPRESS EN 24H'
  ];

  // Repeat items to fill screen and enable flawless looping animation
  const repeatedList = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <div className="w-full bg-[#FF4838] border-t border-b border-[#FF4838] overflow-hidden py-4 select-none relative z-10 font-display">
      <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
        {repeatedList.map((phrase, idx) => (
          <div 
            key={idx} 
            className="inline-flex items-center text-black text-lg sm:text-2xl font-black uppercase tracking-[0.2em] mx-8 font-display"
          >
            <span>{phrase}</span>
            <span className="ml-16 inline-block w-3 h-3 bg-black transform rotate-45" />
          </div>
        ))}
      </div>

      {/* Embedded style tag for flawless CSS marquee animation support */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
