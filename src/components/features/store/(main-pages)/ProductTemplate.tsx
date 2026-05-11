"use client";

import BaseCard from "@/components/ui/BaseCard";
import Image from "next/image";
import DiscountTotal from "../../products/helper/DiscountTotal";
import DiscountedPrice from "../../products/helper/DiscountedPrice";

type ProductTemplateProps = {
  product: any;
  className?: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  className = "",
}) => {
  const {
    discount_amount,
    discount_percent,
    price,
    media_pinned,
    image,
    title,
    name,
  } = product;

  return (
    <BaseCard
      className={`w-[160px] h-[254px] ${className} rounded-xl hover:scale-95`}
      bodyClassName={`flex flex-col items-center gap-2 p-2`}
      /* redirect={`/admin/products/create?edit_id=${product.id}&type=infos`} */
    >
      <div className={`relative w-[132px] h-[132px]`}>
        <Image
          src={media_pinned?.url ?? image}
          alt="product cover"
          fill
          className="object-cover rounded-xl"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
      </div>

      <div className={`w-full flex flex-col justify-between gap-4`}>
        <p className="line-clamp-2 min-h-[40px] text-[12px] leading-5 text-gray-500 -mb-1">
          {name ?? title}
        </p>

        <div className="flex justify-between items-start">
          <div className="text-[12px] bg-[#D52E4E] rounded-full text-white px-2">
            <DiscountTotal
              discount_amount={discount_amount}
              discount_percent={discount_percent}
            />
          </div>
          <DiscountedPrice
            discount_amount={discount_amount}
            discount_percent={discount_percent}
            price={price}
          />
        </div>
      </div>
    </BaseCard>
  );
};

export default ProductTemplate;
