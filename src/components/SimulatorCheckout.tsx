import React from 'react';
import { CartItem, OrderDetails } from '../types';
import { X, CreditCard, Shield, Truck, Landmark, Printer, CheckCircle, Flame, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { PROMO_CODES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface SimulatorCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountCode: string;
  onPaymentSuccess: () => void;
}

export default function SimulatorCheckout({
  isOpen,
  onClose,
  cartItems,
  discountCode,
  onPaymentSuccess
}: SimulatorCheckoutProps) {
  const [step, setStep] = React.useState<'delivery' | 'payment' | 'processing' | 'success'>('delivery');
  const [loadingStep, setLoadingStep] = React.useState<string>('Inicializando pasarela...');
  
  // Order details
  const [formData, setFormData] = React.useState<OrderDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: 'Madrid',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    discountCode: discountCode || ''
  });

  const [cardType, setCardType] = React.useState<'visa' | 'mastercard' | 'unknown'>('unknown');
  const [isCardFlipped, setIsCardFlipped] = React.useState(false);
  const [orderHash, setOrderHash] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setStep('delivery');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Pricing math
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const activeDiscount = discountCode ? (PROMO_CODES[discountCode] || 0) : 0;
  const discountAmount = subtotal * activeDiscount;
  const shippingCost = subtotal >= 80 ? 0 : 4.99;
  const total = subtotal - discountAmount + shippingCost;
  const vatAmount = total * 0.21; // 21% IVA incluido

  // Card detection
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    // Auto-spacing
    const formatted = value.replace(/(.{4})/g, '$1 ').trim();
    
    setFormData({ ...formData, cardNumber: formatted });

    if (value.startsWith('4')) {
      setCardType('visa');
    } else if (value.startsWith('5')) {
      setCardType('mastercard');
    } else {
      setCardType('unknown');
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setFormData({ ...formData, cardExpiry: value });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setFormData({ ...formData, cardCvv: value });
  };

  const handleTextChange = (field: keyof OrderDetails, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Submit delivery info
  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address || !formData.postalCode || !formData.city) {
      alert('Por favor, rellena todos los campos de envío requeridos.');
      return;
    }
    setStep('payment');
  };

  // Submit payment / triggers simulated delays
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      alert('Número de tarjeta incompleto (se requieren 16 dígitos).');
      return;
    }
    if (formData.cardExpiry.length < 5) {
      alert('Completa la fecha de caducidad en formato MM/AA.');
      return;
    }
    if (formData.cardCvv.length < 3) {
      alert('Código CVV incompleto (3 dígitos requeridos).');
      return;
    }

    // Move to processing steps
    setStep('processing');
    
    const steps = [
      'Estableciendo canal cifrado SSL/TLS de 256 bits...',
      'Verificando stock en nuestro centro logístico de Madrid...',
      'Validando fondos y autenticación antifraude (3D Secure)...',
      'Autorizando con el banco emisor...',
      'Generando ticket fiscal y código de seguimiento único...',
      'Confirmando pedido exitoso...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        // Success
        const randomHash = 'DOBGE-' + Math.floor(100000 + Math.random() * 900000);
        setOrderHash(randomHash);
        setStep('success');
      }
    }, 1200);
  };

  const handleFinalFinish = () => {
    onPaymentSuccess();
    onClose();
  };

  const triggerPrintReceipt = () => {
    window.print();
  };

  // Expected delivery date: 2 days from now
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm text-sm">
      
      {/* Container box */}
      <div 
        className="relative bg-white w-full max-w-4xl shadow-2xl border border-neutral-200 flex flex-col md:flex-row min-h-[550px] overflow-hidden text-black font-sans animate-none"
        id="checkout-modal-container"
      >
        {/* Close Button */}
        {step !== 'processing' && step !== 'success' && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-40 bg-white p-2 text-neutral-400 hover:text-white hover:bg-[#FF2B85] hover:border-[#FF2B85] transition-colors rounded-full border border-neutral-200 cursor-pointer"
            title="Cancelar compra"
            id="cancel-checkout-btn"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Left Side Panel: Order breakdown (visible in all states except processing/success where it adapts) */}
        {step !== 'processing' && step !== 'success' && (
          <div className="w-full md:w-5/12 bg-neutral-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-neutral-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-[#FF2B85] uppercase mb-5 font-bold">
                Resumen de tu pedido
              </h3>

              <div className="space-y-4 max-h-[220px] overflow-y-auto no-scrollbar pr-1">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-3 text-xs">
                    <img 
                      src={item.product.image.includes('dobge.com') ? item.product.image.replace(/&width=\d+/g, '&width=100') : item.product.image} 
                      alt={item.product.name}
                      className="w-12 h-16 object-cover border border-neutral-250 opacity-85"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="flex-1">
                      <p className="font-mono text-black truncate uppercase tracking-wider font-bold">{item.product.name}</p>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        Talla {item.selectedSize} | Cantidad {item.quantity}
                      </p>
                      <p className="font-mono text-[10px] text-[#FF2B85] font-bold mt-1">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial math bottom block */}
            <div className="mt-6 border-t border-neutral-200 pt-5 space-y-2 text-xs font-mono text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-black font-semibold">{subtotal.toFixed(2)} €</span>
              </div>
              {activeDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Descuento ({discountCode})</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-black font-semibold">{shippingCost === 0 ? 'Gratis' : `${shippingCost.toFixed(2)} €`}</span>
              </div>
              <div className="flex justify-between text-sm font-sans font-bold text-black border-t border-dashed border-neutral-200 pt-3.5">
                <span className="font-mono text-xs uppercase">Total IVA incl.</span>
                <span className="font-mono text-base text-[#FF2B85]">{total.toFixed(2)} €</span>
              </div>
              <p className="text-[9px] text-neutral-400 text-center mt-2 font-mono">
                Incluye {(vatAmount).toFixed(2)} € de IVA (21%)
              </p>
            </div>
          </div>
        )}

        {/* Right Side Panel: Main Actions (Delivery Form, Payment Card, Loaders or Success ticket) */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center bg-white">

          {/* STEP 1: Delivery Information Form */}
          {step === 'delivery' && (
            <form onSubmit={handleDeliverySubmit} className="space-y-4">
              <div className="border-b border-neutral-200 pb-3 mb-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF2B85] uppercase tracking-wider">Paso 1 de 2</span>
                  <h2 className="text-xl font-display text-black tracking-wide uppercase font-bold">Información de Envío</h2>
                </div>
                <Truck className="w-5 h-5 text-neutral-400" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleTextChange('fullName', e.target.value)}
                    placeholder="ej. Gonzalo Fernández Soler"
                    className="w-full bg-white border border-neutral-250 font-mono text-xs px-3.5 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none placeholder:text-neutral-400 rounded-none"
                    id="checkout-input-name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleTextChange('email', e.target.value)}
                    placeholder="ej. gonzalo@ejemplo.es"
                    className="w-full bg-white border border-neutral-250 font-mono text-xs px-3.5 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none placeholder:text-neutral-400 rounded-none"
                    id="checkout-input-email"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    Teléfono móvil *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleTextChange('phone', e.target.value)}
                    placeholder="ej. 600123456"
                    className="w-full bg-white border border-neutral-250 font-mono text-xs px-3.5 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none placeholder:text-neutral-400 rounded-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    Dirección de entrega *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleTextChange('address', e.target.value)}
                    placeholder="ej. Calle de Alcalá, 45, 3º Izq"
                    className="w-full bg-white border border-neutral-250 font-mono text-xs px-3.5 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none placeholder:text-neutral-400 rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleTextChange('city', e.target.value)}
                    placeholder="ej. Madrid"
                    className="w-full bg-white border border-neutral-250 font-mono text-xs px-3.5 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none placeholder:text-neutral-400 rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => handleTextChange('postalCode', e.target.value)}
                    placeholder="ej. 28014"
                    className="w-full bg-white border border-neutral-250 font-mono text-xs px-3.5 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none placeholder:text-neutral-400 rounded-none"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 italic font-mono">🔐 Conexión segura AES-256</span>
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-[#FF2B85] px-6 py-3.5 text-xs font-mono tracking-widest uppercase transition-colors flex items-center gap-2 font-bold cursor-pointer border-none"
                  id="submit-delivery-btn"
                >
                  <span>Continuar al Pago</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Secure Payment details with Interactive Card Mockup */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="border-b border-neutral-200 pb-3 mb-2 flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={() => setStep('delivery')}
                  className="text-[10px] font-mono text-neutral-500 hover:text-[#FF2B85] flex items-center gap-1 uppercase cursor-pointer bg-transparent border-none p-0 outline-none"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Volver
                </button>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-[#FF2B85] uppercase tracking-wider">Paso 2 de 2</span>
                  <h2 className="text-xl font-display text-black tracking-wide uppercase font-bold">Método de Pago</h2>
                </div>
              </div>

              {/* INTERACTIVE CREDIT CARD VISUAL */}
              <div className="relative w-full h-44 rounded-none bg-neutral-950 text-white p-5 flex flex-col justify-between overflow-hidden shadow-xl font-mono tracking-normal mb-5 select-none md:max-w-sm md:mx-auto border border-neutral-855">
                {/* Background decorative grids */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/40 to-[#FF2B85]/5 pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border border-white/5" />

                {!isCardFlipped ? (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-[8px] opacity-60 uppercase font-bold tracking-widest text-[#FF2B85]">DOBGE UNDERGROUND</span>
                        <span className="text-xs uppercase mt-0.5 font-bold">MEMBER CARD</span>
                      </div>
                      <Landmark className="w-6 h-6 opacity-40 text-[#FF2B85]" />
                    </div>

                    {/* Card Chip icon */}
                    <div className="w-8 h-6 bg-[#C19A5B]/90 rounded-none mt-1 border border-white/10 shadow-sm" />

                    {/* Card number */}
                    <div className="text-sm tracking-[0.18em] font-bold py-1 text-white">
                      {formData.cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[7px] opacity-40 uppercase">Titular</span>
                        <span className="text-[10px] tracking-wider truncate max-w-[170px] uppercase font-mono text-neutral-300 font-bold">
                          {formData.fullName || 'TITULAR DE LA TARJETA'}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col text-right">
                           <span className="text-[7px] opacity-40 uppercase">Vence</span>
                          <span className="text-[10px]">{formData.cardExpiry || 'MM/AA'}</span>
                        </div>
                        <div className="font-bold text-xs uppercase italic min-w-[50px] text-right text-[#FF2B85]">
                          {cardType === 'visa' && 'VISA'}
                          {cardType === 'mastercard' && 'MC'}
                          {cardType === 'unknown' && 'CARD'}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Back side of Card */}
                    <div className="h-8 bg-black -mx-5 -mt-1 border-y border-neutral-800" />
                    <div className="mt-4 flex flex-col">
                      <div className="bg-neutral-900 text-neutral-300 text-right px-2 py-1 text-xs select-none border border-neutral-800">
                        CVV: <strong className="text-white tracking-widest text-sm font-bold">{formData.cardCvv || '•••'}</strong>
                      </div>
                      <p className="text-[6px] text-neutral-500 mt-2 leading-tight">
                        Este documento de prueba simula un entorno bancario seguro para probar la landing page premium de DOBGE. No introduzca información real si no lo desea.
                      </p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-2">
                      <span className="text-[7px] text-white/40">PASARELA DOBGE SECURE</span>
                      <Shield className="w-3.5 h-3.5 text-neutral-500" />
                    </div>
                  </>
                )}
              </div>

              {/* CARD FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    Número de Tarjeta (Prueba) *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-450" />
                    <input
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      onFocus={() => setIsCardFlipped(false)}
                      className="w-full bg-white border border-neutral-250 font-mono text-xs pl-10 pr-4 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none placeholder:text-neutral-400 rounded-none"
                      id="card-number-input"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    Caducidad (MM/AA) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="08/29"
                    value={formData.cardExpiry}
                    onChange={handleExpiryChange}
                    onFocus={() => setIsCardFlipped(false)}
                    className="w-full bg-white border border-neutral-250 font-mono text-xs px-3.5 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none text-center placeholder:text-neutral-400 rounded-none"
                    id="card-expiry-input"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-650 mb-1 font-bold">
                    CVV *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={formData.cardCvv}
                    onChange={handleCvvChange}
                    onFocus={() => setIsCardFlipped(true)}
                    onBlur={() => setIsCardFlipped(false)}
                    className="w-full bg-white border border-neutral-250 font-mono text-xs px-3.5 py-2.5 text-black focus:border-[#FF2B85] focus:outline-none text-center placeholder:text-neutral-400 rounded-none"
                    id="card-cvv-input"
                  />
                </div>
              </div>

              {/* Checkout terms list */}
              <div className="bg-neutral-50 p-3 flex gap-2.5 text-[11px] text-neutral-600 border border-neutral-200">
                <input type="checkbox" defaultChecked className="mt-0.5 accent-[#FF2B85] cursor-pointer" />
                <span>Acepto las condiciones generales de compra de DOBGE y consiento el envío express a {formData.postalCode} ({formData.city}).</span>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                  <Shield className="w-3.5 h-3.5 text-green-600" />
                  <span>Entorno Seguro 3D Secure</span>
                </div>
                <button
                  type="submit"
                  className="bg-[#FF2B85] text-white hover:bg-black px-6 py-3.5 text-xs font-mono tracking-widest uppercase transition-colors flex items-center gap-2 font-bold cursor-pointer border-none"
                  id="checkout-pay-btn"
                >
                  <span>Pagar {total.toFixed(2)} €</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Beautiful processing stage */}
          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-5 bg-white">
              <Loader2 className="w-12 h-12 text-[#FF2B85] animate-spin" />
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF2B85] font-bold">PROCESANDO PAGO SEGURO</p>
                <h3 className="text-sm font-mono text-black max-w-[300px] font-bold uppercase tracking-wider">
                  {loadingStep}
                </h3>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono italic">
                Por favor, no refresques la página ni des marcha atrás.
              </p>
            </div>
          )}

          {/* STEP 4: Success Ticket Design */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center p-2 bg-white">
              <div className="flex flex-col items-center text-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
                <h2 className="text-lg font-display text-black font-bold uppercase tracking-widest text-[#FF2B85]">¡Operación Confirmada!</h2>
                <p className="text-xs text-neutral-600 mt-1 font-light">Tu orden ha sido procesada con éxito.</p>
              </div>

              {/* GORGEOUS MINIMAL CHRONO TICKET FISCAL */}
              <div className="w-full max-w-[320px] bg-neutral-50 border border-dashed border-neutral-250 p-5 font-mono text-[10px] text-neutral-700 space-y-4 shadow-sm relative">
                
                {/* Vintage receipt thermal header */}
                <div className="text-center border-b border-dashed border-neutral-250 pb-3">
                  <span className="text-sm font-bold tracking-widest text-black font-display">DOBGE</span>
                  <p className="text-[8px] mt-0.5 text-[#FF2B85] font-bold">MADRID ESPAÑA DESIGN HOUSE</p>
                  <p className="text-[8px] text-neutral-450">NIF: B-8321035C</p>
                  <p className="text-[8px] mt-1 text-black bg-neutral-100 py-0.5 inline-block px-2">TICKET ID: {orderHash}</p>
                </div>

                {/* Date & Customer details */}
                <div className="space-y-1 text-neutral-600">
                  <div className="flex justify-between">
                    <span>FECHA:</span>
                    <span className="text-black font-medium">{new Date().toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CLIENTE:</span>
                    <span className="truncate max-w-[180px] text-right uppercase text-black font-bold">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CIUDAD:</span>
                    <span className="uppercase text-black font-medium">{formData.city}</span>
                  </div>
                </div>

                {/* Iterative row items */}
                <div className="border-t border-dashed border-neutral-250 pt-3 space-y-2">
                  <span className="font-bold text-[9px] block text-[#FF2B85]">PRENDAS ADQUIRIDAS:</span>
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-start gap-2 text-neutral-600">
                      <span className="uppercase truncate max-w-[180px]">
                        x{item.quantity} {item.product.name} ({item.selectedSize})
                      </span>
                      <span className="text-black font-semibold">{(item.product.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="border-t border-dashed border-neutral-250 pt-3 space-y-1">
                  <div className="flex justify-between text-neutral-600">
                    <span>SUBTOTAL:</span>
                    <span className="text-black font-semibold">{subtotal.toFixed(2)}€</span>
                  </div>
                  {activeDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>DESC. {discountCode}:</span>
                      <span>-{discountAmount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>ENVIO EXPRES:</span>
                    <span className="text-black font-semibold">{shippingCost === 0 ? '0.00€' : `${shippingCost.toFixed(2)}€`}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-black border-t border-neutral-250 pt-2">
                    <span className="text-[#FF2B85]">PAGO TOTAL:</span>
                    <span className="text-[#FF2B85] text-sm">{total.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Logistic info */}
                <div className="border-t border-dashed border-neutral-250 pt-3 text-center text-[8px] text-neutral-500 space-y-1 leading-normal">
                  <p className="font-bold text-[#FF2B85]">ENTREGA ESTIMADA EN TU DOMICILIO:</p>
                  <p className="text-black font-bold text-[9.5px] uppercase">{getDeliveryDate()}</p>
                  <p>Enviaremos instrucciones de seguimiento y factura digitalizada a: <strong className="text-black font-semibold">{formData.email}</strong></p>
                </div>

                {/* Barcode representation */}
                <div className="flex flex-col items-center pt-3 border-t border-dashed border-neutral-250">
                  <div className="w-full h-8 bg-[repeating-linear-gradient(90deg,#000,#000_1px,transparent_1px,transparent_4px)] opacity-60" />
                  <span className="text-[8px] text-neutral-500 mt-1">*{orderHash}*</span>
                </div>
              </div>

              {/* Action options */}
              <div className="mt-5 w-full flex gap-3">
                <button
                  onClick={triggerPrintReceipt}
                  className="flex-1 border border-neutral-200 text-neutral-600 hover:text-black hover:border-black py-3 px-4 text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
                <button
                  onClick={handleFinalFinish}
                  className="flex-1 bg-black text-white hover:bg-[#FF2B85] py-3 px-4 text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold border-none"
                  id="checkout-success-finish-btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Terminar</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
