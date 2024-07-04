import { db } from '@/app/utils/firebase';
import { Product } from '@/types/products.type';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData: Product[] = [];
    querySnapshot.forEach((doc) => {
      productsData.push({ id: doc.id, ...doc.data() } as Product);
    });
    setProducts(productsData);
    setLoading(false);
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    await addDoc(collection(db, 'products'), product);
    fetchProducts();
  };

  const editProduct = async (id: string, product: Partial<Product>) => {
    await updateDoc(doc(db, 'products', id), product);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, addProduct, editProduct, deleteProduct };
};

export default useProducts;
