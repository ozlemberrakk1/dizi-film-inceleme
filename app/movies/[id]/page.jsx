'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function MovieDetail() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleCommentSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: id, content: comment })
    });
    if (!res.ok) {
      setError("Yorum eklenemedi");
    } else {
      setComment("");
      fetchMovie();
    }
    setSubmitting(false);
  }

  async function fetchMovie() {
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
  }

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line
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
        {/* Yorumlar Alanı */}
        <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
          <h2 className="text-xl font-bold mb-4">Yorumlar</h2>
          {session ? (
            <form onSubmit={handleCommentSubmit} className="mb-6 flex flex-col gap-2">
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Yorumunuzu yazın..."
                required
                className="border rounded p-2"
                rows={3}
              />
              <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded">
                Gönder
              </button>
              {error && <div className="text-red-500">{error}</div>}
            </form>
          ) : (
            <div className="mb-4 text-gray-500">Yorum yapmak için giriş yapmalısınız.</div>
          )}
          <div className="space-y-4">
            {movie?.reviews?.length === 0 && <div>Henüz yorum yok.</div>}
            {movie?.reviews?.map((r) => (
              <div key={r.id} className="border-b pb-2">
                <div className="font-semibold">{r.user?.name || "Anonim"}</div>
                <div className="text-gray-700">{r.content}</div>
                <div className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleString("tr-TR")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 