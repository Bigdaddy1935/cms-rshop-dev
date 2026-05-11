import InfoRow from "@/components/shared/InfoRow";
import FormActionButtons from "@/components/common/FormActionButtons";
import { price } from "@/core/utils/helper";
import { useUpdateOrderStatus } from "@/core/hooks/api/orders/useOrder";
import { toPersianUTC } from "@/core/utils/date";

const PaymentCardInfo = ({ order }: { order: any }) => {
  const updateOrderStatus = useUpdateOrderStatus();

  const submitHandler = () => {
    updateOrderStatus.mutate({ id: order.id, status: "preparing" });
  };

  const unSubmitHandler = () => {
    updateOrderStatus.mutate({ id: order.id, status: "rejected" });
  };

  return (
    <>
      <div className="my-6 space-y-1.5">
        <InfoRow
          label="تاریخ پرداخت"
          value={
            order.payment?.created_at
              ? toPersianUTC(order.payment.created_at)
              : "—"
          }
        />
        <InfoRow
          label="مبلغ پرداختی"
          value={price(order?.payment?.amount)}
          hoverable
          isActiveBg
        />
        <InfoRow
          label="شماره همراه کاربر"
          value={order?.user?.phone || order?.user?.email || "—"}
          hoverable
        />
        <InfoRow
          label="شماره کارت کاربر"
          value={order?.payment?.sender_card_number || "—"}
          hoverable
          isActiveBg
        />
        <InfoRow
          label="کد رهگیری"
          value={`#${order?.payment?.tracking_code}` || "—"}
          hoverable
        />
      </div>

      <FormActionButtons
        onSubmit={submitHandler}
        onCancel={unSubmitHandler}
        isSubmitting={false}
        submitText="تأیید پرداخت وجه"
        cancelText="عدم تایید"
      />
    </>
  );
};

export default PaymentCardInfo;
