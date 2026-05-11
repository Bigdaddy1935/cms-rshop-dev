"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import PromotionsFilter from "@/components/features/store/promotions/Filter/PromotionsFilter";
import { FreeShippingHooks } from "@/core/hooks/api/usePromotions";
import CouponCard from "@/components/features/store/promotions/PromotionCard";
import { PromotionSortBy } from "@/components/features/store/promotions/promotions-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { FreeShippingListModal } from "@/components/features/store/promotions/free-shipping/FreeShippingListModal";
import { LiaTruckLoadingSolid } from "react-icons/lia";

const FreeShipping = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<PromotionSortBy[number]>();
  const { data: freeShippings, isLoading } = FreeShippingHooks.useGetList({
    page,
    sortBy,
    search,
    filter,
  });

  const items = freeShippings?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<PromotionsFilter />}
      headerProps={{
        title: "لیست ارسال رایگان",
        icon: <LiaTruckLoadingSolid className="text-2xl" />,
        children: <FreeShippingListModal />,
        tooltipTitle: "مدیریت ارسال رایگان",
        tooltipDescription:
          "در این بخش می‌توانید شرایط ارسال رایگان را تعریف و مدیریت کنید. امکان تعیین حداقل مبلغ سفارش، بازه زمانی اعتبار و سایر محدودیت‌ها وجود دارد. این تنظیمات هنگام ثبت سفارش به‌صورت خودکار اعمال می‌شوند.",
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={freeShippings?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default FreeShipping;
