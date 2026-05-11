"use client";

import React from "react";

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  className?: string;
};

const QuantityCounter: React.FC<Props> = ({
  value,
  min = 1,
  max = 999999,
  onChange,
  disabled = false,
  className = "",
}) => {
  const dec = () => {
    if (disabled) return;
    const nv = Math.max(min, value - 1);
    onChange(nv);
  };
  const inc = () => {
    if (disabled) return;
    const nv = Math.min(max, value + 1);
    onChange(nv);
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-2 py-1 ${className}`}
      aria-hidden
    >
      <button
        type="button"
        onClick={dec}
        disabled={disabled || value <= min}
        className="px-2 disabled:opacity-50"
      >
        -
      </button>
      <div className="min-w-[36px] text-center">{value}</div>
      <button
        type="button"
        onClick={inc}
        disabled={disabled || value >= max}
        className="px-2 disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
};

export default QuantityCounter;
