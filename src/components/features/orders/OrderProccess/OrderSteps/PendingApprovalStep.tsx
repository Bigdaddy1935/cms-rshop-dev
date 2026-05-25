import { Alert } from "@heroui/react";
import FormActionButtons from "@/components/common/FormActionButtons";
import { useUpdateOrderStatus } from "@/core/hooks/api/orders/useOrder";

const PendingApprovalStep = ({ order }: { order: any }) => {
  const updateOrderStatus = useUpdateOrderStatus();

  const acceptOrder = () => {
    updateOrderStatus.mutate({ id: order.id, status: "awaiting_payment" });
  };

  if (order?.status === "cancelled") {
    return (
      <Alert
        color="danger"
        title="سفارش توسط کاربر لغو شده است"
        description="کاربر قبل از پرداخت، سفارش را کنسل کرد."
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-default-600 leading-7">
        سفارش ثبت شده و در انتظار تأیید اولیه شما است.
      </p>

      <FormActionButtons
        onSubmit={acceptOrder}
        isSubmitting={false}
        submitText="تأیید سفارش"
      />
    </div>
  );
};

export default PendingApprovalStep;
