"use client";

import React, { useState } from "react";
import SectionTemplate from "../../SectionTemplate";
import AddNewPopularSection from "./AddNewPopularSection";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import StaticSectionModal from "../StaticSectionModal";
import { GiHeartBottle } from "react-icons/gi";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteHomeSection } from "@/core/hooks/api/adminHome/useHomeSections";

type PopularSectionContainer = {
  mostPopular: any;
};

const PopularSectionContainer: React.FC<PopularSectionContainer> = ({
  mostPopular,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteHomeSection } = useDeleteHomeSection();

  return mostPopular ? (
    <>
      <StaticSectionModal
        title="محبوب ترین ها"
        icon={<GiHeartBottle />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        defaultValues={mostPopular}
        sectionType={"most_popular"}
      />
      <SectionTemplate
        section={mostPopular}
        title={mostPopular?.title}
        children={
          <div className="flex items-center gap-2">
            <DeleteButton
              onDelete={() => {
                deleteHomeSection(mostPopular?.id);
              }}
            />
            <ActionButton
              icon={<TbEdit className="text-gray-700" size={18} />}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </div>
        }
      />
    </>
  ) : (
    <AddNewPopularSection />
  );
};

export default PopularSectionContainer;
