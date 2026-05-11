"use client";

import { useState } from "react";
import Slider from "@/components/shared/Slider";
import ProductTemplate from "../../../ProductTemplate";
import SectionTemplateHeader from "../../SectionTemplateHeader";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import StaticSectionModal from "../StaticSectionModal";
import AddNewCategorySection from "./AddNewCategorySection";
import { BiCategoryAlt } from "react-icons/bi";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteHomeSection } from "@/core/hooks/api/adminHome/useHomeSections";

type CategorySectionProps = {
  categories: any[];
};

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteHomeSection } = useDeleteHomeSection();

  return categories ? (
    <div className="hover-reveal-parent">
      <StaticSectionModal
        title="دسته بندی"
        icon={<BiCategoryAlt />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        defaultValues={categories[activeSlider]}
        showCategoryField
        sectionType={"category_based"}
      />

      <div className="flex flex-col gap-2">
        <SectionTemplateHeader
          title={categories[activeSlider]?.title ?? "محصولات بر اساس دسته بندی"}
          showViewAll={categories[activeSlider]?.show_view_all_button}
          viewAllLink={categories[activeSlider]?.view_all_link}
        >
          <div className="flex items-center gap-2">
            <DeleteButton
              onDelete={() => {
                deleteHomeSection(categories[activeSlider]?.id);
                setActiveSlider(activeSlider - 1 >= 0 ? activeSlider - 1 : 0);
              }}
            />
            <ActionButton
              icon={<TbEdit className="text-gray-700" size={18} />}
              onClick={() => {
                setIsOpen(true);
              }}
            />
            <StaticSectionModal
              title="دسته بندی"
              icon={<BiCategoryAlt />}
              showCategoryField
              sectionType={"category_based"}
            />
          </div>
        </SectionTemplateHeader>

        <div className="w-full flex items-center gap-4">
          <div className="!w-[270px] h-[250px] flex flex-col shadow-md border border-gray-200 rounded-xl p-3 overflow-y-auto">
            {categories?.map((cat: any, index: number) => {
              const { name } = cat.category;

              return (
                <div
                  key={index}
                  className={`cursor-pointer flex items-center text-gray-700 ${
                    categories.length - 1 !== index ? "" : ""
                  }`}
                  onClick={() => setActiveSlider(index)}
                >
                  <p
                    className={`${
                      activeSlider === index ? "bg-slate-100" : ""
                    } truncate p-2 rounded-lg hover:bg-slate-100 transition-all w-full mb-2`}
                  >
                    {name}
                  </p>
                </div>
              );
            })}
          </div>

          <Slider
            items={categories[activeSlider]?.products}
            itemsPerView={3}
            rows={1}
            rowHeight={250}
            renderItem={(product: any) => (
              <ProductTemplate key={product.id} product={product} />
            )}
          />
        </div>
      </div>
    </div>
  ) : (
    <AddNewCategorySection />
  );
};

export default CategorySection;
