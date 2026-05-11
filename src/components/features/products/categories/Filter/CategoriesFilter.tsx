"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import CategoriesFilterModal from "./CategoriesFilterModal";
import CategoriesSortModal from "./CategoriesSortModal";

const CategoriesFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو براساس عنوان و..."
      showSearchBar
    >
      <CategoriesFilterModal />
      <CategoriesSortModal />
    </SearchFilterCard>
  );
};

export default CategoriesFilter;
