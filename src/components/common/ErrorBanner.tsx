import { AlertTriangle, RotateCw } from 'lucide-react';

interface ErrorBannerProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorBanner({ title, message, onRetry }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" aria-hidden="true" />
        <div>
          <p className="font-semibold text-rose-900">{title}</p>
          <p className="text-sm text-rose-800">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  );
}
