"use client";

import React from "react";
import InfoCard from "./InfoCard";
import {
  FiCalendar,
  FiHash,
  FiSmartphone,
  FiDollarSign,
  FiCreditCard,
  FiPackage,
} from "react-icons/fi";
import { toPersianUTC } from "@/core/utils/date";
import { getPaymentStatusText } from "../OrderProccess/const/payment-constants-fa";
import { statusMap } from "@/components/features/orders/OrderProccess/const/status-map";
import { StatusOrder } from "../order-types";

type OrderHeaderProps = {
  order: any;
};

const OrderHeaderCards: React.FC<OrderHeaderProps> = ({ order }) => {
  const status = order.status as StatusOrder;
  const statusInfo = statusMap[status];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
      <InfoCard
        icon={FiCalendar}
        title="تاریخ ثبت"
        value={toPersianUTC(order.created_at)}
        iconClassName="text-green-500"
      />

      <InfoCard
        icon={FiHash}
        title="شناسه سفارش"
        value={`#${order.id}`}
        iconClassName="text-purple-500"
      />

      <InfoCard
        icon={FiSmartphone}
        title="شماره تماس"
        value={order.user.phone}
        iconClassName="text-blue-500"
      />

      <InfoCard
        icon={FiDollarSign}
        title="مبلغ نهایی"
        value={order.total}
        iconClassName="text-amber-500"
      />

      <InfoCard
        icon={FiCreditCard}
        title="وضعیت پرداخت"
        value={getPaymentStatusText(order.payment?.status)}
        iconClassName={
          order.payment?.status === "success"
            ? "text-emerald-500"
            : "text-red-500"
        }
      />

      <InfoCard
        icon={FiPackage}
        title="وضعیت سفارش"
        value={statusInfo.title}
        iconClassName={`${statusInfo.color.replace("text-", "")}`}
      />
    </div>
  );
};

export default OrderHeaderCards;
