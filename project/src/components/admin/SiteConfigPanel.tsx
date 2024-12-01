import React, { useState } from 'react';
import { SiteConfig } from '../../types';

interface SiteConfigPanelProps {
  config: SiteConfig;
  onUpdate: (config: SiteConfig) => void;
  onClose: () => void;
}

export default function SiteConfigPanel({ config, onUpdate, onClose }: SiteConfigPanelProps) {
  const [formData, setFormData] = useState(config);

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Site Ayarları</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Site Adı</label>
          <input
            type="text"
            value={formData.siteName}
            onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo URL</label>
          <input
            type="url"
            value={formData.logoUrl}
            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            İptal
          </button>
          <button
            onClick={() => {
              onUpdate(formData);
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}