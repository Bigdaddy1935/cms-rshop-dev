"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import PromotionsFilter from "@/components/features/store/promotions/Filter/PromotionsFilter";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import CouponCard from "@/components/features/store/promotions/PromotionCard";
import { PromotionSortBy } from "@/components/features/store/promotions/promotions-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import CouponsListModal from "@/components/features/store/promotions/coupon/CouponsListModal";
import { TbRosetteDiscount } from "react-icons/tb";

const Coupon = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<PromotionSortBy[number]>();

  const { data: coupons, isLoading } = CouponHooks.useGetList({
    page,
    sortBy,
    search,
    filter,
  });

  const items = coupons?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<PromotionsFilter />}
      headerProps={{
        title: "لیست تخفیف ها",
        icon: <TbRosetteDiscount className="text-2xl" />,
        children: <CouponsListModal />,
        tooltipTitle: "مدیریت تخفیف‌ها",
        tooltipDescription:
          "در این بخش می‌توانید کدهای تخفیف فروشگاه را مشاهده و مدیریت کنید. امکان ایجاد، ویرایش یا حذف تخفیف‌ها وجود دارد. هر تخفیف می‌تواند شامل درصد یا مبلغ ثابت، تاریخ اعتبار و محدودیت استفاده باشد.",
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={coupons?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default Coupon;
