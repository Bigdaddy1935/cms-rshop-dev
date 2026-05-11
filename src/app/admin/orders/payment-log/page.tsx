"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { OrderSortBy } from "@/components/features/orders/order-types";
// Icons
import { useGetPaymentLogs } from "@/core/hooks/api/orders/usePaymentLogs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MdCheckCircle, MdOutlinePayments, MdPending } from "react-icons/md";
import PaymentCard from "@/components/features/orders/payment-log/PaymentLogCard";
import { RiFileList3Line } from "react-icons/ri";
import { StatCard } from "@/components/common/StatCard";

const Orders = () => {
  const { page, isFilteredView } = useListQueryParams<OrderSortBy[number]>();
  const { data: payments, isLoading } = useGetPaymentLogs({ page });
  const isExistItems = !!payments?.data?.items?.length;

  const statItems =
    !isLoading && isExistItems
      ? [
          {
            title: "پرداخت‌های موفق",
            value: payments.data.items.filter(
              (payment: any) => payment.status === "success",
            ).length,
            icon: <MdCheckCircle />,
            color: {
              from: "from-green-50",
              to: "to-green-100",
              border: "border-green-200",
              text: "text-green-700",
              icon: "text-green-800",
            },
          },
          {
            title: "در حال انتظار",
            value: payments.data.items.filter(
              (payment: any) =>
                payment.status === "in_progress" ||
                payment.status === "pending",
            ).length,
            icon: <MdPending />,
            color: {
              from: "from-blue-50",
              to: "to-blue-100",
              border: "border-blue-200",
              text: "text-blue-700",
              icon: "text-blue-800",
            },
          },
          {
            title: "کل پرداخت‌ها",
            value: payments.data.items.length,
            icon: <MdOutlinePayments />,
            color: {
              from: "from-purple-50",
              to: "to-purple-100",
              border: "border-purple-200",
              text: "text-purple-700",
              icon: "text-purple-800",
            },
          },
        ]
      : [];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs />

      {statItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow">
          {statItems.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>
      )}

      <UnifiedCard
        headerProps={{
          title: "تاریخچه پرداخت‌ها",
          icon: <RiFileList3Line className="text-2xl" />,
          tooltipTitle: "راهنمای تاریخچه پرداخت‌ها",
          tooltipDescription: `مدیریت و مشاهده تمام تراکنش‌های مالی فروشگاه. هر کارت پرداخت شامل این اطلاعات است:

✅ وضعیت پرداخت ◄ موفق، در انتظار، ناموفق
🔍 کد رهگیری ◄ شناسه منحصر به فرد تراکنش
👤 مشخصات سفارش و کاربر ◄ اطلاعات خریدار و محصولات
💰 جزئیات مالی ◄ مبلغ + تخفیف + هزینه ارسال
💻 اطلاعات فنی ◄ IP، مرورگر، سیستم‌عامل کاربر
⏱️ زمان تراکنش ◄ تاریخ و ساعت دقیق

با کلیک روی هر کارت می‌توانید جزئیات بیشتری مانند لاگ درگاه پرداخت و اطلاعات فنی تکمیلی را مشاهده کنید.`,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={payments?.data?.meta}
        className="mb-6"
        bodyClassName="space-y-4"
      >
        {payments?.data?.items?.map((payment: any) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </UnifiedCard>
    </div>
  );
};

export default Orders;
