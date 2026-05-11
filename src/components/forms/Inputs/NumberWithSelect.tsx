"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import FieldErrorText from "@/components/forms/FieldErrorText";
import {
  normalizeDigits,
  formatNumberWithCommas,
  caretFromDigitIndex,
} from "@/core/utils/number";

type NumberOption = { key: string; title: string };

type Props = {
  label: string;
  placeholder?: string;
  value?: number;
  onValueChange: (val: number | undefined) => void;
  selectedKey: string;
  onSelectChange: (val: string) => void;
  options: NumberOption[];
  isRequired?: boolean;
  style?: string;
  errorMessage?: string;
  maxValue?: number;
  minValue?: number;
  formatWithCommas?: boolean;
  suffix?: string;
};

const NumberWithSelect: FC<Props> = ({
  label,
  placeholder = "1",
  value,
  onValueChange,
  selectedKey,
  onSelectChange,
  options,
  isRequired = false,
  style,
  errorMessage,
  maxValue,
  minValue = 0,
  formatWithCommas = false,
  suffix,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    if (value === null || value === undefined || Number.isNaN(value)) {
      setDisplay("");
      return;
    }
    const s = String(Math.floor(Number(value)));
    setDisplay(formatWithCommas ? formatNumberWithCommas(s) : s);
  }, [value, formatWithCommas]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const cursor = el.selectionStart ?? el.value.length;

    const rawNorm = normalizeDigits(el.value);
    const leftPart = rawNorm.slice(0, cursor);
    const leftDigitsCount = (leftPart.match(/\d/g) || []).length;

    let digits = rawNorm.replace(/[^\d]/g, "");

    if (digits !== "") {
      let num = Number(digits);
      if (typeof minValue === "number" && num < minValue) num = minValue;
      if (typeof maxValue === "number" && num > maxValue) num = maxValue;
      digits = String(num);
    }

    const nextDisplay = formatWithCommas
      ? formatNumberWithCommas(digits)
      : digits;
    setDisplay(nextDisplay);
    onValueChange(digits === "" ? undefined : Number(digits));

    requestAnimationFrame(() => {
      const pos = caretFromDigitIndex(nextDisplay, leftDigitsCount);
      inputRef.current?.setSelectionRange(pos, pos);
    });
  };

  const handleSelectChange = (val: string) => {
    setDisplay("");
    onValueChange(undefined);
    onSelectChange(val);
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${style || ""}`}>
      <Input
        ref={inputRef as any}
        dir="ltr"
        lang="en"
        inputMode="numeric"
        type="text"
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        isRequired={isRequired}
        value={display}
        onChange={handleChange}
        className="text-right"
        endContent={
          <div className="min-w-[110px] flex items-center gap-2">
            {suffix && (
              <div className="pointer-events-none text-default-400 text-small">
                {suffix}
              </div>
            )}
            <Select
              isRequired
              labelPlacement="outside"
              aria-label="select"
              placeholder="مقداری را وارد کنید"
              selectedKeys={[selectedKey]}
              onChange={(e) => handleSelectChange(e.target.value)}
              classNames={{
                trigger:
                  "!border-0 !pr-6 !bg-transparent",
              }}
            >
              {options.length ? (
                options.map((opt) => (
                  <SelectItem key={opt.key}>{opt.title}</SelectItem>
                ))
              ) : (
                <SelectItem key="-1" isDisabled>
                  گزینه‌ای وجود ندارد
                </SelectItem>
              )}
            </Select>
          </div>
        }
        autoComplete="off"
        isInvalid={!!errorMessage?.length}
        errorMessage={
          errorMessage?.length ? (
            <FieldErrorText error={errorMessage} />
          ) : undefined
        }
        classNames={{
          inputWrapper: "!pl-0"
        }}
      />
    </div>
  );
};

export default NumberWithSelect;
