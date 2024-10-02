'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import NavigationBar from '@/components/navigation-bar';
import '@/app/globals.css';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="flex h-screen flex-col justify-between">
              <header className="flex justify-between items-center border-b p-6">
                <p>Logo</p>
                <NavigationBar />
              </header>

              <main className="p-6">
                <div id="modal-root"></div>
                {children}
                <Toaster position="top-right" />
              </main>
              <footer className=" bg-neutral-200 p-3 text-center">
                <p className="flex justify-center">
                  &copy; 2024 Train Schedule App
                </p>
              </footer>
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
