"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import PriceNumberInput from "@/components/ui/inputs/NumberInput";
import BulkModalHeader from "./BulkModalHeader";
import { BiMoneyWithdraw } from "react-icons/bi";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";

type PriceMode = "set" | "increase" | "decrease";

type Props = {
  triggerProps?: React.ComponentProps<typeof Button>;
  selectedCount?: number;
  onConfirm: (data: { priceMode?: PriceMode; priceValue?: number }) => void;
};

const BulkPriceModal: React.FC<Props> = ({ selectedCount = 0, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceMode, setPriceMode] = useState<PriceMode | null>(null);
  const [priceValue, setPriceValue] = useState<number | null>(null);

  const reset = () => {
    setPriceMode(null);
    setPriceValue(null);
  };

  const handleConfirm = () => {
    const payload: { priceMode?: PriceMode; priceValue?: number } = {};
    if (priceMode && priceValue !== null && !Number.isNaN(priceValue)) {
      payload.priceMode = priceMode;
      payload.priceValue = Number(priceValue);
    }
    onConfirm(payload);
    reset();
  };

  const priceModeOptions: SelectOption[] = [
    { key: "set", title: "ثبت قیمت جدید" },
    { key: "increase", title: "افزایش قیمت" },
    { key: "decrease", title: "کاهش قیمت" },
  ];

  return (
    <BaseModal
      triggerProps={{
        icon: <BiMoneyWithdraw size={20} />,
        title: "قیمت گروهی",
        className: "w-full",
        size: "md",
      }}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      icon={<BiMoneyWithdraw size={22} className="text-green-500" />}
      title={
        <BulkModalHeader
          title="ویرایش گروهی قیمت"
          selectedCount={selectedCount}
        />
      }
      confirmText="اعمال تغییرات"
      onConfirm={handleConfirm}
      onCancel={reset}
    >
      <div className="flex flex-col items-center gap-6">
        <SelectBox
          label="حالت تغییر قیمت"
          value={priceMode ?? ""}
          onChange={(val) => setPriceMode(val as PriceMode)}
          options={priceModeOptions}
          placeholder="انتخاب حالت"
        />

        <PriceNumberInput
          value={priceValue ?? undefined}
          onChange={(val) =>
            setPriceValue(typeof val === "number" ? val : null)
          }
          label="مقدار قیمت"
          placeholder="10,000"
          suffix="تومان"
          isRequired={false}
          //isActiveError={false}
        />
      </div>
    </BaseModal>
  );
};

export default BulkPriceModal;
