import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main className="flex justify-center items-center h-screen p-6">
        <div className="flex flex-col justify-center  gap-6 rounded-lg bg-neutral-200 px-6 py-10 w-3/5">
          <p className=" text-xl text-gray-800 md:text-3xl md:leading-normal">
            <strong>Welcome to Train Schedule</strong> <br /> An application for
            viewing and managing train schedules with the functions of
            authorization, searching, editing, and deleting records.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-center "
          >
            <Button
              variant="default"
              className="px-11"
            >
              Login
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
