"use client";

import AddSectionCard from "../../../shared/AddSectionCard";
import StaticSectionModal from "../StaticSectionModal";
import { LuPercent } from "react-icons/lu";

const AddFeaturedOfferSection = () => {
  return (
    <AddSectionCard
      className="h-[294px] !border-white !bg-[#E5344E]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <img
            src="/images/AmazingText.png"
            alt="AmazingText"
            className="w-[120px]"
          />
          <p className="text-white">
            در ایام خاص میتونی از این بخش استفاده کنی البته قبلش باید چندتا
            پروموشن اضافه کرده باشی!
          </p>
          <div>
            <StaticSectionModal
              title="شگفت انگیز"
              icon={<LuPercent />}
              sectionType={"promotion_based"}
            />
            {/* <StaticSectionModal title="شگفت انگیز" icon={<LuPercent />} sectionType={"featured"} /> */}
          </div>
        </div>
      }
    />
  );
};

export default AddFeaturedOfferSection;
