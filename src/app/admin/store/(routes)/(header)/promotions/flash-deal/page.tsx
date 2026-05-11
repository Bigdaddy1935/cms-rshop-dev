"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import PromotionsFilter from "@/components/features/store/promotions/Filter/PromotionsFilter";
import { FlashDealHooks } from "@/core/hooks/api/usePromotions";
import CouponCard from "@/components/features/store/promotions/PromotionCard";
import { PromotionSortBy } from "@/components/features/store/promotions/promotions-types";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { BsBasket } from "react-icons/bs";
import { FlashDealListModal } from "@/components/features/store/promotions/flash-deal/FlashDealListModal";

const FlashDeal = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<PromotionSortBy[number]>();
  const { data: flashDeals, isLoading } = FlashDealHooks.useGetList({
    page,
    sortBy,
    search,
    filter,
  });

  const items = flashDeals?.data?.items || [];
  const hasItems = items.length > 0;

  return (
    <UnifiedCard
      searchFilter={<PromotionsFilter />}
      headerProps={{
        title: "لیست پیشنهادهای شگفت‌انگیز",
        icon: <BsBasket className="text-2xl" />,
        children: <FlashDealListModal />,
        tooltipTitle: "مدیریت پیشنهادهای شگفت‌انگیز",
        tooltipDescription:
          "در این بخش می‌توانید محصولات دارای پیشنهاد شگفت‌انگیز را مدیریت کنید. این پیشنهادها معمولاً شامل تخفیف ویژه با مدت زمان محدود هستند و به‌صورت برجسته در فروشگاه نمایش داده می‌شوند. امکان افزودن، ویرایش یا حذف پیشنهادها وجود دارد.",
      }}
      isLoading={isLoading}
      isExistItems={hasItems}
      searchInp={isFilteredView}
      meta={flashDeals?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {hasItems &&
        items.map((item: any) => <CouponCard key={item.id} item={item} />)}
    </UnifiedCard>
  );
};

export default FlashDeal;
