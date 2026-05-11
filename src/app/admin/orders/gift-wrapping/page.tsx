"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { ProductSortBy } from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { useGetGiftWrappings } from "@/core/hooks/api/useGiftWrapping";
import GiftWrappingCard from "@/components/features/orders/gift-wrapping/GiftWrappingCard";
import GiftsFilter from "@/components/features/orders/gift-wrapping/Filter/GiftsFilter";
// Icons
import { LuGift, LuPlus } from "react-icons/lu";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const giftWrapping = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();

  const { data: gifts, isLoading } = useGetGiftWrappings({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!gifts?.data?.items?.length;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <UnifiedCard
        searchFilter={<GiftsFilter />}
        headerProps={{
          title: "مدیریت بسته بندی ها",
          icon: <LuGift className="text-2xl" />,
          redirect: "/admin/orders/gift-wrapping/create",
          btnIcon: <LuPlus />,
            tooltipTitle: "راهنمای مدیریت بسته‌بندی‌ها",
            tooltipDescription: `🎁 بسته‌بندی هدیه (صورتی)
 مخصوص ایام خاص و مناسبت‌ها، با طراحی ویژه و امکان درج کارت هدیه

📦 بسته‌بندی معمولی (آبی)
 بسته‌بندی استاندارد روزانه برای ارسال محصولات

🔹 دکمه افزودن ◄ افزودن جدید
🔹 کلیک روی کارت ◄ ویرایش
🔹 آیکون سطل زباله ◄ حذف

فیلتر بالا برای جستجو و مرتب‌سازی بر اساس نام، قیمت، وضعیت و نوع بسته‌بندی.`
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={gifts?.data?.meta}
        childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      >
        {gifts?.data?.items?.map((gift: any) => (
          <GiftWrappingCard key={gift.id} gift={gift} />
        ))}
      </UnifiedCard>
    </div>
  );
};

export default giftWrapping;
