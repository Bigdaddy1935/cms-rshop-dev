"use client";

import React, { useMemo } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

type Option = {
  value: number | string;
  label: string;
  color?: string;
};

type Props = {
  label?: string;
  options: Option[];
  selectedValues: (number | string)[];
  onChange: (values: (number | string)[]) => void;
  isDisabled?: boolean;
  placeholder?: string;
};

export default function AnimatedMultiSelect({
  label = "مقادیر ویژگی",
  options,
  selectedValues,
  onChange,
  isDisabled = false,
  placeholder = "جستجو یا انتخاب کنید...",
}: Props) {
  // تبدیل selectedValues به فرمت react-select
  const selectedOptions = useMemo(
    () =>
      options.filter((opt) =>
        selectedValues.map(String).includes(String(opt.value))
      ),
    [options, selectedValues]
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Select
        closeMenuOnSelect={false}
        isMulti
        isDisabled={isDisabled}
        options={options}
        value={selectedOptions}
        onChange={(selected) => {
          const ids = (selected || []).map((s: any) => s.value);
          onChange(ids);
        }}
        placeholder={placeholder}
        components={animatedComponents}
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#F3F4F6",
            borderRadius: "0.75rem",
            borderColor: "transparent",
            boxShadow: "none",
            "&:hover": { borderColor: "#a78bfa" },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#a78bfa"
              : state.isFocused
              ? "#ede9fe"
              : "white",
            color: state.isSelected ? "white" : "#111827",
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#f3e8ff",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#6b21a8",
          }),
        }}
      />
    </div>
  );
}
