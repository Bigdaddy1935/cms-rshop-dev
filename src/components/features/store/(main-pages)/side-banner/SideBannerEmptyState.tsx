import AddSectionCard from "../shared/AddSectionCard";
import { CiImageOn } from "react-icons/ci";
import SideBannerFormModal from "./SideBannerFormModal";

type SideBannerEmptyStateProps = {
  position: any;
};

const SideBannerEmptyState: React.FC<SideBannerEmptyStateProps> = ({
  position,
}) => {
  return (
    <AddSectionCard
      className="w-[190px] h-[164px]"
      children={
        <div className="flex flex-col gap-4 items-center">
          <CiImageOn className="text-gray-600 text-[50px]" />
          <p>جایگاه بنر جهت جذب کاربر</p>
          <SideBannerFormModal position={position} />
        </div>
      }
    />
  );
};

export default SideBannerEmptyState;
