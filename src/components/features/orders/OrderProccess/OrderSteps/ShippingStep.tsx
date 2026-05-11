import { Alert } from "@heroui/react";
import FormActionButtons from "@/components/common/FormActionButtons";
import { useUpdateOrderStatus } from "@/core/hooks/api/orders/useOrder";

const ShippingStep = ({ order }: { order: any }) => {
  const updateOrderStatus = useUpdateOrderStatus();

  const dispatchOrder = () => {
    updateOrderStatus.mutate({ id: order.id, status: "delivered" });
  };

  return (
    <div>
      {order?.status === "not_delivered" && (
        <Alert
          color="warning"
          title="مشکل در تحویل مرسوله"
          description="کاربر گزارش داده که سفارش به دستش نرسیده. لطفاً پیگیری کنید."
          className="mb-6"
        />
      )}

      <p className="text-default-600 leading-7 text-center">
        {order?.status === "not_delivered"
          ? "لطفاً وضعیت ارسال را بررسی و مشکل را برطرف کنید."
          : "در صورت اطمینان از تحویل مرسوله به کاربر، وضعیت را «تحویل شده» قرار دهید."}
      </p>

      <div className="mt-8 text-center">
        <FormActionButtons
          onSubmit={dispatchOrder}
          isSubmitting={false}
          submitText="تأیید تحویل به کاربر"
        />
      </div>
    </div>
  );
};

export default ShippingStep;
