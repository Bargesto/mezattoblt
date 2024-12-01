import React, { useState } from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (instagramUsername: string) => void;
}

export default function OrderModal({ isOpen, onClose, onSubmit }: OrderModalProps) {
  const [instagramUsername, setInstagramUsername] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Sipariş Ver</h3>
        <input
          type="text"
          placeholder="Instagram Kullanıcı Adı"
          value={instagramUsername}
          onChange={(e) => setInstagramUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            İptal
          </button>
          <button
            onClick={() => onSubmit(instagramUsername)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!instagramUsername}
          >
            Sipariş Ver
          </button>
        </div>
      </div>
    </div>
  );
}