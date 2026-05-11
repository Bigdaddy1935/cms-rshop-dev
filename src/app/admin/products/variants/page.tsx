"use client";

import { AttributesContent } from "@/components/features/products/create/AttributesProduct/AttributesContent";
import { MdOutlineCategory } from "react-icons/md";
import BaseCard from "@/components/ui/BaseCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const Variants = () => {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <BaseCard
        CardHeaderProps={{
          title: "مدیریت تنوع محصولات",
          icon: <MdOutlineCategory />,
          tooltipTitle: "راهنمای تنوع محصولات",
          tooltipDescription: `مدیریت ویژگی‌های قابل تغییر محصولات مثل رنگ، سایز و جنس:

📁 گروه ویژگی ◄ دسته‌بندی اصلی (مثال: رنگ‌بندی)
📋 ویژگی ◄ عنوان ویژگی (مثال: رنگ بدنه)
🔘 مقدار ویژگی ◄ گزینه‌های قابل انتخاب (مثال: قرمز، آبی، مشکی)

🔹 هر گروه چند ویژگی دارد و هر ویژگی چند مقدار.
🔹 کاربر هنگام خرید، مقادیر را انتخاب می‌کند.

نکته: برای نمایش مقادیر ویژگی و ویژگی ها باید به ترتیب از بالا به پایین اول گروه ویژگی و بعد ویژگی را انتخاب نمایید تا مقادیر نمایش داده بشوند و در صورت نیاز تغییری ایجاد کنید
`
        }}
      >
        <AttributesContent isActiveHeader={false} isDisabledEdit={false} />
      </BaseCard>
    </div>
  );
};

export default Variants;
