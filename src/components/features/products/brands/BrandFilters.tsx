"use client";

import SearchFilterCard from "../../../common/Card/SearchFilterCard";
import SortBrandsModal from "./SortingBrandsModal";

const BrandFilters = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در برندها..."
      showSearchBar
    >
      <SortBrandsModal />
    </SearchFilterCard>
  );
};

export default BrandFilters;
