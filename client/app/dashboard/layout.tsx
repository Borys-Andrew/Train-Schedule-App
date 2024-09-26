import NavigationBar from '@/components/navigation-bar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <header className="flex justify-between border border-red-600 p-6">
        <p>Logo</p>
        <NavigationBar />
      </header>

      <main className="p-6">{children}</main>
      <footer className=" bg-neutral-200 p-6">
        <p className="flex justify-center">&copy; 2023 Train Schedule App</p>
      </footer>
    </div>
  );
}
