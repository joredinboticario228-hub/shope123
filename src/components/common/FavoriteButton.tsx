import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface FavoriteButtonProps {
  productId: number;
  productTitle: string;
  labeled?: boolean;
  className?: string;
}

export default function FavoriteButton({ productId, productTitle, labeled = false, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(productId);
  const actionLabel = active ? 'Remove from favorites' : 'Save to favorites';

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(productId)}
      aria-pressed={active}
      aria-label={`${actionLabel}: ${productTitle}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full transition duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:scale-95 ${
        labeled
          ? `px-5 py-3 text-sm font-semibold ring-1 ring-inset ${active ? 'bg-rose-50 text-rose-600 ring-rose-200' : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50'}`
          : `h-10 w-10 bg-white/95 shadow-sm ring-1 ring-slate-900/5 hover:bg-white ${active ? 'text-rose-500' : 'text-slate-500'}`
      } ${className}`}
    >
      <Heart className={`h-5 w-5 transition-colors ${active ? 'fill-rose-500 text-rose-500' : ''}`} />
      {labeled && <span>{active ? 'Saved to favorites' : 'Save to favorites'}</span>}
    </button>
  );
}
