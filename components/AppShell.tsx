"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListMusic, PlusCircle } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeSelector } from "@/components/ThemeSelector";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/add-concert", label: "Add", icon: PlusCircle },
  { href: "/concerts", label: "Concerts", icon: ListMusic },
];

type AppShellProps = {
  userEmail: string;
  children: React.ReactNode;
};

export function AppShell({ userEmail, children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-base-200">
      <header className="border-b border-base-300 bg-base-100 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary lg:text-3xl">
                Concert Cost Tracker
              </h1>
              <p className="mt-1 hidden text-sm text-base-content/70 sm:block">
                Track what you spend, how long you stayed, and how much fun you
                had at every show.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ThemeSelector />
              <div className="truncate text-sm text-base-content/70 max-w-[12rem] sm:max-w-none">
                Signed in as{" "}
                <span className="font-medium text-base-content">{userEmail}</span>
              </div>
              <LogoutButton />
            </div>
          </div>
          <nav className="tabs tabs-boxed mt-4 hidden h-auto w-full flex-wrap gap-1 sm:flex">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`tab gap-2 ${pathname === href ? "tab-active" : ""}`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label === "Add" ? "Add Concert" : label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="page-container pb-24 sm:pb-6">{children}</main>

      <div className="dock dock-md fixed bottom-0 left-0 right-0 z-50 border-t border-base-300 bg-base-100 sm:hidden">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? "dock-active" : ""}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span className="dock-label text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
