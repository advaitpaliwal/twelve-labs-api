import { Skeleton } from "@/components/ui/skeleton";

export function TextSkeleton() {
  return (
    <div className=" w-3/4 mx-auto space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
