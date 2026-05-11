"use client";

import React, { useEffect } from "react";
import { SideBanner } from "./side-banner/side-banner.types";
import { HeroSlider } from "./hero-slider/hero-slider.types";
import HeroSliderContainer from "./hero-slider/HeroSliderContainer";
import CategoriesSliderContainer from "./categories/CategoriesSliderContainer";
import BrandsSliderContainer from "./brands/BrandsSliderContainer";
import SectionsContainer from "./sections/AddNewSections/SectionsContainer";
import FeaturedOffersSection from "./sections/AddNewSections/FeaturedOffersSection/FeaturedOffersSection";
import SideBannerContainer from "./side-banner/SideBannerContainer";
import PromoBannerContainer from "./PromoBanner/PromoBannerContainer";
import HomePageLayout from "./HomePageLayout";

type TemplateSlidersProps = {
  allSections: {
    brands: any[];
    promo_banners: any[];
    categories: any[];
    hero_sliders: HeroSlider[];
    sections: any[];
    side_banners: SideBanner[];
    layout_type: any;
  };
};

const TemplateSliders: React.FC<TemplateSlidersProps> = ({ allSections }) => {
  const [featuredSection, setFeaturedSection] = React.useState(null);
  const [otherSection, setOtherSection] = React.useState<any[]>([]);
  const {
    brands = [],
    categories = [],
    hero_sliders = [],
    sections = [],
    side_banners = [],
    promo_banners = [],
    layout_type = null,
  } = allSections ?? {};

  useEffect(() => {
    const findedFeatured = sections?.find(
      (section) => section.section_type === "promotion_based",
    );
    const findedOther = sections?.filter(
      (section) => section.section_type !== "promotion_based",
    );
    /* const findedFeatured = sections.find(
      (section) => section.section_type === "featured",
    );
    const findedOther = sections.filter(
      (section) => section.section_type !== "featured",
    ); */
    findedOther && setOtherSection(findedOther);
    setFeaturedSection(findedFeatured);
  }, [sections, allSections]);

  return (
    <div className="flex flex-col gap-6 select-none">
      <PromoBannerContainer promoBnners={promo_banners} />

      <div className="flex flex-col gap-4 relative">
        <HomePageLayout initialLayout={layout_type} />
        {layout_type === "side_by_side" ? (
          <div className="grid grid-cols-2 gap-4">
            <HeroSliderContainer sliders={hero_sliders} />
            <SideBannerContainer banners={side_banners} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <HeroSliderContainer
              sliders={hero_sliders}
              layoutType={layout_type}
            />
            <SideBannerContainer
              banners={side_banners}
              className="grid-cols-4 !grid-rows-1"
            />
          </div>
        )}
      </div>

      {/* <FeaturedOffersSection featuredSection={featuredSection} /> */}

      <CategoriesSliderContainer categories={categories} />

      <SectionsContainer sections={otherSection} />

      <BrandsSliderContainer brands={brands} />
    </div>
  );
};

export default TemplateSliders;
