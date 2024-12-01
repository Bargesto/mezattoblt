import React, { useState } from 'react';
import { Product, Size, ShoeSize } from '../types';
import { AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOrder: (productId: string, size: Size | ShoeSize, instagramUsername: string) => void;
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<Size | ShoeSize | null>(null);
  const [instagramUsername, setInstagramUsername] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOrder = () => {
    if (selectedSize && instagramUsername) {
      onOrder(product.id, selectedSize, instagramUsername);
      setShowSuccess(true);
      setInstagramUsername('');
      setSelectedSize(null);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-bold mb-4">₺{product.price.toFixed(2)}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {Object.entries(product.stock).map(([size, stock]) => (
            <button
              key={size}
              onClick={() => stock > 0 && setSelectedSize(size as Size | ShoeSize)}
              className={`p-2 text-sm rounded relative ${
                stock > 0
                  ? size === selectedSize
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={stock === 0}
            >
              <span>{size}</span>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {stock}
              </span>
              {stock === 0 && <span className="block text-xs">(Tükendi)</span>}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Instagram Kullanıcı Adı"
            value={instagramUsername}
            onChange={(e) => setInstagramUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
          
          <button
            onClick={handleOrder}
            disabled={!selectedSize || !instagramUsername}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Sipariş Ver
          </button>

          {showSuccess && (
            <div className="flex items-center gap-2 text-green-500 bg-green-50 p-2 rounded">
              <AlertCircle size={20} />
              <span>Siparişiniz başarıyla alındı!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}