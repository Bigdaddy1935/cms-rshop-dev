"use client";

import BaseCard from "@/components/ui/BaseCard";
import { toPersianUTC } from "@/core/utils/date";

type DynamicCardInfosProps = {
  order: any;
  actionBox?: React.ReactNode;
};

const DynamicCardInfos: React.FC<DynamicCardInfosProps> = ({
  order,
  actionBox,
}) => {
  const { id } = order;

  return (
    <BaseCard
      CardHeaderProps={{
        title: `#${id}`,
        icon: (
          <p className="text-sm text-gray-700">
            {toPersianUTC(order.created_at, { showTime: false })}
          </p>
        ),
        showIconInActionSlot: true,
      }}
      bodyClassName="cursor-auto"
    >
      {actionBox}
    </BaseCard>
  );
};

export default DynamicCardInfos;
