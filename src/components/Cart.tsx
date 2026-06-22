import React from 'react';
import { CartItem } from '../types';
import { X, Minus, Plus, Trash2, ArrowRight, Tag, Percent } from 'lucide-react';
import { PROMO_CODES } from '../data';
import { motion } from 'motion/react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onGoToCheckout: () => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onGoToCheckout,
  discountCode,
  setDiscountCode
}: CartProps) {
  const [promoInput, setPromoInput] = React.useState('');
  const [activeDiscount, setActiveDiscount] = React.useState<number>(0);
  const [promoError, setPromoError] = React.useState('');
  const [promoSuccess, setPromoSuccess] = React.useState('');

  React.useEffect(() => {
    if (discountCode && PROMO_CODES[discountCode]) {
      setActiveDiscount(PROMO_CODES[discountCode]);
      setPromoInput(discountCode);
      setPromoSuccess(`Cupón ${discountCode} aplicado (${PROMO_CODES[discountCode] * 100}% desc.)`);
    }
  }, [discountCode]);

  if (!isOpen) return null;

  // Calculos
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * activeDiscount;
  const shippingThreshold = 80; // Envío gratis a partir de 80€
  const isShippingFree = subtotal >= shippingThreshold;
  const shippingCost = cartItems.length === 0 ? 0 : (isShippingFree ? 0 : 4.99);
  const total = subtotal - discountAmount + shippingCost;

  // Progress Bar percentage for free shipping
  const progressToFreeShipping = Math.min((subtotal / shippingThreshold) * 100, 100);
  const missingForFreeShipping = Math.max(shippingThreshold - subtotal, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.toUpperCase().trim();
    if (PROMO_CODES[cleanCode]) {
      setActiveDiscount(PROMO_CODES[cleanCode]);
      setDiscountCode(cleanCode);
      setPromoError('');
      setPromoSuccess(`Cupón "${cleanCode}" aplicado con éxito: -${PROMO_CODES[cleanCode] * 100}%`);
    } else {
      setPromoError('El cupón introducido no es válido');
      setPromoSuccess('');
    }
  };

  const handleRemoveAppliedPromo = () => {
    setActiveDiscount(0);
    setDiscountCode('');
    setPromoInput('');
    setPromoSuccess('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop background */}
        <div 
          className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300" 
          onClick={onClose}
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md border-l border-neutral-900">
            <div className="flex h-full flex-col bg-[#0B0B0C] shadow-2xl text-white">
              
              {/* Header */}
              <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-mono tracking-widest uppercase font-bold text-white">
                    Cesta de compra
                  </span>
                  <span className="bg-[#FF4838] text-white font-mono text-[10px] w-5 h-5 flex items-center justify-center font-bold">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  id="close-cart-drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic Free Shipping Progress Tracker */}
              {cartItems.length > 0 && (
                <div className="bg-[#0F0F10] px-6 py-4.5 border-b border-neutral-900">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider mb-2">
                    {isShippingFree ? (
                      <span className="text-green-500 font-bold">✨ ¡Enhorabuena! Tienes Envío Estándar Gratis</span>
                    ) : (
                      <span className="text-neutral-400">
                        Te faltan <span className="text-[#FF4838] font-bold">{missingForFreeShipping.toFixed(2)} €</span> para Envío Gratis
                      </span>
                    )}
                    <span className="text-neutral-400">{progressToFreeShipping.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${isShippingFree ? 'bg-green-500' : 'bg-[#FF4838]'}`}
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Body: Cart list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-neutral-950 flex items-center justify-center text-neutral-500 mb-4 border border-neutral-900">
                      <Trash2 className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-mono uppercase tracking-widest text-[#FF4838] font-bold">Tu cesta está vacía</p>
                    <p className="text-xs text-neutral-400 mt-2 max-w-[250px] leading-relaxed">
                      Añade prendas de nuestra colección premium exclusiva de alta calidad para empezar.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 border border-neutral-800 bg-[#0F0F10] text-white px-6 py-3 text-[10px] font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
                    >
                      Seguir Explorando
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-900">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex py-5 first:pt-0 last:pb-0 gap-4" id={`cart-item-${index}`}>
                        <div className="h-24 w-18 flex-shrink-0 overflow-hidden bg-neutral-950 border border-neutral-900 aspect-[3/4]">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center opacity-85"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-xs font-mono font-bold text-white uppercase">
                              <h3 className="tracking-wider line-clamp-1">{item.product.name}</h3>
                              <p className="ml-4 whitespace-nowrap">{(item.product.price * item.quantity).toFixed(2)} €</p>
                            </div>
                            <p className="mt-1 text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1.5">
                              <span>Talla: <strong className="text-[#FF4838] font-bold">{item.selectedSize}</strong></span>
                              <span className="text-neutral-800">|</span>
                              <span>Color:</span>
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-neutral-900 inline-block align-middle"
                                style={{ backgroundColor: item.selectedColor.hex }}
                                title={item.selectedColor.name}
                              />
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-neutral-800 bg-[#0F0F10]">
                              <button
                                onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                                className="p-1.5 hover:bg-neutral-900 transition-colors cursor-pointer"
                                title="Reducir"
                              >
                                <Minus className="w-3.5 h-3.5 text-neutral-400" />
                              </button>
                              <span className="px-3 text-xs font-mono font-medium">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                className="p-1.5 hover:bg-neutral-900 transition-colors cursor-pointer"
                                title="Aumentar"
                              >
                                <Plus className="w-3.5 h-3.5 text-neutral-400" />
                              </button>
                            </div>

                            {/* Trash button */}
                            <button
                              onClick={() => onRemoveItem(index)}
                              className="text-neutral-500 hover:text-[#FF4838] transition-colors flex items-center gap-1 text-[10px] font-mono uppercase cursor-pointer"
                              id={`delete-cart-item-${index}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Promo input + Pricing block */}
              {cartItems.length > 0 && (
                <div className="border-t border-neutral-900 p-6 bg-[#0F0F10] space-y-4">
                  {/* Coupon Form */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="CÓDIGO DE DESCUENTO"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full bg-[#070708] border border-neutral-800 text-xs font-mono tracking-wider pl-9 pr-4 py-2.5 focus:border-[#FF4838] focus:outline-none placeholder:text-neutral-500 text-white uppercase text-center sm:text-left"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#FF4838] text-white text-[10px] font-mono tracking-widest px-4 py-2.5 uppercase hover:bg-white hover:text-black transition-colors cursor-pointer font-bold"
                    >
                      Aplicar
                    </button>
                  </form>

                  {/* Promo status warnings */}
                  {promoError && <p className="text-[10px] font-mono text-red-500">{promoError}</p>}
                  {promoSuccess && (
                    <div className="flex justify-between items-center bg-green-950/40 text-green-400 p-2.5 border border-green-900 rounded-none text-[10px] font-mono">
                      <span>{promoSuccess}</span>
                      <button 
                        type="button" 
                        onClick={handleRemoveAppliedPromo}
                        className="text-red-400 font-bold hover:underline cursor-pointer"
                      >
                        Quitar
                      </button>
                    </div>
                  )}

                  {/* Subtotal blocks */}
                  <div className="space-y-2 mt-4 text-xs font-mono text-neutral-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">{subtotal.toFixed(2)} €</span>
                    </div>
                    
                    {activeDiscount > 0 && (
                      <div className="flex justify-between text-green-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Percent className="w-3 h-3" /> Descuento aplicado
                        </span>
                        <span>-{discountAmount.toFixed(2)} €</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Envío estándar</span>
                      <span className="text-white">{shippingCost === 0 ? 'Gratuito' : `${shippingCost.toFixed(2)} €`}</span>
                    </div>

                    <div className="flex justify-between text-sm font-sans font-bold text-white border-t border-neutral-900 pt-3.5">
                      <span className="tracking-wide text-xs uppercase font-mono">Total Estimado</span>
                      <span className="font-mono text-base text-[#FF4838]">{total.toFixed(2)} €</span>
                    </div>
                  </div>

                  {/* Move to Checkout */}
                  <button
                    onClick={onGoToCheckout}
                    className="w-full bg-[#FF4838] text-white py-4 px-6 text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 hover:bg-white hover:text-black transition-colors mt-4 shadow-lg group cursor-pointer"
                    id="checkout-trigger-btn"
                  >
                    <span>Iniciar Pago Seguro</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
