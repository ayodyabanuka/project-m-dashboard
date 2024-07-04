'use client';
import useOrders from '@/hooks/useOrders';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Orders = () => {
  const { orders, loading } = useOrders();
  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const processingOrders = orders.filter(
    (order) => order.status === 'processing'
  );
  const shippedOrders = orders.filter((order) => order.status === 'shipped');
  const deliveredOrders = orders.filter(
    (order) => order.status === 'delivered'
  );
  const canceledOrders = orders.filter((order) => order.status === 'cancelled');

  const [selectedTab, setSelectedTab] = useState('pending');

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center text-slate-400">
        <ClipLoader color="#ffffff" size={20} />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <main className="flex h-full w-full flex-col justify-center p-10 pt-24 text-slate-400">
        <div className="flex h-fit w-full justify-between">
          <div className="text-3xl font-bold">Order List</div>
        </div>
        <div className="h-full overflow-x-auto pt-5">
          <div className="flex justify-end py-5">
            <div className="flex w-fit gap-4 rounded-xl bg-slate-800 px-10 py-4">
              <button
                onClick={() => setSelectedTab('pending')}
                className={`rounded-lg px-4 py-2 ${selectedTab === 'pending' ? 'bg-slate-900' : 'bg-slate-600 '}`}
              >
                Pending
              </button>
              <button
                onClick={() => setSelectedTab('processing')}
                className={`rounded-lg px-4 py-2 ${selectedTab === 'processing' ? 'bg-slate-900' : 'bg-slate-600 '}`}
              >
                Processing
              </button>
              <button
                onClick={() => setSelectedTab('shipped')}
                className={`rounded-lg px-4 py-2 ${selectedTab === 'shipped' ? 'bg-slate-900' : 'bg-slate-600 '}`}
              >
                Shipped
              </button>
              <button
                onClick={() => setSelectedTab('delivered')}
                className={`rounded-lg px-4 py-2 ${selectedTab === 'delivered' ? 'bg-slate-900' : 'bg-slate-600 '}`}
              >
                Delivered
              </button>
              <button
                onClick={() => setSelectedTab('canceled')}
                className={`rounded-lg px-4 py-2 ${selectedTab === 'canceled' ? 'bg-slate-900' : 'bg-slate-600 '}`}
              >
                Cancelled
              </button>
            </div>
          </div>
          <table className="min-w-full rounded-lg bg-slate-800 p-4">
            <thead>
              <tr>
                <th className="border-b border-slate-700 px-4 py-2 ">Id</th>
                <th className="border-b border-slate-700 px-4 py-2 ">
                  Customer Name
                </th>
                <th className="border-b border-slate-700 px-4 py-2 ">
                  Total Amount
                </th>
                <th className="border-b border-slate-700 px-4 py-2 ">
                  Order Date
                </th>
                <th className="border-b border-slate-700 px-4 py-2 ">Status</th>
              </tr>
            </thead>
            {selectedTab === 'pending' ? (
              <tbody>
                {pendingOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.id}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.name}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.total}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      {order.orderDate.toString()}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      <Link href={`/orders/${order.id}`}>{order.status}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : selectedTab === 'processing' ? (
              <tbody>
                {processingOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.id}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.name}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.total}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      {order.orderDate.toString()}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      <Link href={`/orders/${order.id}`}>{order.status}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : selectedTab === 'shipped' ? (
              <tbody>
                {shippedOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.id}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.name}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.total}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      {order.orderDate.toString()}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      <Link href={`/orders/${order.id}`}>{order.status}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : selectedTab === 'delivered' ? (
              <tbody>
                {deliveredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.id}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.name}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.total}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      {order.orderDate.toString()}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      <Link href={`/orders/${order.id}`}>{order.status}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {canceledOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.id}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.name}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2 text-center">
                      {order.total}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      {order.orderDate.toString()}
                    </td>
                    <td className="border-b border-slate-700 px-4 py-2  text-center">
                      <Link href={`/orders/${order.id}`}>{order.status}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </main>
    </>
  );
};

export default Orders;
