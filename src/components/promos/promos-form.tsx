import React, { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/app/utils/firebase';
import { ClipLoader } from 'react-spinners';

interface Props {
  onSubmit: () => void;
}

const PromosForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(db, 'promo', code);
      await setDoc(docRef, {
        name,
        discount,
        code,
        used: 0,
        createdAt: new Date()
      });

      // Reset form and notify parent component
      setName('');
      setDiscount('');
      setCode('');
      setLoading(false);
      onSubmit();
    } catch (error) {
      setLoading(false);
      console.error('Error uploading promo:', error);
    }
  };

  return (
    <div className="flex space-x-6">
      <form onSubmit={handleSubmit} className="w-1/2 space-y-6">
        {/* Promo Name */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Promo Name
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Discount */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Discount
          </div>
          <input
            id="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Code */}
        <div>
          <div className="block text-sm font-medium text-slate-400">Code</div>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-700 px-4 py-2 text-white shadow hover:bg-slate-800 focus:outline-none"
          >
            {loading ? <ClipLoader color="#ffffff" size={100} /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromosForm;
