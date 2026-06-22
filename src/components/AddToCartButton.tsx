import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Shirt, Check } from 'lucide-react';

interface AddToCartButtonProps {
  onClick: () => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

type ButtonStatus = 'idle' | 'text-out' | 'cart-in' | 'shirt-drop' | 'cart-drive-out' | 'success';

export default function AddToCartButton({
  onClick,
  disabled = false,
  id,
  className = ""
}: AddToCartButtonProps): React.JSX.Element {
  const [status, setStatus] = useState<ButtonStatus>('idle');

  const triggerAnimation = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== 'idle' || disabled) return;

    // Trigger parent action to update state/cart early or mid-flow
    onClick();

    // Begin sequence
    setStatus('text-out');

    // 1. Cart rolls in from the left
    setTimeout(() => {
      setStatus('cart-in');
    }, 150);

    // 2. Shirt drops down from above
    setTimeout(() => {
      setStatus('shirt-drop');
    }, 750);

    // 3. Cart drives off to the right
    setTimeout(() => {
      setStatus('cart-drive-out');
    }, 1350);

    // 4. Success state with checkmark is achieved
    setTimeout(() => {
      setStatus('success');
    }, 2000);

    // 5. Reset back to normal idle state
    setTimeout(() => {
      setStatus('idle');
    }, 4500);
  };

  return (
    <button
      id={id}
      onClick={triggerAnimation}
      disabled={disabled || status !== 'idle'}
      className={`relative overflow-hidden w-full h-[52px] text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center transition-all duration-300 rounded-none border select-none cursor-pointer ${
        status === 'success'
          ? 'bg-green-600 border-green-600 text-white'
          : 'bg-[#FF4838] border-[#FF4838] text-white hover:bg-white hover:text-black hover:border-white'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {/* Background slide/scale pulse overlay for interaction feedback */}
      <AnimatePresence>
        {status !== 'idle' && status !== 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative w-full h-full flex items-center justify-center font-mono">
        {/* State 1: Idle - Center text */}
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.span
              key="idle-text"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 15, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Añadir a la cesta</span>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Dynamic Storytelling Stage: Cart + Falling Shirt */}
        {status !== 'idle' && status !== 'success' && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <motion.div
              initial={{ x: '-170%' }}
              animate={
                status === 'cart-in'
                  ? { x: 0 }
                  : status === 'shirt-drop'
                  ? { x: 0, y: [0, 4, -2, 0] } // Land impact
                  : status === 'cart-drive-out'
                  ? { 
                      x: '220%', 
                      rotate: [0, -8, 12, 10], 
                      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } 
                    }
                  : {}
              }
              transition={
                status === 'cart-in'
                  ? { type: 'spring', stiffness: 120, damping: 13 }
                  : { duration: 0.25 }
              }
              className="absolute flex items-center justify-center w-14 h-14"
            >
              {/* Falling T-Shirt Inside Cart Frame */}
              <motion.div
                initial={{ y: -50, opacity: 0, scale: 0.6, rotate: -15 }}
                animate={
                  status === 'shirt-drop' || status === 'cart-drive-out'
                    ? { y: 2, opacity: 1, scale: 0.95, rotate: 0 }
                    : { y: -51, opacity: 0 }
                }
                transition={{
                  y: { type: 'spring', stiffness: 200, damping: 12 },
                  opacity: { duration: 0.1 }
                }}
                className="absolute bottom-[23px] z-30 flex justify-center w-6 h-6"
              >
                <Shirt className="w-5 h-5 text-white fill-white stroke-[#FF4838] stroke-[1.5]" />
              </motion.div>

              {/* Shopping Cart Icon */}
              <ShoppingCart className="w-6 h-6 text-white stroke-[2]" />
            </motion.div>
          </div>
        )}

        {/* State 3: Success state - Centered check and confirmation */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.span
              key="success-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 12 }}
              className="flex items-center gap-2 text-white font-black whitespace-nowrap"
            >
              <Check className="w-4 h-4 text-white stroke-[3px]" />
              <span>¡AÑADIDO AL CARRITO!</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
