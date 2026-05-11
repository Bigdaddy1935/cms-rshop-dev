"use client";

import Collections from "@/app/admin/store/(routes)/(settings-shop)/home-builder/collections/page";
import BaseModal from "@/components/ui/modals/BaseModal";
import { HiOutlineCollection } from "react-icons/hi";

const CollectionsModal = () => {
  return (
    <BaseModal
      title="انتخاب مجموعه ها"
      icon={<HiOutlineCollection />}
      isActiveFooter={false}
      size="3xl"
    >
      <Collections />
    </BaseModal>
  );
};

export default CollectionsModal;
