
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-stone-100">
        <img 
          src={isHovered ? product.images[1] : product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        
        {/* Quick Add Overlay - Mobile always visible bottom, Desktop hover */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden md:block">
          <button className="w-full bg-white/90 backdrop-blur-sm text-stone-900 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-900 hover:text-white transition-colors shadow-lg">
            Quick View
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
          <span className="text-sm font-light text-stone-600">NT$ {product.price.toLocaleString()}</span>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400">{product.nameEn}</p>
        <div className="flex space-x-1 mt-2">
           {product.colors.map(color => (
             <div 
               key={color} 
               className={`w-2 h-2 rounded-full border border-stone-200`}
               style={{ backgroundColor: color.toLowerCase() === 'cream' ? '#F5F5DC' : color.toLowerCase() }}
             />
           ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
