"use client";

import React, { useState } from "react";
import { ActionButton } from "../ui/buttons/ActionButton";
import { LuTrash2 } from "react-icons/lu";
import BaseModal from "@/components/ui/modals/BaseModal";

type DeleteButtonProps = {
  onDelete: () => void;
  deleteTitle?: string;
  deleteMessage?: string;
  activeBtnHover?: boolean;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  deleteTitle = "تایید حذف",
  deleteMessage = "آیا مطمئن هستید می‌خواهید این آیتم را حذف کنید؟",
  activeBtnHover = false,
}) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleConfirmDelete = () => {
    onDelete();
    setIsOpenDeleteModal(false);
  };

  return (
    <div className={activeBtnHover ? "hover-reveal-child" : ""}>
      <BaseModal
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        title={deleteTitle}
        trigger={
          <ActionButton
            icon={<LuTrash2 size={18} />}
            onClick={() => setIsOpenDeleteModal(true)}
            className={`hover:text-red-600 hover:border-red-300 hover:bg-red-100 !opacity-100`}
          />
        }
        onConfirm={handleConfirmDelete}
        icon={<LuTrash2 className="text-danger-600 text-xl" />}
      >
        {deleteMessage}
      </BaseModal>
    </div>
  );
};

export default DeleteButton;
