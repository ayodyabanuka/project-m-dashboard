'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PromosForm from '@/components/promos/promos-form';

const NewProduct: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async () => {
    router.push('/promos');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full space-y-8 rounded-xl  p-8">
        <div className="text-left text-2xl font-bold text-slate-400">
          Add New Promo Code
        </div>
        <PromosForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewProduct;
