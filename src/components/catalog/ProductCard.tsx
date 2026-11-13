import { Link } from 'react-router-dom';
import FavoriteButton from '@/components/common/FavoriteButton';
import RatingStars from '@/components/common/RatingStars';
import StockBadge from '@/components/common/StockBadge';
import { getCategoryLabel } from '@/lib/catalog';
import { formatPrice, getDiscountedPrice } from '@/lib/format';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const finalPrice = getDiscountedPrice(product.price, product.discountPercentage);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to={`/product/${product.id}`}
        className="flex flex-1 flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              {getCategoryLabel(product.category)}
            </span>
            <StockBadge stock={product.stock} />
          </div>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-sky-700">
            {product.title}
          </h3>
          <RatingStars rating={product.rating} />
          <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-2">
            <span className="text-lg font-bold text-slate-900">{formatPrice(finalPrice)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-slate-500 line-through">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
      <FavoriteButton
        productId={product.id}
        productTitle={product.title}
        className="absolute right-3 top-3"
      />
    </article>
  );
}
