export default function ConcertsLoading() {
  return (
    <div className="page-section">
      <div className="skeleton h-8 w-40 mb-2" />
      <div className="skeleton h-4 w-56 mb-8" />
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-52 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
