'use client';

import { getAllTrains } from '@/api';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/loader';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';

export default function SchecdulePage() {
  const { isAuth } = useContext(AuthContext);
  const { isPending, data: trains } = useQuery({
    queryKey: ['trains'],
    queryFn: getAllTrains,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isAuth ? (
        <div className="container mx-auto">
          {isPending ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={trains ?? []}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center rounded-lg border px-6 py-10 w-3/5">
            <p className="text-xl text-gray-800 md:text-3xl md:leading-normal text-center">
              <strong>You are not authorized to access this page</strong>
              <br /> Please,{' '}
              <Link
                href="/login"
                className="underline underline-offset-1 cursor-pointer"
              >
                Login
              </Link>{' '}
              to continue.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
