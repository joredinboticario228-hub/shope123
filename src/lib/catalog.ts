import type { Product } from '@/types/product';

export const COMPUTER_CATEGORIES: readonly string[] = ['laptops', 'tablets', 'smartphones', 'mobile-accessories'];

export const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All products' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'mobile-accessories', label: 'Accessories' },
];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Top rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export const PAGE_SIZE = 12;

export interface CatalogQuery {
  search: string;
  category: string;
  sort: SortOption;
}

const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
  featured: (a, b) => a.id - b.id,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'rating-desc': (a, b) => b.rating - a.rating,
  'name-asc': (a, b) => a.title.localeCompare(b.title),
};

export function isSortOption(value: string | null): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? category;
}

export function filterAndSortProducts(products: Product[], { search, category, sort }: CatalogQuery): Product[] {
  const term = search.trim().toLowerCase();

  const matches = products.filter((product) => {
    if (category !== 'all' && product.category !== category) return false;
    if (!term) return true;
    return [product.title, product.brand ?? '', ...product.tags].some((field) =>
      field.toLowerCase().includes(term),
    );
  });

  return matches.sort(SORTERS[sort]);
}

export function getPageCount(totalItems: number): number {
  return Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
}

export function getPageItems<T>(items: T[], page: number): T[] {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
}
