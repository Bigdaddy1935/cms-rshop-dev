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
import MultiProductsSelector from "./MultiProductsSelector";
import BaseModal from "@/components/ui/modals/BaseModal";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";

const MultiProductsModal = () => {
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
      size="2xl"
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
          title: "مدیریت محصولات",
          icon: <BsShop className="text-2xl" />,
          redirect: "/admin/products/create?type=infos",
          btnIcon: <LuPlus />,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={products?.data?.meta}
        childrenClassName="!gap-0"
      >
        {products?.data?.items?.map((product: any) => (
          <MultiProductsSelector key={product.id} product={product} />
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default MultiProductsModal;
