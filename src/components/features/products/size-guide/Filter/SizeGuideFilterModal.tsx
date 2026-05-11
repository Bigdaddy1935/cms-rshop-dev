"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";
import { useGetProducts } from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";

const SizeGuideFilterModal: React.FC = () => {
  const { search: SearchInProducts } = useListQueryParams({
    searchKey: "search-product",
  });

  const { data: productsData } = useGetProducts({
    page: 1,
    search: SearchInProducts,
  });

  const products = useMemo(
    () =>
      productsData?.data?.items?.map((b: any) => ({
        key: String(b.id),
        title: b.name,
      })) || [],
    [productsData?.data?.items],
  );

  const fields: FilterField[] = [
    {
      key: "product_id",
      label: "محصولات",
      type: "select",
      options: products,
      searchable: true,
      syncSearchToUrl: true,
      searchKey: "search-product",
    },
  ];

  return <FilterModal title="فیلتر راهنمای سایز" fields={fields} />;
};

export default SizeGuideFilterModal;
