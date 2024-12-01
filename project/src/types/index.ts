export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | '4XL' | '5XL' | '6XL';
export type ShoeSize = number;

export interface SiteConfig {
  siteName: string;
  logoUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'clothing' | 'shoes';
  sizes: Size[] | ShoeSize[];
  stock: Record<string, number>;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  instagramUsername: string;
  size: Size | ShoeSize;
  timestamp: string;
  price: number;
}

export interface OrderSummary {
  totalOrders: number;
  totalRevenue: number;
  uniqueCustomers: number;
}