"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const PromotionsFilterModal: React.FC = () => {
  const fields: FilterField[] = useMemo<FilterField[]>(
    () => [
      {
        key: "is_active",
        label: "وضعیت فعال بودن",
        type: "boolean01",
        default: "",
      },
      { key: "starts_at", label: "شروع بازه اعتبار", type: "singleDate" },
      { key: "ends_at", label: "پایان بازه اعتبار", type: "singleDate" },
    ],
    []
  );

  return <FilterModal title="فیلتر" fields={fields} />;
};

export default PromotionsFilterModal;
