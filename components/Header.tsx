
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-8 text-xs tracking-[0.2em] uppercase font-medium">
          <a href="#" className="hover:text-stone-400 transition-colors">New Arrivals</a>
          <a href="#" className="text-stone-900 border-b border-stone-900">Collections</a>
          <a href="#" className="hover:text-stone-400 transition-colors">Journal</a>
        </nav>

        {/* Logo */}
        <a href="/" className="text-2xl md:text-3xl font-bold tracking-tighter serif absolute left-1/2 -translate-x-1/2">
          ELEGANCE
        </a>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <button className="hidden sm:block hover:text-stone-400 transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={onOpenCart}
            className="relative hover:text-stone-400 transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] bg-white z-40 p-8 flex flex-col space-y-8 animate-in slide-in-from-left duration-300">
          <a href="#" className="text-lg uppercase tracking-widest border-b border-stone-100 pb-2">New Arrivals</a>
          <a href="#" className="text-lg uppercase tracking-widest border-b border-stone-100 pb-2 font-bold">Collections</a>
          <a href="#" className="text-lg uppercase tracking-widest border-b border-stone-100 pb-2">Journal</a>
          <a href="#" className="text-lg uppercase tracking-widest border-b border-stone-100 pb-2">About</a>
        </div>
      )}
    </header>
  );
};

export default Header;
