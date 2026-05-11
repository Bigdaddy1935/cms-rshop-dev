"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import React from "react";

type OrderProccessFilterProps = {
  customerId: number;
  customerName: string;
};

const OrderProccessFilter: React.FC<OrderProccessFilterProps> = ({
  customerId,
  customerName,
}) => {
  return (
    <SearchFilterCard
      relatedPages={[
        {
          title: "سفارش های کاربر",
          href: `/admin/orders?search=${customerName}`,
        },
        {
          title: "اطلاعات کاربر",
          href: `/admin/store/customers/create?edit_id=${customerId}`,
        },
      ]}
    />
  );
};

export default OrderProccessFilter;
