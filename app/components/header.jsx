'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Search, MessageCircle, User, Settings } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Arama işlemi burada yapılacak
    console.log('Arama:', searchQuery);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Film-Dizi-İnceleme
            </Link>
          </div>

          {/* Arama Çubuğu */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Film veya dizi ara..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>

          {/* Navigasyon */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-gray-600 hover:text-indigo-600 flex items-center"
                  >
                    <Settings className="h-5 w-5 mr-1" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <Link
                  href="/messages"
                  className="text-gray-600 hover:text-indigo-600 flex items-center"
                >
                  <MessageCircle className="h-5 w-5 mr-1" />
                  <span>Mesajlar</span>
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-indigo-600 flex items-center"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Profil</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
