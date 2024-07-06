'use client';
import { useEffect, useRef, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { Order } from '@/types/orders.type';
import { db } from '@/app/utils/firebase';
import Invoice from '@/components/invoice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const OrderDetailsPage: React.FC = () => {
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef<HTMLDivElement>(null);

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

  const handleDownload = () => {
    const generatePDF = async () => {
      if (!invoiceRef.current) {
        return; // Return early if ref is not yet available
      }

      // Configure jsPDF for A5 size
      const pdf = new jsPDF('portrait', 'mm', 'a5');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Get invoice content as image with proper scale
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2
      });

      const imgData = canvas.toDataURL('image/png');

      // Add image to PDF and adjust size to fit A5 dimensions
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

      // Save PDF
      pdf.save(`invoice_${order?.id}.pdf`);
    };

    generatePDF();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div className="container mx-auto mt-20 grid grid-cols-2 px-4 text-slate-400">
      <Invoice order={order} invoiceRef={invoiceRef} />
      <div className="">
        <div>Current Status : {order.status}</div>
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
        <div className="flex flex-col gap-4 p-10">
          <div className="text-lg font-bold">Download Invoice </div>
          <button
            className="w-fit rounded-md bg-slate-700 px-2 py-1 hover:bg-slate-800"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
