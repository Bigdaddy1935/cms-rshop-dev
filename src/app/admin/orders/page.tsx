"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import OrdersFilter from "@/components/features/orders/Filter/OrdersFilter";
import OrderCard from "@/components/features/orders/OrderCard";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { OrderSortBy } from "@/components/features/orders/order-types";
import { useGetOrders } from "@/core/hooks/api/orders/useOrder";
// Icons
import { IoReceiptOutline } from "react-icons/io5";
import ShopInfosCard from "@/components/layout/ArshopCard/ShopInfosCard";
import StoreOnboarding from "@/components/features/Shared/StoreOnboarding";

const Orders = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<OrderSortBy[number]>();

  const { data: orders, isLoading } = useGetOrders({
    page,
    sortBy,
    filter,
    search,
  });

  const isExistItems = !!orders?.data?.items?.length;

  return (
    <>
      <ShopInfosCard />
      <StoreOnboarding/>
      <UnifiedCard
        searchFilter={<OrdersFilter />}
        headerProps={{
          title: "مدیریت سفارشات",
          icon: <IoReceiptOutline className="text-2xl" />,
          redirect: "/admin/orders/manual-order",
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={orders?.data?.meta}
        className="mb-6"
        childrenClassName="grid md:grid-cols-2"
      >
        {orders?.data?.items?.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </UnifiedCard>
    </>
  );
};

export default Orders;
