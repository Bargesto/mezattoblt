import React, { useState } from 'react';
import { Product, Size, ShoeSize } from '../../types';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Product) => void;
  onClose: () => void;
}

const CLOTHING_SIZES: Size[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL'];
const SHOE_SIZES: ShoeSize[] = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

export default function ProductForm({ product, onSubmit, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      image: '',
      price: 0,
      category: 'clothing',
      sizes: CLOTHING_SIZES,
      stock: CLOTHING_SIZES.reduce((acc, size) => ({ ...acc, [size]: 0 }), {})
    }
  );

  const handleCategoryChange = (category: 'clothing' | 'shoes') => {
    const sizes = category === 'clothing' ? CLOTHING_SIZES : SHOE_SIZES;
    setFormData({
      ...formData,
      category,
      sizes,
      stock: sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {})
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">
          {product ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </h3>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value as 'clothing' | 'shoes')}
              className="w-full p-2 border rounded"
            >
              <option value="clothing">Giyim</option>
              <option value="shoes">Ayakkabı</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ürün Adı *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Görsel URL *</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fiyat (₺)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full p-2 border rounded"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stok Miktarları *</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(formData.stock).map(([size, count]) => (
                <div key={size} className="flex items-center space-x-2 p-2 border rounded">
                  <span className="font-medium">{size}:</span>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => {
                      const newStock = { ...formData.stock };
                      newStock[size] = parseInt(e.target.value) || 0;
                      setFormData({ ...formData, stock: newStock });
                    }}
                    className="w-20 p-1 border rounded"
                    min="0"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {product ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}