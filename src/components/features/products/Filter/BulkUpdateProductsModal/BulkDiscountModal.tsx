"use client";

import { useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import NumberWithSelect from "@/components/forms/Inputs/NumberWithSelect";
import BulkModalHeader from "./BulkModalHeader";
import { TbShoppingCartDiscount } from "react-icons/tb";

type DiscountType = "percent" | "amount";

type Props = {
  selectedCount?: number;
  onConfirm: (data: {
    discountPercent?: number;
    discountAmount?: number;
  }) => void;
};

const BulkDiscountModal: React.FC<Props> = ({
  selectedCount = 0,
  onConfirm,
}) => {
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [discountValue, setDiscountValue] = useState<number | null>(null);

  const reset = () => {
    setDiscountType("percent");
    setDiscountValue(null);
  };

  const handleConfirm = () => {
    const payload: { discountPercent?: number; discountAmount?: number } = {};
    if (discountValue !== null && !Number.isNaN(discountValue)) {
      if (discountType === "percent")
        payload.discountPercent = Number(discountValue);
      if (discountType === "amount")
        payload.discountAmount = Number(discountValue);
    }
    onConfirm(payload);
    reset();
  };

  return (
    <BaseModal
      icon={<TbShoppingCartDiscount size={22} className="text-yellow-500" />}
      title={
        <BulkModalHeader
          title="ویرایش گروهی تخفیف"
          selectedCount={selectedCount}
        />
      }
      confirmText="اعمال تخفیف"
      onConfirm={handleConfirm}
      onCancel={reset}
      triggerProps={{
        title: "تخفیف گروهی",
        icon: <TbShoppingCartDiscount size={20} />,
        className: "w-full",
        size: "md",
      }}
    >
      <NumberWithSelect
        label="مقدار تخفیف"
        placeholder={discountType === "percent" ? "10" : "10000"}
        value={discountValue ?? undefined}
        onValueChange={(val) =>
          setDiscountValue(typeof val === "number" ? val : null)
        }
        selectedKey={discountType}
        onSelectChange={(val) => setDiscountType(val as DiscountType)}
        options={[
          { key: "percent", title: "درصد" },
          { key: "amount", title: "مبلغ ثابت" },
        ]}
      />
    </BaseModal>
  );
};

export default BulkDiscountModal;
