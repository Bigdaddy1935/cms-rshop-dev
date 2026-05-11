"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteBrand } from "@/core/hooks/api/useBrand";
import { Image } from "@heroui/react";
import BaseCard from "@/components/ui/BaseCard";

type BrandCardProps = {
  brand: {
    id: number;
    name: string;
    slug: string;
    logo: string;
  };
  onEdit?: (brand: Record<string, any>) => void;
};

const BrandCard: React.FC<BrandCardProps> = ({ brand, onEdit }) => {
  const { mutate: deleteBrand } = useDeleteBrand();

  return (
    <BaseCard
      //className="cursor-auto shadow-md rounded-2xl border w-[250px] xs:w-full"
      bodyClassName="p-2 hover-reveal-parent group"
      onClick={() => onEdit?.(brand)}
    >
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => deleteBrand(brand.id)} />
      </div>

      {/* تصویر برند */}
      <div className="w-full h-full bg-slate-200 aspect-[3/2] overflow-hidden rounded-2xl">
        <Image
          alt={brand.name}
          className="w-full group-hover:scale-150 min-h-[160px] md:min-h-[120px] object-cover rounded-2xl"
          radius="lg"
          width={"100%"}
          src={brand.logo}
        />
      </div>

      {/* نام و اسلاگ */}
      <div className="flex flex-col justify-center items-center gap-2 mt-2">
        <div className="flex flex-col items-center leading-7 w-full rounded-2xl">
          <p className="text-[15px]">{brand.name}</p>
          <p className="text-default-500 text-sm">{brand.slug}</p>
        </div>
      </div>
    </BaseCard>
  );
};

export default BrandCard;
