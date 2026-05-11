"use client"

import Slider from "@/components/shared/Slider";
import HeroTemplate from "./HeroTemplate";
import { HeroSlider } from "./hero-slider.types";
import HeroSliderEmptyState from "./HeroSliderEmptyState";

type Props = {
  sliders?: HeroSlider[];
  layoutType?: string
};

const HeroSliderContainer: React.FC<Props> = ({ sliders = [], layoutType }) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden">
      {sliders.length ? (
        <Slider
          items={sliders}
          className="w-full"
          renderItem={(slider) => (
            <HeroTemplate slider={slider} sliders={sliders} className={layoutType === "stacked" ? "!relative h-72 w-full" : ""}/>
          )}
        />
      ) : (
        <HeroSliderEmptyState />
      )}
    </div>
  );
};

export default HeroSliderContainer;
