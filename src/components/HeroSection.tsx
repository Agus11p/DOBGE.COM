import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between bg-[#0B0B0C] py-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none">
      
      {/* Small rotated vertical year text in the margin */}
      <div className="absolute right-6 sm:right-10 top-18 font-mono text-[11px] text-neutral-600 tracking-[0.3em] uppercase [writing-mode:vertical-lr] select-none opacity-40">
        2026
      </div>

      {/* spacer to push main content down, or keep it balanced */}
      <div />

      {/* Main visual typography block */}
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center my-auto pt-10">
        <div className="z-10 flex flex-col">
          {/* Colossal text block matching screenshot layout */}
          <h1 className="font-display text-[60px] sm:text-[100px] md:text-[140px] lg:text-[170px] uppercase font-black leading-[0.83] tracking-tighter text-white">
            <span className="block">TU FORMA DE VESTIR,</span>
            <span className="block text-[#FF4838]">TUS REGLAS.</span>
          </h1>

          {/* Subtitle and button side by side or stacked */}
          <div className="mt-8 flex flex-col items-start gap-8 max-w-xl">
            <p className="text-base sm:text-lg text-neutral-200 font-sans tracking-wide leading-relaxed font-light">
              Dobge es el rastro que dejas al caminar. Una marca nacida del asfalto para quienes no piden permiso.
            </p>

            <button
              onClick={onExploreClick}
              className="bg-[#FF4838] hover:bg-white text-white hover:text-black px-10 py-5 text-[11px] font-mono font-bold tracking-[0.25em] uppercase transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg"
              id="hero-see-collection-btn"
            >
              VER CATÁLOGO
            </button>
          </div>
        </div>
      </div>

      {/* Footer prompt of the Hero */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-neutral-500 font-mono text-[10px] tracking-[0.2em] uppercase mt-auto">
        <button 
          onClick={onExploreClick}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
        >
          <span>SCROLL</span>
          <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
        </button>
        <span className="text-neutral-700 hidden sm:inline">HECHO EN MADRID, ESPAÑA</span>
      </div>

    </section>
  );
}
