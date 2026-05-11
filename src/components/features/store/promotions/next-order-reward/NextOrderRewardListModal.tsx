"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbShoppingCartDiscount } from "react-icons/tb";
import MenuCard from "@/components/shared/MenuCard";
import { FiUsers } from "react-icons/fi";

export const NextOrderRewardListModal: React.FC = () => {
  const items = [
    {
      title: "خرید بعدی عمومی",
      subtitle: "اعمال پاداش خرید بعدی برای همه کاربران",
      icon: <TbShoppingCartDiscount className="text-3xl" />,
      color: "text-green-700 bg-green-700/10",
      path: "/admin/store/promotions/next-order-reward/create",
    },
    {
      title: "کاربران",
      subtitle: "اعمال فقط برای کاربران خاص",
      icon: <FiUsers className="text-3xl" />,
      color: "text-sky-700 bg-sky-700/10",
      path: "/admin/store/promotions/next-order-reward/customers",
    },
  ];

  return (
    <BaseModal
      title="انواع پاداش خرید بعدی"
      triggerProps={{
        title: "+ افزودن",
        className: "bg-secondary-light text-secondary",
      }}
      isActiveFooter={false}
      icon={<TbShoppingCartDiscount className="text-3xl" />}
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
