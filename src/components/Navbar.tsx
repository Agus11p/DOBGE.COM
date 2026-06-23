import React from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  selectedCategory: string;
  onSelectCategory: (category: 'todos' | 'hombre' | 'mujer' | 'nueva-temporada' | 'mas-vendidos') => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  onScrollToSection
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navCategories = [
    { label: 'Inicio', value: 'todos', isScrollToTop: true },
    { label: 'Catálogo', value: 'todos' },
    { label: 'Sudaderas', value: 'nueva-temporada' }
  ];

  const handleCategoryClick = (cat: any) => {
    if (cat.isScrollToTop) {
      onSelectCategory('todos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onSelectCategory(cat.value);
      onScrollToSection('product-showcase');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full relative z-50 bg-white border-b border-neutral-200 font-mono select-none">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: Brand logo & Nav links */}
        <div className="flex items-center gap-10">
          <div 
            onClick={() => {
              onSelectCategory('todos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer font-display text-2xl sm:text-3xl tracking-[0.05em] text-black font-black hover:opacity-90 active:scale-95 transition-all"
          >
            DOBGE
          </div>
 
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-widest text-neutral-500">
            {navCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className={`transition-colors py-1 hover:text-black relative ${
                  selectedCategory === cat.value && !cat.isScrollToTop
                    ? 'text-black font-bold' 
                    : 'text-neutral-500'
                }`}
                id={`nav-${idx}`}
              >
                {cat.label}
                {selectedCategory === cat.value && !cat.isScrollToTop && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF2B85]"></span>
                )}
              </button>
            ))}
            <button
              onClick={() => onScrollToSection('footer-section')}
              className="text-neutral-500 hover:text-black transition-colors py-1"
              id="nav-contacto"
            >
              Contacto
            </button>
          </nav>
        </div>
 
        {/* Right: Cart and Mobile menu toggle */}
        <div className="flex items-center gap-4">
          {/* Outlined Cart Button directly from the user's reference */}
          <button
            onClick={onOpenCart}
            className="border border-neutral-300 hover:border-black bg-transparent text-black px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-mono flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            id="navbar-cart-trigger"
          >
            <span className="text-neutral-500 font-medium">CARRITO</span>
            <span className="text-[#FF2B85] font-bold">({cartCount})</span>
          </button>
 
          {/* Mobile hamburger menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black hover:text-neutral-600 p-1"
            title="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
 
      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 py-4 px-6 flex flex-col gap-4 font-mono text-[11px] tracking-widest uppercase absolute inset-x-0 top-full z-50 shadow-md">
          {navCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="text-left py-1 text-neutral-500 hover:text-black"
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSection('footer-section');
            }}
            className="text-left py-1 text-neutral-500 hover:text-black"
          >
            Contacto
          </button>
        </div>
      )}
    </header>
  );
}
