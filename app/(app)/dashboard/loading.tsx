export default function DashboardLoading() {
  return (
    <div className="page-section">
      <div className="skeleton h-8 w-40 mb-2" />
      <div className="skeleton h-4 w-64 mb-8" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-28 w-full rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <div className="skeleton h-72 w-full rounded-2xl" />
        <div className="skeleton h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}
