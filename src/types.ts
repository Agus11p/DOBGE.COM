export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'hombre' | 'mujer' | 'nueva-temporada' | 'mas-vendidos';
  image: string;
  hoverImage?: string;
  lifestyleImage?: string;
  description: string;
  details: string[];
  gsm?: number; // Gramos por metro cuadrado
  composition: string;
  fit: 'Oversized' | 'Regular' | 'Boxy' | 'Relaxed';
  colors: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface OrderDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  discountCode?: string;
}
