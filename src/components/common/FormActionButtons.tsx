"use client";

import React from "react";
import OptionButton from "@/components/ui/buttons/OptionButton";
import { IoArrowForwardOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";

type Props = {
  cancelHref?: string; // ✅ اختیاری
  onCancel?: () => void; // ✅ اختیاری
  onSubmit: () => void;
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  isLoading?: boolean;
};

const FormActionButtons: React.FC<Props> = ({
  cancelHref,
  onCancel,
  onSubmit,
  submitText = "ثبت تغییرات",
  cancelText = "لغو",
  isSubmitting = false,
  isLoading,
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 mb-2 ${
        isLoading ? "is-loading" : ""
      }`}
    >
      {cancelHref || onCancel ? (
        <OptionButton
          title={cancelText}
          href={cancelHref}
          onClick={onCancel}
          icon={<IoArrowForwardOutline />}
          size="md"
          className="w-full"
        />
      ) : null}

      <OptionButton
        title={isSubmitting ? "در حال ثبت..." : submitText}
        onClick={onSubmit}
        variant="flat"
        size="md"
        icon={<FiCheckCircle />}
        className="w-full bg-primary text-white"
      />
    </div>
  );
};

export default FormActionButtons;
