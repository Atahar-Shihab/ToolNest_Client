import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner label="Discovering AI Tools on ToolNest..." size="lg" />
    </div>
  );
}
