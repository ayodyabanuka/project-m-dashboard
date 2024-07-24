import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from './sendEmail';
import emailTemplates from './emails/emailTemps';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { userEmail, orderDetails, status } = req.body;

  let subject;
  let htmlContent;

  switch (status) {
    case 'cancelled':
      subject = 'Your Order has been Cancelled';
      htmlContent = emailTemplates.orderCancelled(orderDetails);
      break;
    case 'shipped':
      subject = 'Your Order has been Shipped';
      htmlContent = emailTemplates.orderShipped(orderDetails);
      break;
    case 'processing':
      subject = 'Your Order is Being Processed';
      htmlContent = emailTemplates.orderProcessing(orderDetails);
      break;
    case 'delivered':
      subject = 'Your Order has been Delivered';
      htmlContent = emailTemplates.orderDelivered(orderDetails);
      break;
    default:
      return res.status(400).send({ message: 'Invalid order status' });
  }

  try {
    await sendEmail(userEmail, subject, htmlContent);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error sending email', error });
  }
}
