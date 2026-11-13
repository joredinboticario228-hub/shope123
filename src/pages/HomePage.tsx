import { useMemo } from 'react';
import { SearchX } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/catalog/Pagination';
import FilterBar from '@/components/catalog/FilterBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import ProductGridSkeleton from '@/components/catalog/ProductGridSkeleton';
import SearchBar from '@/components/catalog/SearchBar';
import EmptyState from '@/components/common/EmptyState';
import ErrorBanner from '@/components/common/ErrorBanner';
import { useProducts } from '@/context/ProductsContext';
import {
  PAGE_SIZE,
  filterAndSortProducts,
  getPageCount,
  getPageItems,
  isSortOption,
  type SortOption,
} from '@/lib/catalog';

type FilterParam = 'q' | 'category' | 'sort' | 'page';

export default function HomePage() {
  const { products, status, reload } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? 'all';
  const sortParam = searchParams.get('sort');
  const sort: SortOption = isSortOption(sortParam) ? sortParam : 'featured';

  const results = useMemo(
    () => filterAndSortProducts(products, { search, category, sort }),
    [products, search, category, sort],
  );
  const pageCount = getPageCount(results.length);
  const requestedPage = Number(searchParams.get('page')) || 1;
  const page = Math.min(Math.max(requestedPage, 1), pageCount);
  const visibleProducts = getPageItems(results, page);
  const rangeStart = (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, results.length);

  const updateParams = (changes: Partial<Record<FilterParam, string>>) => {
    const next = new URLSearchParams(searchParams);
    if (!('page' in changes)) next.delete('page');
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next, { replace: true });
  };

  const handlePageChange = (nextPage: number) => {
    updateParams({ page: String(nextPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="space-y-10">
      <div className="space-y-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">Computers and tech</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Find your next machine
          </h1>
          <p className="mt-3 text-slate-600">
            Browse laptops, tablets, smartphones, and accessories. Compare prices and ratings, then save what you like.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar value={search} onChange={(value) => updateParams({ q: value })} />
          <FilterBar
            category={category}
            sort={sort}
            onCategoryChange={(value) => updateParams({ category: value })}
            onSortChange={(value) => updateParams({ sort: value })}
          />
        </div>
      </div>

      {status === 'loading' && <ProductGridSkeleton />}

      {status === 'error' && (
        <ErrorBanner
          title="We couldn't load the catalog"
          message="Check your internet connection and try again."
          onRetry={reload}
        />
      )}

      {status === 'success' && results.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="No products match your search"
          description="Try a different keyword or clear your filters to see everything in the shop."
          action={
            <button
              type="button"
              onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
              className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Clear filters
            </button>
          }
        />
      )}

      {status === 'success' && results.length > 0 && (
        <div className="space-y-8">
          <p className="text-sm text-slate-500">
            Showing {rangeStart}-{rangeEnd} of {results.length} products
          </p>
          <ProductGrid products={visibleProducts} />
          <Pagination page={page} pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      )}
    </section>
  );
}
