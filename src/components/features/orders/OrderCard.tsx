"use client";

import { useState } from "react";
import BaseCard from "@/components/ui/BaseCard";
import { Chip, AvatarGroup, Avatar } from "@heroui/react";
import { useUpdateOrderStatus } from "@/core/hooks/api/orders/useOrder";
import { StatusOrder } from "./order-types";
import { statusMap } from "@/components/features/orders/OrderProccess/const/status-map";
import CardRows from "@/components/shared/CardRows";
import type { PopoverSelectItem } from "@/components/ui/PopoverSelect";
import PopoverSelect from "@/components/ui/PopoverSelect";
import { formatDate } from "@/core/utils/date";
import { orderStatusOptions } from "./OrderProccess/const/order-constants";

type Props = {
  order: any;
  disableAction?: boolean;
};

const OrderCard: React.FC<Props> = ({ order, disableAction = false }) => {
  const updateOrderStatus = useUpdateOrderStatus();
  const initialKey = (order?.status ?? "pending").toLowerCase() as StatusOrder;
  const initialStatus =
    orderStatusOptions.find((s) => s.key === initialKey) ??
    orderStatusOptions[0];
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const rowItems = [
    {
      label: "مبلغ کل",
      value: `${Number(order?.total ?? 0).toLocaleString("fa-IR")} تومان`,
    },
    {
      label: "کاربر",
      value: `${order.user.first_name ?? "نام"} ${
        order.user.last_name ?? "و نام خوانوادگی"
      }`.trim(),
    },
    {
      label: "شماره تماس",
      value: order.user.phone,
    },
    {
      label: "آدرس",
      value: `${order?.address?.province} - ${order?.address?.city}`,
    },
  ];

  const status = order.status as StatusOrder;
  const statusInfo = statusMap[status];
  const isAccept =
    order.status === "payment_confirmation_pending" ||
    order.status === "pending_approval";

  const isNotDelivered = order.status === "not_delivered";

  return (
    <BaseCard
      bodyClassName="flex flex-col gap-3 p-4 min-w-[320px] sm:w-[386px] md:w-full"
      redirect={`/admin/orders/order?id=${order.id}`}
      className={
        isAccept
          ? "shadow shadow-yellow-300"
          : isNotDelivered
            ? "shadow shadow-red-300"
            : ""
      }
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`text-2xl rounded-b-3xl rounded-tl-3xl rounded-tr-md border p-4 ${statusInfo?.color} ${statusInfo.bgColor} ${statusInfo.borderColor}`}
          >
            <span className="text-2xl">{statusInfo.icon}</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[17px] text-primary">#{order?.id}</p>
            <span className="text-xs text-gray-500">
              {formatDate(order.created_at)}
            </span>
          </div>
        </div>

        {/*         <p className="text-slate-600 flex items-center gap-2">
          <span>اقلام:</span>
          <span>
            {order.items.length === 1 ? "1 عدد" : `${order.items.length} تا`}
          </span>
        </p> */}
      </div>

      <CardRows items={rowItems} disableCol />

      <div className="flex flex-row-reverse items-center justify-between w-full py-4 px-2">
        {!disableAction ? (
          <PopoverSelect
            items={orderStatusOptions as PopoverSelectItem[]}
            initialKey={selectedStatus.key}
            isLoading={updateOrderStatus.isPending}
            onSelect={(key) => {
              const next = orderStatusOptions.find((s) => s.key === key);
              if (!next) return;

              setSelectedStatus(next);
              updateOrderStatus.mutate(
                { id: order.id, status: next.key },
                {
                  onError: () => setSelectedStatus(selectedStatus),
                },
              );
            }}
            buttonClassName="capitalize w-full xs:w-fit text-sm"
            popoverClassName="w-[240px]"
          />
        ) : (
          <Chip size="sm" variant="flat">
            {statusInfo.title}
          </Chip>
        )}
        <AvatarGroup
          isBordered
          max={3}
          total={order?.items?.length - 1}
          size="sm"
        >
          {order.items.map((item: any) => (
            <Avatar src={item.product.image} />
          ))}
        </AvatarGroup>
      </div>
    </BaseCard>
  );
};

export default OrderCard;
