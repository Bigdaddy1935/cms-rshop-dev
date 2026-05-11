"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { statusMap } from "@/components/features/orders/OrderProccess/const/status-map";
import { toPersianUTC } from "@/core/utils/date";
import React from "react";
import { IoReceiptOutline } from "react-icons/io5";

type OrderCardInfosProps = {
  order: any;
};

const OrderCardInfos: React.FC<OrderCardInfosProps> = ({ order }) => {
  const { id, created_at, status, preparation_days, is_manual } = order;

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات کلی سفارش",
        icon: <IoReceiptOutline className="text-gray-700" />,
        showIconInActionSlot: true,
      }}
    >
      <InfoRow label="شناسه سفارش" value={`#${id}`} hoverable />
      <InfoRow label="تاریخ ثبت" value={toPersianUTC(created_at)} />
      <InfoRow label="نوع سفارش" value={is_manual ? "دستی" : "خودکار"} />
      <InfoRow label="وضعیت سفارش" value={(statusMap as any)[status].title} />
      <InfoRow label="آماده سازی" value={`${preparation_days} روز`} />
    </BaseCard>
  );
};

export default OrderCardInfos;
