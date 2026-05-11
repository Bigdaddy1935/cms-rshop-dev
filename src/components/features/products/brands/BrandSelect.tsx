"use client";

import React, { useMemo } from "react";
import { useGetAllBrands } from "@/core/hooks/api/useBrand";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import AddNewBrandModal from "./AddNewBrandModal";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  errorMessage?: string;
  withAddModal?: boolean;
  isRequired?: boolean;
};

const BrandSelect: React.FC<Props> = ({
  value,
  onChange,
  errorMessage,
  withAddModal = false,
  isRequired = false,
}) => {
/*   const { search } = useListQueryParams({
    searchKey: "brand",
  }); */

  const { data: brands } = useGetAllBrands()
  
  const options = useMemo(() => {
    return (
      brands?.data?.map((brand: any) => ({
        id: String(brand.id),
        title: brand.name,
      })) ?? []
    );
  }, [brands?.data]);

  return (
    <div
      className={`w-full flex ${
        errorMessage?.length ? "items-center" : "items-end"
      } gap-2`}
    >
      <AutocompleteInput
        label="برند"
        placeholder="انتخاب کنید"
        options={
          options.length ? options : [{ id: 0, title: "آیتمی موجود نیست" }]
        }
        selectedId={value ? String(value) : ""}
        onChange={(val) => onChange(val ?? null)}
        isRequired={isRequired}
        searchKey="brand"
        syncSearchToUrl
        errorMessage={errorMessage}
      />

      {withAddModal && <div className="mb-1"><AddNewBrandModal /></div>}
    </div>
  );
};

export default BrandSelect;
