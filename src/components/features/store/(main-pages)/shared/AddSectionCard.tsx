"use client";

import { HiOutlinePlusSmall } from "react-icons/hi2";

type AddSectionCardProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const AddSectionCard: React.FC<AddSectionCardProps> = ({
  label,
  onClick,
  className = "",
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-full h-28 border-2 border-dashed
        border-slate-600 text-slate-600 bg-slate-50
        transition-all rounded-2xl
        flex justify-center items-center ${className} hover:border-dotted
      `}
    >
      {label && (
        <div className="flex items-center justify-center gap-2">
          <span className="font-medium">{label}</span>
          <HiOutlinePlusSmall className="text-2xl" />
        </div>
      )}
      {children}
    </div>
  );
};

export default AddSectionCard;
