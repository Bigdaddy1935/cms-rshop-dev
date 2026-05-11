"use client";

import React, { useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import BulkVisibilityModal from "./BulkVisibilityModal";
import BulkDiscountModal from "./BulkDiscountModal";
import BulkPriceModal from "./BulkPriceModal";
import BulkCategoryModal from "./BulkCategoryModal";
import { LuPackage } from "react-icons/lu";

type Props = {
  selectedCount?: number;
  onConfirm: (data: {
    isVisible?: boolean;
    isFeatured?: boolean;
    discountPercent?: number;
    discountAmount?: number;
    priceMode?: "set" | "increase" | "decrease";
    priceValue?: number;
    category_id?: number;
  }) => void;
};

const BulkUpdateProductsModal: React.FC<Props> = ({
  selectedCount = 0,
  onConfirm,
}) => {
  const headerNote = useMemo(() => {
    if (selectedCount <= 0) return "محصولی انتخاب نشده است";
    return `${selectedCount} محصول انتخاب شده`;
  }, [selectedCount]);

  return (
    <BaseModal
      title={<small className="text-default-500">{headerNote}</small>}
      isActiveFooter={false}
      triggerProps={{
        title: "بروزرسانی گروهی",
        className: "bg-primary-light text-primary"
      }}
      icon={<LuPackage size={22} />}
    >
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-4">
          <BulkVisibilityModal
            selectedCount={selectedCount}
            onConfirm={onConfirm}
          />

          <BulkDiscountModal
            selectedCount={selectedCount}
            onConfirm={onConfirm}
          />
        </div>

        <div className="flex items-center gap-4">
          <BulkPriceModal selectedCount={selectedCount} onConfirm={onConfirm} />

          <BulkCategoryModal
            selectedCount={selectedCount}
            onConfirm={onConfirm}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default BulkUpdateProductsModal;
