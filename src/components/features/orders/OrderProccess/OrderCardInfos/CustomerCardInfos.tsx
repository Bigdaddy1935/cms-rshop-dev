"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import React from "react";
import { RiShareCircleLine } from "react-icons/ri";

type CustomerInfosCardProps = {
  order: any;
};

const CustomerCardInfos: React.FC<CustomerInfosCardProps> = ({ order }) => {
  const { user, address, customer_note } = order;

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات گیرنده",
        icon: <RiShareCircleLine className="text-gray-700" />,
        showIconInActionSlot: true,
      }}
      bodyClassName="space-y-1"
    >
      <InfoRow
        label="نام و نام خانوادگی"
        value={`${user.first_name ?? " — "} ${user.last_name ?? " — "}`}
        hoverable
      />
      <InfoRow label="شماره موبایل" value={user.phone} isActiveBg hoverable />
      <InfoRow label="ایمیل" value={user.email || "ثبت نشده"} hoverable />
      <InfoRow
        label="سفارش برای"
        value={
          address?.is_self
            ? "کاربر"
            : `${address?.recipient_name} (${
                address?.recipient_phone || "بدون شماره"
              })`
        }
        isActiveBg
        hoverable
      />
      <InfoRow label="کد پستی" value={address?.postal_code} hoverable />
      <InfoRow
        label="استان و شهر"
        value={`${address?.province}، ${address?.city}`}
        isActiveBg
        hoverable
      />
      <InfoRow
        label="آدرس"
        value={`${address?.address_line} ${
          address?.plaque && `، پلاک ${address?.plaque}`
        } ${address?.unit && `، واحد ${address?.unit}`}`}
        hoverable
        valueStyle="group-hover:relative group-hover:pb-3 group-hover:text-right"
      />
      <InfoRow
        label="توضیحات"
        value={customer_note ?? "توضیحی وجود ندارد"}
        hoverable
        valueStyle="group-hover:relative group-hover:pb-3 group-hover:text-right"
        isActiveBg
      />
    </BaseCard>
  );
};

export default CustomerCardInfos;
