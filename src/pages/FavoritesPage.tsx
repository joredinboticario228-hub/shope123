import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '@/components/catalog/ProductGrid';
import ProductGridSkeleton from '@/components/catalog/ProductGridSkeleton';
import EmptyState from '@/components/common/EmptyState';
import ErrorBanner from '@/components/common/ErrorBanner';
import { useFavorites } from '@/context/FavoritesContext';
import { useProducts } from '@/context/ProductsContext';

export default function FavoritesPage() {
  const { products, status, reload } = useProducts();
  const { favoriteIds } = useFavorites();
  const favorites = products.filter((product) => favoriteIds.includes(product.id));

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">Saved on this device</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your favorites</h1>
        {status === 'success' && (
          <p className="mt-2 text-slate-600">
            {favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>

      {status === 'loading' && <ProductGridSkeleton />}

      {status === 'error' && (
        <ErrorBanner
          title="We couldn't load your favorites"
          message="Your saved items are still stored. Try loading the products again."
          onRetry={reload}
        />
      )}

      {status === 'success' && favorites.length === 0 && (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Tap the heart on any product to save it here for later."
          action={
            <Link
              to="/"
              className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              Browse products
            </Link>
          }
        />
      )}

      {status === 'success' && favorites.length > 0 && <ProductGrid products={favorites} />}
    </section>
  );
}
