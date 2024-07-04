'use client';
import { useState } from 'react';
import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userDocRef = doc(db, 'staff', email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('Invalid email or password');
    }

    const userData = userDoc.data();

    if (userData.password !== password) {
      throw new Error('Invalid email or password');
    }
    Cookies.set('token', email);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full rounded bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
