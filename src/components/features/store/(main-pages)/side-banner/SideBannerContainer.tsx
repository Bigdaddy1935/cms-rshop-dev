"use client";

import { useState } from "react";
import SideBannerEmptyState from "./SideBannerEmptyState";
import SideBannersTemplate from "./SideBannersTemplate";
import { SIDE_BANNER_POSITIONS, SideBanner } from "./side-banner.types";
import { handleDropHelper } from "@/core/utils/handleDropHelper";
import { useUpdateSideBanner } from "@/core/hooks/api/adminHome/useSideBanners";

type Props = {
  banners?: SideBanner[];
  className?: string;
};

const SideBannerContainer: React.FC<Props> = ({ banners = [], className }) => {
  const [items, setItems] = useState(banners);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const { mutateAsync: reorder } = useUpdateSideBanner();
  //
  const bannerMap = Object.fromEntries(
    banners.map((banner) => [banner.position, banner])
  ) as Record<string, SideBanner>;

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
    const arrPayload: any = [];
    handleDropHelper(
      items,
      draggingId,
      overId,
      (payload) => {
        if (payload)
          return arrPayload.push(
            banners.find((banner) => banner.id === payload?.id)
          );
      },
      setItems,
      setDraggingId
    );
    //
    if (!arrPayload?.length) return;

    const swapPayload = arrPayload.map((pay: any, index: any) => ({
      id: pay.id,
      position: index === 0 ? arrPayload[1].position : arrPayload[0].position,
    }));

    const call1 = await reorder({
      data: { position: swapPayload[0].position },
      id: swapPayload[0].id,
    });
    if (call1.ok) {
      await reorder({
        data: { position: swapPayload[1].position },
        id: swapPayload[1].id,
      });
    }
  };

  return (
    <div className={`grid grid-cols-2 grid-rows-2 gap-2 ${className}`}>
      {SIDE_BANNER_POSITIONS.map((position) => {
        const banner = bannerMap[position];

        return banner ? (
          <div
            key={banner.id}
            draggable
            onDragStart={() => handleDragStart(banner.id ?? 1)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(banner.id ?? 1)}
            className={`relative rounded-xl select-none flex items-end cursor-grab border-3 border-gray-200 hover:border-sky-500 transition-all`}
          >
            <SideBannersTemplate key={banner.id} banner={banner} />
          </div>
        ) : (
          <SideBannerEmptyState key={position} position={position} />
        );
      })}
    </div>
  );
};

export default SideBannerContainer;
