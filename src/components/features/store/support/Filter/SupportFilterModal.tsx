"use client";

import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { useGetProducts } from "@/core/hooks/api/products/useProduct";
import { useMemo } from "react";

const SupportFilterModal: React.FC = () => {
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
    [productsData?.data?.items]
  );

  const fields: FilterField[] = [
    { key: "createdAt", label: "تاریخ ثبت", type: "dateRange" },
    {
      key: "productId",
      label: "محصولات",
      type: "select",
      options: products,
      searchable: true,
      syncSearchToUrl: true,
      searchKey: "search-product",
    },
  ];

  return <FilterModal title="فیلتر گفت و گو ها" fields={fields} />;
};

export default SupportFilterModal;
