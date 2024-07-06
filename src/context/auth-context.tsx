import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import Cookies from 'js-cookie';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '@/app/utils/firebase';

// Define the shape of the context
interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap around your application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const userDocRef = doc(db, 'users', email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('Invalid email or password');
    }

    const userData = userDoc.data();

    if (userData.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Save user data to state and cookies
    const user = { id: userDoc.id, name: userData.name, email: userData.email };
    setUser(user);
    Cookies.set('staff', JSON.stringify(user));

    // Redirect to the dashboard or another page
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
