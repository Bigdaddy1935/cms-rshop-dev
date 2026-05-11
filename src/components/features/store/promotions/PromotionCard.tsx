"use client";

import React, { useEffect, useState } from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import StatusBadge from "@/components/shared/StatusBadge";
import CardRows from "@/components/shared/CardRows";
import { LuPackage, LuPercent, LuUser } from "react-icons/lu";
import {
  CouponHooks,
  FirstOrderHooks,
  FlashDealHooks,
  FreeShippingHooks,
  NextOrderRewardHooks,
} from "@/core/hooks/api/usePromotions";
import { PromotionActionType, PromotionBase } from "./promotions-types";
import { price } from "@/core/utils/helper";
import { BiCategory } from "react-icons/bi";

type Props = {
  item: PromotionBase;
  disableAction?: boolean;
};

const PromotionCard: React.FC<Props> = ({ item, disableAction = false }) => {
  const [promotionType, setPromotionType] = useState({
    name: "",
    value: "",
  });

  let deleteCoupon;

  switch (item.type) {
    case "coupon":
      deleteCoupon = CouponHooks.useDelete();
      break;
    case "first_order":
      deleteCoupon = FirstOrderHooks.useDelete();
      break;
    case "flash_deal":
      deleteCoupon = FlashDealHooks.useDelete();
      break;
    case "free_shipping":
      deleteCoupon = FreeShippingHooks.useDelete();
      break;
    case "next_order_reward":
      deleteCoupon = NextOrderRewardHooks.useDelete();
      break;
  }

  const {
    actions,
    is_active,
    name,
    type,
    used_count,
    code,
    starts_at,
    usage_limit,
    ends_at,
    id,
    conditions,
  } = item;

  useEffect(() => {
    if (!actions || actions.length === 0) {
      setPromotionType({ name: "", value: "" });
      return;
    }

    let names: string[] = [];
    let values: string[] = [];

    actions.forEach((act: PromotionActionType) => {
      if (act.type === "percent_discount" && act.value !== undefined) {
        names.push("درصد");
        values.push(`${act.value}%`);
      }
      if (act.type === "amount_discount" && act.value !== undefined) {
        names.push("ثابت");
        values.push(price(act.value));
      }
    });

    setPromotionType({
      name: names.join(" / "),
      value: values.join(" / "),
    });
  }, [actions]);

  const rowItems = [
    { label: "عنوان", value: name },
    ...(promotionType.name
      ? [{ label: "نوع", value: promotionType.name }]
      : []),
    ...(promotionType.value
      ? [{ label: "مقدار", value: promotionType.value }]
      : []),
    {
      label: "اعتبار",
      value: `از   ${
        starts_at ? new Date(starts_at).toLocaleDateString("fa-IR") : "—"
      }   تا   ${
        ends_at ? new Date(ends_at).toLocaleDateString("fa-IR") : "—"
      }`,
    },
    {
      label: "استفاده شده",
      value: usage_limit
        ? `از ${usage_limit} تا ${used_count}`
        : `${used_count} بار استفاده شده`,
    },
  ];

  const promotionsRedirects = () => {
    const urlBase = "/admin/store/promotions";

    if ((!conditions || conditions.length === 0) && type === "coupon")
      return `${urlBase}/coupon/create?edit_id=${id}`;
    let mood = "create";

    const productCond = conditions?.find((c) => c.type === "product");
    const categoryCond = conditions?.find((c) => c.type === "category");
    const userCond = conditions?.find((c) => c.type === "user");

    if (productCond) mood = "products";
    if (categoryCond) mood = "categories";
    if (userCond) mood = "customers";

    switch (type) {
      case "coupon":
        return `${urlBase}/coupon/${mood}?edit_id=${id}`;
      case "first_order":
        return `${urlBase}/first-order/${mood}?edit_id=${id}`;
      case "next_order_reward":
        return `${urlBase}/next-order-reward/${mood}?edit_id=${id}`;
      case "flash_deal":
        return `${urlBase}/flash-deal/${mood}?edit_id=${id}`;
      case "free_shipping":
        return `${urlBase}/free-shipping/${mood}?edit_id=${id}`;
    }
  };

  const getPromotionIcon = (conditions?: PromotionBase["conditions"]) => {
    if (!conditions || conditions.length === 0) return <LuPercent />;

    const productCond = conditions.find((c) => c.type === "product");
    if (productCond) return <LuPackage />;

    const categoryCond = conditions.find((c) => c.type === "category");
    if (categoryCond) return <BiCategory />;

    const userCond = conditions.find((c) => c.type === "user");
    if (userCond) return <LuUser />;

    return <LuPercent />;
  };

  return (
    <BaseCard
      bodyClassName="flex flex-col gap-2 p-4 hover-reveal-parent"
      redirect={promotionsRedirects()}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="text-2xl text-gray-600 bg-slate-50 rounded-full p-4 flex items-center justify-center">
            {getPromotionIcon(conditions)}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[17px] text-primary">{code}</p>
            <StatusBadge isActive={is_active} size="sm" />
          </div>
        </div>

        {!disableAction && (
          <DeleteButton
            onDelete={() => deleteCoupon.mutate(item?.id!)}
            activeBtnHover
          />
        )}
      </div>

      {/* Content */}
      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default PromotionCard;
