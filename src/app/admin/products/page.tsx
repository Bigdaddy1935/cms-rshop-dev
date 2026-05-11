"use client";

import { useState } from "react";
// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import ProductsFilter from "@/components/features/products/Filter/ProductsFilter";
import ProductsBulkActions from "@/components/features/products/Filter/ProductsBulkActions";
import ProductCard from "@/components/features/products/ProductCard";
import SelectableCard from "@/components/ui/SelectableCard";
import {
  ProductSortBy,
  useGetProducts,
} from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
// Icons
import { LuPackage, LuPlus } from "react-icons/lu";
import ShopInfosCard from "@/components/layout/ArshopCard/ShopInfosCard";
import StoreOnboarding from "@/components/features/Shared/StoreOnboarding";

const Products = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!products?.data?.items?.length;

  return (
    <>
      <ShopInfosCard />
      <StoreOnboarding/>
      <UnifiedCard
        searchFilter={<ProductsFilter />}
        headerProps={
          !selectedItems.length
            ? {
                title: "مدیریت محصولات",
                icon: <LuPackage className="text-2xl" />,
                redirect: "/admin/products/create?type=infos",
                btnIcon: <LuPlus />,
                tooltipTitle: "راهنمای مدیریت محصولات",
                tooltipDescription: `📦 کارت محصول (نمایش فعلی)
• وقتی روی فضای کارت هاور میکنی دو دکمه ظاهر می‌شود:
  ✏️ ویرایش  
  فرم کامل اطلاعات محصول عنوان، قیمت، توضیحات و …
  🔄 تنوع محصول 
  صفحه مدیریت تنوع‌ها و ویژگی‌ها برای این محصول 
  🔄 چک باکس (انتخابی)
  یک چک باکس برای انتخاب محصول ظاهر می‌شود که برای عملیات دسته‌جمعی استفاده می‌شود (مثل آپدیت یا تغییر وضعیت چند محصول)

👁 دکمه خورشید/ماه
• روشن (خورشید) → محصول در سایت نمایش داده می‌شود
• خاموش (ماه) → محصول مخفی است (عدم نمایش در فروشگاه)
• کلیک روی آن → فوراً وضعیت نمایش عوض می‌شود

✨ دسترسی سریع به ویژگی‌ها:
• دکمه مثلث مانند باز شدن مدال مدیریت ویژگی‌ها
مناسب برای اضافه سریع ویژگی و تنوع به محصول بدون رفتن به صفحه کامل تنوع محصول

🟢 آیکون‌های وضعیت زیر کارت:
🟢 سبز (راهنما) → محصول جدول راهنمای سایز دارد
🟠 نارنجی (ارسال سریع) → قابلیت ارسال همان‌روز دارد
🌸 صورتی (ستاره) → محصول جزو پیشنهاد شگفت‌انگیز است

⚠️ نکته مهم:
• قبل از مخفی کردن محصول (چشم)، مطمئن شو تغییرات ذخیره شده باشند تا چیزی از دست نرود.
• برای مدیریت کامل ویژگی‌ها و تنوع‌ها، بهتر است از صفحه اختصاصی تنوع محصول استفاده کنی تا همه چیز مرتب و سازماندهی شده باشد.`,
              }
            : {
                title: "مدیریت محصولات",
                icon: <LuPackage className="text-2xl" />,
                children: (
                  <ProductsBulkActions
                    selectedItems={selectedItems}
                    onClearSelection={() => setSelectedItems([])}
                  />
                ),
              }
        }
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={products?.data?.meta}
      >
        {products?.data?.items?.map((product: any) => (
          <SelectableCard
            key={product.id}
            id={product.id}
            selectedIds={selectedItems}
            onSelectionChange={(id, selected) =>
              setSelectedItems((prev: any) =>
                selected ? [...prev, id] : prev.filter((x: any) => x !== id),
              )
            }
          >
            <ProductCard product={product} />
          </SelectableCard>
        ))}
      </UnifiedCard>
    </>
  );
};

export default Products;
