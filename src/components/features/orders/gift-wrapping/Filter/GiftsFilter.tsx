"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import GiftFilterModal from "./GiftFilterModal";
import GiftSortModal from "./GiftSortModal";

const GiftsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در بسته بندی ها..."
      showSearchBar
    >
      <GiftFilterModal />
      <GiftSortModal />
    </SearchFilterCard>
  );
};

export default GiftsFilter;
