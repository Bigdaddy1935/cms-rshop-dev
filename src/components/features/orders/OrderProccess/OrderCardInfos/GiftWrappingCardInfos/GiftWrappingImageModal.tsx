"use client";

import BaseModal from "@/components/ui/modals/BaseModal";
import { GoArrowUpRight } from "react-icons/go";
import { LuImages } from "react-icons/lu";

type GiftWrappingImageModalProps = {
  image: string;
};

const GiftWrappingImageModal: React.FC<GiftWrappingImageModalProps> = ({
  image,
}) => {
  return (
    <BaseModal
      triggerProps={{
        icon: <GoArrowUpRight />,
        title: "عکس",
      }}
      title={"عکس بسته بندی"}
      size="lg"
      icon={<LuImages />}
      isActiveFooter={false}
    >
      <img
        src={image ?? "/images/gift.png"}
        alt="عکس کاغذ کادو"
        className="w-56 mx-auto rounded-lg my-4"
      />
    </BaseModal>
  );
};

export default GiftWrappingImageModal;
