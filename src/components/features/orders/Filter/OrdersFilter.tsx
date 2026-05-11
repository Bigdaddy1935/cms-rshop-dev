"use client";

import SearchFilterCard from "../../../common/Card/SearchFilterCard";
import OrdersFilterModal from "./OrdersFilterModal";
import OrdersSortingModal from "./OrdersSortModal";

const OrdersFilter = () => {
  return (
    <SearchFilterCard
      relatedPages={[
        {
          title: "لاگ های پرداخت",
          href: "/admin/orders/payment-log",
        },
        {
          title: "بسته بندی",
          href: "/admin/orders/gift-wrapping",
        },
      ]}
      searchPlaceholder="جستجو کد سفارش، نام کاربر یا محصول..."
      showSearchBar
    >
      <OrdersFilterModal />
      <OrdersSortingModal />
    </SearchFilterCard>
  );
};

export default OrdersFilter;
