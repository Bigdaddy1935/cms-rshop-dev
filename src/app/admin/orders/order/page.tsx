"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneOrder } from "@/core/hooks/api/orders/useOrder";
import { IoReceiptOutline } from "react-icons/io5";
import OrderWizard from "@/components/features/orders/OrderProccess/OrderWizard";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import OrderProccessFilter from "@/components/features/orders/OrderProccess/OrderProccessFilter";
import { GoArrowUpRight } from "react-icons/go";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const OrderDetail = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { data: order, isLoading } = useGetOneOrder(
    orderId ? +orderId : undefined,
  );

  const orderData = order?.data;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <UnifiedCard
        searchFilter={
          <OrderProccessFilter
            customerId={orderData?.user?.id}
            customerName={`${orderData?.user?.last_name}`}
          />
        }
        isLoading={isLoading}
        isExistItems={!!orderData}
        searchInp={false}
        headerProps={{
          title: "اطلاعات سفارش",
          icon: <IoReceiptOutline className="text-2xl" />,
          redirect: `/factor?id=${order?.data?.id}`,
          textBtn: "فاکتور",
          btnIcon: <GoArrowUpRight />,
          tooltipTitle: "اطلاعات کامل سفارش",
          tooltipDescription:
            "در این بخش می‌توانید تمامی جزئیات یک سفارش را مشاهده کنید: وضعیت سفارش از ثبت تا تحویل، اطلاعات محصولات، جمع کل، تخفیف‌ها، هزینه ارسال و بسته‌بندی، اطلاعات گیرنده، روش و وضعیت پرداخت و اطلاعات ارسال. دکمه 'فاکتور' امکان دسترسی سریع به فاکتور سفارش را فراهم می‌کند.",
        }}
      >
        <OrderWizard order={orderData} />
      </UnifiedCard>
    </div>
  );
};

export default OrderDetail;
