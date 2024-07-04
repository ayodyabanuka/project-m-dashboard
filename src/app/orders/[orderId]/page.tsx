'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { Order } from '@/types/orders.type';
import { db } from '@/app/utils/firebase';

const OrderDetailsPage: React.FC = () => {
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, 'orders', orderId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() } as Order);
        } else {
          console.log('No such order!');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handleChangeStatus = async (
    newStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ) => {
    if (!order) return;

    try {
      const docRef = doc(db, 'orders', order.id);
      await updateDoc(docRef, { status: newStatus });
      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 text-slate-400">
      <div className="my-6 text-2xl font-bold">Order Details</div>
      <div className="mb-4 rounded-2xl border p-6">
        <div>
          <strong>Order ID:</strong> {order.id}
        </div>
        <div>
          <strong>Customer Name:</strong> {order.name}
        </div>
        <div>
          <strong>Contact Number:</strong> {order.phone}
        </div>
        <div>
          <strong>Total Amount:</strong> LKR {order.total}
        </div>
        <div>
          <strong>Order Date:</strong> {order.orderDate.toString()}
        </div>
        <div>
          <strong>Shipping Address:</strong>{' '}
          {order.address + ',' + order.city + ',' + order.postalCode}
        </div>
        <div>
          <strong>Status:</strong> {order.status}
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-2 text-xl font-bold">Order Items</div>

        {order.items.map((item, index) => (
          <div key={index} className="mb-2 rounded-2xl border p-6">
            <div>
              <strong>Product Name:</strong> {item.name}
            </div>
            <div>
              <strong>Quantity:</strong> {item.quantity}
            </div>
            <div>
              <strong>Size:</strong> {item.size}
            </div>
            <div>
              <strong>Price:</strong> {item.price}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-2 text-xl font-bold">Change Order Status</h2>
        <div className="flex space-x-4">
          {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(
            (status) => (
              <button
                key={status}
                onClick={() =>
                  handleChangeStatus(
                    status as
                      | 'pending'
                      | 'processing'
                      | 'shipped'
                      | 'delivered'
                      | 'cancelled'
                  )
                }
                className={`rounded px-4 py-2 text-white ${order.status === status ? 'bg-slate-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                disabled={order.status === status}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
