"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const CustomersFilterModal: React.FC = () => {
  const fields: FilterField[] = useMemo<FilterField[]>(
    () => [
      {
        key: "isActive",
        label: "وضعیت فعال",
        type: "boolean01",
        default: "",
      },
      {
        key: "createdAt",
        label: "تاریخ عضویت",
        type: "dateRange",
      },
    ],
    []
  );

  return <FilterModal title="فیلتر کاربران" fields={fields} />;
};

export default CustomersFilterModal;
