'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || session.user.role !== 'admin') {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Paneli</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/users"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Kullanıcı Yönetimi</h2>
          <p className="text-gray-600">
            Kullanıcıları görüntüleyin, rollerini değiştirin ve yönetin.
          </p>
        </Link>

        <Link
          href="/admin/contents"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">İçerik Yönetimi</h2>
          <p className="text-gray-600">
            Film ve dizileri ekleyin, düzenleyin ve yönetin.
          </p>
        </Link>
      </div>
    </div>
  );
} 