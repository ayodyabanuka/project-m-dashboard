export interface Size {
  name: string;
  qty: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  details: string[];
  mainCategory: string;
  sizes: Size[];
  images: string[];
  createdAt: Date;
}
