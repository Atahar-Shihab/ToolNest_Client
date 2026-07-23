import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
  maxStars?: number;
}

export function StarRating({ rating, className, maxStars = 5 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(maxStars)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="h-4 w-4 fill-warning text-warning" />;
        }
        if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} className="h-4 w-4 fill-warning text-warning" />;
        }
        return <Star key={i} className="h-4 w-4 text-muted" />;
      })}
    </div>
  );
}