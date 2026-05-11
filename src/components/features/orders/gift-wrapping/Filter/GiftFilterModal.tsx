"use client";

import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const GiftFilterModal: React.FC = () => {
  const fields: FilterField[] = [
    { key: "status", label: "وضعیت نمایش", type: "boolean01" },
    { key: "isForGift", label: "مخصوص هدیه", type: "boolean01" },
  ];

  return <FilterModal title="فیلتر بسته بندی ها" fields={fields} />;
};

export default GiftFilterModal;
