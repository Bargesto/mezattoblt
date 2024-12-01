import React, { useState, useEffect } from 'react';
import { Product, Order, Size, ShoeSize, SiteConfig } from './types';
import { products as initialProducts } from './data/products';
import ProductCard from './components/ProductCard';
import AdminPanel from './components/AdminPanel';
import { loadProducts, saveProducts, loadOrders, saveOrders, loadSiteConfig, saveSiteConfig } from './utils/storage';

function App() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    siteName: 'Mezat Sipariş',
    logoUrl: 'https://example.com/logo.png'
  });

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedProducts = loadProducts();
    const storedOrders = loadOrders();
    const storedConfig = loadSiteConfig();

    setProductsList(storedProducts.length > 0 ? storedProducts : initialProducts);
    setOrders(storedOrders);
    if (storedConfig) {
      setSiteConfig(storedConfig);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveProducts(productsList);
  }, [productsList]);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    saveSiteConfig(siteConfig);
  }, [siteConfig]);

  const handleOrder = (productId: string, size: Size | ShoeSize, instagramUsername: string) => {
    const product = productsList.find(p => p.id === productId)!;
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      productName: product.name,
      instagramUsername,
      size,
      timestamp: new Date().toISOString(),
      price: product.price
    };

    setProductsList(currentProducts => 
      currentProducts.map(product => {
        if (product.id === productId) {
          const newStock = { ...product.stock };
          newStock[size.toString()] = newStock[size.toString()] - 1;
          return { ...product, stock: newStock };
        }
        return product;
      })
    );

    setOrders(currentOrders => [...currentOrders, newOrder]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductsList(currentProducts => 
      currentProducts.filter(product => product.id !== productId)
    );
  };

  // Sort products by newest first
  const sortedProducts = [...productsList].reverse();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {siteConfig.logoUrl && (
                <img
                  src={siteConfig.logoUrl}
                  alt={siteConfig.siteName}
                  className="h-12 w-auto"
                />
              )}
              <h1 className="text-3xl font-bold text-gray-900">
                {siteConfig.siteName}
              </h1>
            </div>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              {isAdmin ? 'Ürünlere Dön' : 'Yönetici Paneli'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {isAdmin ? (
          <AdminPanel
            orders={orders}
            products={productsList}
            siteConfig={siteConfig}
            onUpdateProduct={(updatedProduct) => {
              setProductsList(currentProducts =>
                currentProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
              );
            }}
            onAddProduct={(newProduct) => {
              setProductsList(currentProducts => [...currentProducts, newProduct]);
            }}
            onDeleteProduct={handleDeleteProduct}
            onUpdateSiteConfig={setSiteConfig}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={handleOrder}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;