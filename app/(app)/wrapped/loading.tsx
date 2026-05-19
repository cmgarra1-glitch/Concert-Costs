export default function WrappedLoading() {
  return (
    <section className="page-section">
      <div className="skeleton h-8 w-48 mb-2" />
      <div className="skeleton h-4 w-80 mb-8" />
      <div className="skeleton h-[480px] w-full rounded-3xl" />
    </section>
  );
}
