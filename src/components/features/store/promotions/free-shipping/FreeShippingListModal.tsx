"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import MenuCard from "@/components/shared/MenuCard";
import { FiUsers } from "react-icons/fi";
import { LiaTruckLoadingSolid } from "react-icons/lia";

export const FreeShippingListModal: React.FC = () => {
  const items = [
    {
      title: "ارسال رایگان عمومی",
      subtitle: "اعمال ارسال رایگان برای همه سفارش‌ها",
      icon: <LiaTruckLoadingSolid className="text-3xl" />,
      color: "text-blue-700 bg-blue-700/10",
      path: "/admin/store/promotions/free-shipping/create",
    },
    {
      title: "کاربران",
      subtitle: "اعمال ارسال رایگان فقط برای کاربران خاص",
      icon: <FiUsers className="text-3xl" />,
      color: "text-sky-700 bg-sky-700/10",
      path: "/admin/store/promotions/free-shipping/customers",
    },
  ];

  return (
    <BaseModal
      title="انواع ارسال رایگان"
      triggerProps={{
        title: "+ افزودن",
        className: "bg-secondary-light text-secondary",
      }}
      isActiveFooter={false}
      icon={<LiaTruckLoadingSolid className="text-3xl" />}
      size="sm"
    >
      <div className="grid grid-cols-1 gap-4 p-2">
        {items.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            color={item.color}
            path={item.path}
          />
        ))}
      </div>
    </BaseModal>
  );
};