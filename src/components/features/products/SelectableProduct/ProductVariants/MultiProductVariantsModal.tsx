"use client";

import {
  ProductSortBy,
  useGetProducts,
} from "@/core/hooks/api/products/useProduct";
import { BsShop } from "react-icons/bs";
import ProductsFilter from "@/components/features/products/Filter/ProductsFilter";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { LuPlus } from "react-icons/lu";
import MultiProductVariantsSelector from "./MultiProductVariantsSelector";
import BaseModal from "@/components/ui/modals/BaseModal";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";

const MultiProductVariantsModal = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!products?.data?.items?.length;

  return (
    <BaseModal
      title="انتخاب محصولات"
      icon={<BsShop />}
      size="xl"
      confirmActionClose
    >
      <UnifiedCard
        searchFilter={
          <SearchFilterCard
            searchPlaceholder="جستجو در محصولات..."
            showSearchBar
            disableWrapperStyle
          />
        }
        headerProps={{
          title: "لیست محصولات",
          redirect: "/admin/products/create?type=infos",
          btnIcon: <LuPlus />,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={products?.data?.meta}
        disableWrapperStyle
      >
        {products?.data?.items?.map((product: any) => (
          <MultiProductVariantsSelector key={product.id} product={product} />
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default MultiProductVariantsModal;
