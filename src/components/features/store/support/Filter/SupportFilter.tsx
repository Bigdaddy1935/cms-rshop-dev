"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import SupportFilterModal from "./SupportFilterModal";
import SupportSortModal from "./SupportSortModal";

const SupportFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در لیست گفت و گوها ..."
      showSearchBar
    >
      <SupportFilterModal />
      <SupportSortModal />
    </SearchFilterCard>
  );
};

export default SupportFilter;
