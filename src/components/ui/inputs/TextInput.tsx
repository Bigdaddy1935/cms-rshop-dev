"use client";

import { Input, InputProps } from "@heroui/react";
import FieldErrorText from "@/components/forms/FieldErrorText";
import { sanitizeInput } from "@/core/utils/sanitizeInput";
import { ReactNode } from "react";

type Props = {
  label?: any;
  value: string;
  onChange: (val: string) => void;
  readOnly?: boolean;

  placeholder?: string;
  description?: string | ReactNode;
  type?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;

  isRequired?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  size?: InputProps["size"];
  variant?: InputProps["variant"];
  color?: InputProps["color"];
  maxLength?: number;
  minLength?: number;

  /** کنترل قوانین ورودی */
  allowEnglishOnly?: boolean;
  allowSpaces?: boolean;
  allowSpecialChars?: boolean;
  allowedSpecialChars?: string[];
  allowNumbers?: boolean;
  allowChars?: boolean;

  /** ترازبندی‌ها */
  inputAlign?: "left" | "right"; // فقط متن خود input
  helperAlign?: "left" | "right"; // ارورها/توضیحات/هلپر
};

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  description,
  type = "text",
  startContent,
  endContent,
  readOnly= false,
  className,
  isRequired = false,
  errorMessage,
  isDisabled = false,
  onBlur,
  onFocus,
  size = "md",
  variant = "flat",
  color = "default",
  maxLength,
  minLength,
  allowChars = true,

  allowEnglishOnly = true,
  allowSpaces = true,
  allowSpecialChars = false,
  allowedSpecialChars = [],
  allowNumbers = true,

  inputAlign = "right",
  helperAlign = "right",
}: Props) {
  const handleValueChange = (next: string) => {
    let filteredValue = next;

    if (allowChars === false) {
      // فقط اعداد مجاز
      filteredValue = next.replace(/\D/g, "");
    }

    const sanitizeResult = sanitizeInput(filteredValue, {
      allowEnglishOnly,
      allowSpaces,
      allowSpecialChars,
      allowedSpecialChars,
      allowNumbers,
    });

    onChange(sanitizeResult.out);
  };

  // کلاس‌های تراز
  const inputTextAlignClass =
    inputAlign === "left" ? "text-left" : "text-right";
  const helperTextAlignClass =
    helperAlign === "left" ? "text-left" : "text-right";

  return (
    <Input
      readOnly={readOnly}
      label={label}
      labelPlacement="outside"
      type={type}
      placeholder={placeholder}
      value={value}
      onValueChange={handleValueChange}
      onBlur={onBlur}
      onFocus={onFocus}
      startContent={startContent}
      endContent={endContent}
      className={className}
      size={size}
      variant={variant}
      color={color}
      maxLength={maxLength}
      minLength={minLength}
      //
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={!!errorMessage?.length}
      errorMessage={
        errorMessage?.length ? (
          <FieldErrorText error={errorMessage} />
        ) : undefined
      }
      description={description}
      //
      autoComplete="off"
      classNames={{
        input: `${inputTextAlignClass}`,
        helperWrapper: `w-full ${helperTextAlignClass}`,
        errorMessage: helperTextAlignClass,
        description: helperTextAlignClass,
      }}
    />
  );
}
