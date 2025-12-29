
import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[110] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[120] shadow-2xl transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl tracking-widest uppercase font-medium">Shopping Bag ({items.length})</h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="text-sm uppercase tracking-widest">Your bag is empty</p>
                <button onClick={onClose} className="text-xs underline font-bold text-stone-900 tracking-widest uppercase">Start Shopping</button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex space-x-4 animate-in fade-in slide-in-from-right-4">
                  <img src={item.images[0]} className="w-24 h-32 object-cover bg-stone-100" />
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider">{item.name}</h4>
                        <button onClick={() => onRemove(idx)} className="text-stone-400 hover:text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest">{item.selectedSize} / {item.selectedColor}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-stone-500">Qty: {item.quantity}</span>
                      <span className="text-sm font-medium">NT$ {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="mt-8 space-y-4 border-t border-stone-100 pt-8">
              <div className="flex justify-between items-center">
                <span className="text-sm uppercase tracking-widest font-medium">Subtotal</span>
                <span className="text-lg font-bold">NT$ {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest text-center">Shipping and taxes calculated at checkout</p>
              <button className="w-full bg-stone-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-all shadow-xl">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
