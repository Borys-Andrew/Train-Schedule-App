import '@/app/globals.css';
import { AuthProvider } from '@/context/AuthContext';
// import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className}`}>{children}</body> */}
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
