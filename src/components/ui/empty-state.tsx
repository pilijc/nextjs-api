import { SearchX } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ 
  title = "No results found", 
  message = "We couldn't find what you were looking for.",
  icon = <SearchX className="mb-4 size-10 text-muted-foreground" />,
  action
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border bg-card p-8 text-center text-card-foreground shadow-sm">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 mb-6 text-sm text-muted-foreground max-w-md">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
