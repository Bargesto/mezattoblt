import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    description: 'Premium quality cotton t-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    price: 299.99,
    category: 'clothing',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL'],
    stock: {
      'S': 10,
      'M': 15,
      'L': 20,
      'XL': 15,
      'XXL': 10,
      'XXXL': 8,
      '4XL': 5,
      '5XL': 5,
      '6XL': 5
    }
  },
  {
    id: '2',
    name: 'Wedding Special Leather Shoes',
    description: 'Elegant leather shoes perfect for weddings',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
    price: 799.99,
    category: 'shoes',
    sizes: [40, 41, 42, 43, 44, 45],
    stock: {
      '40': 5,
      '41': 8,
      '42': 10,
      '43': 10,
      '44': 8,
      '45': 5
    }
  }
];