"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { TbIcons } from "react-icons/tb";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import IconCard from "@/components/features/store/icons/IconCard";
import IconFormModal from "@/components/features/store/icons/IconFormModal";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import { useGetIcons } from "@/core/hooks/api/useIcon";

const IconsPage = () => {
  const { page, search, isFilteredView } = useListQueryParams();

  const { data: icons, isLoading } = useGetIcons({
    page,
    search,
  });

  const isExistItems = !!icons?.data?.items?.length;

  const [editIcon, setEditIcon] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditIcon = (brand: any) => {
    setEditIcon(brand);
    setIsEditOpen(true);
  };

  return (
    <>
      <IconFormModal
        iconId={editIcon?.id || 1}
        defaultValues={editIcon}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="flex flex-col gap-4">
        <UnifiedCard
          searchFilter={
            <SearchFilterCard
              searchPlaceholder="جستجو در آیکون ها..."
              showSearchBar
            />
          }
          headerProps={{
            title: "مدیریت آیکون ها",
            icon: <TbIcons className="text-2xl" />,
            children: <IconFormModal />,
            tooltipTitle: "راهنمای آیکون ها",
            tooltipDescription: `🎨 مدیریت آیکون‌ها
اینجا همه چیز رو برای آیکون‌های سایتت تنظیم می‌کنی! هم می‌تونی از آیکون‌های آماده SVG که از قبل هست استفاده کنی، هم آیکون‌های مخصوص خودتو اضافه کنی.

➕ افزودن آیکون جدید:
وقتی دکمه "افزودن آیکون" رو می‌زنی، یادت باشه حتماً فایل SVG آیکونت رو آپلود کنی.

✏️ مدیریت:
کلیک روی هر باکس آیکون ◄ ویرایشش کن
سطل زباله ◄ اگه دیگه لازم نداری، پاکش کن

🔍 سرچ بالای صفحه:
با اون کادر جستجو می‌تونی خیلی راحت بین آیکون‌ها دنبال یه آیکون خاص بگردی.

🎯 استفاده نهایی:
این آیکون‌ها قراره توی بخش‌های مختلف سایت مثل دسته‌بندی‌ها استفاده بشن.

💡 یه نکته مهم برای طراحا:
اگه آیکون SVG مورد نظرتو نداری، نگران نباش! می‌تونی از این سایت‌های معروف دانلود کنی:
🔹 FontAwesome (https://fontawesome.com)
🔹 Feather Icons (https://feathericons.com)
🔹 Heroicons (https://heroicons.com)
🔹 Tabler Icons (https://tabler-icons.io)

❗ فقط یادت باشه:
بعضی از این سایت‌ها ممکنه تحریم باشن و برای دسترسی بهشون باید VPN داشته باشی.`,
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          searchInp={isFilteredView}
          meta={icons?.data?.meta}
          childrenClassName="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 !gap-2"
        >
          {icons?.data?.items?.map((b: any) => (
            <IconCard key={b.id} icon={b} onEdit={handleEditIcon} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default IconsPage;
