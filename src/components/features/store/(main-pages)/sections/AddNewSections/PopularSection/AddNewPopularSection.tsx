import { GiHeartBottle } from "react-icons/gi";
import AddSectionCard from "../../../shared/AddSectionCard";
import StaticSectionModal from "../StaticSectionModal";

const AddNewPopularSection = () => {
  return (
    <AddSectionCard
      className="h-[276px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <GiHeartBottle className="text-gray-600 text-[70px] -mb-3" />
          <p className="text-center leading-7">
            هنوز محصولی در بخش «محبوب‌ترین محصولات» اضافه نشده است.
            <br />
            برای نمایش این بخش، حداقل یک محصول اضافه کنید.
          </p>
          <StaticSectionModal title="محبوب ترین ها" icon={<GiHeartBottle/>} sectionType={"most_popular"} />
        </div>
      }
    />
  );
};

export default AddNewPopularSection;
