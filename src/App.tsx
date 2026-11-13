import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ProductsProvider } from '@/context/ProductsContext';
import FavoritesPage from '@/pages/FavoritesPage';
import HomePage from '@/pages/HomePage';
import ProductDetailPage from '@/pages/ProductDetailPage';

export default function App() {
  return (
    <ProductsProvider>
      <FavoritesProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </ProductsProvider>
  );
}
