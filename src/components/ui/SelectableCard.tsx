"use client";

import React, { useState, useEffect } from "react";
import { Tooltip, Checkbox } from "@heroui/react";

type Props = {
  id?: number | string; // 🟢 optional شد – برای dynamic add via cloneElement
  selectedIds?: (number | string)[];
  onSelectionChange?: (id: number | string, isSelected: boolean) => void;
  children?: React.ReactNode; // optional (از قبل)
  disabled?: boolean;
};

const SelectableCard: React.FC<Props> = ({
  id, // حالا optional
  selectedIds = [],
  onSelectionChange,
  children,
  disabled = false,
}) => {
  const [selected, setSelected] = useState(selectedIds.includes(id ?? "")); // fallback خالی برای includes
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setSelected(selectedIds.includes(id ?? "")); // fallback
  }, [selectedIds, id]);

  const handleChange = (newSelected: boolean) => {
    if (disabled || !id) return; // اگر id نباشه، skip
    setSelected(newSelected);
    onSelectionChange?.(id, newSelected);
  };

  return (
    <div
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 p-0.5
    ${
      selected
        ? "shadow-lg shadow-blue-500/10 scale-95"
        : ""
    }
    ${disabled ? "opacity-60 pointer-events-none" : "cursor-pointer"}
  `}
      onClick={() => !disabled && handleChange(!selected)}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {/* لایه انتخاب – فقط وقتی انتخاب شده یا hover */}
      <div
        className={`
      absolute inset-0 pointer-events-none transition-opacity duration-200
      ${selected || hovered ? "opacity-100" : "opacity-0"}
      ${selected ? "bg-blue-50/40" : "bg-black/5 group-hover:bg-black/5"}
    `}
      />

      {/* checkbox کوچک و شیک در گوشه */}
      {!disabled && (hovered || selected) && (
        <div className="absolute top-3 right-3 z-10">
          <Checkbox
            isSelected={selected}
            color="secondary" // یا secondary اگر می‌خوای
            radius="full"
            onValueChange={(v) => handleChange(!!v)}
            // جلوگیری از bubble کردن کلیک به div والد
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* محتوای اصلی کارت */}
      <div className="relative z-0 transition-all duration-300 group-hover:scale-[1.01]">
        {children}
      </div>
    </div>
  );
};

export default SelectableCard;
