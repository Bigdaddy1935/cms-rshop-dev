"use client"

import { useState } from "react";
import Switch from "../ui/Switch";

type SwitchWrapperProps = {
  label: string;
  description?: string;
  initialSelected?: boolean;
  children?: React.ReactNode;
  onChange?: (selected: boolean) => void;
};

const SwitchWrapper = ({
  label,
  description,
  initialSelected = false,
  children,
  onChange,
}: SwitchWrapperProps) => {
  const [isSelected, setIsSelected] = useState(initialSelected);

  const handleChange = (value: boolean) => {
    setIsSelected(value);
    onChange?.(value); // وضعیت رو به parent میفرسته
  };

  return (
    <div className="flex flex-col gap-4 border rounded-xl p-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          {description && (
            <p className="text-gray-600 text-[13px]">{description}</p>
          )}
        </div>
        <Switch
          size="sm"
          aria-label={label}
          isSelected={isSelected}
          onValueChange={handleChange}
        />
      </div>

      {isSelected && children}
    </div>
  );
};

export default SwitchWrapper;
