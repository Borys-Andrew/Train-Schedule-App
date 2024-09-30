export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-6 rounded-lg border px-6 py-10 w-3/5">
        <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">
          <strong>Welcome to Train Schedule App</strong> <br /> An application
          for viewing and managing train schedules with the functions of
          authorization, searching, editing, sorting and deleting records.
        </p>
      </div>
    </div>
  );
}
