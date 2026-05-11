"use client";

import React, { useMemo, useState } from "react";
import BaseTabs from "@/components/ui/BaseTabs";
import { TbRosetteDiscount, TbShoppingCartDiscount } from "react-icons/tb";
import { BsBasket } from "react-icons/bs";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { LiaTruckLoadingSolid } from "react-icons/lia";

// import the page components you already have (they render their own UnifiedCard)
import Coupon from "./coupon/page";
import FlashDeal from "./flash-deal/page";
import FirstOrder from "./first-order/page";
import NextOrderReward from "./next-order-reward/page";
import FreeShipping from "./free-shipping/page";

const Promotions = () => {
  // active tab (controlled)
  const [activeTab, setActiveTab] = useState<string>();
  // track which tabs have been mounted at least once
  const [mounted, setMounted] = useState<Record<string, boolean>>({
    coupons: true, // optionally mount default tab immediately
    flash_deal: false,
    first_order: false,
    next_order_reward: false,
    free_shipping: false,
  });

  const handleTabChange = (key: string | number) => {
    const k = String(key);
    setActiveTab(k);
    setMounted((m) => ({ ...m, [k]: true }));
  };

  // prepare tab items: content rendered only if mounted (lazy) to avoid early hooks
  const tabs = useMemo(
    () => [
      {
        key: "coupon",
        title: (
          <span className="flex items-center gap-2">
            <TbRosetteDiscount className="text-lg" />
            <span>کدتخفیف</span>
          </span>
        ),
        content: mounted.coupons ? <Coupon /> : null,
        showEmpty: false,
      },
      {
        key: "flash_deal",
        title: (
          <span className="flex items-center gap-2">
            <BsBasket className="text-lg" />
            <span>پیشنهاد شگفت‌انگیز</span>
          </span>
        ),
        content: mounted.flash_deal ? <FlashDeal /> : null,
        showEmpty: false,
      },
      {
        key: "first_order",
        title: (
          <span className="flex items-center gap-2">
            <TfiShoppingCartFull className="text-lg" />
            <span>خرید اول</span>
          </span>
        ),
        content: mounted.first_order ? <FirstOrder /> : null,
        showEmpty: false,
      },
      {
        key: "next_order_reward",
        title: (
          <span className="flex items-center gap-2">
            <TbShoppingCartDiscount className="text-lg" />
            <span>خرید بعدی</span>
          </span>
        ),
        content: mounted.next_order_reward ? <NextOrderReward /> : null,
        showEmpty: false,
      },
      {
        key: "free_shipping",
        title: (
          <span className="flex items-center gap-2">
            <LiaTruckLoadingSolid className="text-lg" />
            <span>ارسال رایگان</span>
          </span>
        ),
        content: mounted.free_shipping ? <FreeShipping /> : null,
        showEmpty: false,
      },
    ],
    [mounted]
  );

  return (
    <BaseTabs
      items={tabs}
      fullWidth
      activeKey={activeTab}
      onTabChange={(k) => handleTabChange(String(k))}
      syncWithQuery
    />
  );
};

export default Promotions;
