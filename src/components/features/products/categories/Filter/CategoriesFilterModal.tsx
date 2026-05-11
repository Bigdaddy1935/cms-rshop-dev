"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const CategoriesFilterModal: React.FC = () => {
  const fields: FilterField[] = useMemo<FilterField[]>(
    () => [
      {
        key: "is_active",
        label: "وضعیت فعال بودن",
        type: "boolean01",
        default: "",
      },
      {
        key: "discount",
        label: "تخفیف",
        type: "boolean01",
        default: "",
      },
    ],
    []
  );

  return <FilterModal title="فیلتر" fields={fields} />;
};

export default CategoriesFilterModal;
