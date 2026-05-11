"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { BiLayout } from "react-icons/bi";
import Image from "next/image";
import { handleDropHelper } from "@/core/utils/handleDropHelper";
import { useUpdatePromoBannerOrder } from "@/core/hooks/api/adminHome/usePromoBanner";

type PromoBannerLayoutModalProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  banners: any[];
};

const PromoBannerLayoutModal: React.FC<PromoBannerLayoutModalProps> = ({
  isOpen,
  onOpenChange,
  banners,
}) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorder = useUpdatePromoBannerOrder();

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
    handleDropHelper(
      banners,
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
      title={"ترتیب بنرهای تبلیغاتی"}
      confirmText={"ثبت تغیرات"}
      size="3xl"
      icon={<BiLayout />}
      isActiveFooter={false}
    >
      <div className="flex items-center gap-1 mx-auto mb-8 my-6">
        {banners
          .slice()
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
          .map((slider) => {
            const textColor = "text-white";

            return (
              <div
                key={slider.id}
                draggable
                onDragStart={() => handleDragStart(slider.id ?? 1)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(slider.id ?? 1)}
                className={`relative w-36 h-20 rounded-xl overflow-hidden select-none flex items-end cursor-grab border-3 border-gray-200 hover:border-sky-500 transition-all ${
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

export default PromoBannerLayoutModal;
