"use client";

import RatingStars from "@/components/common/RatingStars";
import DeleteButton from "@/components/shared/DeleteButton";
import BaseCard from "@/components/ui/BaseCard";
import OptionButton from "@/components/ui/buttons/OptionButton";
import {
  UpdateReviewStatusPayload,
  useDeleteReview,
  useUpdateReviewStatus,
} from "@/core/hooks/api/useReview";
import { formatDate } from "@/core/utils/date";
import { Divider } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";

type ReviewCardProps = {
  item: {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    product: {
      id: number;
      name: string;
      image: string;
      price: number;
      discount_amount: number;
      discount_percent: number;
      final_price: number;
    };
    user: {
      id: number;
      name: string;
    };
    is_approved: boolean;
  };
};

const ReviewCard = ({ item }: ReviewCardProps) => {
  const { product } = item;
  const [isApproved, setIsApproved] = useState(item.is_approved);

  const { mutate: updateStatus, isPending } = useUpdateReviewStatus(item.id);
  const { mutate: deleteReview } = useDeleteReview();

  const handleToggleApprove = () => {
    const newStatus: UpdateReviewStatusPayload = { isApproved: !isApproved };
    updateStatus(newStatus, {
      onSuccess: () => setIsApproved(!isApproved),
    });
  };

  const formatPrice = (price: number) =>
    Math.round(price).toLocaleString("fa-IR");

  return (
    <BaseCard
      className="flex flex-col gap-3 p-1 w-full hover-reveal-parent"
      bodyClassName="overflow-hidden p-2.5 cursor-auto"
    >
      {/* دکمه حذف */}
      <div className="absolute left-2.5 top-2.5 flex items-center gap-2">
        <div
          className={`hover-reveal-child ${isApproved ? "!left-[92px]" : "!left-[83px]"} !top-0 border-l rounded-none pl-3`}
        >
          <DeleteButton onDelete={() => deleteReview(item.id)} />
        </div>
        <OptionButton
          title={isApproved ? "تایید شده" : "تایید نظر"}
          size="sm"
          isLoading={isPending}
          onClick={handleToggleApprove}
          className={isApproved ? "text-sky-600 bg-sky-50" : ""}
        />
      </div>

      {/* محصول */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl object-cover w-16 h-16 border p-1"
        />
        <div className="w-full h-full flex flex-col justify-between gap-3">
          <div className="text-[13px] text-gray-700 flex items-center gap-2">
            <Link
              href={`/admin/store/customers/create?edit_id=${item.user.id}`}
              className="flex items-center gap-1 text-xs text-gray-700 border-l-2 pl-2"
            >
              <HiOutlineUser size={18} />
              <span>{item.user.name}</span>
            </Link>
            <RatingStars rating={item.rating} singleStarHighlight size={14} />
          </div>
          <h3 className="line-clamp-1 truncate max-w-56">{product.name}</h3>
        </div>
      </div>
      <div className="text-sm text-gray-700 leading-relaxed">
        {item.comment}
      </div>
    </BaseCard>
  );
};

export default ReviewCard;
