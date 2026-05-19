import { AppShell } from "@/components/AppShell";
import { PageTransition } from "@/components/PageTransition";
import { getCurrentUserEmail } from "@/lib/concerts";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userEmail = await getCurrentUserEmail();
  return (
    <AppShell userEmail={userEmail}>
      <PageTransition>{children}</PageTransition>
    </AppShell>
  );
}
