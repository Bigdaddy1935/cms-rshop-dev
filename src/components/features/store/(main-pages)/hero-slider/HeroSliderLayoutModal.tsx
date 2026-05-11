"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { BiLayout } from "react-icons/bi";
import { HeroSlider } from "./hero-slider.types";
import Image from "next/image";
import { handleDropHelper } from "@/core/utils/handleDropHelper";
import { useUpdateHeroOrder } from "@/core/hooks/api/adminHome/useHeroSlider";

type HeroSliderLayoutModalProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  sliders: HeroSlider[];
};

const HeroSliderLayoutModal: React.FC<HeroSliderLayoutModalProps> = ({
  isOpen,
  onOpenChange,
  sliders,
}) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorder = useUpdateHeroOrder();

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
    handleDropHelper(
      sliders,
      draggingId,
      overId,
      (payload) => reorder.mutateAsync(payload),
      () => {},
      setDraggingId,
    );
  };

  

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      trigger={<ActionButton icon={<BiLayout size={18} />} />}
      triggerProps={null}
      title={"ترتیب اسلایدرها"}
      confirmText={"ثبت تغیرات"}
      size="3xl"
      icon={<BiLayout />}
      isActiveFooter={false}
    >
      <div className="flex items-center gap-1 mx-auto mb-8 my-6">
        {sliders
          .map((slider) => {
            const textColor = !slider.image_url
              ? !slider.is_dark
                ? "text-black"
                : "text-white"
              : "text-white";

            return (
              <div
                key={slider.id}
                draggable
                onDragStart={() => handleDragStart(slider.id ?? 1)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(slider.id ?? 1)}
                className={`relative w-28 h-28 rounded-xl overflow-hidden select-none flex items-end cursor-grab border-3 border-gray-200 hover:border-sky-500 transition-all ${
                  !slider.image_url ? `rounded-2xl` : "bg-black/80"
                }`}
                style={{
                  backgroundColor: !slider.image_url
                    ? slider.background_color || "gray"
                    : "",
                }}
              >
                <p
                  className={`text-md truncate z-10 w-full pr-2 pb-1 ${textColor}`}
                >
                  {slider.title}
                </p>

                {slider.image_url ? (
                  <Image
                    src={slider.image_url}
                    alt={slider.title}
                    fill
                    priority
                    className="object-cover absolute inset-0 z-0 opacity-40"
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
    </BaseModal>
  );
};

export default HeroSliderLayoutModal;
