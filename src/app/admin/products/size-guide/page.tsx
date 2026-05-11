"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { BrandSortBy } from "@/core/hooks/api/useBrand";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { PiResizeBold } from "react-icons/pi";
import SizeGuideCard from "@/components/features/products/size-guide/SizeGuideCard";
import AddNewSizeGuideModal from "@/components/features/products/size-guide/AddNewSizeGuideModal";
import SizeGuideFilters from "@/components/features/products/size-guide/Filter/SizeGuideFilters";
import { useGetSizeGuide } from "@/core/hooks/api/useSizeGuide";

const SizeGuidePage = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<BrandSortBy[number]>();

  const { data: size, isLoading } = useGetSizeGuide({
    page,
    search,
    sortBy,
  });

  const isExistItems = !!size?.data?.items?.length;

  const [editSize, setEditBrand] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditBrand = (brand: any) => {
    setEditBrand(brand);
    setIsEditOpen(true);
  };

  return (
    <>
      <AddNewSizeGuideModal
        sizGuideId={editSize?.id || 1}
        defaultValues={editSize}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        <UnifiedCard
          searchFilter={<SizeGuideFilters />}
          headerProps={{
            title: "مدیریت راهنمای سایز",
            icon: <PiResizeBold className="text-2xl" />,
            children: <AddNewSizeGuideModal />,
            tooltipTitle: "راهنمای سایز چیست؟",
            tooltipDescription:
              "در این بخش می‌توانید راهنمای سایز محصولات را مدیریت کنید. راهنمای سایز به کاربران کمک می‌کند تا با مشاهده جدول یا تصویر اندازه‌ها، سایز مناسب خود را انتخاب کنند و از اشتباه در خرید جلوگیری شود. شما می‌توانید عنوان، توضیحات و تصویر مربوط به راهنمای سایز را ثبت، ویرایش یا حذف کنید.",
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          searchInp={isFilteredView}
          meta={size?.data?.meta}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        >
          {size?.data?.items?.map((b: any) => (
            <SizeGuideCard key={b.id} size={b} onEdit={handleEditBrand} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default SizeGuidePage;
