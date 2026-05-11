import AddNewBrandModal from "@/components/features/products/brands/AddNewBrandModal";
import AddSectionCard from "../shared/AddSectionCard";
import { TbBrandArc } from "react-icons/tb";

const AddBrandSection = () => {
  return (
    <AddSectionCard
      className="h-[180px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <TbBrandArc className="text-gray-600 text-[70px] -mb-3" />
          <p className="text-center leading-7">
            وبسایت هیچ برندی جهت نمایش ندارد!!
          </p>
          <AddNewBrandModal />
        </div>
      }
    />
  );
};

export default AddBrandSection;
