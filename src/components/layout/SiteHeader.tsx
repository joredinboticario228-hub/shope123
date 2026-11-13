import { Laptop, Heart } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-2 rounded-full px-4 py-2 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
    isActive ? 'bg-sky-50 text-sky-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function SiteHeader() {
  const { favoriteIds } = useFavorites();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
            <Laptop className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">ByteHaven</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 text-sm font-medium">
          <NavLink to="/" end className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            <Heart className="h-4 w-4" aria-hidden="true" />
            Favorites
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-600 px-1.5 text-xs font-semibold text-white">
              {favoriteIds.length}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
