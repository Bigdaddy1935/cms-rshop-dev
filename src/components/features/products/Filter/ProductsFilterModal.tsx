"use client";

import { useMemo } from "react";
import { useGetAllCategories } from "@/core/hooks/api/categories/useCategory";
import { useGetBrands } from "@/core/hooks/api/useBrand";
import { flattenCategories } from "@/core/utils/flattenCategories";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const ProductsFilterModal: React.FC = () => {
  const { data: categoriesData } = useGetAllCategories();
  const { data: brandsData } = useGetBrands();

  const flatCategories = useMemo(
    () => flattenCategories(categoriesData?.data),
    [categoriesData?.data]
  );

  const brandOptions = useMemo(
    () =>
      brandsData?.data?.items?.map((b: any) => ({
        key: String(b.id),
        title: b.name,
      })) || [],
    [brandsData?.data?.items]
  );

  const fields: FilterField[] = [
    { key: "is_visible", label: "وضعیت نمایش", type: "boolean01", default: "" },
    { key: "requires_preparation", label: "نیاز به آماده‌سازی", type: "boolean01", default: "" },
    { key: "category_id", label: "دسته‌بندی", type: "select", options: flatCategories.map(c => ({ key: String(c.id), title: c.title })) },
    { key: "brand_id", label: "برند", type: "select", options: brandOptions },
    { key: "stock", label: "موجودی", type: "numberRange" },
    { key: "price", label: "قیمت (تومان)", type: "numberRange" },
    { key: "weight", label: "وزن", type: "unitNumber", unitOptions: [
      { key: "گرم", title: "گرم" },
      { key: "کیلوگرم", title: "کیلوگرم" },
    ]},
    { key: "discount", label: "تخفیف", type: "discount" },
    { key: "created_at", label: "تاریخ ثبت", type: "dateRange" },
  ];

  return <FilterModal title="فیلتر محصولات" fields={fields} />;
};

export default ProductsFilterModal;
