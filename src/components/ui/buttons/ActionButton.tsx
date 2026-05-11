"use client";

import React from "react";
import { useRouter } from "next/navigation";

export type ActionButtonProps = {
  icon: React.ReactNode;
  route?: string;
  onClick?: () => void;
  className?: string;
  stopPropagation?: boolean
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  route,
  onClick,
  className,
  stopPropagation=true
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (route) {
      e.preventDefault();
      stopPropagation && e.stopPropagation();
      router.push(route);
    } else if (onClick) {
      e.preventDefault();
      stopPropagation && e.stopPropagation();
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-gray-100 rounded-lg p-1.5 transition-all ${
        className || ""
      }`}
    >
      {icon}
    </button>
  );
};
