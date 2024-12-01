import { Product, Order, SiteConfig } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'mezat_products',
  ORDERS: 'mezat_orders',
  SITE_CONFIG: 'mezat_config'
};

export function loadProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return stored ? JSON.parse(stored) : [];
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

export function loadOrders(): Order[] {
  const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return stored ? JSON.parse(stored) : [];
}

export function saveOrders(orders: Order[]): void {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

export function loadSiteConfig(): SiteConfig | null {
  const stored = localStorage.getItem(STORAGE_KEYS.SITE_CONFIG);
  return stored ? JSON.parse(stored) : null;
}

export function saveSiteConfig(config: SiteConfig): void {
  localStorage.setItem(STORAGE_KEYS.SITE_CONFIG, JSON.stringify(config));
}