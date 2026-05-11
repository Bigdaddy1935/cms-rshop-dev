"use client";

import BaseCard from "@/components/ui/BaseCard";
import { price } from "@/core/utils/helper";
import { InvoiceItem } from "./invoice-card-infos-types";

type ProductCardDetailProps = {
  item: InvoiceItem;
};

const ProductCardInfos: React.FC<ProductCardDetailProps> = ({ item }) => {
  const { product, variants, discount, quantity, line_total } = item;

  return (
    <BaseCard
      bodyClassName="cursor-auto"
      className={`shadow-none relative !border-x-0 border-t-0 rounded-none`}
    >
      {!variants.length ? (
        <div className="flex flex-col">
          <div className="w-full flex items-center gap-3">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="!min-w-20 max-w-20 !min-h-20 max-h-20 rounded-xl object-cover shadow-md"
            />
            <div className="w-full flex flex-col justify-between text-right h-14">
              <div className="flex items-center gap-2">
                {!variants.length ? (
                  <span className="text-gray-600 bg-gray-100 px-2 rounded-lg truncate">
                    {quantity} عدد
                  </span>
                ) : (
                  ""
                )}
                <h3 className="text-gray-800 truncate w-48">{product.name}</h3>
              </div>
              <div className="w-full flex items-center justify-between mt-2 gap-4">
                <span className="text-sm text-gray-500">
                  {price(product.price)}
                </span>

                <span className="text-green-600 font-semibold">
                  {price(line_total)}
                </span>

                <span className="absolute bottom-3 right-3">
                  {product.product_discount.amount ||
                  product.product_discount.percent ? (
                    <p className="text-orange-600 bg-orange-50 px-2 rounded-lg">
                      {product.product_discount.amount
                        ? `${price(product.product_discount.amount)} تخفیف`
                        : `${product.product_discount.percent}%`}
                    </p>
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-gray-700 px-4 pt-2 leading-7">{product.name}</h3>
      )}

      {/* لیست واریانت‌ها */}
      {variants.length ? (
        <div className="mt-2 space-y-2">
          {variants?.map((v, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                variants.length - 1 !== index ? "border-b border-slate-200" : ""
              } p-3`}
            >
              <img
                src={product.image || "/placeholder.jpg"}
                alt={product.name}
                className="!w-16 !h-16 rounded-xl object-cover shadow-md"
              />
              <div className="w-full flex flex-col gap-2 items-center text-sm text-gray-700">
                <div className="w-full flex justify-between items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 bg-gray-100 px-2 rounded-lg">
                      {v.quantity} عدد
                    </span>
                    <div className="flex items-center gap-2 text-[13px]">
                      {v?.variant?.attributes.map((attr, i) => (
                        <span key={i}>
                          {attr.value}
                          {i < v.variant.attributes.length - 1 && "  ،"}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="absolute bottom-6 right-6">
                    {v?.variant?.variant_discount?.amount ||
                    v?.variant?.variant_discount?.percent ? (
                      <p className="text-orange-600 bg-orange-50 px-2 rounded-lg">
                        {v?.variant?.variant_discount?.amount
                          ? price(v?.variant?.variant_discount?.amount)
                          : `${v?.variant?.variant_discount?.percent}%`}
                      </p>
                    ) : (
                      ""
                    )}
                  </span>
                </div>

                <div className="w-full mt-2 flex items-center justify-between gap-4 text-xs text-gray-600">
                  <span>{price(v.variant.price)}</span>
                  <span className="text-green-600 font-semibold">
                    {price(v.line_total)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </BaseCard>
  );
};

export default ProductCardInfos;
