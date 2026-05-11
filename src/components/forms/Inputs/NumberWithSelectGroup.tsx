"use client";

import React from "react";
import NumberWithSelect from "./NumberWithSelect";

export type OptionItem = { key: string | number; title: string };

type Props = {
  label: string;
  minValue?: number | "";
  maxValue?: number | "";
  onMinChange?: (val: number | "") => void;
  onMaxChange?: (val: number | "") => void;

  /** shared select */
  selectValue: string;
  onSelectChange?: (val: string) => void;
  selectOptions: OptionItem[];

  /** placeholders */
  placeholderMin?: string;
  placeholderMax?: string;
};

const NumberWithSelectGroup: React.FC<Props> = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  selectValue,
  onSelectChange,
  selectOptions,
  placeholderMin,
  placeholderMax,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NumberWithSelect
        label={`${label} از`}
        placeholder={placeholderMin ?? ""}
        value={minValue === "" ? undefined : minValue}
        onValueChange={(val) => onMinChange?.(val ?? "")}
        selectedKey={String(selectValue)}
        onSelectChange={(val: string) => onSelectChange?.(val ?? "")} // fallback امن
        options={selectOptions.map((o) => ({ key: String(o.key), title: o.title }))}
      />

      <NumberWithSelect
        label={`${label} تا`}
        placeholder={placeholderMax ?? ""}
        value={maxValue === "" ? undefined : maxValue}
        onValueChange={(val) => onMaxChange?.(val ?? "")}
        selectedKey={String(selectValue)}
        onSelectChange={(val: string) => onSelectChange?.(val ?? "")} // fallback امن
        options={selectOptions.map((o) => ({ key: String(o.key), title: o.title }))}
      />
    </div>
  );
};

export default NumberWithSelectGroup;
