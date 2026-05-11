"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import PromotionsFilter from "@/components/features/store/promotions/Filter/PromotionsFilter";
import { FirstOrderHooks } from "@/core/hooks/api/usePromotions";
import CouponCard from "@/components/features/store/promotions/PromotionCard";
import { PromotionSortBy } from "@/components/features/store/promotions/promotions-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { FirstOrderListModal } from "@/components/features/store/promotions/first-order/FirstOrderListModal";
import { TfiShoppingCartFull } from "react-icons/tfi";

const FirstOrder = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<PromotionSortBy[number]>();
  const { data: firstOrders, isLoading } = FirstOrderHooks.useGetList({
    page,
    sortBy,
    search,
    filter,
  });

  const items = firstOrders?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<PromotionsFilter />}
      headerProps={{
        title: "لیست خریدهای اول",
        icon: <TfiShoppingCartFull className="text-2xl" />,
        children: <FirstOrderListModal />,
        tooltipTitle: "مدیریت خریدهای اول",
        tooltipDescription:
          "در این بخش می‌توانید سفارش‌هایی را مشاهده کنید که به عنوان اولین خرید کاربران ثبت شده‌اند. این اطلاعات برای بررسی عملکرد کمپین‌های جذب کاربر، اعمال تخفیف خرید اول و تحلیل رفتار کاربران جدید کاربرد دارد.",
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={firstOrders?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default FirstOrder;
