"use client";

import { IconType } from "react-icons";

type IconBadgeProps = {
  icon: IconType;
  wrapperClassName?: string;
  circleClassName?: string;
  iconClassName?: string;
};

const IconBadge = ({
  icon: Icon,
  wrapperClassName = "",
  circleClassName = "",
  iconClassName = "",
}: IconBadgeProps) => {
  return (
    <div className={`w-fit relative ${wrapperClassName}`}>
      <div className={`w-[100px] h-[100px] rounded-full ${circleClassName}`} />
      <Icon
        className={`absolute -top-4 -left-4 text-[100px] ${iconClassName}`}
      />
    </div>
  );
};

export default IconBadge;
