import React, { useState } from 'react';
import { Order } from '../../types';
import { ArrowUpDown } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
}

type SortField = 'id' | 'productName' | 'instagramUsername' | 'size' | 'timestamp' | 'price';
type SortDirection = 'asc' | 'desc';

export default function OrderList({ orders }: OrderListProps) {
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'id':
        comparison = a.id.localeCompare(b.id);
        break;
      case 'productName':
        comparison = a.productName.localeCompare(b.productName);
        break;
      case 'instagramUsername':
        comparison = a.instagramUsername.localeCompare(b.instagramUsername);
        break;
      case 'size':
        comparison = String(a.size).localeCompare(String(b.size));
        break;
      case 'timestamp':
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown size={16} className={sortField === field ? 'text-blue-500' : 'text-gray-400'} />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <SortHeader field="id" label="Sipariş ID" />
            <SortHeader field="productName" label="Ürün" />
            <SortHeader field="instagramUsername" label="Instagram" />
            <SortHeader field="size" label="Beden" />
            <SortHeader field="timestamp" label="Tarih" />
            <SortHeader field="price" label="Fiyat" />
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map(order => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.productName}</td>
              <td className="px-4 py-2">{order.instagramUsername}</td>
              <td className="px-4 py-2">{order.size}</td>
              <td className="px-4 py-2">
                {new Date(order.timestamp).toLocaleDateString('tr-TR')}
              </td>
              <td className="px-4 py-2 text-right">₺{order.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}