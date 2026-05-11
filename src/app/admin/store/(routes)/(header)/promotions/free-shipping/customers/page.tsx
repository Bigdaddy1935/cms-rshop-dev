"use client";

// CustomersCoupon.tsx
import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { FreeShippingHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { CustomersSelectionProvider } from "@/components/features/store/customers/SelectableCustomersBox/CustomersSelectionContext";
import { useEffect, useState } from "react";

const CustomersCoupon = () => {
  const [users, setUsers] = useState([]);
  return (
    <PromotionRouteWrapper
      Hooks={FreeShippingHooks}
      Provider={CustomersSelectionProvider}
      providerProps={{ initialCustomers: users }}
      formType="free_shipping"
    >
      {({
        initialData,
        isLoading,
        resetSignal,
        setResetSignal,
        handleSubmit,
        setCtxKey
      }) => {
        useEffect(() => {
          setUsers(
            initialData?.conditions?.find((cond: any) => cond.type === "user")
              ?.users
          );
        }, [initialData]);
        return (
          <BasePromotionForm
            formType="free_shipping"
            scope="customers"
            initialData={initialData}
            isShowLoader={isLoading}
            onHandleReset={() => { setResetSignal((p) => p + 1);  setCtxKey((p) => p + 1)}}
            onHandleSubmit={(payload) => handleSubmit(payload)}
            resetSignal={resetSignal}
          />
        );
      }}
    </PromotionRouteWrapper>
  );
};

export default CustomersCoupon;
