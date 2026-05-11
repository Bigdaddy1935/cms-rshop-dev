"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import PromotionsFilter from "@/components/features/store/promotions/Filter/PromotionsFilter";
import { NextOrderRewardHooks } from "@/core/hooks/api/usePromotions";
import CouponCard from "@/components/features/store/promotions/PromotionCard";
import { PromotionSortBy } from "@/components/features/store/promotions/promotions-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { NextOrderRewardListModal } from "@/components/features/store/promotions/next-order-reward/NextOrderRewardListModal";
import { TbShoppingCartDiscount } from "react-icons/tb";

const NextOrderReward = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<PromotionSortBy[number]>();
  const { data: nextOrderRewards, isLoading } = NextOrderRewardHooks.useGetList(
    {
      page,
      sortBy,
      search,
      filter,
    },
  );

  const items = nextOrderRewards?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<PromotionsFilter />}
      headerProps={{
        title: "لیست خریدهای بعدی",
        icon: <TbShoppingCartDiscount className="text-2xl" />,
        children: <NextOrderRewardListModal />,
        tooltipTitle: "مدیریت خریدهای بعدی",
        tooltipDescription:
          "در این بخش می‌توانید پاداش یا تخفیف مربوط به سفارش‌های بعدی کاربران را مدیریت کنید. این تنظیمات پس از اولین خرید کاربر فعال می‌شوند و می‌توانند شامل درصد یا مبلغ تخفیف، بازه زمانی اعتبار و شرایط اعمال باشند.",
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={nextOrderRewards?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default NextOrderReward;
