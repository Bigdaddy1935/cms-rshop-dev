"use client";

import { useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { AiOutlineEye } from "react-icons/ai";
import BulkModalHeader from "./BulkModalHeader";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import { Switch } from "@heroui/react";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";

type Props = {
  selectedCount?: number;
  onConfirm: (data: { isVisible?: boolean; isFeatured?: boolean }) => void;
};

const BulkVisibilityModal: React.FC<Props> = ({
  selectedCount = 0,
  onConfirm,
}) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  const reset = () => {
    setIsVisible(null);
    setIsFeatured(false);
  };

  const handleConfirm = () => {
    const payload: { isVisible?: boolean; isFeatured?: boolean } = {};
    if (isVisible !== null) payload.isVisible = isVisible;
    if (isFeatured !== null) payload.isFeatured = isFeatured;
    onConfirm(payload);
    reset();
  };

  const visibilityOptions: SelectOption[] = [
    { key: "visible", title: "نمایش" },
    { key: "hidden", title: "عدم نمایش" },
  ];

  return (
    <BaseModal
      title={
        <BulkModalHeader
          title="ویرایش گروهی وضعیت نمایش"
          selectedCount={selectedCount}
        />
      }
      confirmText="اعمال تغییرات"
      onConfirm={handleConfirm}
      onCancel={reset}
      isConfirmDisabled={selectedCount <= 0}
      icon={<AiOutlineEye size={22} className="text-sky-500" />}
      triggerProps={{
        title: "وضعیت نمایش",
        icon: <AiOutlineEye size={20} />,
        className: "w-full",
        size: "md",
      }}
    >
      <div className="space-y-5">
        <SelectBox
          label="وضعیت نمایش"
          value={isVisible === null ? "" : isVisible ? "visible" : "hidden"}
          onChange={(val) => setIsVisible(val === "visible")}
          options={visibilityOptions}
          placeholder="انتخاب وضعیت"
        />

        <ToggleSection
          title="پیشنهاد ویژه"
          initialMode={isFeatured === true}
          onChange={(val) => setIsFeatured(val)}
        />
      </div>
    </BaseModal>
  );
};

export default BulkVisibilityModal;
