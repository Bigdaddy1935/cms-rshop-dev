"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import HomeBuilderFilter from "@/components/features/store/(main-pages)/HomeBuilderFilter";
import TemplateSliders from "@/components/features/store/(main-pages)/TemplateSliders";
import { useGetHome } from "@/core/hooks/api/adminHome/useHome";
import { SiMaterialformkdocs } from "react-icons/si";

const HomeBuilder = () => {
  const { data, isLoading: isLoading } = useGetHome();

  const home = data?.data;

  return (
    <UnifiedCard
      searchFilter={<HomeBuilderFilter />}
      headerProps={{
        title: "مدیریت صفحه اصلی",
        icon: <SiMaterialformkdocs className="text-2xl" />,
        tooltipTitle: "راهنمای صفحه‌ساز",
        tooltipDescription: `طراحی و چیدمان صفحه اصلی فروشگاه به صورت کاملاً بصری. هر بخش از صفحه قابلیت ویرایش، جابجایی و حذف دارد:

🎪 بنر تبلیغاتی (Promo Banner)
 بنرهای افقی برای اطلاع‌رسانی تخفیف‌ها و رویدادها

🎯 اسلایدر اصلی (Hero Slider)
 نمایش تصاویر برجسته و بنرهای تبلیغاتی در بالای صفحه

📌 بنر کناری (Side Banner)
 بنرهای عمودی کنار اسلایدر برای تبلیغات ویژه

⭐ پیشنهادات ویژه (Featured Offer)
 نمایش محصولات منتخب و ویژه فروشگاه

📁 دسته‌بندی محصولات (Categories)
 نمایش دسته‌بندی‌های اصلی به صورت کارتی و اسلایدری

🔥 پرفروش‌ترین محصولات (Most Popular)
 نمایش محصولات پرطرفدار و پرفروش

🏢 برندها (Brands)
 نمایش لوگو و اسلایدر برندهای همکار

🔹 جابجایی بخش‌ها ◄ با کشیدن و رها کردن
🔹 ویرایش هر بخش ◄ کلیک روی آیکون مداد
🔹 حذف بخش ◄ کلیک روی آیکون سطل زباله`,
      }}
      isLoading={isLoading}
      isExistItems={true}
      searchInp={false}
    >
      <TemplateSliders allSections={home} />
    </UnifiedCard>
  );
};

export default HomeBuilder;
