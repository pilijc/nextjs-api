import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-2">
      <Skeleton className="aspect-[2/3] w-full rounded-md" />
      <div className="p-1">
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="mb-2 h-3 w-1/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
