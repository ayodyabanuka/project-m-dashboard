import { OrderItem } from '@/types/orders.type';

const emailTemplates = {
  orderCancelled: (orderDetails: OrderItem[]) => `
    <div style="font-family: Arial, sans-serif;">
      <h2>Your Order has been Cancelled</h2>
      <p>We regret to inform you that your order has been cancelled.</p>
      <p>Here are the order details:</p>
      <div>
        ${orderDetails
          .map(
            (item: OrderItem) => `
          <div style="margin-bottom: 10px;">
            <strong>${item.name}</strong> - ${item.quantity} x LKR ${item.price}
          </div>
        `
          )
          .join('')}
      </div>
      <p>Total: LKR ${orderDetails.reduce((total: number, item: OrderItem) => total + item.price * item.quantity, 0)}</p>
    </div>
  `,
  orderShipped: (orderDetails: OrderItem[]) => `
    <div style="font-family: Arial, sans-serif;">
      <h2>Your Order has been Shipped</h2>
      <p>Your order is on its way! Here are the details:</p>
      <div>
        ${orderDetails
          .map(
            (item: OrderItem) => `
          <div style="margin-bottom: 10px;">
            <strong>${item.name}</strong> - ${item.quantity} x LKR ${item.price}
          </div>
        `
          )
          .join('')}
      </div>
      <p>Total: LKR ${orderDetails.reduce((total: number, item: OrderItem) => total + item.price * item.quantity, 0)}</p>
    </div>
  `,
  orderProcessing: (orderDetails: OrderItem[]) => `
    <div style="font-family: Arial, sans-serif;">
      <h2>Your Order is Being Processed</h2>
      <p>We are currently processing your order. Here are the details:</p>
      <div>
        ${orderDetails
          .map(
            (item: OrderItem) => `
          <div style="margin-bottom: 10px;">
            <strong>${item.name}</strong> - ${item.quantity} x LKR ${item.price}
          </div>
        `
          )
          .join('')}
      </div>
      <p>Total: LKR ${orderDetails.reduce((total: number, item: OrderItem) => total + item.price * item.quantity, 0)}</p>
    </div>
  `,
  orderDelivered: (orderDetails: OrderItem[]) => `
    <div style="font-family: Arial, sans-serif;">
      <h2>Your Order has been Delivered</h2>
      <p>We are pleased to inform you that your order has been delivered. Here are the details:</p>
      <div>
        ${orderDetails
          .map(
            (item: OrderItem) => `
          <div style="margin-bottom: 10px;">
            <strong>${item.name}</strong> - ${item.quantity} x LKR ${item.price}
          </div>
        `
          )
          .join('')}
      </div>
      <p>Total: LKR ${orderDetails.reduce((total: number, item: OrderItem) => total + item.price * item.quantity, 0)}</p>
    </div>
  `
};

export default emailTemplates;
