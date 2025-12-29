
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { products } from './data/mockProducts';
import { Product, Category, CartItem } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories: Category[] = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="pt-32 pb-20">
        {/* Collection Hero */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Autumn Winter 2024</span>
            <h1 className="text-5xl md:text-7xl serif font-light tracking-tight">The Modern Minimalist</h1>
            <p className="text-sm text-stone-500 max-w-xl leading-relaxed">
              探索融合法式復古與現代極簡主義的最新系列。我們相信簡約的力量，通過高品質面料與精細剪裁，重新定義日常奢華。
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex items-center justify-center space-x-6 overflow-x-auto hide-scrollbar pb-4 md:pb-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-[11px] uppercase tracking-[0.2em] font-bold whitespace-nowrap transition-all duration-300 relative py-2 ${
                  selectedCategory === category ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-stone-900" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={setSelectedProduct} 
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
