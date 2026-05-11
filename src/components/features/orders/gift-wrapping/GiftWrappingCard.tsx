"use client";

import BaseCard from "@/components/ui/BaseCard";
import { LuGift, LuPackage } from "react-icons/lu";
import StatusBadge from "@/components/shared/StatusBadge";
import { FiPackage } from "react-icons/fi";
import { Image } from "@heroui/react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteGiftWrapping } from "@/core/hooks/api/useGiftWrapping";
import { price } from "@/core/utils/helper";

type GiftWrappingCardProps = {
  gift: {
    id: number;
    name: string;
    description?: string | null;
    price: string | number;
    image?: any;
    is_active: boolean;
    display_order: number;
    created_at: string;
    is_for_gift: boolean;
  };
};

const GiftWrappingCard: React.FC<GiftWrappingCardProps> = ({ gift }) => {
  const { mutateAsync: deleteGift } = useDeleteGiftWrapping();

  return (
    <BaseCard
      bodyClassName="flex flex-col gap-4 p-2 hover-reveal-parent group"
      redirect={`/admin/orders/gift-wrapping/create?edit_id=${gift.id}`}
    >
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => deleteGift(gift.id)} />
      </div>
      <div className="relative flex justify-center">
        <div className="w-full h-full bg-slate-200 aspect-[3/2] overflow-hidden rounded-2xl">
          <Image
            alt={gift.name}
            className="group-hover:scale-150 transition-transform duration-300 w-full min-h-[160px] md:min-h-[120px] object-cover"
            width={"100%"}
            src={gift?.image?.url}
          />
        </div>
        {!gift.is_active ? (
          <div className="z-50">
            <StatusBadge
              className="w-fit absolute top-2 right-2"
              isActive={false}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <h3 className="text-md text-center font-semibold text-gray-700 mt-1 truncate">
        {gift.name}
      </h3>
      <div className="relative flex flex-row-reverse items-center gap-2 mb-2">
        <div className="absolute flex items-center justify-end gap-3">
          {gift.is_for_gift ? (
            <div className="w-fit flex items-center justify-center gap-1 bg-pink-50 p-1.5 px-2 rounded-lg">
              <LuGift className="text-xl text-pink-600" />
              <p className="text-xs text-pink-600 group-hover:flex hidden">
                هدیه
              </p>
            </div>
          ) : (
            <div className="w-fit flex items-center justify-center gap-1 bg-sky-50 p-1.5 px-2 rounded-lg">
              <FiPackage className="text-xl text-sky-400" />
              <p className="text-xs text-sky-500 group-hover:flex hidden">
                بسته بندی
              </p>
            </div>
          )}
        </div>
        <p className="w-full text-start text-gray-600">{price(gift.price)}</p>
      </div>
    </BaseCard>
  );
};

export default GiftWrappingCard;
