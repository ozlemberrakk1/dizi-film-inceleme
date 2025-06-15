'use client';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import Header from './components/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
} 