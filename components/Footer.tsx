
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-50 pt-20 pb-10 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif mb-6 tracking-tighter font-bold">ELEGANCE</h2>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Curated essentials for the modern wardrobe. Focused on high-quality fabrics and timeless silhouettes.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Shopping</h4>
            <ul className="space-y-3 text-xs text-stone-600 tracking-wide">
              <li><a href="#" className="hover:text-stone-900 transition-colors">Collection</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">Sizing Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Customer Care</h4>
            <ul className="space-y-3 text-xs text-stone-600 tracking-wide">
              <li><a href="#" className="hover:text-stone-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Newsletter</h4>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-4">Join our list for exclusive updates.</p>
            <div className="flex border-b border-stone-300 pb-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none text-[10px] tracking-widest flex-1 focus:outline-none"
              />
              <button className="text-[10px] tracking-[0.2em] font-bold">JOIN</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-stone-200">
          <span className="text-[10px] text-stone-400 tracking-widest uppercase mb-4 md:mb-0">© 2024 ELEGANCE BOUTIQUE. ALL RIGHTS RESERVED.</span>
          <div className="flex space-x-6 text-[10px] text-stone-400 tracking-widest uppercase font-medium">
            <a href="#" className="hover:text-stone-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Pinterest</a>
            <a href="#" className="hover:text-stone-900 transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
