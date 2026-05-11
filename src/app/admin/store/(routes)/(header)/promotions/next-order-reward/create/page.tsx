"use client";

import PromotionRouteWrapper from "@/components/features/store/promotions/PromotionRouteWrapper";
import { NextOrderRewardHooks } from "@/core/hooks/api/usePromotions";
import BasePromotionForm from "@/components/features/store/promotions/BasePromotionForm/BasePromotionForm";

const CreateCoupon = () => {
  return (
    <PromotionRouteWrapper Hooks={NextOrderRewardHooks} formType="next_order_reward">
      {({ initialData, isLoading, resetSignal, setResetSignal, handleSubmit, setCtxKey }) => (
        <BasePromotionForm
          formType="next_order_reward"
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