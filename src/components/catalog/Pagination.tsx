import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const pageButtonBase =
  'flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40';

export default function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${pageButtonBase} gap-1 bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50`}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </button>
      {pages.map((pageNumber) => {
        const isCurrent = pageNumber === page;
        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-current={isCurrent ? 'page' : undefined}
            aria-label={`Page ${pageNumber}`}
            className={`${pageButtonBase} ${
              isCurrent
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className={`${pageButtonBase} gap-1 bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50`}
      >
        Next
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
