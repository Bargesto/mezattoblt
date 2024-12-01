import { Order } from '../types';

export function exportOrdersToExcel(orders: Order[]) {
  // Add BOM for Excel to correctly display Turkish characters
  const BOM = '\uFEFF';
  
  const headers = [
    'Sipariş ID',
    'Instagram Kullanıcı Adı',
    'Ürün Adı',
    'Beden',
    'Fiyat',
    'Tarih'
  ];
  
  const csvContent = BOM + [
    headers.join('\t'),
    ...orders.map(order => [
      order.id,
      order.instagramUsername,
      order.productName,
      order.size,
      `₺${order.price.toFixed(2)}`,
      new Date(order.timestamp).toLocaleDateString('tr-TR')
    ].join('\t'))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `siparisler_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}