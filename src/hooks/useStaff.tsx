import { db } from '@/app/utils/firebase';
import { Staff } from '@/types/staff.type';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useStaff = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'staff'));
    const StaffData: Staff[] = [];
    querySnapshot.forEach((doc) => {
      StaffData.push({ id: doc.id, ...doc.data() } as Staff);
    });
    setStaff(StaffData);
    setLoading(false);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return { staff, loading };
};

export default useStaff;
