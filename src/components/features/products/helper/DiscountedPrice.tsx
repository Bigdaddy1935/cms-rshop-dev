"use client"

import Toman from "@/components/common/Toman";

type DiscountedPriceProps = {
  discount_amount: number;
  discount_percent: number;
  price: number;
};

const DiscountedPrice: React.FC<DiscountedPriceProps> = ({
  discount_amount,
  discount_percent,
  price,
}) => {
  const hasDiscount = discount_amount > 0 || discount_percent > 0;

  const finalPrice = discount_amount > 0
    ? price - discount_amount
    : discount_percent > 0
    ? price - (discount_percent / 100) * price
    : price;

  return (
    <div className="w-fit flex flex-col items-center gap-1">
      <div className="flex items-center gap-1 text-gray-800">
        {Math.max(0, finalPrice).toLocaleString("fa-IR")}
        <Toman />
      </div>

      {hasDiscount && (
        <span className="text-xs text-gray-500 line-through decoration-2 decoration-gray-400">
          {price.toLocaleString("fa-IR")}
        </span>
      )}
    </div>
  );
};

export default DiscountedPrice;
