'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) throw new Error('Film yüklenemedi');
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Film detay hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Film bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-[400px] md:h-[500px]">
            {movie.imageUrl ? (
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Görsel yok</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{movie.title}</h1>
              <span className="text-sm text-gray-500">
                {new Date(movie.releaseDate).getFullYear()}
              </span>
            </div>
            <div className="mb-4">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                {movie.category?.name}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 