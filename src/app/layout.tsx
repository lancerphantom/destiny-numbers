import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Destiny Numbers',
  description: 'Discover the numbers written in your stars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <body className="antialiased bg-slate-900">
        {children}
      </body>
    </html>
  );
}