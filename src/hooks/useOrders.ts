import { db } from '@/app/utils/firebase';
import { Order } from '@/types/orders.type';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'orders'));
    const OrdersData: Order[] = [];
    querySnapshot.forEach((doc) => {
      OrdersData.push({ id: doc.id, ...doc.data() } as Order);
    });
    setOrders(OrdersData);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading };
};

export default useOrders;
