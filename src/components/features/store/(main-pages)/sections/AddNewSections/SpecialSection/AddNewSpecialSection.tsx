import AddSectionCard from "../../../shared/AddSectionCard";
import SpecialSectionModal from "./SpecialSectionModal";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";

const AddNewSpecialSection = () => {
  return (
    <AddSectionCard
      className="h-[276px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <TfiLayoutSliderAlt className="text-gray-600 text-[70px] -mb-3" />
          <p className="text-center leading-7">
            با ایجاد بخش‌های مختلف، محصولات را به شکل‌های متنوع نمایش دهید.
            <br />
            مانند پرفروش‌ترین‌ها، تخفیف‌ها یا محصولات داغ.
          </p>
          <ProductsSelectionProvider initialProducts={[]}>
            <SpecialSectionModal />
          </ProductsSelectionProvider>
        </div>
      }
    />
  );
};

export default AddNewSpecialSection;
