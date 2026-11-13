import { COMPUTER_CATEGORIES } from '@/lib/catalog';
import type { Product } from '@/types/product';

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=0';

interface ProductsResponse {
  products: Product[];
}

function isProductsResponse(data: unknown): data is ProductsResponse {
  return typeof data === 'object' && data !== null && Array.isArray((data as { products?: unknown }).products);
}

export async function fetchComputerProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal });
  if (!response.ok) {
    throw new Error(`Product request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!isProductsResponse(data)) {
    throw new Error('Unexpected response from the product service');
  }

  return data.products.filter((product) => COMPUTER_CATEGORIES.includes(product.category));
}
