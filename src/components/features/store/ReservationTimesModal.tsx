"use client";

import { HelpTooltip } from "@/components/feedback/HelpTooltip";
import SelectBox from "@/components/ui/inputs/SelectBox";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useGetSetting, useSettingCreate } from "@/core/hooks/api/useSeting";
import { useEffect, useState } from "react";
import { RiTimerLine } from "react-icons/ri";

// ثابت کردن گزینه‌ها (مشابه orderStatusOptions)
export const reservationTimeOptions = [
  { key: "20", title: "20 دقیقه (حداقل)" },
  { key: "30", title: "30 دقیقه" },
  { key: "60", title: "60 دقیقه" },
  { key: "70", title: "70 دقیقه (زمان پیش‌فرض)" },
  { key: "120", title: "120 دقیقه (حداکثر)" },
] as const;

type ReservationTimesModalProps = {
  trigger: React.ReactNode;
};

const ReservationTimesModal: React.FC<ReservationTimesModalProps> = ({
  trigger,
}) => {
  const { data: reservationOrder } = useGetSetting("reservation_order");
  const { mutate: updateReservationOrder } = useSettingCreate();

  const [currentValue, setCurrentValue] = useState("70");

  useEffect(() => {    
    if (reservationOrder?.data?.value)
      setCurrentValue(reservationOrder?.data?.value);
  }, [reservationOrder?.data]);

  const updateReserveTime = (val: number) => {
    const res = {
      key: "reservation_order",
      value: +val,
      category: "payment",
    };
    updateReservationOrder(res);
  };

  return (
    <BaseModal
      trigger={trigger}
      title={"زمان رزرو"}
      confirmText={"ثبت تغیرات"}
      icon={<RiTimerLine />}
      isActiveFooter={false}
    >
      <div className="flex flex-row-reverse items-center gap-4 pb-8 pt-3">
        <div>
          <HelpTooltip
            title="زمان رزرو سفارش چیست؟"
            description="هنگامی که کاربران اطلاعات خود را وارد کرده و به صفحه پرداخت هدایت می‌شوند، در صورت ناموفق بودن پرداخت، مدت‌زمان مشخصی فرصت دارند تا به حساب کاربری خود بازگشته و پرداخت را تکمیل کنند. در این مدت، که به آن زمان رزرو سفارش گفته می‌شود، محصولات انتخاب‌شده موقتاً از موجودی کسر شده و برای کاربر نگه‌داشته می‌شود."
          />
        </div>
        <div className="w-full border-l pl-4">
          <SelectBox
            label="زمان رزرو سفارش"
            value={currentValue}
            onChange={(val) => {
              setCurrentValue(val);
              updateReserveTime(+val);
            }}
            options={reservationTimeOptions.map((opt) => ({
              key: opt.key,
              title: opt.title,
            }))}
            placeholder="انتخاب زمان رزرو"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default ReservationTimesModal;
