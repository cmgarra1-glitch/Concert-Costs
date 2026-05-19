type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-6 lg:mb-8">
      <h2 className="text-2xl font-bold lg:text-3xl">{title}</h2>
      <p className="mt-1 text-sm text-base-content/70 lg:text-base">
        {subtitle}
      </p>
    </header>
  );
}
