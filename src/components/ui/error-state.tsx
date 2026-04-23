import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "An error occurred while loading the data. Please try again later." 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
      <AlertCircle className="mb-4 size-10 text-destructive" />
      <h3 className="text-lg font-semibold text-destructive">{title}</h3>
      <p className="mt-2 text-sm text-destructive/80 max-w-md">{message}</p>
    </div>
  );
}
