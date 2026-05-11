"use client";

import { useEffect, useState } from "react";
import OrderProccessingBoxes from "./OrderProccessingBoxes";
import StepContent from "./StepContent";
import { OrderData } from "../order-types";
import { getCurrentStep, STEP_TITLES, type OrderStepKey } from "./OrderSteps/const/order-steps";
import BaseTabs, { type BaseTabItem } from "@/components/ui/BaseTabs";

type Props = {
  order?: OrderData;
};

const OrderWizard: React.FC<Props> = ({ order }) => {
  const [step, setStep] = useState<OrderStepKey>("pending_approval");

  useEffect(() => {
    if (order?.status) {
      setStep(getCurrentStep(order.status));
    }
  }, [order?.status]);

  // ترتیب استپ‌ها
  const stepOrder: OrderStepKey[] = [
    "pending_approval",
    "awaiting_payment",
    "confirming_payment",
    "preparing",
    "shipping",
    "delivered",
  ];

  const currentIndex = stepOrder.indexOf(step);

  const next = () => {
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + currentIndex + 1]);
    }
  };

  if (!order) {
    return null;
  }

  // تبدیل استپ‌ها به فرمت BaseTabs
  const tabItems: BaseTabItem[] = stepOrder.map((key) => ({
    key,
    title: STEP_TITLES[key],
    content: (
      <OrderProccessingBoxes
        order={order}
        actionBox={<StepContent step={key} onNextStep={next} order={order} />}
      />
    ),
    // فقط استپ فعلی محتوا داشته باشه — بقیه خالی (برای عملکرد بهتر)
    showEmpty: key !== step,
  }));

  if (!order) return null;

  return (
    <BaseTabs
      items={tabItems}
      activeKey={step}
      onTabChange={(key) => setStep(key as OrderStepKey)}
      variant="solid"
      fullWidth
      tabListClassName="bg-gray-50 p-1 rounded-xl"
      className="shadow-sm"
      disableTabs
    />
  );
};

export default OrderWizard;
