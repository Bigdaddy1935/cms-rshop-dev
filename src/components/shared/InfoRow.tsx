"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { BiCopy } from "react-icons/bi";

type Props = {
  label: string;
  value: string;
  isActiveBg?: boolean;
  hoverable?: boolean; // اضافه شد
  valueStyle? : string
};

const InfoRow: React.FC<Props> = ({
  isActiveBg = false,
  label,
  value,
  hoverable = false, // پیش‌فرض true
  valueStyle= ""
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast.success("با موفقیت کپی شد.");
  };

  return (
    <div className="space-y-1">
      <div
        className={`relative group flex flex-col gap-2 phone:flex-row phone:gap-0 justify-between items-center rounded-md p-1 ${
          isActiveBg ? "bg-slate-100" : ""
        } ${hoverable ? "cursor-pointer" : ""}`}
      >
        {/* Label */}
        <span
          className={`text-default-600 w-full text-nowrap p-1 pr-2 text-right ${
            hoverable ? "group-hover:opacity-0" : ""
          }`}
        >
          {label}
        </span>

        {/* Value + Copy */}
        <div
          className={`pl-1.5 flex items-center justify-center transition-all duration-200 ${
            hoverable ? "group" : ""
          }`}
        >
          <p
            className={`font-medium text-[13px] w-48 truncate text-left ${valueStyle} ${
              hoverable
                ? `group-hover:overflow-visible group-hover:w-full group-hover:absolute top-2 -right-2.5 group-hover:whitespace-normal`
                : ""
            }`}
          >
            {value}
          </p>

          {/* Copy Icon */}
          {hoverable && (
            <button
              onClick={handleCopy}
              className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 z-10 rounded-md bg-slate-200 hover:bg-slate-100 transition-all"
            >
              <BiCopy className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoRow;
