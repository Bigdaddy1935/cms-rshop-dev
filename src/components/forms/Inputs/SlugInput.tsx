"use client";

import { Input } from "@heroui/react";
import { useState, useEffect } from "react";
import FieldErrorText from "@/components/forms/FieldErrorText";

type Props = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isActiveError?: boolean;
  errorMessage?: string;
  size?: "sm" | "md" | "lg";
};

export default function SlugInput({
  value,
  onChange,
  label = "نامک",
  placeholder = "slug",
  isRequired = true,
  isActiveError = true,
  errorMessage,
  size = "md",
}: Props) {
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
    if (/[^a-zA-Z0-9-_]/.test(raw)) {
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
    errorMessage?.length &&
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
      isInvalid={!!showError || !!errorMessage?.length}
      errorMessage={
        showError || errorMessage?.length ? (
          error ? (
            <FieldErrorText error={error} />
          ) : (
            <FieldErrorText error="وارد کردن نامک الزامی است" />
          )
        ) : undefined
      }
    />
  );
}
