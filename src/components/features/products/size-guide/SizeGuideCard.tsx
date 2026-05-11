"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { Image } from "@heroui/react";
import BaseCard from "@/components/ui/BaseCard";
import { useDeleteSizeGuide } from "@/core/hooks/api/useSizeGuide";

type SizeGuideCardProps = {
  size: any;
  onEdit?: (brand: Record<string, any>) => void;
};

const SizeGuideCard: React.FC<SizeGuideCardProps> = ({ size, onEdit }) => {
  const { mutate: deleteSize } = useDeleteSizeGuide();  
  return (
    <BaseCard
      //className="cursor-auto shadow-md rounded-2xl border w-[250px] xs:w-full"
      bodyClassName="p-2 hover-reveal-parent group"
      onClick={() => onEdit?.(size)}
    >
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => deleteSize({ id: size.id })} />
      </div>

      {/* تصویر برند */}
      <div className="w-full h-full bg-slate-200 aspect-[3/2] overflow-hidden rounded-2xl">
        <Image
          alt={size.title}
          className="w-full group-hover:scale-150 min-h-[160px] md:min-h-[120px] object-cover rounded-2xl"
          radius="lg"
          width={"100%"}
          src={size.image}
        />
      </div>

      {/* نام و اسلاگ */}
      <div className="flex flex-col justify-center items-center gap-2 mt-2">
        <div className="flex flex-col items-center leading-7 w-full rounded-2xl">
          <p className="text-[15px] line-clamp-1">{size.title}</p>
          <p dir="rtl" className="text-right text-default-500 text-[13px] truncate w-36">{size.description} اره برای ما خیلی خوبع</p>
        </div>
      </div>
    </BaseCard>
  );
};

export default SizeGuideCard;
