"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { CouponHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";

const CreateCoupon = () => {
  return (
    <PromotionRouteWrapper Hooks={CouponHooks} formType="coupon">
      {({ initialData, isLoading, resetSignal, setResetSignal, handleSubmit, setCtxKey }) => (
        <BasePromotionForm
          formType="coupon"
          scope="general"
          initialData={initialData}
          isShowLoader={isLoading}
          onHandleReset={() => { setResetSignal((p) => p + 1);  setCtxKey((p) => p + 1)}}
          onHandleSubmit={(payload) => handleSubmit(payload)}
          resetSignal={resetSignal}
        />
      )}
    </PromotionRouteWrapper>
  );
};

export default CreateCoupon;