import React from 'react';
import { Instagram, Youtube, MapPin, Mail, FileText } from 'lucide-react';

export default function Footer() {
  const [activeLegalModal, setActiveLegalModal] = React.useState<'terms' | 'privacy' | null>(null);

  const socialLinks = [
    { label: 'Instagram', url: 'https://instagram.com/dobge.co', icon: <Instagram className="w-3.5 h-3.5" /> },
    { label: 'TikTok', url: '#', icon: <span className="text-[10px] font-bold">T</span> },
    { label: 'YouTube', url: '#', icon: <Youtube className="w-3.5 h-3.5" /> }
  ];

  return (
    <footer className="bg-white text-neutral-600 select-none py-18 font-sans text-xs border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main 4-Column Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* DOBGE Branding Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 select-none">
              <span className="font-display text-2xl tracking-[0.05em] text-black font-black">
                DOBGE
              </span>
              <span className="text-[8px] font-mono text-neutral-400 align-super select-none">®</span>
            </div>
            
            <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
              Plataforma de alta moda urbana contemporánea. Confección, gramaje insuperable y patronaje optimizado de distribución controlada nacional desde la ciudad de Madrid.
            </p>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((item, index) => (
                <a 
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black text-neutral-500 transition-colors"
                  title={item.label}
                  id={`footer-social-${index}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Catalog shortcuts and categories */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] tracking-widest text-black uppercase font-bold">
              Catálogo Corto
            </h3>
            <ul className="space-y-2 text-[11px] font-light text-neutral-600">
              <li>
                <a href="#product-showcase" className="hover:text-black transition-colors">RAW TRACE Collection</a>
              </li>
              <li>
                <a href="#product-showcase" className="hover:text-black transition-colors">Sudaderas Over 450 GSM</a>
              </li>
              <li>
                <a href="#product-showcase" className="hover:text-[#FF2B85] transition-colors font-medium text-[#FF2B85]">Nueva Temporada Drops</a>
              </li>
              <li>
                <a href="#product-showcase" className="hover:text-black transition-colors">Básicos Retiro Vintage</a>
              </li>
            </ul>
          </div>

          {/* Legal and information details */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] tracking-widest text-black uppercase font-bold">
              Soporte y Legales
            </h3>
            <ul className="space-y-2 text-[11px] font-light text-neutral-600">
              <li>
                <button onClick={() => setActiveLegalModal('privacy')} className="hover:text-black transition-colors text-left cursor-pointer">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button onClick={() => setActiveLegalModal('terms')} className="hover:text-black transition-colors text-left cursor-pointer">
                  Términos y condiciones de Venta
                </button>
              </li>
              <li>
                <a href="#about-dobge" className="hover:text-black transition-colors">Garantía de Sostenibilidad</a>
              </li>
              <li>
                <span className="text-neutral-500 block pb-1">Soporte Albaranes: Madrid, es_ES</span>
              </li>
            </ul>
          </div>

          {/* Headquarters contact */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] tracking-widest text-black uppercase font-bold">
              Contacto Principal
            </h3>
            <ul className="space-y-3 text-[11px] font-light text-neutral-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <span>Oficina central & Almacén central, Madrid, España (28014).</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <a href="mailto:soporte@dobge.com" className="hover:text-black transition-colors">soporte@dobge.com</a>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>Atención: Lunes - Viernes, 09:00 a 18:00 CEST.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Dynamic Legal Modals overlay (Simulated in the footer) */}
        {activeLegalModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs animate-none">
            <div className="bg-white text-black p-6 md:p-8 max-w-lg w-full shadow-2xl border border-neutral-200 space-y-4 relative">
              <button 
                onClick={() => setActiveLegalModal(null)}
                className="absolute top-4 right-4 bg-neutral-100 p-2 text-neutral-500 hover:text-black rounded-full"
                id="close-legal-modal"
              >
                ✕
              </button>
              
              <h3 className="text-sm font-mono tracking-widest uppercase font-bold border-b pb-3 text-neutral-900">
                {activeLegalModal === 'privacy' ? 'Política de Privacidad DOBGE' : 'Términos de Venta y Devolución'}
              </h3>

              <div className="text-[11px] text-neutral-600 space-y-3 max-h-[300px] overflow-y-auto pr-1 leading-relaxed">
                {activeLegalModal === 'privacy' ? (
                  <>
                    <p>En conformidad con el RGPD, los datos ingresados en simulaciones o compras de esta plataforma premium son tratados con estricta confidencialidad para procesar su envío.</p>
                    <p>La responsable de datos es DOBGE S.A. con dirección en Calle de Alcalá, 45, Madrid. Puede ejercer sus derechos escribiendo a privacidad@dobge.com.</p>
                    <p>No cedemos información a terceros fuera del operador de paquetería express para la entrega garantizada en 24/48h.</p>
                  </>
                ) : (
                  <>
                    <p><strong>1. PRECIOS:</strong> Todos los precios mostrados incluyen el Impuesto sobre el Valor Añadido (IVA) vigente en España (21%).</p>
                    <p><strong>2. ENVÍOS:</strong> Son gratuitos en pedidos de 80€ o más. En pedidos menores el recargo es de 4.99€ por gastos logísticos.</p>
                    <p><strong>3. POLÍTICA DE CAMBIOS:</strong> En caso de desear un cambio por otra talla, DOBGE gestionará gratuitamente la retirada del artículo previo y entrega del sustituto en su domicilio.</p>
                    <p><strong>4. REEMBOLSOS:</strong> Dispone de 14 días naturales para solicitar el desistimiento. El producto debe lucir sus etiquetas originales sin desgastes ni perfumes ajenos.</p>
                  </>
                )}
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setActiveLegalModal(null)}
                  className="w-full bg-black text-white py-3 text-xs font-mono tracking-widest uppercase hover:bg-[#FF2B85] transition-colors cursor-pointer"
                >
                  Entendido y Aceptar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copyright and trademark indicators footer */}
        <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-neutral-550 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} DOBGE Inc. España. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span>Hecho en Madrid</span>
            <span>•</span>
            <span className="text-[#FF2B85] font-bold decoration-neutral-300 underline">Aprobación de Calidad Premium</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
