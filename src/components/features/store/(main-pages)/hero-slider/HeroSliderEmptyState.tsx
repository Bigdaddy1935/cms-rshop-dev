import AddSectionCard from "../shared/AddSectionCard";
import { TfiLayoutSlider } from "react-icons/tfi";
import HeroSliderFormModal from "./HeroSliderFormModal";

const HeroSliderEmptyState = () => {
  return (
    <AddSectionCard
      className="w-[388px] h-[335px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <TfiLayoutSlider className="text-gray-600 text-[70px]" />
          <p className="text-center leading-7">
            وبسایت اسلایدر صفحه اصلی جهت نمایش ندارد!! <br />
            حداقل یک اسلایدر ایجاد کنید
          </p>
          <HeroSliderFormModal />
        </div>
      }
    />
  );
};

export default HeroSliderEmptyState;
