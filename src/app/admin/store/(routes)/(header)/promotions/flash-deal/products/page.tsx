"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { FlashDealHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import { useEffect, useState } from "react";

const ProductsCoupon = () => {
  const [products, setProducts] = useState([]);

  return (
    <PromotionRouteWrapper
      Hooks={FlashDealHooks}
      Provider={ProductsSelectionProvider}
      providerProps={{ initialProducts: products }}
      formType="flash_deal"
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
          setProducts(
            initialData?.conditions?.find(
              (cond: any) => cond.type === "product"
            )?.products || []
          );
        }, [initialData]);

        return (
          <BasePromotionForm
            formType="flash_deal"
            scope="products"
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

export default ProductsCoupon;
