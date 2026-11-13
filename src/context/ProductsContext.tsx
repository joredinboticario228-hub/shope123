import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { fetchComputerProducts } from '@/lib/api';
import type { Product } from '@/types/product';

type LoadStatus = 'loading' | 'success' | 'error';

interface ProductsContextValue {
  products: Product[];
  status: LoadStatus;
  reload: () => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    fetchComputerProducts(controller.signal)
      .then((items) => {
        setProducts(items);
        setStatus('success');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });

    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => setAttempt((count) => count + 1), []);

  const value = useMemo(() => ({ products, status, reload }), [products, status, reload]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts(): ProductsContextValue {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within a ProductsProvider');
  return context;
}
