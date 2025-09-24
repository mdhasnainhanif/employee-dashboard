import { type PerformanceReview } from "../../types/index";

const ratingColor = (r: string) => r === "green" ? "text-green-600" : r === "yellow" ? "text-yellow-600" : "text-red-600";

export default function PerformanceReviewSection({ reviews } : { reviews: PerformanceReview[];}) {
  
  return (
    <div className="p-4 rounded max-w-xl shadow bg-white dark:bg-gray-800 mt-8 ms-0">
      <h3 className="font-semibold mb-2">Last Reviews</h3>
      <div className="space-y-2">
        {reviews.slice(0,3).map(r=>(
          <div key={r.id} className="flex justify-between">
            <div>
              <div className="font-medium">{r.period}</div>
              <div className="text-xs text-gray-500">{r.reviewer}</div>
            </div>
            <div className={`${ratingColor(r.rating)} font-semibold`}>{r.score.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
