"use client";

import { OrderStepKey } from "./OrderSteps/const/order-steps";
import PendingApprovalStep from "./OrderSteps/PendingApprovalStep";
import AwaitingPaymentStep from "./OrderSteps/AwaitingPaymentStep/AwaitingPaymentStep";
import ConfirmingPaymentStep from "./OrderSteps/ConfirmingPaymentStep/ConfirmingPaymentStep";
import PreparingStep from "./OrderSteps/PreparingStep";
import ShippingStep from "./OrderSteps/ShippingStep";
import DeliveredStep from "./OrderSteps/DeliveredStep";

type Props = {
  step: OrderStepKey;
  onNextStep: () => void;
  order?: any;
};

const StepContent = ({ step, order }: Props) => {
  switch (step) {
    case "pending_approval":
      return <PendingApprovalStep order={order} />;

    case "awaiting_payment":
      return <AwaitingPaymentStep order={order} />;

    case "confirming_payment":
      return <ConfirmingPaymentStep order={order} />;

    case "preparing":
      return <PreparingStep order={order} />;

    case "shipping":
      return <ShippingStep order={order} />;

    case "delivered":
      return <DeliveredStep order={order} />;

    default:
      return null;
  }
};

export default StepContent;
