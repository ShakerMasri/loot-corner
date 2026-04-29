export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="aspect-square animate-pulse rounded-md bg-gray-200" />

      <div className="mt-4 space-y-2">
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
