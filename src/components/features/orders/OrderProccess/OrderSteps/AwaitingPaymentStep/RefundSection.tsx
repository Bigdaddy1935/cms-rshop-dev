import InfoRow from "@/components/shared/InfoRow";
import FormActionButtons from "@/components/common/FormActionButtons";
import { price } from "@/core/utils/helper";
import { useRefundOrder } from "@/core/hooks/api/orders/useOrder";

const RefundSection = ({ order }: { order: any }) => {
  const { mutate: RefundOrder } = useRefundOrder();

  const refundOrderHandler = () => {
    RefundOrder(order.id);
  };

  return (
    <>
      <div className="my-6 space-y-1.5">
        <InfoRow
          label="مبلغ قابل بازگشت"
          value={price(order.total)}
          hoverable
        />
        <InfoRow
          label="شماره همراه کاربر"
          value={order?.user?.phone || order?.user?.email || "—"}
          hoverable
          isActiveBg
        />
        <InfoRow
          label="شماره کارت کاربر"
          value={order?.user?.card_number || "—"}
          hoverable
        />
      </div>

      <FormActionButtons
        onSubmit={refundOrderHandler}
        isSubmitting={false}
        submitText="تأیید پرداخت وجه به کاربر"
      />
    </>
  );
};

export default RefundSection;
