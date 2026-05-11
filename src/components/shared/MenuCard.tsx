"use client"

import React from "react";
import BaseCard from "../ui/BaseCard";

interface DashboardMenuCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

const MenuCard: React.FC<DashboardMenuCardProps> = ({
  title,
  subtitle,
  icon,
  color,
  path,
}) => {
  return (
    <BaseCard
      redirect={path}
      className="shadow-sm hover:border-secondary hover:shadow-md hover:shadow-secondary-light"
      bodyClassName="flex flex-row items-center gap-4 p-4 select-none"
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg ${color}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mt-1 leading-5">{subtitle}</p>
      </div>
    </BaseCard>
  );
};

export default MenuCard;
