"use client";

import React, { useEffect } from "react";
import { Category } from "../category.types";
import CategoriesSelectionModal from "./CategoriesSelectionModal";
import { CategoryNode } from "../CategoryTree/CategoryTree";
import { useCategoriesSelection } from "./CategoriesSelectionContext";
import { TbCategory2 } from "react-icons/tb";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";

type Props = {
  onChange?: (ids: number[]) => void;
  error?: boolean;
};

const InnerSelectableCategoriesBox: React.FC<Props> = ({ onChange, error }) => {
  const { selectedCategories, removeCategory } = useCategoriesSelection();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange?.(selectedCategories.map((c) => c.id));
  }, [selectedCategories]);

  return (
    <EmptyStateContainer
      title="دسته‌بندی‌های انتخاب‌شده"
      icon={TbCategory2}
      initial={selectedCategories}
      modal={<CategoriesSelectionModal />}
      error={error}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedCategories.map((cat: Category) => (
          <CategoryNode
            key={cat.id}
            node={cat}
            chainTitles={[]}
            onDelete={removeCategory}
            disableAction
            showDeselectIcon
            disableShowChildren
          />
        ))}
      </div>
    </EmptyStateContainer>
  );
};

const SelectableCategoriesBox: React.FC<Props> = ({ onChange, error }) => {
  return <InnerSelectableCategoriesBox onChange={onChange} error={error} />;
};

export default SelectableCategoriesBox;
