import RatingStars from '@/components/common/RatingStars';
import { formatReviewDate } from '@/lib/format';
import type { Review } from '@/types/product';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-sm text-slate-500">No reviews yet. Be the first to share your experience.</p>;
  }

  return (
    <ul className="divide-y divide-slate-200">
      {reviews.map((review) => (
        <li key={`${review.reviewerEmail}-${review.date}`} className="py-5 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-slate-900">{review.reviewerName}</p>
            <time dateTime={review.date} className="text-xs text-slate-500">
              {formatReviewDate(review.date)}
            </time>
          </div>
          <div className="mt-2">
            <RatingStars rating={review.rating} showValue={false} />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
