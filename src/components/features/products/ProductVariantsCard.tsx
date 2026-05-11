"use client";

import React from "react";
import { MdOutlineCategory } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import BaseCard from "@/components/ui/BaseCard";

type Product = Record<string, any>;

interface ProductVariantsCardProps {
  product: Product;
  children?: React.ReactNode;
  variantChildren?: React.ReactNode;
  showVariants?: boolean;
  contentProduct?: React.ReactNode;
  contentVariant?: ((variant: any) => React.ReactNode) | React.ReactNode;
}

const ProductVariantsCard: React.FC<ProductVariantsCardProps> = ({
  product,
  children,
  variantChildren,
  showVariants = true,
  contentProduct,
  contentVariant,
}) => {
  const productContent = (
    <BaseCard
      className={`${showVariants ? "shadow-none border-none" : "" } hover-reveal-parent`}
      bodyClassName={`flex flex-col items-center sm:flex-row gap-4 text-start p-1`}
    >
      {contentProduct}

      <div className="relative w-fit h-full">
        <img
          alt="product cover"
          className="object-cover w-full sm:w-[130px] h-[188px] sm:h-[110px] rounded-xl"
          src={product.media_pinned?.url ?? product.image}
        />
        {!product.is_visible && (
          <div className="absolute inset-0 text-center flex items-center justify-center text-lg px-3 py-1 bg-gray-600/60 text-white shadow-lg rounded-lg">
            <p className="animate-bounce">عدم نمایش</p>
          </div>
        )}
      </div>

      <div className="w-full sm:h-[110px] flex flex-col justify-between pr-0 sm:p-2 gap-4">
        <div className="flex flex-col gap-3 sm:flex-row justify-between items-center w-full">
          <div className="text-[15px] text-black/80 flex flex-col sm:flex-row items-center gap-1">
            <p className="truncate max-w-[220px] sm:max-w-[240px]">
              {product.name ?? product.title}
            </p>
            <span className="text-gray-600 text-xs">
              ({product.category?.title})
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2 cursor-auto">
            <p className="text-gray-600 text-[13px]">
              موجودی{" "}
              {product.is_limited_stock
                ? "نامحدود"
                : product.stock === 0
                ? "ندارد"
                : `${product.stock} عدد`}
            </p>
          </div>

          <div className="flex items-end">
            <div className="text-gray-600">
              {product.discount_amount > 0 || product.discount_percent > 0 ? (
                <div className="flex flex-col items-end gap-2 sm:gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 line-through decoration-2 decoration-gray-400">
                      {Number(product.price).toLocaleString("fa-IR")}
                    </span>
                    <span>تومان</span>
                  </div>
                  <span className="text-[15px] text-gray-800">
                    {Number(
                      Math.max(
                        0,
                        product.price -
                          (product.discount_amount > 0
                            ? product.discount_amount
                            : (product.discount_percent / 100) * product.price)
                      )
                    ).toLocaleString("fa-IR")}{" "}
                    تومان
                  </span>
                </div>
              ) : (
                <span className="text-[15px] text-gray-800">
                  {Number(product.price).toLocaleString("fa-IR")} تومان
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );

  const variantsContent =
    !product?.variants || !showVariants ? null : (
      <div className="flex flex-col gap-2 mt-4 mx-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MdOutlineCategory className="text-purple-500 text-xl" />
            <p className="text-gray-600">تنوع محصول‌ها</p>
          </div>
          <p className="text-gray-600">{product.variants.length} عدد</p>
        </div>

        <div className="flex flex-col gap-2">
          {product.variants.map((variant: any) => {
            const variantContent = (
              <BaseCard bodyClassName="w-full flex-row items-center justify-between gap-4 hover-reveal-parent px-3">
                <div className="text-sm text-gray-600 leading-7">
                  {variant.name}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="text-gray-600">
                    {variant.discount_amount > 0 ||
                    variant.discount_percent > 0 ? (
                      <div className="flex flex-row-reverse items-center gap-1 bg-slate-50 rounded-lg p-1.5">
                        <RiDiscountPercentLine className="text-orange-500 text-lg" />
                        <span className="text-sm text-gray-700">
                          {Number(
                            Math.max(
                              0,
                              variant.price -
                                (variant.discount_amount > 0
                                  ? variant.discount_amount
                                  : (variant.discount_percent / 100) *
                                    variant.price)
                            )
                          ).toLocaleString("fa-IR")}{" "}
                          تومان
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-700 bg-slate-50 rounded-xl p-1.5">
                        {Number(variant.price).toLocaleString("fa-IR")} تومان
                      </div>
                    )}
                  </div>
                  {typeof contentVariant === "function"
                    ? contentVariant(variant)
                    : contentVariant}{" "}
                </div>
              </BaseCard>
            );

            return (
              <React.Fragment key={variant.id}>
                {variantChildren
                  ? React.cloneElement(variantChildren as React.ReactElement, {
                      children: variantContent,
                      variant,
                      id: variant.id,
                    })
                  : variantContent}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );

  return (
    <BaseCard className={`${!showVariants ? "shadow-none border-none" : "" }`}>
      {children
        ? React.cloneElement(children as React.ReactElement, {
            children: productContent,
          })
        : productContent}

      {variantsContent}
    </BaseCard>
  );
};

export default ProductVariantsCard;
