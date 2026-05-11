"use client";

import Slider from "@/components/shared/Slider";
import ProductTemplate from "../../../ProductTemplate";
import AmazingOfferCard from "./AmazingOfferCard";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import AddFeaturedOfferSection from "./AddFeaturedOfferSection";
import { useState } from "react";
import { LuPercent } from "react-icons/lu";
import StaticSectionModal from "../StaticSectionModal";
import { useDeleteHomeSection } from "@/core/hooks/api/adminHome/useHomeSections";
import DeleteButton from "@/components/shared/DeleteButton";
import CountdownTimer from "@/components/shared/CountdownTimer";

type SectionIsFeaturedProps = {
  featuredSection?: any;
};

const FeaturedOffersSection: React.FC<SectionIsFeaturedProps> = ({
  featuredSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteHomeSection } = useDeleteHomeSection();  

  console.log("featuredSection =>", featuredSection);
  

  return (
    <div>
      {featuredSection ? (
        <div className="w-full hover-reveal-parent bg-[#E5344E] h-[294px] rounded-xl flex items-center justify-center p-4">
          <AmazingOfferCard>
            <CountdownTimer
              endDate={featuredSection?.end_date}
              className="mt-3 mb-1.5"
            />
          </AmazingOfferCard>
          <StaticSectionModal
            title="شگفت انگیز"
            icon={<LuPercent />}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            defaultValues={featuredSection}
            sectionType={"promotion_based"}
          />

          <div className="hover-reveal-child flex items-center gap-2">
            <DeleteButton
              onDelete={() => {
                deleteHomeSection(featuredSection?.id);
              }}
            />
            <ActionButton
              icon={<TbEdit className="text-gray-700" size={18} />}
              onClick={() => setIsOpen(true)}
            />
          </div>
          <Slider
            items={featuredSection?.products || []}
            itemsPerView={3}
            className="w-fit !gap-1.5 mx-auto"
            renderItem={(product: any) => <ProductTemplate product={product} />}
          />
        </div>
      ) : (
        <AddFeaturedOfferSection />
      )}
    </div>
  );
};

export default FeaturedOffersSection;
