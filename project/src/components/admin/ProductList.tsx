import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import ProductForm from './ProductForm';

interface ProductListProps {
  products: Product[];
  orders: Order[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function ProductList({ 
  products, 
  orders,
  onUpdateProduct, 
  onAddProduct,
  onDeleteProduct 
}: ProductListProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const getOrderCount = (productId: string) => {
    return orders.filter(order => order.productId === productId).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ürünler</h2>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={20} />
          Yeni Ürün Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => {
          const orderCount = getOrderCount(product.id);
          
          return (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold mb-2">₺{product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mb-4">
                Toplam Sipariş: {orderCount}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 flex-1 justify-center"
                >
                  <Edit size={20} />
                  Düzenle
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(product.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {showDeleteConfirm === product.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-md">
                    <h3 className="text-xl font-semibold mb-4">Ürünü Sil</h3>
                    <p className="mb-4">
                      Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                      {orderCount > 0 && (
                        <span className="block text-red-600 mt-2">
                          Bu ürün için {orderCount} adet sipariş bulunmaktadır.
                        </span>
                      )}
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        İptal
                      </button>
                      <button
                        onClick={() => {
                          onDeleteProduct(product.id);
                          setShowDeleteConfirm(null);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(editingProduct || isAddingProduct) && (
        <ProductForm
          product={editingProduct}
          onSubmit={(product) => {
            if (editingProduct) {
              onUpdateProduct(product);
            } else {
              onAddProduct(product);
            }
            setEditingProduct(null);
            setIsAddingProduct(false);
          }}
          onClose={() => {
            setEditingProduct(null);
            setIsAddingProduct(false);
          }}
        />
      )}
    </div>
  );
}