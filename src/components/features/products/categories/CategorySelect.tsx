"use client";

import React, { useMemo } from "react";
import { useGetAllCategories } from "@/core/hooks/api/categories/useCategory";
import { flattenCategories } from "@/core/utils/flattenCategories";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import AddNewCategoryModal from "./AddNewCategoryModal";
import { IconsSelectionProvider } from "../../store/icons/SelectableIconBox/IconsSelectionContext";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  errorMessage?: string;
  withAddModal?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
};

const CategorySelect: React.FC<Props> = ({
  value,
  onChange,
  errorMessage,
  withAddModal = false,
  isRequired = false,
  isDisabled = false,
}) => {
  /*   const { search } = useListQueryParams({
    searchKey: "category",
  }); */

  const { data: categoriesData } = useGetAllCategories();

  const options = useMemo(() => {
    const flat = flattenCategories(categoriesData?.data) || [];

    return flat.map((cat: any) => ({
      id: String(cat.id),
      title: cat.title,
    }));
  }, [categoriesData]);

  return (
    <div
      className={`w-full flex ${
        errorMessage?.length ? "items-center" : "items-end"
      } gap-2 ${isDisabled ? "pointer-events-none opacity-75" : ""}`}
    >
      <AutocompleteInput
        label="دسته‌بندی"
        placeholder="انتخاب کنید"
        options={
          options.length ? options : [{ id: 0, title: "آیتمی موجود نیست" }]
        }
        selectedId={value ? String(value) : ""}
        onChange={(val) => onChange(val ?? null)}
        isRequired={isRequired}
        searchKey="category"
        syncSearchToUrl
        errorMessage={errorMessage ?? ""}
      />

      {withAddModal && (
        <div className="mb-1">
          <IconsSelectionProvider singleSelect>
            <AddNewCategoryModal />
          </IconsSelectionProvider>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
