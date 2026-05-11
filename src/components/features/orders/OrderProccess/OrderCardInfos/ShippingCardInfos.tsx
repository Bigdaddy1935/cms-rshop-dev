"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import { toPersianUTC } from "@/core/utils/date";
import { formatWeight } from "@/core/utils/helper";
import { TbTruckDelivery } from "react-icons/tb";

type ShippingCardInfosProps = {
  order: any;
};

const ShippingCardInfos: React.FC<ShippingCardInfosProps> = ({ order }) => {
  const { payment, updated_at, total_weight } = order;

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات ارسال",
        icon: <TbTruckDelivery className="text-gray-700" />,
        showIconInActionSlot: true,
      }}
      bodyClassName="space-y-1"
    >
      <InfoRow
        label="کد رهگیری"
        value={ payment?.tracking_code ? `#${payment?.tracking_code}` : "—"}
        hoverable
      />
      <InfoRow label="روش ارسال" value={"پیک فروشگاه"} isActiveBg />
      <InfoRow
        label="زمان ارسال"
        value={toPersianUTC(updated_at, { showTime: false })}
      />
      <InfoRow
        label="وزن مرسوله"
        value={formatWeight(total_weight)}
        isActiveBg
      />
    </BaseCard>
  );
};

export default ShippingCardInfos;
