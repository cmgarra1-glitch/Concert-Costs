import { ConcertForm } from "@/components/ConcertForm";
import { PageHeader } from "@/components/PageHeader";

export default function AddConcertPage() {
  return (
    <>
      <PageHeader
        title="Add Concert"
        subtitle="Log a show you attended. We will add up your costs and help you compare value across concerts."
      />
      <ConcertForm />
    </>
  );
}
