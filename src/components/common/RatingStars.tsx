import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  showValue?: boolean;
}

export default function RatingStars({ rating, showValue = true }: RatingStarsProps) {
  const filledStars = Math.round(rating);

  return (
    <div className="flex items-center gap-2" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            aria-hidden="true"
            className={`h-4 w-4 ${index < filledStars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium text-slate-600">{rating.toFixed(1)}</span>}
    </div>
  );
}
