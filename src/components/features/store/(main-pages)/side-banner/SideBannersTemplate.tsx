"use client";

import StatusBadge from "@/components/shared/StatusBadge";
import SideBannerFormModal from "./SideBannerFormModal";
import { useState } from "react";

type SideBannersTemplateProps = {
  banner: any;
};

const SideBannersTemplate: React.FC<SideBannersTemplateProps> = ({
  banner,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div
      className="relative flex items-center h-[160px] overflow-hidden rounded-xl py-10 hover:scale-95 transition-all hover:shadow-xl cursor-pointer"
      style={{
        backgroundColor: banner.title ? banner.background_color : "",
      }}
      onClick={() => setIsEditOpen(true)}
    >
      <SideBannerFormModal
        bannerId={banner.id}
        defaultValues={banner}
        position={banner.position}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {!banner.is_active ? (
        <StatusBadge
          isActive={false}
          size="sm"
          className="absolute top-1 left-1 z-20"
        />
      ) : (
        ""
      )}
      {banner.title ? (
        <div className="flex flex-col">
          <div className="flex items-center gap-4 justify-between pr-2">
            <div className="relative z-10 flex flex-col gap-1 w-24">
              {banner.badge_text ? (
                <div
                  className={`text-white rounded-lg z-20 p-1 px-1.5 w-fit mb-3`}
                  style={{ backgroundColor: banner.badge_color ?? "" }}
                >
                  <div className="!text-xs !truncate max-w-16 text-orange-400">
                    {banner.badge_text}
                  </div>
                </div>
              ) : (
                ""
              )}
              <h3 className="truncate text-gray-900">{banner.title}</h3>
              <p
                className={`text-xs truncate text-gray-800 ${banner.badge_text ? "mb-3" : ""}`}
              >
                {banner.subtitle}
              </p>
            </div>

            <img
              src={banner.image_url ?? ""}
              alt={banner.title}
              className={`w-full h-28 translate-x-3`}
            />
          </div>
        </div>
      ) : (
        <div>
          <img
            src={banner.image_url ?? ""}
            alt={banner.title}
            className={`w-full h-[160px] object-cover`}
          />
        </div>
      )}
    </div>
  );
};

export default SideBannersTemplate;
