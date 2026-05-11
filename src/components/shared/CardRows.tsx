"use client";

import React from "react";

type RowItem = {
  label: string;
  value: string | number;
  bgLabel?: string;
};

type Props = {
  items: RowItem[];
  disableOddBg?: boolean;
  disableCol?: boolean;
};

const CardRows: React.FC<Props> = ({
  items,
  disableOddBg = false,
  disableCol = false,
}) => {
  return (
    <div className="flex flex-col divide-y divide-gray-200 rounded-lg overflow-hidden">
      {items.map((row, index) => (
        <div
          key={index}
          className={`flex border-none justify-between items-center gap-8 rounded-xl px-3 py-2 text-sm ${
            index % 2 === 1 && !disableOddBg ? "bg-slate-100" : "bg-white"
          }`}
        >
          <span className="text-gray-800 text-nowrap">
            {row.label}
            {!disableCol ? ":" : ""}
          </span>
          <span className={`font-medium text-gray-600 ${row.bgLabel} truncate`}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CardRows;
