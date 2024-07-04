export interface OrderItem {
  id: string;
  image: string[];
  name: string;
  price: number;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  name: string;
  email: string;
  items: OrderItem[];
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'; // Example status options
}
