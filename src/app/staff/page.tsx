'use client';
import useStaff from '@/hooks/useStaff';
import Head from 'next/head';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

const Staff = () => {
  const { staff, loading } = useStaff();

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
        <title>Staff</title>
      </Head>
      <main className="flex h-full w-full flex-col justify-center p-10 pt-24 text-slate-400">
        <div className="flex h-fit w-full justify-between">
          <div className="text-3xl font-bold">Staff List</div>
          <Link
            href={'/staff/create'}
            className="rounded-xl border border-slate-500 bg-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Create Staff
          </Link>
        </div>
        <div className="h-full overflow-x-auto pt-10">
          <table className="min-w-full rounded-lg bg-slate-800 p-4">
            <thead>
              <tr>
                <th className="border-b border-slate-700 px-4 py-2 ">Id</th>
                <th className="border-b border-slate-700 px-4 py-2 ">Name</th>
                <th className="border-b border-slate-700 px-4 py-2 ">Email</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((product) => (
                <tr key={product.id}>
                  <td className="border-b border-slate-700 px-4 py-2 text-center">
                    {product.id}
                  </td>
                  <td className="border-b border-slate-700 px-4 py-2 text-center">
                    {product.name}
                  </td>
                  <td className="border-b border-slate-700 px-4 py-2  text-center">
                    {product.email}
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

export default Staff;
