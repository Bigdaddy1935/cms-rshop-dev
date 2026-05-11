"use client";

import Slider from "@/components/shared/Slider";
import PromoBannerTemplate from "./PromoBannerTemplate";
import PromoBannerEmptyState from "./PromoBannerEmptyState";

type PromoBannerContainer = {
  promoBnners: any;
};

const PromoBannerContainer: React.FC<PromoBannerContainer> = ({
  promoBnners,
}) => {
  const sortedBanners = [...promoBnners].sort(
    (a, b) => a.display_order - b.display_order,
  );

  return (
    <div>
      {sortedBanners.length ? (
        <Slider
          items={promoBnners}
          itemsPerView={1}
          className="w-full"
          renderItem={(banner: any) => (
            <PromoBannerTemplate banner={banner} banners={promoBnners} />
          )}
        />
      ) : (
        <PromoBannerEmptyState />
      )}
    </div>
  );
};

export default PromoBannerContainer;
