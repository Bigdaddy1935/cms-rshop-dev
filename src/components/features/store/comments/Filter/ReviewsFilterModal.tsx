"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";
import { useGetAllUsers } from "@/core/hooks/api/users/useUsers";
import { useGetProducts } from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";

const ReviewsFilterModal: React.FC = () => {
  const { search: SearchInProducts } = useListQueryParams({
    searchKey: "search-product",
  });
  const { search: SearchInUsers } = useListQueryParams({
    searchKey: "search-user",
  });

  const { data: usersData } = useGetAllUsers({
    page: 1,
    search: SearchInUsers,
  });
  const { data: productsData } = useGetProducts({
    page: 1,
    search: SearchInProducts,
  });

  const users = useMemo(
    () =>
      usersData?.data?.items?.map((b: any) => ({
        key: String(b.id),
        title: `${b.first_name} ${b.last_name}` || "بدون نام",
      })) || [],
    [usersData?.data?.items]
  );

  const products = useMemo(
    () =>
      productsData?.data?.items?.map((b: any) => ({
        key: String(b.id),
        title: b.name,
      })) || [],
    [productsData?.data?.items]
  );

  const fields: FilterField[] = [
    {
      key: "isApproved",
      label: "تایید کامنت",
      type: "boolean01",
      default: "",
    },
    {
      key: "userId",
      label: "کاربران",
      type: "select",
      options: users,
      searchable: true,
      syncSearchToUrl: true,
      searchKey: "search-user",
    },
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

  return <FilterModal title="فیلتر دیدگاه ها" fields={fields} />;
};

export default ReviewsFilterModal;
