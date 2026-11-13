const PLACEHOLDER_COUNT = 8;

export default function ProductGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="aspect-[4/3] bg-slate-200" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
            <div className="h-5 w-1/2 rounded bg-slate-200 pt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
