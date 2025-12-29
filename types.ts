
export type Category = 'All' | 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: Category;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
