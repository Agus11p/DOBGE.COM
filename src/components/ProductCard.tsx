import React from 'react';
import { Product } from '../types';
import { Eye, ShoppingBag, Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
}

export default function ProductCard({ product, onViewProduct, onAddToCart }: ProductCardProps): React.JSX.Element {
  const [selectedSizeQuick, setSelectedSizeQuick] = React.useState<string | null>(null);
  const [showSizes, setShowSizes] = React.useState(false);
  const [cardImageIndex, setCardImageIndex] = React.useState(0);

  const images = [product.image, product.hoverImage, product.lifestyleImage].filter(Boolean) as string[];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSizes(!showSizes);
  };

  const selectQuickSize = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    onAddToCart(product, size, product.colors[0]);
    setShowSizes(false);
  };

  return (
    <div 
      className="group relative flex flex-col bg-[#0F0F10] border border-neutral-900 hover:border-neutral-800 transition-colors overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 cursor-pointer"
        onClick={() => onViewProduct(product)}
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.originalPrice && (
            <span className="bg-[#FF4838] text-white text-[10px] tracking-widest font-mono uppercase px-2 py-0.5 font-bold">
              REBAJAS
            </span>
          )}
          {product.gsm && (
            <span className="bg-black text-white border border-neutral-800 text-[9px] tracking-wider font-mono px-2 py-0.5 font-bold">
              {product.gsm} GSM
            </span>
          )}
        </div>

        {/* Product Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={cardImageIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            src={images[cardImageIndex] || product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover object-center group-hover:opacity-100 transition-opacity duration-300"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Card Chevrons Overlay */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCardImageIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="bg-black/85 hover:bg-[#FF4838] border border-neutral-800 p-1 text-white transition-colors cursor-pointer rounded-full"
              title="Imagen anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCardImageIndex((prev) => (prev + 1) % images.length);
              }}
              className="bg-black/85 hover:bg-[#FF4838] border border-neutral-800 p-1 text-white transition-colors cursor-pointer rounded-full"
              title="Siguiente imagen"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Little Minimal Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-30 transition-opacity duration-300">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCardImageIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  cardImageIndex === idx ? 'bg-[#FF4838] w-3.5' : 'bg-neutral-600 hover:bg-neutral-400'
                }`}
                title={`Ver imagen ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 z-10">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewProduct(product);
              }}
              className="bg-neutral-900 text-white border border-neutral-800 p-3 hover:bg-[#FF4838] hover:border-[#FF4838] transition-colors duration-300 shadow-md cursor-pointer"
              title="Ver detalle"
              id={`view-btn-${product.id}`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleQuickAdd}
              className="bg-[#FF4838] text-white px-4 py-3 hover:bg-white hover:text-black font-mono text-xs tracking-widest transition-colors duration-300 shadow-md flex items-center gap-2 cursor-pointer font-bold"
              title="Añadir rápido"
              id={`quick-add-${product.id}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>AÑADIR</span>
            </button>
          </div>
        </div>

        {/* Quick Size Selection Overlay */}
        {showSizes && (
          <div className="absolute inset-x-0 bottom-0 bg-neutral-950/95 backdrop-blur-sm p-4 border-t border-neutral-800 transition-all duration-300 z-40 text-center">
            <p className="text-[10px] font-mono tracking-widest text-[#FF4838] mb-2 uppercase text-center font-bold">
              SELECCIONA TALLA
            </p>
            <div className="flex justify-center gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => selectQuickSize(e, size)}
                  className="w-10 h-10 border border-neutral-800 text-xs font-mono font-medium hover:border-[#FF4838] hover:bg-[#FF4838] text-white transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSizes(false);
              }}
              className="w-full text-center text-[9px] font-mono tracking-wider text-red-500 mt-3 hover:underline uppercase cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="p-4 flex flex-col bg-[#0F0F10] z-20">
        <div className="flex justify-between items-start gap-3">
          <h3 
            className="text-xs font-mono font-bold text-white tracking-wider hover:text-[#FF4838] transition-colors cursor-pointer uppercase line-clamp-1"
            onClick={() => onViewProduct(product)}
          >
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-xs font-mono font-bold text-white whitespace-nowrap">
              {product.price.toFixed(2)} €
            </span>
            {product.originalPrice && (
              <span className="text-[10px] font-mono text-neutral-500 line-through">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>
        </div>

        {/* Context metadata traits */}
        <div className="mt-1 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
          <span className="uppercase">Corte {product.fit}</span>
          <span>{product.gsm ? `${product.gsm} GSM` : 'PREMIUM'}</span>
        </div>

        {/* Micro color chips & product indicators */}
        <div className="mt-3 flex items-center justify-between border-t border-neutral-900/60 pt-3">
          <div className="flex gap-1">
            {product.colors.map((col) => (
              <span 
                key={col.name}
                className="w-2.5 h-2.5 rounded-full border border-neutral-800 scale-100 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono tracking-widest text-[#FF4838] font-bold">DOBGE® DIGITAL</span>
        </div>
      </div>
    </div>
  );
}
