import React from 'react';
import { ShieldCheck, CornerRightDown, Award, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-dobge" className="py-12 sm:py-24 bg-white border-y border-neutral-200 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Title */}
        <div className="max-w-xl mb-8 sm:mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF2B85] uppercase block mb-2">
            DETRÁS DE LA COSTURA / ESPAÑA
          </span>
          <h2 className="text-3xl sm:text-5xl font-display text-black uppercase font-black tracking-tight leading-none">
            NUESTRA VISIÓN: REDEFINIR LA FIRMEZA EN EL TEXTIL URBANO.
          </h2>
        </div>

        {/* 2-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Beautiful editorial image illustrating fabric / studio aesthetics */}
          <div className="lg:col-span-5 relative aspect-[16/9] lg:aspect-[3/4] bg-neutral-100 border border-neutral-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=70&w=600&auto=format&fit=crop"
              alt="DOBGE Studio Fashion Confection"
              className="w-full h-full object-cover grayscale contrast-125 opacity-70 hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute top-4 left-4 z-10 bg-black px-3.5 py-1.5 border border-neutral-800 font-mono text-[9px] uppercase tracking-widest text-white">
              EST. MADRID 2024
            </div>
            {/* Custom visual chip */}
            <div className="hidden md:block absolute bottom-4 right-4 z-10 bg-[#FF2B85] text-white p-4 max-w-[190px] font-mono text-[8px] leading-normal uppercase">
              <span className="font-bold text-[10px] block mb-1">PRODUCCIÓN ÉTICA</span>
              Suministrado directamente bajo demanda estricta para evitar sobreproducción textil y residuos ecológicos.
            </div>
          </div>

          {/* Right: Detailed explanations, philosophy, materials */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black">
                  <Award className="w-4 h-4 text-[#FF2B85]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest">
                    ALGODÓN PEINADO PESADO 450 GSM
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Nuestras sudaderas pesan exactamente <strong>450 gramos por metro cuadrado</strong> (GSM). El hilado se peina mecánicamente para purgar impurezas y crear un tacto rígido incomparable que hereda la robustez estructural tradicional.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black">
                  <Sparkles className="w-4 h-4 text-[#FF2B85]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest">
                    PATRONAJE BOXY & OVERSIZED
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Alineados con la moda europea actual, estudiamos milimétricamente las sisas y hombros para entregar prendas amplias que no luzcan descuidadas. La caída es vertical sobre la cintura creando un bloque geométrico impecable.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black">
                  <ShieldCheck className="w-4 h-4 text-[#FF2B85]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest">
                    DISEÑADO + HECHO EN MADRID
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Creemos en el talento de cercanía. Toda nuestra gestión de marca, diseño geométrico de bordados, empaquetado perfumado individual y logística principal se ejecuta desde <strong>Madrid, España</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black">
                  <CornerRightDown className="w-4 h-4 text-[#FF2B85]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest">
                    PRECIOS DIRECTOS SIN COMISIÓN
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  En DOBGE omitimos intermediarios, distribuidores o tiendas de comisión abusiva. Al vender exclusivamente online bajo nuestra plataforma, aseguramos que pagues únicamente por calidad textil genuina de alta costura.
                </p>
              </div>

            </div>

            {/* Quote block */}
            <div className="border-l-4 border-[#FF2B85] pl-5 py-3 bg-neutral-50 border border-neutral-200">
               <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest font-bold">La Filosofía de DOBGE</span>
               <blockquote className="text-xs italic text-neutral-750 leading-relaxed mt-1">
                 "No confeccionamos moda efímera para usar y tirar. Diseñamos sudaderas y camisetas robustas de algodón pesado que resisten cientos de lavados y mantienen el mismo porte de seguridad que mostraste el primer día."
               </blockquote>
               <cite className="block text-[10px] text-neutral-500 font-mono uppercase tracking-wider mt-2.5 not-italic">
                 — Dirección Creativa DOBGE, Madrid.
               </cite>
            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
}
