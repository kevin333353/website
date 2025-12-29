
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Sparkles } from 'lucide-react';
import { Product, CartItem } from '../types';
import { getStylingAdvice } from '../services/gemini';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

  const handleFetchAdvice = async () => {
    setIsLoadingAdvice(true);
    const advice = await getStylingAdvice(product.name, product.description);
    setAiAdvice(advice);
    setIsLoadingAdvice(false);
  };

  const handleAdd = () => {
    onAddToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-5xl h-fit max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-stone-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Product Images */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-[80vh] overflow-y-auto hide-scrollbar bg-stone-100 flex flex-col space-y-1">
          {product.images.map((img, i) => (
            <img key={i} src={img} alt={`${product.name} ${i}`} className="w-full object-cover" />
          ))}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-bold">{product.category}</span>
              <h2 className="text-3xl font-serif">{product.name}</h2>
              <p className="text-sm tracking-widest text-stone-500 uppercase">{product.nameEn}</p>
              <p className="text-xl font-medium">NT$ {product.price.toLocaleString()}</p>
              <div className="h-px bg-stone-100 w-full my-6" />
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {/* Color Selection */}
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold mb-3 block">Color: {selectedColor}</span>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-stone-900 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() === 'cream' ? '#F5F5DC' : color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold mb-3 block">Size</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 text-xs border transition-all ${
                        selectedSize === size ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold mb-3 block">Quantity</span>
                <div className="flex items-center space-x-4 border border-stone-200 w-fit">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-stone-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-stone-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Advisor Feature */}
            <div className="mt-10 p-6 bg-stone-50 border border-stone-100 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-stone-900">
                  <Sparkles size={16} className="text-amber-500" />
                  <span className="text-[11px] uppercase tracking-widest font-bold">AI Styling Advice</span>
                </div>
                {!aiAdvice && (
                  <button 
                    onClick={handleFetchAdvice}
                    disabled={isLoadingAdvice}
                    className="text-[10px] uppercase tracking-wider font-bold underline hover:text-stone-500 disabled:opacity-50"
                  >
                    {isLoadingAdvice ? 'Thinking...' : 'Get Advice'}
                  </button>
                )}
              </div>
              
              {aiAdvice ? (
                <p className="text-xs text-stone-600 leading-relaxed italic animate-in fade-in slide-in-from-top-2">
                  "{aiAdvice}"
                </p>
              ) : (
                <p className="text-xs text-stone-400">Need styling tips for this piece? Ask our AI Fashion Consultant.</p>
              )}
            </div>

            <button 
              onClick={handleAdd}
              className="mt-10 w-full bg-stone-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-0.5"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
