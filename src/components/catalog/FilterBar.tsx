import { ChevronDown } from 'lucide-react';
import { CATEGORY_OPTIONS, SORT_OPTIONS, type SortOption } from '@/lib/catalog';

interface FilterBarProps {
  category: string;
  sort: SortOption;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
}

const selectClass =
  'w-full appearance-none rounded-full border border-slate-300 bg-white py-3 pl-4 pr-10 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100';

export default function FilterBar({ category, sort, onCategoryChange, onSortChange }: FilterBarProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-[minmax(0,13rem)_minmax(0,14rem)]">
      <div className="relative">
        <label className="sr-only" htmlFor="category-filter">Filter by category</label>
        <select id="category-filter" value={category} onChange={(event) => onCategoryChange(event.target.value)} className={selectClass}>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
      </div>
      <div className="relative">
        <label className="sr-only" htmlFor="sort-order">Sort products</label>
        <select id="sort-order" value={sort} onChange={(event) => onSortChange(event.target.value as SortOption)} className={selectClass}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
      </div>
    </div>
  );
}
