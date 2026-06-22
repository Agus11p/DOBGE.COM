import React from 'react';
import { Truck, RotateCcw, CreditCard, HeartHandshake } from 'lucide-react';

export default function Benefits() {
  const benefitList = [
    {
      icon: <Truck className="w-5 h-5 text-[#FF4838]" />,
      title: "ENVÍO EXPRÉS EN 24/48 HORAS",
      desc: "Distribución ágil desde el centro de Madrid a toda España peninsular e Islas de manera priorizada."
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-[#FF4838]" />,
      title: "CAMBIOS Y DEVOLUCIONES SENCILLAS",
      desc: "Gestionamos la recogida de tu cambio de talla sin coste alguno para ti durante los primeros 14 días."
    },
    {
      icon: <CreditCard className="w-5 h-5 text-[#FF4838]" />,
      title: "PASARELA SEGURA SSL",
      desc: "Soportamos tarjetas de crédito o débito con autenticación bancaria garantizada para tu confianza."
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#FF4838]" />,
      title: "ATENCIÓN EXCLUSIVA PERSONALIZADA",
      desc: "Atención directa de dudas, tallaje o pedidos a través de WhatsApp o soporte local telefónico."
    }
  ];

  return (
    <section className="py-16 bg-[#0B0B0C] border-b border-neutral-900 select-none font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitList.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col p-6 bg-[#0F0F10] border border-neutral-900 hover:border-neutral-800 transition-colors duration-200"
              id={`benefit-${index}`}
            >
              <div className="mb-4 bg-black p-3 w-11 h-11 flex items-center justify-center border border-neutral-800">
                {item.icon}
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
