import MovieGrid from './components/MovieGrid';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Filmler</h1>
      <MovieGrid />
    </main>
  );
} 