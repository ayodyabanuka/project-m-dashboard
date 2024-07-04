'use client';
import React from 'react';
import ProductForm from '@/components/products/products-form';
import { useRouter } from 'next/navigation';

const NewProduct: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async () => {
    router.push('/products');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full space-y-8 rounded-xl  p-8">
        <div className="text-left text-2xl font-bold text-slate-400">
          Add New Product
        </div>
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewProduct;
