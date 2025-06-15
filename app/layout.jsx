'use client';

import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { AuthProvider } from './providers/AuthProvider';
import Header from './components/header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <title>Film ve Dizi İnceleme Platformu</title>
        <meta name="description" content="Film ve diziler hakkında incelemeler yapabileceğiniz platform" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
} 