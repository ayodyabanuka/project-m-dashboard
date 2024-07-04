'use client';
import useProducts from '@/hooks/useProducts';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

const Products = () => {
  const { products, loading, deleteProduct } = useProducts();

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center text-slate-400">
        <ClipLoader color="#ffffff" size={20} />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <main className="flex h-full w-full flex-col justify-center p-10 pt-24 text-slate-400">
        <div className="flex h-fit w-full justify-between">
          <div className="text-3xl font-bold">Product List</div>
          <Link
            href={'/products/create'}
            className="rounded-xl border border-slate-500 bg-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Create Product
          </Link>
        </div>
        <div className="h-full overflow-x-auto pt-10">
          <table className="min-w-full rounded-lg bg-slate-800 p-4">
            <thead>
              <tr>
                <th className="border-b border-slate-700 px-4 py-2 ">Id</th>
                <th className="border-b border-slate-700 px-4 py-2 ">Images</th>
                <th className="border-b border-slate-700 px-4 py-2 ">Name</th>
                <th className="border-b border-slate-700 px-4 py-2 ">
                  Category
                </th>
                <th className="border-b border-slate-700 px-4 py-2 ">
                  Sizes and Qty
                </th>
                <th className="border-b border-slate-700 px-4 py-2 ">Price</th>
                <th className="border-b border-slate-700 px-4 py-2 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border-b border-slate-700 px-4 py-2 text-center">
                    {product.id}
                  </td>
                  <td className="border-b border-slate-700 px-4 py-2 text-center ">
                    <Image
                      src={product.images[0]}
                      alt={`Product 1`}
                      height={100}
                      width={100}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="border-b border-slate-700 px-4 py-2 text-center">
                    {product.name}
                  </td>
                  <td className="border-b border-slate-700 px-4 py-2  text-center">
                    {product.category}
                  </td>
                  <td className="grid grid-cols-2 border-b border-slate-700 px-4 py-2 text-center">
                    {product.sizes?.map((siz, index) => (
                      <div key={index} className="">
                        <div className="grid">
                          {siz.name} - {siz.qty}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="border-b border-slate-700 px-4 py-2  text-center">
                    LKR {product.price}
                  </td>

                  <td className="border-b border-slate-700 px-4 py-2  text-center text-center ">
                    <Link
                      href={`/products/${product.id}`}
                      className=" mr-3 text-slate-500"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Products;
