// components/Invoice.tsx

import { LegacyRef } from 'react';
import { Order, OrderItem } from '@/types/orders.type';
// Ensure to import your Order and OrderItem interfaces

interface InvoiceProps {
  order: Order;
  invoiceRef: LegacyRef<HTMLDivElement> | undefined;
}

const Invoice: React.FC<InvoiceProps> = ({ order, invoiceRef }) => {
  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };
  return (
    <div
      ref={invoiceRef}
      className="bg-white text-xs text-black"
      style={{ width: '148mm', height: '210mm', padding: '10mm' }}
    >
      {/* Invoice HTML structure */}
      <div className="h-full p-1">
        {/* Company logo */}
        <div className="flex justify-between">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="mb-4"
            style={{ width: '50px' }}
          />{' '}
          <div className="text-3xl font-bold">INVOICE</div>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <div className="font-bold">BILLED TO:</div>
            <p>{order.name}</p>
            <p>
              {order.phone1}/{order.phone2}
            </p>
            <p>
              {order.address}, <br /> {order.city}, {order.postalCode}
            </p>
          </div>
          <div className="text-right">
            <p className="flex">Id:{order.id}</p>
            <div>Order Date: {order.orderDate.toString().slice(0, 10)}</div>
            <div>Invoice Date: {formatDate(new Date())}</div>
          </div>
        </div>
        {/* Invoice details */}
        <div>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
        </div>

        {/* Order items */}
        <table className="mt-4 w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-t px-4 py-2">Item</th>
              <th className="border-t px-4 py-2">Unit Price</th>
              <th className="border-t px-4 py-2">Quantity</th>
              <th className="border-t px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item: OrderItem) => (
              <tr key={item.id}>
                <td className="border-b border-t px-4 py-2">
                  {item.name} - {item.size}
                </td>
                <td className="border-b border-t px-4 py-2">
                  {item.price.toLocaleString()}
                </td>
                <td className="border-b border-t px-4 py-2">{item.quantity}</td>
                <td className="border-b border-t px-4 py-2">
                  {(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <p className="mt-4 text-right text-base">
          <strong>Total: LKR {order.total.toLocaleString()}</strong>
        </p>
        <div className="mt-72 text-sm font-normal">Thank you!</div>
        <div className="flex flex-col items-end justify-end">
          <div className="text-right text-xl font-bold">Project M</div>
          <div className="text-right">
            60/1/D Rawatawatta Road,
            <br />
            Moratuwa, Rawathawatta , 10400 <br />
            Sri Lanka
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
