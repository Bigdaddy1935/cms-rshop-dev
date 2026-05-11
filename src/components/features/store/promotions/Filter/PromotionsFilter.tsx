"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import PromotionsSortModal from "./PromotionsSortModal";
import PromotionsFilterModal from "./PromotionsFilterModal";

const PromotionsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو براساس عنوان و کد..."
      showSearchBar
    >
      <PromotionsFilterModal />
      <PromotionsSortModal />
    </SearchFilterCard>
  );
};

export default PromotionsFilter;
