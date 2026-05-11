"use client";

import React from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbCategory2, TbPackages, TbRosetteDiscount } from "react-icons/tb";
import MenuCard from "@/components/shared/MenuCard";
import { FiUsers } from "react-icons/fi";

const promotionItems = [
  {
    title: "کد تخفیف عمومی",
    subtitle: "اعمال کد تخفیف برای همه محصولات ، کاربران و...",
    icon: <TbRosetteDiscount className="text-3xl" />,
    color: "text-purple-700 bg-purple-700/10",
    path: "/admin/store/promotions/coupon/create",
  },
  {
    title: "محصولات",
    subtitle: "تعریف کد تخفیف فقط برای محصولات",
    icon: <TbPackages className="text-3xl" />,
    color: "text-orange-700 bg-orange-700/10",
    path: "/admin/store/promotions/coupon/products",
  },
  {
    title: "دسته بندی ها",
    subtitle: "تعریف کد تخفیف فقط برای دسته بندی‌ها",
    icon: <TbCategory2 className="text-3xl" />,
    color: "text-emerald-700 bg-emerald-700/10",
    path: "/admin/store/promotions/coupon/categories",
  },
  {
    title: "کاربران",
    subtitle: "تعریف کد تخفیف فقط برای کاربران",
    icon: <FiUsers className="text-3xl" />,
    color: "text-sky-700 bg-sky-700/10",
    path: "/admin/store/promotions/coupon/customers",
  },
];

const CouponsListModal: React.FC = () => {
  return (
    <BaseModal
      title="انواع تخفیف ها"
      triggerProps={{
        title: "+ افزودن",
        className: "bg-secondary-light text-secondary",
      }}
      isActiveFooter={false}
      icon={<TbRosetteDiscount className="text-3xl" />}
      size="xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
        {promotionItems.map((item, index) => (
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

export default CouponsListModal;
