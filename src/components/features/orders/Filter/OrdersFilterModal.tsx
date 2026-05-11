"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";
import { orderStatusOptions } from "../OrderProccess/const/order-constants";

const OrdersFilterModal: React.FC = () => {
  const fields: FilterField[] = useMemo(
    () => [
      {
        key: "status",
        label: "وضعیت سفارش",
        type: "select",
        options: orderStatusOptions,
      },
      { key: "createdAt", label: "تاریخ ثبت سفارش", type: "dateRange" },
    ],
    []
  );

  return <FilterModal title="فیلتر سفارشات" fields={fields} />;
};

export default OrdersFilterModal;
