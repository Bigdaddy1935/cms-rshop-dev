"use client";

import SearchFilterCard from "../../../common/Card/SearchFilterCard";
import ProductsFilterModal from "./ProductsFilterModal";
import ProductsSortModal from "./ProductsSortModal";

const ProductsFilter = () => {
  return (
    <SearchFilterCard
      searchPlaceholder="جستجو در محصولات..."
      relatedPages={[
        { title: "برند", href: "/admin/products/brands" },
        { title: "دسته‌بندی‌", href: "/admin/products/categories" },
        { title: "تنوع محصول", href: "/admin/products/variants" },
      ]}
      showSearchBar
    >
      <ProductsFilterModal />
      <ProductsSortModal />
    </SearchFilterCard>
  );
};

export default ProductsFilter;
