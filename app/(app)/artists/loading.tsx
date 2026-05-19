export default function ArtistsLoading() {
  return (
    <div className="page-section">
      <div className="skeleton h-8 w-56 mb-2" />
      <div className="skeleton h-4 w-80 mb-8" />
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-48 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
