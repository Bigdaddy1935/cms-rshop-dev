import Slider from "@/components/shared/Slider";
import BrandTemplate from "./BrandTemplate";
import AddBrandSection from "./AddBrandSection";
import { IoIosStar } from "react-icons/io";

type Props = {
  brands?: any[];
};

const BrandsSliderContainer: React.FC<Props> = ({ brands = [] }) => {
  return (
    <div className="w-full">
      {brands.length ? (
        <div className="flex flex-col gap-10 justify-center items-center border border-gray-200 rounded-2xl pb-5 pt-2.5">
          <div className="flex items-center gap-2.5">
            <IoIosStar className="text-2xl text-yellow-400" />
            <p className="text-lg text-gray-700">محبوب‌ترین برندها</p>
          </div>
          <Slider
            items={brands}
            itemsPerView={6}
            className="w-fit !gap-10 mx-auto"
            renderItem={(brand) => <BrandTemplate brand={brand} />}
          />
        </div>
      ) : (
        <AddBrandSection />
      )}
    </div>
  );
};

export default BrandsSliderContainer;
