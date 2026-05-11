"use client";

import React from "react";
import { IconType } from "react-icons";

interface InfoCardProps {
  icon: IconType;
  title: string;
  value: string;
  className?: string;
  iconClassName?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  title,
  value,
  className = "",
  iconClassName = "text-blue-500",
}) => {
  return (
    <div
      className={`flex items-start gap-3 p-3 bg-white rounded-2xl shadow-md border border-gray-200 ${className}`}
    >
      <div className={`p-2 rounded-lg bg-blue-50 ${iconClassName}`}>
        <Icon className="text-xl" />
      </div>
      
      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-1">{title}</div>
        <div className="text-sm font-medium text-gray-800">{value}</div>
      </div>
    </div>
  );
};

export default InfoCard;