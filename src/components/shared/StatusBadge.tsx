"use client";

import React from "react";

type Props = {
  isActive: boolean;
  size?: "sm" | "md" | "lg";
  activeText?: string;
  inactiveText?: string;
  className?: string;
};

const StatusBadge: React.FC<Props> = ({
  isActive,
  size = "sm",
  activeText = "فعال",
  inactiveText = "غیرفعال",
  className = "",
}) => {
  let sizeClasses = "";
  switch (size) {
    case "sm":
      sizeClasses = "px-2 py-0.5 text-xs";
      break;
    case "md":
      sizeClasses = "px-3 py-1 text-sm";
      break;
    case "lg":
      sizeClasses = "px-4 py-1.5 text-base";
      break;
  }

  return (
    <span
      className={`${sizeClasses} rounded-lg w-fit py-1 ${
        isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-700"
      } ${className}`}
    >
      {isActive ? activeText : inactiveText}
    </span>
  );
};

export default StatusBadge;
