import AddNewCategoryModal from "@/components/features/products/categories/AddNewCategoryModal";
import AddSectionCard from "../shared/AddSectionCard";
import { BiCategoryAlt } from "react-icons/bi";
import { IconsSelectionProvider } from "../../icons/SelectableIconBox/IconsSelectionContext";

const AddCategorySection = () => {
  return (
    <AddSectionCard
      className="h-[396px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <BiCategoryAlt className="text-gray-600 text-[70px] -mb-3" />
          <p className="text-center leading-7">
            وبسایت هیچ دسته بندی جهت نمایش ندارد!! <br />
            حداقل یک دسته بندی ایجاد کنید
          </p>
          <IconsSelectionProvider singleSelect>
            <AddNewCategoryModal />
          </IconsSelectionProvider>
        </div>
      }
    />
  );
};

export default AddCategorySection;
