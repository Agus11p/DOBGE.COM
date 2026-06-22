import React from 'react';
import { REVIEWS } from '../data';
import { Star, CheckCircle2 } from 'lucide-react';

export default function Reviews() {
  return (
    <section className="py-24 bg-[#0B0B0C] select-none font-sans border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Centered titles */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF4838] uppercase block mb-2">
            VOCES DEL CLUB / OPINIONES REALES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display text-white uppercase font-black tracking-tight leading-none">
            LO QUE OPINAN QUIENES VISTEN DOBGE.
          </h2>
          <p className="text-xs text-neutral-400 mt-4 font-light">
            Nuestros clientes coinciden en la superioridad de nuestro gramaje pesado y corte boxy respecto a los estándares habituales.
          </p>
        </div>

        {/* Opinion cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#0F0F10] p-6 border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between"
              id={`review-card-${rev.id}`}
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-0.5 text-[#FF4838] mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 fill-current ${
                        i < Math.floor(rev.rating) ? 'text-[#FF4838]' : 'text-neutral-800'
                      }`} 
                    />
                  ))}
                </div>

                {/* Comment quote text */}
                <p className="text-xs text-neutral-300 leading-relaxed font-light italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Customer details */}
              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between">
                <div className="flex flex-col">
                  {/* Verified badge + Name */}
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" title="Compra verificada" />}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    Comprador de {rev.location}
                  </span>
                </div>
                <span className="text-[9px] text-neutral-500 font-mono">{rev.date}</span>
              </div>

            </div>
          ))}
        </div>

        {/* Global Summary score block */}
        <div className="mt-12 bg-black text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-neutral-900">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-mono font-black tracking-normal text-[#FF4838]">4.9 / 5.0</span>
            <div className="flex flex-col font-mono text-[10px] tracking-wider">
              <span className="text-white font-bold">Puntuación de Miembros</span>
              <span className="text-neutral-500">Basado en más de 340 envíos certificados en España</span>
            </div>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase text-center sm:text-right">
            💯 Compras auditadas por sellos independientes nacionales
          </div>
        </div>

      </div>
    </section>
  );
}
