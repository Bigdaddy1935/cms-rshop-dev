"use client"

import Toman from "@/components/common/Toman";

type DiscountTotalProps = {
  discount_amount: number;
  discount_percent: number;
};

const DiscountTotal: React.FC<DiscountTotalProps> = ({
  discount_amount,
  discount_percent,
}) => {
  return discount_amount > 0 ? (
    <div className="flex items-center">
      {discount_amount.toLocaleString("fa-IR")}
      <Toman />
    </div>
  ) : discount_percent > 0 ? (
    `${discount_percent.toLocaleString("fa-IR")}%`
  ) : (
    ""
  );
};

export default DiscountTotal;
