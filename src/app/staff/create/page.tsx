'use client';
import { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/app/utils/firebase';
import { useRouter } from 'next/navigation';

const AddStaff = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = doc(db, 'staff', email);
      await setDoc(docRef, {
        name,
        email,
        password
      });
      console.log('Document written with ID: ', docRef.id);
      router.push('/staff');
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-10 px-4">
      <h1 className="my-6 text-2xl font-bold text-slate-400">Add Staff</h1>
      <form onSubmit={handleSubmit} className="max-w-screen-md space-y-4">
        <div>
          <div className="block text-sm font-medium text-slate-400">Name</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-700 p-2 text-slate-400"
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-400">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-700 p-2 text-slate-400"
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Password
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-700 p-2 text-slate-400"
            required
          />
        </div>
        <button
          type="submit"
          className="rounded bg-slate-700 px-4 py-2 text-white shadow hover:bg-slate-800 focus:outline-none"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Staff'}
        </button>
      </form>
    </div>
  );
};

export default AddStaff;
