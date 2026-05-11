"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import { TbFolderQuestion } from "react-icons/tb";
import FaqCatCard from "@/components/features/store/store-page/faqs-cat/FaqCatCard";
import { useGetFaqCategories } from "@/core/hooks/api/faq/useFaqCat";
import { IconsSelectionProvider } from "@/components/features/store/icons/SelectableIconBox/IconsSelectionContext";
import FaqCatFormModal from "@/components/features/store/store-page/faqs-cat/FaqCatFormModal";

const FaqsCategoryPage = () => {
  const { data: catFaqs, isLoading } = useGetFaqCategories();

  const isExistItems = !!catFaqs?.data?.length;

  const [editIcon, setEditIcon] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditIcon = (faqcat: any) => {
    setEditIcon(faqcat);
    setIsEditOpen(true);
  };

  return (
    <>
      <IconsSelectionProvider
        initialIcons={editIcon?.icon ? [editIcon?.icon] : undefined}
        singleSelect
      >
        <FaqCatFormModal
          faqcatId={editIcon?.id || 1}
          defaultValues={editIcon}
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      </IconsSelectionProvider>

      <div className="flex flex-col gap-4">
        <UnifiedCard
          searchFilter={
            <SearchFilterCard
              relatedPages={[
                {
                  title: "آیکون ها",
                  href: "/admin/store/icons",
                },
              ]}
            />
          }
          headerProps={{
            title: "مدیریت دسته بندی سوالات",
            icon: <TbFolderQuestion className="text-2xl" />,
            tooltipTitle: "راهنمای دسته‌بندی سوالات",
            tooltipDescription: `❓ مدیریت دسته‌بندی سوالات
اینجا می‌تونی دسته‌بندی‌های بخش سوالات متداول سایت رو بسازی و مدیریت کنی. هر سوال قبل از نمایش، داخل یکی از این دسته‌ها قرار می‌گیره.

➕ افزودن دسته جدید:
روی دکمه "افزودن دسته‌بندی" کلیک کن، عنوان مناسب وارد کن و یه آیکون براش انتخاب کن.

🎨 انتخاب آیکون:
برای هر دسته باید یه آیکون مشخص کنی. این آیکون‌ها از بخش "مدیریت آیکون‌ها" میان و ظاهر دسته رو توی سایت مشخص می‌کنن.

✏️ مدیریت:
کلیک روی هر کارت ◄ ویرایش اطلاعات
آیکون حذف ◄ پاک کردن دسته (در صورت عدم استفاده در سوالات)

🔍 نظم بهتر:
سعی کن عنوان دسته‌ها کوتاه، واضح و کاربردی باشه تا کاربر سریع‌تر سوال مورد نظرشو پیدا کنه.

⚠️ نکته مهم:
اگه دسته‌ای به سوالات متصل باشه، قبل از حذفش مطمئن شو که وابستگی‌هاش مدیریت شده باشه.`,
            children: (
              <IconsSelectionProvider singleSelect>
                <FaqCatFormModal />
              </IconsSelectionProvider>
            ),
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 !gap-2"
        >
          {catFaqs?.data?.map((cat: any) => (
            <FaqCatCard key={cat.id} data={cat} onEdit={handleEditIcon} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default FaqsCategoryPage;
