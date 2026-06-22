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
    <header className="w-full relative z-50 bg-[#0B0B0C] border-b border-neutral-900 font-mono select-none">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: Brand logo & Nav links */}
        <div className="flex items-center gap-10">
          <div 
            onClick={() => {
              onSelectCategory('todos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer font-display text-2xl sm:text-3xl tracking-[0.05em] text-white font-black hover:opacity-90 active:scale-95 transition-all"
          >
            DOBGE
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-widest text-neutral-400">
            {navCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className={`transition-colors py-1 hover:text-white ${
                  selectedCategory === cat.value && !cat.isScrollToTop
                    ? 'text-white font-bold' 
                    : 'text-neutral-400'
                }`}
                id={`nav-${idx}`}
              >
                {cat.label}
              </button>
            ))}
            <button
              onClick={() => onScrollToSection('footer-section')}
              className="text-neutral-400 hover:text-white transition-colors py-1"
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
            className="border border-neutral-800 hover:border-neutral-500 bg-transparent text-white px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-mono flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            id="navbar-cart-trigger"
          >
            <span className="text-neutral-400 font-light">CARRITO</span>
            <span className="text-[#FF4838] font-bold">({cartCount})</span>
          </button>

          {/* Mobile hamburger menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-1"
            title="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D0E] border-t border-neutral-900 py-4 px-6 flex flex-col gap-4 font-mono text-[11px] tracking-widest uppercase absolute inset-x-0 top-full z-50">
          {navCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="text-left py-1 text-neutral-400 hover:text-white"
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSection('footer-section');
            }}
            className="text-left py-1 text-neutral-400 hover:text-white"
          >
            Contacto
          </button>
        </div>
      )}
    </header>
  );
}
