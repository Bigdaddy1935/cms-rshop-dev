"use client";

import { useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { HiOutlineXCircle } from "react-icons/hi2";
import Textarea from "@/components/ui/inputs/Textarea";
import OptionButton from "@/components/ui/buttons/OptionButton";
import { IoArrowForwardOutline } from "react-icons/io5";

type RejectReceiptImageModalProps = {
  onConfirm?: (reason: string) => void;
};

const RejectReceiptImageModal: React.FC<RejectReceiptImageModalProps> = ({
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;

    onConfirm?.(reason);
    setReason("");
    setIsOpen(false);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        if (!val) setReason("");
      }}
      title="عدم تأیید رسید پرداخت"
      trigger={
        <OptionButton
          title="رد پرداخت"
          onClick={() => setIsOpen(true)}
          icon={<IoArrowForwardOutline />}
          size="md"
          className="mb-2"
        />
      }
      onConfirm={handleConfirm}
      size="md"
      icon={<HiOutlineXCircle />}
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-default-600 leading-6">
          لطفاً دلیل عدم تأیید رسید پرداخت را وارد کنید. این پیام به کاربر نمایش
          داده می‌شود.
        </p>

        <Textarea
          label="دلیل رد پرداخت"
          placeholder="مثلاً مبلغ واریزی با سفارش مطابقت ندارد"
          value={reason}
          onChange={setReason}
          isRequired
        />
      </div>
    </BaseModal>
  );
};

export default RejectReceiptImageModal;
