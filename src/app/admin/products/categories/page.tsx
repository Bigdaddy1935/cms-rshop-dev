"use client";

import { useEffect, useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { TbCategory2 } from "react-icons/tb";
import AddNewCategoryModal from "@/components/features/products/categories/AddNewCategoryModal";
import {
  CategorySortBy,
  useGetCategories,
} from "@/core/hooks/api/categories/useCategory";
import { CategoryTree } from "@/components/features/products/categories/CategoryTree/CategoryTree";
import CategoriesFilter from "@/components/features/products/categories/Filter/CategoriesFilter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { IconsSelectionProvider } from "@/components/features/store/icons/SelectableIconBox/IconsSelectionContext";

const Categories = () => {
  const { page, sortBy, search, filter } =
    useListQueryParams<CategorySortBy[number]>();

  const { data: categories, isLoading } = useGetCategories({
    page,
    search,
    sortBy,
    filter,
  });

  const isExistItems = !!categories?.data?.items?.length;

  const [editCategory, setEditCategory] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditCategory = (category: any) => {
    setEditCategory(category);
    setIsEditOpen(true);
  };

  return (
    <>
      <IconsSelectionProvider
        initialIcons={editCategory?.icon ? [editCategory.icon] : undefined}
        singleSelect
      >
        <AddNewCategoryModal
          categoryId={editCategory?.id || 1}
          defaultValues={editCategory}
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      </IconsSelectionProvider>

      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        {/* Main Card */}
        <UnifiedCard
          searchFilter={<CategoriesFilter />}
          headerProps={{
            title: "مدیریت دسته‌بندی‌ها",
            icon: <TbCategory2 className="text-2xl" />,
            children: (
              <IconsSelectionProvider singleSelect>
                <AddNewCategoryModal />
              </IconsSelectionProvider>
            ),
            tooltipTitle: "راهنمای دسته‌بندی‌ها",
            tooltipDescription: `ساختار سلسله‌مراتبی دسته‌بندی‌های فروشگاه. هر دسته‌بندی می‌تواند شامل زیرمجموعه‌های متعددی باشد:

🌳 دسته‌بندی والد ◄ دسته‌ اصلی که زیرمجموعه دارد (مثال: متبرکات، قرآن و ادعیه)
🍃 زیرمجموعه ◄ دسته‌های فرزند که زیرمجموعه دسته والد هستند (مثال: سنگ متبرک، قرآن کریم)
📊 تعداد زیرمجموعه ◄ نمایش تعداد دسته‌های زیرمجموعه هر والد
🏷️ اسلاگ (slug) ◄ نام انگلیسی داخل پرانتز برای استفاده در URL

🔹 هر دسته‌بندی شامل:
   • نام فارسی و انگلیسی (اسلاگ)
   • تصویر شاخص
   • وضعیت فعال/غیرفعال
   • تخفیف اختصاصی (درصدی)

🔹 کلیک روی مداد ◄ ویرایش دسته‌بندی
🔹 کلیک روی + ◄ افزودن زیرمجموعه جدید
🔹 آیکون سطل زباله ◄ حذف دسته‌بندی (فقط در صورت خالی بودن)

با جستجو و فیلتر بالای صفحه می‌توانید دسته‌بندی‌ها را بر اساس نام، وضعیت و سطح دسته‌بندی پیدا کنید.`,
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          searchInp={false}
          meta={categories?.data?.meta}
        >
          <CategoryTree
            categories={categories?.data?.items}
            onEdit={handleEditCategory}
          />
        </UnifiedCard>
      </div>
    </>
  );
};

export default Categories;
