"use client";

import BaseModal from "@/components/ui/modals/BaseModal";
import { AttributesContent } from "./AttributesContent";
import { LuPlus } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";

const AttributesModal = () => {
  return (
    <BaseModal
      title="مدیریت ویژگی‌ها"
      isActiveFooter={false}
      size="xl"
      triggerProps={{
        title: "افزودن ویژگی",
        icon: <LuPlus className="text-lg" />,
        className: "bg-secondary-light text-secondary flex-1"
      }}
      icon={<MdOutlineCategory />}
    >
      <AttributesContent />
    </BaseModal>
  );
};

export default AttributesModal;
