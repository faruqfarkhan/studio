import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'eCommSim - Your Friendly Online Store',
  description: 'Discover amazing products at eCommSim.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
        {/* START Google Analytics 4 */}
        {/* END Google Analytics 4 */}
        {/* START Google Tag Manager */}
        {/* END Google Tag Manager */}
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        {/* START Google Tag Manager (noscript) */}
        {/* END Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
