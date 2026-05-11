import { BiCategoryAlt } from "react-icons/bi";
import AddSectionCard from "../../../shared/AddSectionCard";
import StaticSectionModal from "../StaticSectionModal";
import { TbCategory } from "react-icons/tb";

const AddNewCategorySection = () => {
  return (
    <AddSectionCard
      className="h-[276px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <TbCategory className="text-gray-600 text-[70px] -mb-3" />
          <p className="text-center leading-7">
            هنوز محصولی در بخش «محصولات بر اساس دسته‌بندی» اضافه نشده است.
            <br />
            برای نمایش این بخش، حداقل یک محصول به دسته‌بندی‌ها اضافه کنید.
          </p>
          <StaticSectionModal title="دسته بندی" icon={<BiCategoryAlt />} showCategoryField sectionType={"category_based"}/>
        </div>
      }
    />
  );
};

export default AddNewCategorySection;
