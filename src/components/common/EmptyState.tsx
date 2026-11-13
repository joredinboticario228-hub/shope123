import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        <p className="max-w-md text-sm text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}
