"use client";

import { useState } from "react";
import TextInput from "@/components/ui/inputs/TextInput";

type PhoneInputProps = {
  value: string;
  onChange: (phone: string, isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  label = "شماره تماس",
  placeholder = "09XXXXXXXXXX",
  isRequired = false,
}) => {
  const [error, setError] = useState("");

  const validatePhone = (phone: string) => {
    if (!phone) {
      setError("");
      onChange("", true);
      return;
    }

    // حذف همه غیر اعداد
    const cleanPhone = phone.replace(/\D/g, "");
    
    // بررسی طول شماره (11 رقمی با پیش‌شماره 0)
    if (cleanPhone.length !== 11) {
      setError("شماره تماس باید ۱۱ رقمی باشد");
      onChange(cleanPhone, false);
      return;
    }

    // بررسی پیش‌شماره
    if (!cleanPhone.startsWith("09")) {
      setError("شماره تماس باید با 09 شروع شود");
      onChange(cleanPhone, false);
      return;
    }

    // بررسی معتبر بودن شماره
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setError("شماره تماس معتبر نیست");
      onChange(cleanPhone, false);
    } else {
      setError("");
      onChange(cleanPhone, true);
    }
  };

  const handleChange = (val: string) => {
    // فقط اعداد را نگه دار و به validator پاس بده
    const cleanValue = val.replace(/\D/g, "");
    validatePhone(cleanValue);
  };

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      isRequired={isRequired}
      type="tel"
      maxLength={11}
      minLength={11}
      inputAlign="left"
      allowChars={false} // فقط اعداد
      //isInvalid={!!error} // دقیقاً مثل EmailInput
      errorMessage={error} // دقیقاً مثل EmailInput
    />
  );
};

export default PhoneInput;