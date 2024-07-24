import { db } from '@/app/utils/firebase';
import { Promo } from '@/types/promo.type';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const usePromo = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPromos = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'promo'));
    const promoData: Promo[] = [];
    querySnapshot.forEach((doc) => {
      promoData.push({ ...doc.data() } as Promo);
    });
    setPromos(promoData);
    setLoading(false);
  };

  const addPromo = async (promo: Omit<Promo, 'id'>) => {
    await addDoc(collection(db, 'promo'), promo);
    fetchPromos();
  };

  const editPromo = async (id: string, promo: Partial<Promo>) => {
    await updateDoc(doc(db, 'promo', id), promo);
    fetchPromos();
  };

  const deletePromo = async (id: string) => {
    await deleteDoc(doc(db, 'promo', id));
    fetchPromos();
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  return { promos, loading, addPromo, editPromo, deletePromo };
};

export default usePromo;
