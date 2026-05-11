"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { FlashDealHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";
import { CategoriesSelectionProvider } from "@/components/features/products/categories/SelectableCategoriesBox/CategoriesSelectionContext";
import { useEffect, useState } from "react";

const CategoriesCoupon = () => {
  const [categories, setCategories] = useState([]);

  return (
    <PromotionRouteWrapper
      Hooks={FlashDealHooks}
      Provider={CategoriesSelectionProvider}
      providerProps={{ initialCategories: categories }}
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
          setCategories(
            initialData?.conditions?.find(
              (cond: any) => cond.type === "category"
            )?.categories
          );
        }, [initialData]);

        return (
          <BasePromotionForm
            formType="flash_deal"
            scope="categories"
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

export default CategoriesCoupon;
