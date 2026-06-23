import React from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PromoTicker from './components/PromoTicker';
import FeaturedHoodies from './components/FeaturedHoodies';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import SimulatorCheckout from './components/SimulatorCheckout';
import AboutSection from './components/AboutSection';
import Benefits from './components/Benefits';
import Reviews from './components/Reviews';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { Sparkles, SlidersHorizontal, Search, RefreshCw, Eye, ShoppingBag } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  // Global Shopping States
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dobge_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = React.useState<'todos' | 'hombre' | 'mujer' | 'nueva-temporada' | 'mas-vendidos'>('todos');
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Modal Overlays state
  const [selectedProductForModal, setSelectedProductForModal] = React.useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  
  // Coupon applied state
  const [discountCode, setDiscountCode] = React.useState('');

  // Persist Cart state
  React.useEffect(() => {
    localStorage.setItem('dobge_cart', JSON.stringify(cart));
  }, [cart]);

  // Scroll to anchor helper
  const handleScrollToSegment = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }) => {
    setCart((prevCart) => {
      // Look for identical SKU
      const matchIndex = prevCart.findIndex(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor.name === color.name
      );

      if (matchIndex > -1) {
        const updated = [...prevCart];
        updated[matchIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
      }
    });
    
    // Automatically open checkout drawer to notify the user
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handlePaymentSuccess = () => {
    // Clear cart & clear applied discounts
    setCart([]);
    setDiscountCode('');
    setIsCartOpen(false);
    
    // Quick custom toast/alert
    alert('🎉 ¡Pago procesado con éxito! Se ha impreso su albarán de compra ficticio y hemos notificado al hub logístico en Madrid. Gracias por probar DOBGE.');
  };

  // Filter Catalog - if only 1 product exists under catalog, make it show under all categories to remain accessible
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesCategory = PRODUCTS.length <= 1 || selectedCategory === 'todos' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.fit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased text-sm">
      
      {/* 1. Header Navigation Bar */}
      <Navbar 
        cartCount={cartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onScrollToSection={handleScrollToSegment}
      />

      {/* 2. Welcome Hero Frame (Passes explore slider jump) */}
      <HeroSection 
        onExploreClick={() => handleScrollToSegment('product-showcase')}
      />

      {/* Infinite repeating ticker below Hero */}
      <PromoTicker />

      {/* Horizontal grid split featured hoodies layout directly from screenshot reference */}
      <FeaturedHoodies 
        products={PRODUCTS}
        onViewProduct={setSelectedProductForModal}
        onScrollToCatalog={() => handleScrollToSegment('product-showcase')}
      />

      {/* 3. Core Store Showcase (Filtered Catalog) */}
      <main id="product-showcase" className="py-12 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-10 select-none">
        
        {/* Editorial Title for collection */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-4 md:pb-8 mb-6 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2B85] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2B85]"></span>
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF2B85] uppercase font-bold">
                COLECCIÓN CURADA & EXCLUSIVA
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display text-black uppercase font-black leading-none tracking-tight">
              {selectedCategory === 'todos' ? 'CATÁLOGO DISPONIBLE' : selectedCategory.replace('-', ' ')}
            </h2>
          </div>

          {/* Quick micro controls: text search + categories pills */}
          <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
            
            {/* Live Search Input bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input 
                type="text"
                placeholder="Buscar prenda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 text-xs font-mono pl-9 pr-8 py-2.5 w-full sm:w-56 focus:outline-none focus:border-[#FF2B85] placeholder:text-neutral-400 focus:bg-white text-black transition-all uppercase"
                id="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={handleClearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black text-xs font-mono font-bold cursor-pointer"
                  title="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick selector filter info */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-600 bg-neutral-50 px-3 py-2 border border-neutral-200 uppercase">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
              <span>{filteredProducts.length} Artículos</span>
            </div>
            
          </div>
        </div>

        {/* Categories inline secondary navigator for comfort */}
        <div className="flex flex-wrap gap-2 mb-6 md:mb-10 pb-4 border-b border-neutral-200 text-[10px] uppercase tracking-wider font-mono">
          {(['todos', 'nueva-temporada', 'hombre', 'mujer', 'mas-vendidos'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2.5 border transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-[#FF2B85] text-white border-[#FF2B85] font-bold shadow-md shadow-pink-100' 
                  : 'bg-neutral-50 text-neutral-650 border-neutral-200 hover:border-neutral-400 hover:text-black'
              }`}
              id={`cat-pill-${cat}`}
            >
              {cat === 'todos' ? 'Mostrar Todos' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Dynamic products list grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-neutral-200 bg-neutral-50">
            <p className="text-sm font-mono text-neutral-500">
              No hemos encontrado ninguna prenda que coincida con "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="mt-4 inline-flex items-center gap-2 border border-[#FF2B85] bg-[#FF2B85] text-white hover:bg-black hover:border-black transition-colors px-6 py-2.5 text-[10px] font-mono uppercase tracking-widest cursor-pointer"
              id="clear-filters-btn"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ver Todo el Catálogo</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-12">
            {filteredProducts.map((prod) => (
              <ProductCard 
                key={prod.id}
                product={prod}
                onViewProduct={setSelectedProductForModal}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

      </main>

      {/* 4. About Brand Story Section */}
      <AboutSection />

      {/* 5. Star Logistics and perks section */}
      <Benefits />

      {/* 6. Rating opinions from verified purchasers */}
      <Reviews />

      {/* 7. Drops Email captures section */}
      <Newsletter />

      {/* 8. Modern footer block with contact logs */}
      <Footer />


      {/* --- OVERLAYS: MODALS, SIDEBAR DRAWER, CHECKOUT TERMINAL --- */}

      {/* Side-Drawer sliding Cart component */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onGoToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
      />

      {/* Item detailed specifications overlay modal view */}
      <ProductModal 
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Core Simulated Checkout Terminal and custom thermal voucher print */}
      <SimulatorCheckout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        discountCode={discountCode}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </div>
  );
}
