'use client';

import Link from 'next/link';

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="aspect-[2/3] relative">
          {movie.imageUrl ? (
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Görsel yok</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
            <span>{movie.category?.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 