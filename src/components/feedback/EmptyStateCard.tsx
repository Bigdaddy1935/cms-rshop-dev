"use client";

import { LiaListOlSolid } from "react-icons/lia";
import IconBadge from "../common/IconBadge";

type EmptyStateCardProps = {
  message?: string;
  icon?: any;
  className?: string;
};

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  message = "هنوز موردی اضافه نشده. برای افزودن، از گزینه بالا استفاده کنید.",
  icon = LiaListOlSolid,
  className = "",
}) => {
  return (
    <div
      className={`w-full flex flex-col items-center gap-4 py-6 ${className}`}
    >
      <IconBadge
        icon={icon}
        circleClassName="bg-sky-100"
        iconClassName="text-sky-600"
      />
      <p className="text-gray-700 text-sm text-center">{message}</p>
    </div>
  );
};

export default EmptyStateCard;
