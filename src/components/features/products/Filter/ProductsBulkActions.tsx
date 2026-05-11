"use client";

import { Button } from "@heroui/react";
import BulkUpdateProductsModal from "@/components/features/products/Filter/BulkUpdateProductsModal/BulkUpdateProductsModal";
import {
  useBulkUpdateProducts,
  useDeleteGroupProduct,
} from "@/core/hooks/api/products/useProduct";

type ProductsBulkActionsProps = {
  selectedItems: number[];
  onClearSelection: () => void;
};

const ProductsBulkActions = ({
  selectedItems,
  onClearSelection,
}: ProductsBulkActionsProps) => {
  const deleteGroupProduct = useDeleteGroupProduct();
  const bulkUpdateProducts = useBulkUpdateProducts();

  const handleDelete = () => {
    deleteGroupProduct.mutate(
      { ids: selectedItems },
      { onSuccess: () => onClearSelection() },
    );
  };

  const handleBulkUpdate = (changed: any) => {
    bulkUpdateProducts.mutate(
      { ids: selectedItems, ...changed },
      { onSuccess: () => onClearSelection() },
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        color="default"
        variant="flat"
        onPress={onClearSelection}
        size="sm"
      >
        لغو انتخاب
      </Button>
      <BulkUpdateProductsModal
        selectedCount={selectedItems.length}
        onConfirm={handleBulkUpdate}
      />
      {/*         <BaseModal
          title="حذف محصولات انتخاب‌شده"
          confirmText="بله، حذف شود"
          cancelText="لغو"
          triggerProps={{
            title: "حذف گروهی",
            variant: "flat",
            className: "text-red-600 bg-red-100",
          }}
          onConfirm={handleDelete}
        >
          با حذف محصولات انتخاب‌شده، بازگردانی آن‌ها ممکن نیست. آیا مطمئن هستید؟
        </BaseModal> */}
    </div>
  );
};

export default ProductsBulkActions;
