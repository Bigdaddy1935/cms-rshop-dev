"use client";

import SearchFilterCard from "../../../../common/Card/SearchFilterCard";
import SizeGuideFilterModal from "./SizeGuideFilterModal";

const SizeGuideFilters = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در راهنمای سایز..."
      showSearchBar
    >
      <SizeGuideFilterModal />
    </SearchFilterCard>
  );
};

export default SizeGuideFilters;
