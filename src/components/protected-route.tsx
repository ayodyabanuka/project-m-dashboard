import { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get('staff');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  // if (!user) {
  //   return <p>Loading...</p>;
  // }

  return children;
};

export default ProtectedRoute;
