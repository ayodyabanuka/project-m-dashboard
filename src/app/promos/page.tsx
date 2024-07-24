'use client';
import usePromo from '@/hooks/usePromo';
import Head from 'next/head';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

const Promos = () => {
  const { promos, loading, deletePromo } = usePromo();

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
        <title>Promo codes</title>
      </Head>
      <main className="flex h-full w-full flex-col justify-center p-10 pt-24 text-slate-400">
        <div className="flex h-fit w-full justify-between">
          <div className="text-3xl font-bold">Promo List</div>
          <Link
            href={'/promos/create'}
            className="rounded-xl border border-slate-500 bg-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Create Promo
          </Link>
        </div>
        <div className="h-full overflow-x-auto pt-10">
          <table className="min-w-full rounded-lg bg-slate-800 p-4">
            <thead>
              <tr>
                <th className="border-b border-slate-700 px-4 py-2 ">Code</th>
                <th className="border-b border-slate-700 px-4 py-2 ">Name</th>
                <th className="border-b border-slate-700 px-4 py-2 ">
                  Discount
                </th>
                <th className="border-b border-slate-700 px-4 py-2 ">Used</th>
                <th className="border-b border-slate-700 px-4 py-2 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr key={promo.name}>
                  <td className="border-b border-slate-700 px-4 py-2 text-center">
                    {promo.code}
                  </td>
                  <td className="border-b border-slate-700 px-4 py-2 text-center">
                    {promo.name}
                  </td>
                  <td className="border-b border-slate-700 px-4 py-2  text-center">
                    {promo.discount}
                  </td>

                  <td className="border-b border-slate-700 px-4 py-2  text-center">
                    {promo.used}
                  </td>

                  <td className="border-b border-slate-700 px-4 py-2  text-center">
                    <button
                      onClick={() => deletePromo(promo.code)}
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

export default Promos;
