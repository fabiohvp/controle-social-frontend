import ChartSkeleton from "@/components/charts/ChartSkeleton";

export default function SectionLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-2 w-full animate-pulse">
      {/* Header bar skeleton */}
      <div className="h-10 bg-gray-100 rounded w-full flex items-center justify-between px-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-white border border-gray-100 rounded shadow-sm flex flex-col gap-2">
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-7 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-gray-100 rounded shadow-sm flex flex-col gap-3">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <ChartSkeleton height="260px" />
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded shadow-sm flex flex-col gap-3">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <ChartSkeleton height="260px" />
        </div>
      </div>
    </div>
  );
}
