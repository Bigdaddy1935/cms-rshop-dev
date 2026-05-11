"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useGetReviews } from "@/core/hooks/api/useReview";
import ReviewCard from "@/components/features/store/comments/ReviewCard";
import { LuMessagesSquare } from "react-icons/lu";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { ReviewSortBy } from "@/components/features/store/comments/review-types";
import ReviewsFilter from "@/components/features/store/comments/Filter/ReviewsFilter";

const AdminReviews = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ReviewSortBy[number]>();
  const { data: reviews, isLoading } = useGetReviews({
    page,
    sortBy,
    search,
    filter,
  });

  const isExistItems = !!reviews?.data?.items?.length;
  return (
    <UnifiedCard
      searchFilter={<ReviewsFilter />}
      headerProps={{
        title: "لیست نظرات کاربران",
        icon: <LuMessagesSquare />,
        tooltipTitle: "مدیریت نظرات کاربران",
        tooltipDescription:
          "در این بخش می‌توانید تمامی نظرات ثبت‌شده توسط کاربران را مشاهده و مدیریت کنید. تایید یا رد شدن آنها و بررسی امتیازهای ثبت‌شده توسط کاربران وجود دارد. این ابزار به شما کمک می‌کند بازخورد کاربران را بهتر درک کنید و کیفیت خدمات و محصولات را بهبود دهید.",
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={reviews?.data?.meta}
      childrenClassName="flex flex-col gap-4"
    >
      {reviews?.data?.items?.map((item: any) => (
        <ReviewCard key={item.id} item={item} />
      ))}
    </UnifiedCard>
  );
};

export default AdminReviews;
