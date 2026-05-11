"use client";

import { useState } from "react";
import BrandCard from "@/components/features/products/brands/BrandCard";
import BrandFilters from "@/components/features/products/brands/BrandFilters";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { BrandSortBy, useGetBrands } from "@/core/hooks/api/useBrand";
import { TbBrandArc } from "react-icons/tb";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import AddNewBrandModal from "@/components/features/products/brands/AddNewBrandModal";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const BrandsProduct = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<BrandSortBy[number]>();

  const { data: brands, isLoading } = useGetBrands({
    page,
    search,
    sortBy,
  });

  const isExistItems = !!brands?.data?.items?.length;

  const [editBrand, setEditBrand] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditBrand = (brand: any) => {
    setEditBrand(brand);
    setIsEditOpen(true);
  };

  return (
    <>
      <AddNewBrandModal
        brandId={editBrand?.id || 1}
        defaultValues={editBrand}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        <UnifiedCard
          searchFilter={<BrandFilters />}
          headerProps={{
            title: "مدیریت برندها",
            icon: <TbBrandArc className="text-2xl" />,
            children: <AddNewBrandModal />,
            tooltipTitle: "راهنمای برندها",
            tooltipDescription: `مدیریت برندهای فروشگاه:

🏢 لوگو + نام برند (فارسی و انگلیسی)
✅ وضعیت فعال/غیرفعال

🔹 دکمه + ◄ افزودن برند جدید
🔹 کلیک روی کارت ◄ ویرایش
🔹 سطل زباله ◄ حذف

برندها در صفحه اصلی (اسلایدر برندها) و فیلتر محصولات نمایش داده می‌شوند.`,
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          searchInp={isFilteredView}
          meta={brands?.data?.meta}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        >
          {brands?.data?.items?.map((b: any) => (
            <BrandCard key={b.id} brand={b} onEdit={handleEditBrand} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default BrandsProduct;
