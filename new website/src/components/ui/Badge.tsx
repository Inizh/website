import { cn } from "@/lib/utils";

interface BadgeProps {
  children: string;
  variant?: "default" | "outline" | "accent";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "outline" && "border text-foreground",
        variant === "accent" && "bg-accent text-accent-foreground",
      )}
    >
      {children}
    </span>
  );
}
