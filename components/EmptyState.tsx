"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Music2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type EmptyStateProps = {
  title?: string;
  message: string;
  showAddLink?: boolean;
};

export function EmptyState({
  title = "No concerts yet",
  message,
  showAddLink = true,
}: EmptyStateProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="app-card border border-dashed border-base-300 bg-base-200/50">
      <div className="card-body items-center py-12 text-center">
        <motion.div
          animate={reduced ? {} : { y: [0, -6, 0] }}
          transition={
            reduced
              ? {}
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <Music2 className="h-10 w-10 text-primary opacity-80" aria-hidden />
        </motion.div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 max-w-md text-base-content/80">{message}</p>
        {showAddLink && (
          <Link href="/add-concert" className="btn btn-primary btn-sm mt-4">
            Add your first concert
          </Link>
        )}
      </div>
    </div>
  );
}
