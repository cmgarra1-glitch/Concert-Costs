import { DashboardCharts } from "@/components/DashboardCharts";
import { DashboardStats } from "@/components/DashboardStats";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { getUserConcerts } from "@/lib/concerts";

export default async function DashboardPage() {
  const concerts = await getUserConcerts();

  return (
    <div className="page-section">
      <PageHeader
        title="Dashboard"
        subtitle="See how much you have spent and which concerts gave you the best bang for your buck."
      />

      {concerts.length === 0 ? (
        <EmptyState message="Add your first concert to start seeing your dashboard." />
      ) : (
        <>
          <DashboardStats concerts={concerts} />
          <DashboardCharts concerts={concerts} />
        </>
      )}
    </div>
  );
}
