"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { MdOutlineCategory } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import Image from "next/image";
import { useProductUpdate } from "@/core/hooks/api/products/useProduct";
import { PiResizeBold } from "react-icons/pi";
import { HiOutlineStar } from "react-icons/hi2";
import { FiMoon } from "react-icons/fi";
import { RiDiscountPercentLine, RiSunLine } from "react-icons/ri";
import OptionButton from "@/components/ui/buttons/OptionButton";
import BaseModal from "@/components/ui/modals/BaseModal";
import { AttributesContent } from "./create/AttributesProduct/AttributesContent";

type Props = {
  product: any;
  disableAction?: boolean;
  forceMobileLayout?: boolean;
};

const ProductCard: React.FC<Props> = ({
  product,
  disableAction = false,
  forceMobileLayout = true,
}) => {
  const id = product.id;
  const { mutate: productUpdate } = useProductUpdate(id);

  return (
    <BaseCard
      className={`min-w-[250px] w-full ${
        forceMobileLayout ? "sm:flex-col" : ""
      }`}
      bodyClassName="flex flex-col items-center group relative"
    >
      <div
        className={`w-full h-full flex flex-col items-center ${
          forceMobileLayout ? "sm:flex-row" : ""
        } gap-4`}
      >
        <div
          className={`absolute inset-0 opacity-0 invisible ${!disableAction ? "group-hover:opacity-100 group-hover:visible" : ""} transition-all w-full h-full bg-black/20 z-10 rounded-xl`}
        >
          {!disableAction && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center gap-2">
              <OptionButton
                title="ویرایش محصول"
                className="bg-white"
                href={`/admin/products/create?edit_id=${id}&type=infos`}
              />
              <OptionButton
                title={
                  product.variants.length ? "ویرایش تنوع محصول" : "تنوع محصول"
                }
                className="bg-white"
                href={`/admin/products/create?edit_id=${id}&type=variant`}
              />
            </div>
          )}
        </div>
        <div
          className={`relative w-full ${
            forceMobileLayout ? "sm:w-[130px] sm:h-[110px]" : ""
          } h-[188px]`}
        >
          <Image
            src={product.media_pinned?.url ?? product.image}
            alt="product cover"
            fill
            className="object-cover rounded-xl"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
          {!product.is_visible && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-600/60 text-white text-lg rounded-lg shadow-lg">
              <p className="animate-bounce">عدم نمایش</p>
            </div>
          )}
        </div>

        <div
          className={`w-full ${
            forceMobileLayout ? "sm:flex-col sm:p-2" : ""
          } flex flex-col justify-between gap-4`}
        >
          {/* Header */}
          <div
            className={`flex flex-col ${
              forceMobileLayout ? "sm:flex-row" : ""
            } justify-between items-center w-full gap-3`}
          >
            <div
              className={`text-[15px] text-black/80 ${!disableAction ? "group-hover:blur-lg" : ""} flex flex-col ${
                forceMobileLayout ? "sm:flex-row" : ""
              } items-center gap-1`}
            >
              <p
                className={`truncate max-w-[220px] ${
                  forceMobileLayout ? "sm:max-w-[240px]" : ""
                }`}
              >
                {product.name ?? product.title}
              </p>
              <span className="text-gray-600 text-xs">
                {product?.category?.title ? `(${product.category.title})` : ""}
              </span>
            </div>

            {!disableAction && (
              <div className="flex items-center z-20 rounded-lg overflow-hidden">
                <BaseModal
                  title="مدیریت ویژگی‌ها"
                  isActiveFooter={false}
                  size="xl"
                  trigger={
                    <div>
                      <ActionButton
                        icon={<MdOutlineCategory size={18} />}
                        className={`w-full sm:w-fit rounded-sm bg-white hover:bg-slate-50 ${
                          product?.variants?.length
                            ? "bg-purple-100 text-purple-600"
                            : ""
                        } border-slate-200 text-gray-700 pl-3 pr-3`}
                      />
                    </div>
                  }
                  icon={<MdOutlineCategory />}
                >
                  <AttributesContent product_id={product.id} />
                </BaseModal>
                <ActionButton
                  icon={
                    !product.is_visible ? (
                      <FiMoon size={18} />
                    ) : (
                      <RiSunLine size={18} />
                    )
                  }
                  onClick={() => {
                    productUpdate({ is_visible: !product.is_visible });
                  }}
                  className={`w-full sm:w-fit rounded-sm bg-white ${!product.is_visible ? "hover:bg-black/70 hover:text-white" : "hover:bg-yellow-100 hover:text-yellow-700"}  border-slate-200 text-gray-700 border-r pr-3 pl-3`}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className={`flex items-end justify-between ${!disableAction ? "group-hover:blur-lg" : ""}`}
          >
            <div className="flex flex-col gap-2">
              <div className={`bg-white p-1 flex items-center gap-2.5`}>
                {product.is_same_day_shipping && (
                  <TbTruckDelivery className="text-orange-500" size={17} />
                )}
                {product.helper && (
                  <PiResizeBold className="text-green-600" size={17} />
                )}
                {product.is_featured && (
                  <HiOutlineStar className="text-fuchsia-500" size={17} />
                )}
              </div>
              <p className="text-gray-600 text-[13px]">
                {product.variants.length ? (
                  "تنوع محصول‌ها"
                ) : (
                  <span>
                    موجودی{" "}
                    {product.is_limited_stock
                      ? "نامحدود"
                      : product.stock === 0
                        ? "ندارد"
                        : `${product.stock} عدد`}
                  </span>
                )}
              </p>
            </div>
            {product.variants.length ? (
              <div className="flex items-end text-gray-600">
                {product.variants.length} عدد
              </div>
            ) : (
              <div className="flex items-end text-gray-600">
                {product.discount_amount > 0 || product.discount_percent > 0 ? (
                  <div
                    className={`flex flex-col items-end gap-2 ${
                      forceMobileLayout ? "sm:gap-1" : ""
                    }`}
                  >
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
                              : (product.discount_percent / 100) *
                                product.price),
                        ),
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
            )}
          </div>
        </div>
      </div>
      <div
        className={`w-full flex gap-2 flex-wrap mt-4 ${!disableAction ? "group-hover:blur-lg" : ""}`}
      >
        {product.variants.map((variant: any, index: number) => (
          <BaseCard
            key={index}
            bodyClassName="w-full flex-row items-center justify-between gap-6 px-3"
            className={`!shadow-none ${variant.discount_percent && variant.stock > 10 ? "bg-transparent !border !border-orange-300" : variant.stock === 0 ? "bg-red-100 animate-pulse border-red-400" : variant.stock <= 10 ? "bg-yellow-50 border-yellow-400" : variant.stock >= 200 ? "bg-sky-100 border-sky-400" : "bg-slate-50"} rounded-lg`}
          >
            <div className="text-sm text-gray-600 leading-7">
              {variant.name}
            </div>

            <div className="flex flex-row-reverse !gap-2 items-center">
              {variant.discount_percent > 0 ? (
                <RiDiscountPercentLine className="text-orange-500 text-[20px]" />
              ) : (
                ""
              )}
              <span
                className={`text-[13px] ${variant.stock <= 10 && variant.stock > 0 ? "animate-bounce" : ""} ${variant.stock === 0 ? "text-red-600" : "text-gray-600"} ${variant.stock >= 200 ? "text-sky-600" : ""}`}
              >
                {variant.stock} عدد
              </span>
            </div>
          </BaseCard>
        ))}
      </div>
    </BaseCard>
  );
};

export default ProductCard;
