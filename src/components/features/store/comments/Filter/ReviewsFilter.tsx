"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import ReviewsSortModal from "./ReviewsSortModal";
import ReviewsFilterModal from "./ReviewsFilterModal";

const ReviewsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در دیدگاه ها..."
      showSearchBar
    >
      <ReviewsFilterModal />
      <ReviewsSortModal />
    </SearchFilterCard>
  );
};

export default ReviewsFilter;
