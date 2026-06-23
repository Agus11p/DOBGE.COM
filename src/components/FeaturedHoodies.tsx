import React from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeaturedHoodiesProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onScrollToCatalog: () => void;
}

export default function FeaturedHoodies({ products, onViewProduct, onScrollToCatalog }: FeaturedHoodiesProps) {
  // Extract unique products to compile featured list without duplicates
  const uniqueProducts: Product[] = [];
  const seenIds = new Set<string>();
  
  for (const p of products) {
    if (!seenIds.has(p.id)) {
      seenIds.add(p.id);
      uniqueProducts.push(p);
    }
  }

  // Use up to 3 unique products
  const featuredList = uniqueProducts.slice(0, 3).map((prod, idx) => ({
    num: `0${idx + 1}`,
    product: prod,
    displayTitle: prod.name
  }));

  // State to track manual carousel image indices per featured product
  const [imageIndices, setImageIndices] = React.useState<Record<string, number>>({});

  const handlePrevImage = (e: React.MouseEvent, productId: string, imagesLength: number) => {
    e.stopPropagation();
    setImageIndices((prev) => {
      const idx = prev[productId] ?? 0;
      return {
        ...prev,
        [productId]: (idx - 1 + imagesLength) % imagesLength,
      };
    });
  };

  const handleNextImage = (e: React.MouseEvent, productId: string, imagesLength: number) => {
    e.stopPropagation();
    setImageIndices((prev) => {
      const idx = prev[productId] ?? 0;
      return {
        ...prev,
        [productId]: (idx + 1) % imagesLength,
      };
    });
  };

  const handleDotClick = (e: React.MouseEvent, productId: string, targetIdx: number) => {
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [productId]: targetIdx,
    }));
  };

  return (
    <div className="relative w-full bg-neutral-50 text-black py-12 sm:py-18 px-6 sm:px-12 md:px-16 border-t border-b border-neutral-200 select-none overflow-hidden">
      
      {/* Background Translucent Watermark */}
      <div className="absolute left-4 sm:left-6 bottom-[-10px] sm:bottom-[-20px] pointer-events-none select-none font-display text-[120px] sm:text-[220px] md:text-[300px] font-black tracking-widest text-black/[0.03] leading-none uppercase">
        D*BGE
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Editorial Typography block */}
        <div className="lg:col-span-4 flex flex-col items-start">
          <h2 className="font-display text-[55px] sm:text-[75px] md:text-[85px] uppercase font-black leading-[0.85] tracking-tight">
            <span className="block text-black">SUDADERAS</span>
            <span className="block text-[#FF2B85]">CON CAPUCHA</span>
          </h2>
          
          <p className="mt-6 text-xs sm:text-sm font-sans tracking-widest text-neutral-600 uppercase leading-relaxed font-light max-w-sm">
            CORTE OVERSIZED. ALGODÓN PESADO 450 GSM. DETALLES BORDADOS A MANO EN MADRID.
          </p>

          <button
            onClick={onScrollToCatalog}
            className="mt-8 border border-neutral-300 hover:border-black hover:text-[#FF2B85] transition-all bg-transparent text-black px-5 py-2.5 font-mono text-xs uppercase tracking-widest cursor-pointer"
          >
            VER TODO →
          </button>
        </div>

        {/* Right Side: Showcase Row of Hoodies */}
        <div className="lg:col-span-8 flex sm:grid sm:grid-cols-3 overflow-x-auto sm:overflow-x-visible gap-6 pb-4 sm:pb-0 no-scrollbar snap-x snap-mandatory">
          {featuredList.map((item, index) => {
            if (!item.product) return null;
            const images = [item.product.image, item.product.hoverImage, item.product.lifestyleImage].filter(Boolean) as string[];
            const activeIdx = imageIndices[item.product.id] ?? 0;

            return (
              <div 
                key={index}
                onClick={() => onViewProduct(item.product!)}
                className="group cursor-pointer flex flex-col gap-3.5 min-w-[70vw] sm:min-w-0 snap-center flex-shrink-0"
              >
                {/* Image panel with numbers in corner */}
                <div className="relative aspect-[3/4] bg-neutral-200/45 border border-neutral-200 overflow-hidden">
                  <span className="absolute top-4 right-4 z-20 font-mono text-[11px] text-neutral-400 group-hover:text-[#FF2B85] transition-colors">
                    {item.num}
                  </span>
                  
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeIdx}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 0.8, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      src={images[activeIdx] || item.product.image} 
                      alt={item.product.name}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:opacity-100 transition-opacity duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Manual pagination arrows on hover */}
                  {images.length > 1 && (
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                      <button
                        onClick={(e) => handlePrevImage(e, item.product!.id, images.length)}
                        className="bg-black/85 hover:bg-[#FF2B85] border border-neutral-700 p-1 text-white transition-colors cursor-pointer rounded-full"
                        title="Imagen anterior"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(e, item.product!.id, images.length)}
                        className="bg-black/85 hover:bg-[#FF2B85] border border-neutral-700 p-1 text-white transition-colors cursor-pointer rounded-full"
                        title="Siguiente imagen"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Minimal Pagination dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-30 transition-opacity duration-300">
                      {images.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={(e) => handleDotClick(e, item.product!.id, dotIdx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            activeIdx === dotIdx ? 'bg-[#FF2B85] w-3.5' : 'bg-neutral-300 hover:bg-neutral-500'
                          }`}
                          title={`Ver imagen ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* micro interactive backdrop */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Hoodie details */}
                <div className="flex flex-col font-mono text-[11px] tracking-wider uppercase">
                  <span className="text-black group-hover:text-[#FF2B85] transition-colors font-semibold">
                    {item.displayTitle}
                  </span>
                  <span className="text-neutral-600 mt-0.5">
                    €{item.product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
