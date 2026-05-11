"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import CustomersSortModal from "./CustomersSortModal";
import CustomersFilterModal from "./CustomersFilterModal";

const CustomersFilter = () => {
  return (
    <SearchFilterCard
      relatedTitle="دسترسی سریع"
      relatedPages={[
        { title: "سفارش‌ها", href: "/admin/orders" },
        { title: "پروموشن‌ها", href: "/admin/store/promotions" },
      ]}
      searchPlaceholder="جستجو نام، شماره تماس یا ایمیل کاربر..."
      showSearchBar
    >
      <CustomersFilterModal />
      <CustomersSortModal />
    </SearchFilterCard>
  );
};

export default CustomersFilter;
