"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseCard from "@/components/ui/BaseCard";
import React from "react";
import { FiPackage } from "react-icons/fi";
import { PiGiftBold } from "react-icons/pi";
import GiftWrappingImageModal from "./GiftWrappingImageModal";

type GiftWrappingCardProps = {
  order: any;
};

const GiftWrappingCardInfos: React.FC<GiftWrappingCardProps> = ({ order }) => {
  const { gift_wrapping, is_gift, gift_message } = order;

  return (
    is_gift && (
      <BaseCard
        CardHeaderProps={{
          title: is_gift ? "هدیه" : "بسته بندی",
          icon: is_gift ? (
            <PiGiftBold className="text-gray-700" />
          ) : (
            <FiPackage className="text-gray-700" />
          ),
          children: (
            <GiftWrappingImageModal image={gift_wrapping?.image?.url} />
          ),
        }}
        bodyClassName="space-y-1"
      >
        <InfoRow label="نام" value={gift_wrapping?.name ?? "—"} />
        <InfoRow
          label="توضیحات"
          value={gift_wrapping?.description ?? "—"}
          hoverable
          isActiveBg
        />
        <InfoRow label="توضیحات کاربر" value={gift_message ?? "—"} hoverable />
      </BaseCard>
    )
  );
};

export default GiftWrappingCardInfos;
