import { AnnualWrappedReport } from "@/components/AnnualWrappedReport";
import { PageHeader } from "@/components/PageHeader";
import { getUserConcerts } from "@/lib/concerts";
import { getAnnualWrapped, getAvailableYears } from "@/lib/wrapped";

type WrappedPageProps = {
  searchParams: Promise<{ year?: string }>;
};

export default async function WrappedPage({ searchParams }: WrappedPageProps) {
  const concerts = await getUserConcerts();
  const { year: yearParam } = await searchParams;
  const years = getAvailableYears(concerts);
  const currentYear = new Date().getFullYear();
  const parsed = yearParam ? Number(yearParam) : currentYear;
  const selectedYear =
    Number.isFinite(parsed) && years.includes(parsed) ? parsed : years[0];

  const wrapped = getAnnualWrapped(concerts, selectedYear);

  return (
    <div className="page-section">
      <PageHeader
        title="Annual Wrapped"
        subtitle="Your shareable concert yearbook — spending, artists, miles, and favorite show."
      />
      <AnnualWrappedReport
        wrapped={wrapped}
        years={years}
        selectedYear={selectedYear}
      />
    </div>
  );
}
