"use client";

import React, { useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbCategory2 } from "react-icons/tb";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import AddNewCategoryModal from "../AddNewCategoryModal";
import { useGetCategories } from "@/core/hooks/api/categories/useCategory";
import { useCategoriesSelection } from "./CategoriesSelectionContext";
import { CategoryTree } from "../CategoryTree/CategoryTree";
import { findItemById } from "@/core/utils/findItemById";
import CategoriesFilter from "../Filter/CategoriesFilter";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";

const CategoriesSelectionModal: React.FC = () => {
  const { selectedCategories, setCategories } = useCategoriesSelection();

  const { data: categories, isLoading } = useGetCategories({});
  const isExistItems = !!categories?.data?.items?.length;

  const selectedIds = useMemo(
    () => selectedCategories.map((c) => c.id),
    [selectedCategories],
  );

  const handleTreeSelectionChange = (ids: number[]) => {
    const all = categories?.data?.items || [];
    const selected = ids.map((id) => findItemById(all, id)!).filter(Boolean);
    setCategories(selected);
  };

  return (
    <BaseModal
      title="انتخاب دسته‌بندی‌ها"
      icon={<TbCategory2 className="text-2xl" />}
      confirmActionClose
      size="3xl"
    >
      <UnifiedCard
        headerProps={{
          title: "لیست دسته‌بندی‌ها",
          children: <AddNewCategoryModal />,
        }}
        searchFilter={
          <SearchFilterCard
            searchPlaceholder="جستجو براساس عنوان و..."
            showSearchBar
            disableWrapperStyle
          />
        }
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={false}
        childrenClassName="space-y-4"
        disableWrapperStyle
      >
        {categories?.data?.items && (
          <CategoryTree
            categories={categories.data.items}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={handleTreeSelectionChange}
            disableAction
            className="flex flex-col gap-4"
          />
        )}
      </UnifiedCard>
    </BaseModal>
  );
};

export default CategoriesSelectionModal;
