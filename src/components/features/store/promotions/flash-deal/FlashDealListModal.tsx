"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import MenuCard from "@/components/shared/MenuCard";
import { TbCategory2, TbRosetteDiscount } from "react-icons/tb";
import { BsBasket } from "react-icons/bs";

export const FlashDealListModal: React.FC = () => {
  const items = [
    {
      title: "محصولات",
      subtitle: "اعمال فقط روی محصولات انتخابی",
      icon: <TbRosetteDiscount className="text-3xl" />,
      color: "text-orange-700 bg-orange-700/10",
      path: "/admin/store/promotions/flash-deal/products",
    },
    {
      title: "دسته بندی ها",
      subtitle: "اعمال فقط روی دسته بندی‌های انتخابی",
      icon: <TbCategory2 className="text-3xl" />,
      color: "text-emerald-700 bg-emerald-700/10",
      path: "/admin/store/promotions/flash-deal/categories",
    },
  ];

  return (
    <BaseModal
      title="انواع پیشنهاد های شگفت انگیز"
      triggerProps={{
        title: "+ افزودن",
        className: "bg-secondary-light text-secondary",
      }}
      isActiveFooter={false}
      icon={<BsBasket />}
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
