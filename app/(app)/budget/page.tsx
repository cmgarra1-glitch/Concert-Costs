import { BudgetCalculator } from "@/components/BudgetCalculator";
import { PageHeader } from "@/components/PageHeader";

export default function BudgetPage() {
  return (
    <div className="page-section">
      <PageHeader
        title="Budget calculator"
        subtitle="Plan your next show—estimate tickets, fees, and extras before you buy."
      />
      <BudgetCalculator />
    </div>
  );
}
