"use client";

import { useState } from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { useGetFaqs } from "@/core/hooks/api/faq/useFaq";
import FaqFormModal from "@/components/features/store/store-page/faqs-cat/faqs/FaqFormModal";
import FaqCard from "@/components/features/store/store-page/faqs-cat/faqs/FaqCard";

const FaqsPage = () => {
  const { data: faqs, isLoading } = useGetFaqs();

  const isExistItems = !!faqs?.data?.length;

  const [editFaq, setEditFaq] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditIcon = (faq: any) => {
    setEditFaq(faq);
    setIsEditOpen(true);
  };

  return (
    <>
      <FaqFormModal
        faqId={editFaq?.id || 1}
        defaultValues={editFaq}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="flex flex-col gap-4">
        <UnifiedCard
          headerProps={{
            title: "مدیریت سوالات متداول",
            icon: <LuMessageCircleQuestion className="text-2xl" />,
            tooltipTitle: "راهنمای سوالات متداول",
            tooltipDescription: `❓ مدیریت سوالات این دسته
اینجا می‌تونی سوالات مربوط به این دسته رو ایجاد و مدیریت کنی. هر سوال شامل عنوان (سوال) و توضیح (پاسخ) هست که در سایت به کاربر نمایش داده میشه.

➕ افزودن سوال جدید:
روی دکمه "افزودن سوال" کلیک کن، متن سوال رو کوتاه و واضح بنویس و پاسخ کامل و کاربردی براش ثبت کن.

✏️ ویرایش سوال:
روی کارت هر سوال کلیک کن تا بتونی متن سوال یا پاسخ رو تغییر بدی.

🗑 حذف:
اگه سوالی دیگه کاربرد نداره، می‌تونی حذفش کنی. قبلش مطمئن شو که اطلاعات مهمی داخلش نیست.

📌 نظم و خوانایی:
سوال‌ها رو واضح، مستقیم و بدون جمله‌های طولانی بنویس. پاسخ‌ها بهتره مرحله‌ای یا پاراگراف‌بندی شده باشن تا کاربر سریع جوابشو پیدا کنه.

🎯 تجربه کاربر مهمه:
هدف این بخش کم کردن تماس‌های پشتیبانیه؛ پس سوال‌هایی رو اضافه کن که واقعاً کاربران زیاد می‌پرسن.`,
            children: <FaqFormModal />,
          }}
          isLoading={isLoading}
          isExistItems={isExistItems}
          childrenClassName="grid md:grid-cols-2 !gap-2"
        >
          {faqs?.data?.map((faq: any) => (
            <FaqCard key={faq.id} data={faq} onEdit={handleEditIcon} />
          ))}
        </UnifiedCard>
      </div>
    </>
  );
};

export default FaqsPage;
