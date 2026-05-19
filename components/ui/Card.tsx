import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  bodyClassName?: string;
};

export function Card({
  children,
  className,
  hoverable = false,
  bodyClassName,
}: CardProps) {
  return (
    <div
      className={cn("app-card", hoverable && "app-card-hover", className)}
    >
      <div className={cn("card-body", bodyClassName)}>{children}</div>
    </div>
  );
}
