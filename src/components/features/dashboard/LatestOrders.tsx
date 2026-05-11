"use client";

import dynamic from "next/dynamic";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
const OrderCard = dynamic(
  () => import("@/components/features/orders/OrderCard"),
  { ssr: false },
);
import { useGetOrders } from "@/core/hooks/api/orders/useOrder";
//
import { IoReceiptOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";

const LatestOrders = () => {
  const { data: orders, isLoading } = useGetOrders({
    page: 1,
    limit: 4,
  });

  const isExistItems = !!orders?.data?.items?.length;

  return (
    <UnifiedCard
      headerProps={{
        title: "جدیدترین سفارشات",
        icon: <IoReceiptOutline className="text-2xl" />,
        btnIcon: <BiArrowBack />,
        textBtn: "سفارشات",
        redirect: "/admin/orders",
        btnClassName: "flex-row-reverse bg-blue-700/10 text-blue-700",
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      childrenClassName="grid md:grid-cols-2"
    >
      {orders?.data?.items?.map((order: any) => (
        <OrderCard key={order.id} order={order} disableAction />
      ))}
    </UnifiedCard>
  );
};

export default LatestOrders;
