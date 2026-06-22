import React from 'react';
import { Product } from '../types';
import { X, ShieldCheck, RefreshCw, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AddToCartButton from './AddToCartButton';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<{ name: string; hex: string } | null>(null);
  const [activeTab, setActiveTab] = React.useState<'specs' | 'care'>('specs');
  const [justAddedTimer, setJustAddedTimer] = React.useState(false);
  
  // Carousel State
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const images = product 
    ? ([product.image, product.hoverImage, product.lifestyleImage].filter(Boolean) as string[])
    : [];

  const activeImage = images[currentIndex] || product?.image || '';

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || null);
      setCurrentIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedColor) return;
    onAddToCart(product, selectedSize, selectedColor);
    setJustAddedTimer(true);
    setTimeout(() => {
      setJustAddedTimer(false);
    }, 2000);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="relative transform overflow-hidden bg-[#0B0B0C] text-left shadow-2xl transition-all w-full max-w-4xl border border-neutral-800 flex flex-col md:flex-row">
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-40 bg-black p-2 rounded-full border border-neutral-800 text-white hover:bg-[#FF4838] hover:border-[#FF4838] transition-colors duration-200 cursor-pointer"
            id="close-product-modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Huge visual gallery with carousel controls */}
          <div className="w-full md:w-1/2 bg-neutral-950 aspect-[3/4] md:aspect-auto md:h-[600px] relative border-r border-[#1e1e21] flex flex-col justify-between overflow-hidden">
            
            <div className="relative flex-grow w-full h-full overflow-hidden select-none">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  src={activeImage} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {product.gsm && (
                <div className="absolute top-4 left-4 bg-[#FF4838] text-white text-[10px] font-mono tracking-widest px-3 py-1 uppercase font-bold z-20">
                  Heavyweight {product.gsm} GSM Cotton
                </div>
              )}

              {/* Automatic Carousels Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/75 hover:bg-[#FF4838] border border-neutral-850 p-2 text-white transition-all cursor-pointer z-30"
                    title="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/75 hover:bg-[#FF4838] border border-neutral-850 p-2 text-white transition-all cursor-pointer z-30"
                    title="Siguiente imagen"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Micro Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2.5 z-20">
                <div className="flex gap-2 bg-black/85 px-3 py-2 border border-neutral-800 rounded">
                  {images.map((img, idx) => {
                    let label = 'Principal';
                    if (idx === 1) label = 'Frente';
                    if (idx === 2) label = 'Estilo';
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentIndex(idx);
                        }}
                        className={`group relative w-12 h-14 border transition-all overflow-hidden flex flex-col items-center justify-center cursor-pointer ${
                          currentIndex === idx ? 'border-[#FF4838] scale-105 bg-neutral-900' : 'border-neutral-850 hover:border-neutral-500 bg-neutral-950'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={label} 
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/90 text-[7px] font-mono tracking-tighter text-center py-0.5 text-neutral-400 font-bold group-hover:text-white uppercase">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic details & checkout configs */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#0F0F10]">
            <div>
              {/* Breadcrumb / Class */}
              <p className="text-[10px] font-mono tracking-[0.25em] text-[#FF4838] uppercase mb-2">
                COLECCIÓN MADRID / {product.category.replace('-', ' ')}
              </p>

              <h2 className="text-2xl sm:text-3xl font-display text-white uppercase font-black tracking-tight leading-none">
                {product.name}
              </h2>

              {/* Price section */}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-lg font-mono font-bold text-white">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-neutral-500 line-through">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-neutral-400 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color picker */}
              {selectedColor && (
                <div className="mt-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF4838] uppercase font-bold">
                    COLOR: <span className="text-white uppercase">{selectedColor.name}</span>
                  </span>
                  <div className="mt-2.5 flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                          selectedColor.name === color.name ? 'border-[#FF4838] scale-115' : 'border-neutral-800'
                        }`}
                        style={{ padding: '2px' }}
                      >
                        <span 
                          className="w-full h-full rounded-full block border border-neutral-900" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizing Selector */}
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF4838] uppercase font-bold">
                    SELECCIONA TALLA:
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 underline decoration-neutral-700 cursor-pointer hover:text-white">
                    Guía de Tallas (Fit {product.fit})
                  </span>
                </div>
                <div className="mt-2.5 flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 text-xs font-mono font-medium border transition-all duration-200 cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#FF4838] bg-[#FF4838] text-white font-bold'
                          : 'border-neutral-800 text-neutral-300 bg-neutral-950 hover:border-neutral-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Info Tabs */}
              <div className="mt-8 border-t border-neutral-900 pt-5">
                <div className="flex gap-4 border-b border-neutral-900 pb-2">
                  <button 
                    onClick={() => setActiveTab('specs')}
                    className={`text-[10px] font-mono tracking-widest uppercase pb-1.5 transition-all cursor-pointer ${
                      activeTab === 'specs' ? 'text-white border-b border-[#FF4838] font-bold' : 'text-neutral-500'
                    }`}
                  >
                    Especificaciones
                  </button>
                  <button 
                    onClick={() => setActiveTab('care')}
                    className={`text-[10px] font-mono tracking-widest uppercase pb-1.5 transition-all cursor-pointer ${
                      activeTab === 'care' ? 'text-white border-b border-[#FF4838] font-bold' : 'text-neutral-500'
                    }`}
                  >
                    Envío y Cuidado
                  </button>
                </div>

                <div className="mt-4 text-xs text-neutral-400 leading-relaxed">
                  {activeTab === 'specs' ? (
                    <ul className="list-disc pl-4 space-y-1 font-light">
                      <li>Composición: {product.composition}</li>
                      <li>Ajuste: {product.fit} Streetwear Spec</li>
                      {product.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-2 font-light">
                      <p>🧼 <strong>Cuidado:</strong> Lavar a máquina máximo 30º, ciclo corto. No usar lejía ni blanqueadores para retener color. Planchar a temperatura baja.</p>
                      <p>🇪🇸 <strong>Logística Española:</strong> Envío exprés 24-48h a península. Cambios de talla gratis en los primeros 14 días con recogida a domicilio.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions block footer */}
            <div className="mt-8 pt-4 border-t border-neutral-900">
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={justAddedTimer}
                id={`modal-add-to-cart-${product.id}`}
              />

              {/* Guarantees row */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-neutral-500 text-[9px] font-mono uppercase tracking-wider">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Envío Gratis desde 80€</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Devolución 14 días</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Pago 100% Seguro</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
