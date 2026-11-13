import { ArrowLeft, PackageX } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ProductGallery from '@/components/product/ProductGallery';
import ReviewList from '@/components/product/ReviewList';
import EmptyState from '@/components/common/EmptyState';
import ErrorBanner from '@/components/common/ErrorBanner';
import FavoriteButton from '@/components/common/FavoriteButton';
import RatingStars from '@/components/common/RatingStars';
import StockBadge from '@/components/common/StockBadge';
import { useProducts } from '@/context/ProductsContext';
import { getCategoryLabel } from '@/lib/catalog';
import { formatPrice, getDiscountedPrice } from '@/lib/format';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, status, reload } = useProducts();

  if (status === 'loading') {
    return <div className="h-96 animate-pulse rounded-3xl bg-slate-200" aria-busy="true" aria-label="Loading product" />;
  }

  if (status === 'error') {
    return (
      <ErrorBanner
        title="We couldn't load this product"
        message="Check your internet connection and try again."
        onRetry={reload}
      />
    );
  }

  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <EmptyState
        icon={PackageX}
        title="Product not found"
        description="This item may have been removed or the link may be incorrect."
        action={
          <Link
            to="/"
            className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            Back to shop
          </Link>
        }
      />
    );
  }

  const finalPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage > 0;
  const specs = [
    { label: 'Brand', value: product.brand ?? 'Not specified' },
    { label: 'Category', value: getCategoryLabel(product.category) },
    { label: 'SKU', value: product.sku },
    { label: 'Warranty', value: product.warrantyInformation },
    { label: 'Shipping', value: product.shippingInformation },
  ];

  return (
    <div className="space-y-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full text-sm font-medium text-slate-600 transition hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery key={product.id} images={product.images} title={product.title} />

        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-700">
            {getCategoryLabel(product.category)}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <RatingStars rating={product.rating} />
            <span className="text-sm text-slate-500">
              {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-bold text-slate-900">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <>
                <span className="pb-1 text-lg text-slate-500 line-through">{formatPrice(product.price)}</span>
                <span className="mb-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  {Math.round(product.discountPercentage)}% off
                </span>
              </>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-slate-600">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StockBadge stock={product.stock} />
            <span className="text-sm text-slate-600">{product.availabilityStatus}</span>
          </div>

          <div className="mt-8">
            <FavoriteButton productId={product.id} productTitle={product.title} labeled />
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{spec.label}</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section aria-labelledby="reviews-heading" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="reviews-heading" className="text-xl font-bold text-slate-900">
          Customer reviews
        </h2>
        <div className="mt-4">
          <ReviewList reviews={product.reviews} />
        </div>
      </section>
    </div>
  );
}
