import React from 'react';
import { Product } from '../types';
import { X, ShieldCheck, RefreshCw, Truck, ChevronLeft, ChevronRight, Ruler } from 'lucide-react';
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
  
  // Size Guide States
  const [showSizeGuide, setShowSizeGuide] = React.useState(false);
  const [userHeight, setUserHeight] = React.useState<number>(175);
  const [userWeight, setUserWeight] = React.useState<number>(70);
  const [stylePreference, setStylePreference] = React.useState<'standard' | 'oversized'>('oversized');

  // Carousel State
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const getOptimizedImageUrl = (url: string, width = 800) => {
    if (url && url.includes('dobge.com') && url.includes('&width=')) {
      return url.replace(/&width=\d+/g, `&width=${width}`);
    }
    return url;
  };

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

  const getRecommendedSize = () => {
    let size = 'M';
    if (userWeight < 58 && userHeight < 165) {
      size = 'XS';
    } else if (userWeight < 67 && userHeight < 174) {
      size = 'S';
    } else if (userWeight < 78 && userHeight < 183) {
      size = 'M';
    } else if (userWeight < 89 && userHeight < 191) {
      size = 'L';
    } else {
      size = 'XL';
    }

    if (stylePreference === 'standard') {
      const sizesArray = ['XS', 'S', 'M', 'L', 'XL'];
      const currentIdx = sizesArray.indexOf(size);
      if (currentIdx > 0) {
        size = sizesArray[currentIdx - 1];
      }
    }

    if (product) {
      const available = product.sizes;
      if (available.length > 0 && !available.includes(size)) {
        if (size === 'XS' && available.includes('S')) return 'S';
        if (size === 'XL' && available.includes('L')) return 'L';
        return available.includes('M') ? 'M' : available[0];
      }
    }
    return size;
  };

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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="relative transform overflow-hidden bg-white text-left shadow-2xl transition-all w-full max-w-4xl border border-neutral-200 flex flex-col md:flex-row animate-none">
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-40 bg-white p-2 rounded-full border border-neutral-200 text-black hover:bg-[#FF2B85] hover:border-[#FF2B85] hover:text-white transition-colors duration-200 cursor-pointer"
            id="close-product-modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Huge visual gallery with carousel controls */}
          <div className="w-full md:w-1/2 bg-neutral-50 aspect-[3/4] md:aspect-auto md:h-[600px] relative border-r border-neutral-200 flex flex-col justify-between overflow-hidden">
            
            <div className="relative flex-grow w-full h-full overflow-hidden select-none">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  src={getOptimizedImageUrl(activeImage, 800)} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
                  referrerPolicy="no-referrer"
                  decoding="async"
                />
              </AnimatePresence>
              
              {product.gsm && (
                <div className="absolute top-4 left-4 bg-[#FF2B85] text-white text-[10px] font-mono tracking-widest px-3 py-1 uppercase font-bold z-20">
                  Heavyweight {product.gsm} GSM Cotton
                </div>
              )}

              {/* Automatic Carousels Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#FF2B85] hover:text-white border border-neutral-200 p-2 text-black transition-all cursor-pointer z-30"
                    title="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#FF2B85] hover:text-white border border-neutral-200 p-2 text-black transition-all cursor-pointer z-30"
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
                <div className="flex gap-2 bg-white/90 px-3 py-2 border border-neutral-200 shadow-md rounded">
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
                          currentIndex === idx ? 'border-[#FF2B85] scale-105 bg-neutral-50' : 'border-neutral-250 hover:border-neutral-400 bg-neutral-100'
                        }`}
                      >
                        <img 
                          src={getOptimizedImageUrl(img, 120)} 
                          alt={label} 
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" 
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-white/90 text-[7px] font-mono tracking-tighter text-center py-0.5 text-neutral-600 font-bold group-hover:text-black uppercase">
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
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Breadcrumb / Class */}
              <p className="text-[10px] font-mono tracking-[0.25em] text-[#FF2B85] uppercase mb-2">
                COLECCIÓN MADRID / {product.category.replace('-', ' ')}
              </p>

              <h2 className="text-2xl sm:text-3xl font-display text-black uppercase font-black tracking-tight leading-none">
                {product.name}
              </h2>

              {/* Price section */}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-lg font-mono font-bold text-black">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-neutral-400 line-through">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-neutral-650 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color picker */}
              {selectedColor && (
                <div className="mt-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF2B85] uppercase font-bold">
                    COLOR: <span className="text-black uppercase">{selectedColor.name}</span>
                  </span>
                  <div className="mt-2.5 flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`w-11 h-11 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                          selectedColor.name === color.name ? 'border-[#FF2B85] scale-110' : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        style={{ padding: '3px' }}
                      >
                        <span 
                          className="w-full h-full rounded-full block border border-neutral-200" 
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
                  <span className="text-[10px] font-mono tracking-widest text-[#FF2B85] uppercase font-bold">
                    SELECCIONA TALLA:
                  </span>
                  <button 
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[10px] font-mono text-neutral-500 underline decoration-neutral-300 cursor-pointer hover:text-[#FF2B85] hover:decoration-[#FF2B85] transition-colors bg-transparent border-none p-0 outline-none"
                  >
                    Guía de Tallas (Fit {product.fit})
                  </button>
                </div>
                <div className="mt-2.5 flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 text-xs font-mono font-bold border transition-all duration-200 cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#FF2B85] bg-[#FF2B85] text-white font-bold'
                          : 'border-neutral-200 text-black bg-neutral-50 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Info Tabs */}
              <div className="mt-8 border-t border-neutral-200 pt-5">
                <div className="flex gap-4 border-b border-neutral-200 pb-2">
                  <button 
                    onClick={() => setActiveTab('specs')}
                    className={`text-[10px] font-mono tracking-widest uppercase pb-1.5 transition-all cursor-pointer ${
                      activeTab === 'specs' ? 'text-black border-b-2 border-[#FF2B85] font-bold' : 'text-neutral-400'
                    }`}
                  >
                    Especificaciones
                  </button>
                  <button 
                    onClick={() => setActiveTab('care')}
                    className={`text-[10px] font-mono tracking-widest uppercase pb-1.5 transition-all cursor-pointer ${
                      activeTab === 'care' ? 'text-black border-b-2 border-[#FF2B85] font-bold' : 'text-neutral-400'
                    }`}
                  >
                    Envío y Cuidado
                  </button>
                </div>

                <div className="mt-4 text-xs text-neutral-600 leading-relaxed">
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
            <div className="mt-8 pt-4 border-t border-neutral-200">
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={justAddedTimer}
                id={`modal-add-to-cart-${product.id}`}
              />

              {/* Guarantees row */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-neutral-500 text-[9px] font-mono uppercase tracking-wider">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Envío Gratis desde 80€</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Devolución 14 días</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Pago 100% Seguro</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SIZES GUIDE MODAL OVERLAY */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-white border border-neutral-200 p-6 sm:p-8 w-full max-w-lg relative text-black shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="absolute right-4 top-4 bg-white p-1.5 rounded-full border border-neutral-200 text-black hover:bg-[#FF2B85] hover:border-[#FF2B85] hover:text-white transition-colors cursor-pointer"
                title="Cerrar guía"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-5 h-5 text-[#FF2B85]" />
                <h2 className="text-sm font-mono tracking-widest uppercase font-bold text-black border-none bg-transparent">
                  GUÍA DE TALLAS & RECOMENDADOR
                </h2>
              </div>

              <p className="text-[11px] text-neutral-600 mb-6 leading-relaxed font-light">
                Este artículo tiene un <strong className="text-black">patrón {product.fit || 'Oversized'} streetwear</strong> con hombros caídos y caída holgada premium. Sigue nuestro recomendador inteligente o consulta la tabla de medidas.
              </p>

              {/* INTERACTIVE CALCULATOR PANEL */}
              <div className="bg-neutral-50 p-4 border border-neutral-200 mb-6">
                <h3 className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#FF2B85] mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#FF2B85] rounded-full animate-pulse" />
                  Calcular Talla Recomendada
                </h3>

                <div className="space-y-4">
                  {/* Height Slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-neutral-650 mb-1">
                      <span>Tu Altura:</span>
                      <span className="text-black font-bold">{userHeight} cm</span>
                    </div>
                    <input 
                      type="range"
                      min="150"
                      max="210"
                      value={userHeight}
                      onChange={(e) => setUserHeight(Number(e.target.value))}
                      className="w-full accent-[#FF2B85] bg-neutral-200 h-1 cursor-pointer rounded-lg appearance-none"
                    />
                  </div>

                  {/* Weight Slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-neutral-650 mb-1">
                      <span>Tu Peso:</span>
                      <span className="text-black font-bold">{userWeight} kg</span>
                    </div>
                    <input 
                      type="range"
                      min="45"
                      max="125"
                      value={userWeight}
                      onChange={(e) => setUserWeight(Number(e.target.value))}
                      className="w-full accent-[#FF2B85] bg-neutral-200 h-1 cursor-pointer rounded-lg appearance-none"
                    />
                  </div>

                  {/* Fit Preference Selectors */}
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 block mb-1.5 uppercase tracking-wider">Estilo de ajuste deseado:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setStylePreference('standard')}
                        className={`py-1.5 px-3 border text-[10px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                          stylePreference === 'standard' 
                            ? 'border-[#FF2B85] text-black bg-neutral-100 font-bold' 
                            : 'border-neutral-200 text-neutral-500 hover:border-neutral-400'
                        }`}
                      >
                        Estilo Estándar
                      </button>
                      <button
                        type="button"
                        onClick={() => setStylePreference('oversized')}
                        className={`py-1.5 px-3 border text-[10px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                          stylePreference === 'oversized' 
                            ? 'border-[#FF2B85] text-black bg-neutral-100 font-bold' 
                            : 'border-neutral-200 text-neutral-500 hover:border-neutral-400'
                        }`}
                      >
                        Streetwear Extra Oversize
                      </button>
                    </div>
                  </div>

                  {/* CALCULATED RESULT PANEL */}
                  <div className="mt-3 bg-pink-50 border border-pink-100 py-3 px-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-neutral-600 block uppercase tracking-wide">Talla sugerida:</span>
                      <span className="text-sm font-mono font-black text-[#FF2B85]">DOBGE TALLA {getRecommendedSize()}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSize(getRecommendedSize());
                        setShowSizeGuide(false);
                      }}
                      className="bg-black text-white text-[9px] font-mono tracking-widest uppercase py-1.5 px-3 font-bold hover:bg-[#FF2B85] transition-colors cursor-pointer"
                    >
                      Aplicar esta talla
                    </button>
                  </div>
                </div>
              </div>

              {/* DIMENSION MEASURES TABLE */}
              <div>
                <h3 className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-600 mb-2">
                  Tabla Oficial de Medidas de {product.name} (cm)
                </h3>
                <div className="overflow-x-auto border border-neutral-200">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200 text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider">
                        <th className="p-2 border-r border-neutral-200">Talla</th>
                        <th className="p-2 border-r border-neutral-200">A - Ancho (Sisa)</th>
                        <th className="p-2 border-r border-neutral-200">B - Largo Total</th>
                        <th className="p-2">C - Largo Manga</th>
                      </tr>
                    </thead>
                    <tbody className="text-[10px] font-mono text-neutral-700">
                      {product.id.includes('tee') || product.name.toLowerCase().includes('camiseta') ? (
                        <>
                          <tr className="border-b border-neutral-100 hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">XS</td>
                            <td className="p-2 border-r border-neutral-200">54 cm</td>
                            <td className="p-2 border-r border-neutral-200">70 cm</td>
                            <td className="p-2">21 cm</td>
                          </tr>
                          <tr className="border-b border-neutral-100 hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">S</td>
                            <td className="p-2 border-r border-neutral-200">56 cm</td>
                            <td className="p-2 border-r border-neutral-200">72 cm</td>
                            <td className="p-2">22 cm</td>
                          </tr>
                          <tr className="border-b border-neutral-100 hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">M</td>
                            <td className="p-2 border-r border-neutral-200">59 cm</td>
                            <td className="p-2 border-r border-neutral-200">74 cm</td>
                            <td className="p-2">23 cm</td>
                          </tr>
                          <tr className="border-b border-neutral-100 hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">L</td>
                            <td className="p-2 border-r border-neutral-200">62 cm</td>
                            <td className="p-2 border-r border-neutral-200">76 cm</td>
                            <td className="p-2">24 cm</td>
                          </tr>
                          <tr className="hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">XL</td>
                            <td className="p-2 border-r border-neutral-200">65 cm</td>
                            <td className="p-2 border-r border-neutral-200">78 cm</td>
                            <td className="p-2">25 cm</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr className="border-b border-neutral-100 hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">S</td>
                            <td className="p-2 border-r border-neutral-200">61 cm</td>
                            <td className="p-2 border-r border-neutral-200">68 cm</td>
                            <td className="p-2">60 cm</td>
                          </tr>
                          <tr className="border-b border-neutral-100 hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">M</td>
                            <td className="p-2 border-r border-neutral-200">64 cm</td>
                            <td className="p-2 border-r border-neutral-200">70 cm</td>
                            <td className="p-2">61 cm</td>
                          </tr>
                          <tr className="border-b border-neutral-100 hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">L</td>
                            <td className="p-2 border-r border-neutral-200">67 cm</td>
                            <td className="p-2 border-r border-neutral-200">72 cm</td>
                            <td className="p-2">62 cm</td>
                          </tr>
                          <tr className="hover:bg-neutral-50/10">
                            <td className="p-2 font-bold border-r border-neutral-200 bg-neutral-50">XL</td>
                            <td className="p-2 border-r border-neutral-200">70 cm</td>
                            <td className="p-2 border-r border-neutral-200">74 cm</td>
                            <td className="p-2">63 cm</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="text-[9px] text-neutral-500 font-mono mt-2 text-right">
                  * Las medidas se toman en plano. Tolerancia de +-2 cm por costuras y lavado.
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
