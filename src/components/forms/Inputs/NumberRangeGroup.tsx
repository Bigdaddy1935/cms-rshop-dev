"use client";

import NumberInput from "@/components/ui/inputs/NumberInput";
import React from "react";


type Props = {
  label: string;

  /** مقادیر کنترل‌شده */
  minValue?: number | "";
  maxValue?: number | "";
  onMinChange?: (val: number | "") => void;
  onMaxChange?: (val: number | "") => void;

  /** placeholder ها */
  placeholderMin?: string;
  placeholderMax?: string;

  /** حداقل مجاز */
  min?: number;
};

const NumberRangeGroup: React.FC<Props> = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  placeholderMin,
  placeholderMax,
  min = 0,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* MIN */}
      <NumberInput
        label={`${label} از`}
        placeholder={placeholderMin ?? ""}
        min={min}
        value={minValue === "" ? undefined : minValue}
        onChange={(v) => onMinChange?.(v === undefined ? "" : v)}
      />

      {/* MAX */}
      <NumberInput
        label={`${label} تا`}
        placeholder={placeholderMax ?? ""}
        min={min}
        value={maxValue === "" ? undefined : maxValue}
        onChange={(v) => onMaxChange?.(v === undefined ? "" : v)}
      />
    </div>
  );
};

export default NumberRangeGroup;
