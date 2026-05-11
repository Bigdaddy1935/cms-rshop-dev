"use client";

import { Input } from "@heroui/react";
import { useState, useEffect } from "react";
import FieldErrorText from "@/components/forms/FieldErrorText";

type EmailInputProps = {
  value: string;
  onChange: (email: string) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isActiveError?: boolean;
  errorMessage?: string;
  size?: "sm" | "md" | "lg";
};

export default function EmailInput({
  value,
  onChange,
  label = "ایمیل",
  placeholder = "example@mail.com",
  isRequired = false,
  isActiveError = true,
  errorMessage,
  size = "md",
}: EmailInputProps) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // ⏱ حذف خودکار ارور بعد از ۳ ثانیه
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!touched) setTouched(true);

    // جلوگیری از فاصله
    if (/\s/.test(raw)) {
      setError("فاصله مجاز نیست");
      return;
    }

    // جلوگیری از حروف فارسی
    if (/[\u0600-\u06FF]/.test(raw)) {
      setError("حروف فارسی مجاز نیستند");
      return;
    }

    // فقط حروف مجاز انگلیسی، عدد، خط تیره و _
    if (/[^a-zA-Z0-9-_@.]/.test(raw)) {
      setError("فقط حروف انگلیسی، عدد، خط تیره و _ مجاز است");
      return;
    }

    // جلوگیری از شروع با عدد
    if (/^[0-9]/.test(raw)) {
      setError("نامک نمی‌تواند با عدد شروع شود");
      return;
    }

    // ✅ همه چیز درست بود
    setError(null);
    onChange(raw);
  };

  const showError =
    touched &&
    (error || (isActiveError && isRequired && value.trim().length === 0));

  return (
    <Input
      style={{ direction: "ltr" }}
      labelPlacement="outside"
      label={label}
      placeholder={placeholder}
      isRequired={isRequired}
      value={value}
      onChange={handleChange}
      autoComplete="off"
      size={size}
      inputMode="email"
      isInvalid={!!showError || !!errorMessage?.length}
      errorMessage={
        showError || errorMessage?.length ? (
          error ? (
            <FieldErrorText error={error} />
          ) : (
            <FieldErrorText error="وارد کردن ایمیل الزامی است" />
          )
        ) : undefined
      }
      classNames={{
        input: `placeholder:!text-slate-400 !text-slate-700 text-[13px]`,
        label: "text-right !-mt-2 !text-[13px] !text-slate-700",
        inputWrapper:
          "rtl:direction-rtl bg-transparent !transition-all px-4 shadow-none border border-slate-200 rounded-lg h-[48px] hover:!bg-transparent focus-within:border-sky-500 focus-within:!bg-transparent",
      }}
    />
  );
}
