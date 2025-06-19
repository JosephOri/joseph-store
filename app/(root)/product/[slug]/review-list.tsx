"use client";

import { Review } from "@/types";
import Link from "next/link";
import { useState } from "react";
import ReviewForm from "./review-form";

interface Props {
  userId: string;
  productId: string;
  productSlug: string;
}

const ReviewList = ({ userId, productId, productSlug }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const reload = () => {
    console.log("reload");
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <p>No reviews yet</p>}

      {userId ? (
        <ReviewForm
          productId={productId}
          userId={userId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div>
          Please{" "}
          <Link
            className="px-2 text-blue-500"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            login
          </Link>{" "}
          to write a review
        </div>
      )}
    </div>
  );
};

export default ReviewList;
