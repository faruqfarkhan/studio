
import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'eCommSim - Your Friendly Online Store',
  description: 'Discover amazing products at eCommSim.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = 'GTM-NKJDQC5M'; // Using the GTM ID from your original script

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
        {/* Google Tag Manager - Head Script */}
 <Script
 id="gtm-script"
 strategy="beforeInteractive"
 src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
 />
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        {/* Google Tag Manager - Noscript Fallback */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
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
