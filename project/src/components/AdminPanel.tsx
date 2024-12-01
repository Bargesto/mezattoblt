import React, { useState } from 'react';
import { Download, Users, ShoppingBag, DollarSign, Settings } from 'lucide-react';
import { Order, OrderSummary, Product, SiteConfig } from '../types';
import { exportOrdersToExcel } from '../utils/exportOrders';
import ProductList from './admin/ProductList';
import SiteConfigPanel from './admin/SiteConfigPanel';
import OrderList from './admin/OrderList';

interface AdminPanelProps {
  orders: Order[];
  products: Product[];
  siteConfig: SiteConfig;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateSiteConfig: (config: SiteConfig) => void;
}

export default function AdminPanel({ 
  orders, 
  products, 
  siteConfig,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onUpdateSiteConfig
}: AdminPanelProps) {
  const [showConfig, setShowConfig] = useState(false);

  const summary: OrderSummary = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.price, 0),
    uniqueCustomers: new Set(orders.map(order => order.instagramUsername)).size
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Yönetici Paneli</h2>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              <Settings size={20} />
              Site Ayarları
            </button>
          </div>
          <button
            onClick={() => exportOrdersToExcel(orders)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Download size={20} />
            Siparişleri İndir
          </button>
        </div>

        {showConfig && (
          <SiteConfigPanel
            config={siteConfig}
            onUpdate={onUpdateSiteConfig}
            onClose={() => setShowConfig(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="text-blue-500" />
              <h3 className="font-semibold">Toplam Sipariş</h3>
            </div>
            <p className="text-2xl font-bold">{summary.totalOrders}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-green-500" />
              <h3 className="font-semibold">Toplam Gelir</h3>
            </div>
            <p className="text-2xl font-bold">₺{summary.totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-purple-500" />
              <h3 className="font-semibold">Tekil Müşteri</h3>
            </div>
            <p className="text-2xl font-bold">{summary.uniqueCustomers}</p>
          </div>
        </div>

        <ProductList
          products={products}
          orders={orders}
          onUpdateProduct={onUpdateProduct}
          onAddProduct={onAddProduct}
          onDeleteProduct={onDeleteProduct}
        />

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Siparişler</h3>
          <OrderList orders={orders} />
        </div>
      </div>
    </div>
  );
}