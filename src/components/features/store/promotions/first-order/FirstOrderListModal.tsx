"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import MenuCard from "@/components/shared/MenuCard";
import { TfiShoppingCartFull } from "react-icons/tfi";

export const FirstOrderListModal: React.FC = () => {
  const items = [
    {
      title: "خرید اول عمومی",
      subtitle: "اعمال تخفیف خرید اول برای همه کاربران",
      icon: <TfiShoppingCartFull className="text-3xl" />,
      color: "text-yellow-700 bg-yellow-700/10",
      path: "/admin/store/promotions/first-order/create",
    },
    {
      title: "کاربران",
      subtitle: "اعمال تخفیف خرید اول فقط برای کاربران خاص",
      icon: <TfiShoppingCartFull className="text-3xl" />,
      color: "text-sky-700 bg-sky-700/10",
      path: "/admin/store/promotions/first-order/customers",
    },
  ];

  return (
    <BaseModal
      title="انواع تخفیف خرید اول"
      triggerProps={{
        title: "+ افزودن",
        className: "bg-secondary-light text-secondary",
      }}
      isActiveFooter={false}
      icon={<TfiShoppingCartFull className="text-3xl" />}
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
