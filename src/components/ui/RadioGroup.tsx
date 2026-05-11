"use client";

import { RadioGroup as RadioGroupHero, Radio } from "@heroui/react";

export type RadioOption = {
  label: string;
  value: string;
};

export interface RadioGroupProps {
  label?: string;
  description?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  className?: string;
  groupClassName?: string;
  radioSize?: "sm" | "md" | "lg";
}

export default function RadioGroup({
  label,
  description,
  options = [],
  value,
  onChange,
  orientation = "vertical",
  className = "",
  groupClassName = "",
  radioSize = "sm",
}: RadioGroupProps) {
  return (
    <div className={className}>
      <RadioGroupHero
        label={label}
        description={description}
        value={value}
        onValueChange={onChange}
        orientation={orientation}
      >
        <div
          className={`mt-2 mb-4 ${groupClassName}`}
        >
          {options.map((opt) => (
            <Radio
              key={opt.value}
              value={opt.value}
              className="text-gray-700 gap-1.5"
              size={radioSize}
            >
              {opt.label}
            </Radio>
          ))}
        </div>
      </RadioGroupHero>
    </div>
  );
}
