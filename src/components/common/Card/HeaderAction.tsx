"use client";

import { Button } from "@heroui/react";

type Props = {
  title: string;
  textBtn: string;
  onPress: () => void;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode
};

const HeaderAction: React.FC<Props> = ({
  title,
  size = "md",
  onPress,
  isDisabled = false,
  textBtn,
  icon
}) => {
  return (
    <div className="w-full flex items-center justify-between mt-2">
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-gray-600 text-[15px]">{title}</span>
      </div>
      <Button
        color="secondary"
        variant="flat"
        size={size}
        onPress={onPress}
        isDisabled={isDisabled}
      >
        {textBtn}
      </Button>
    </div>
  );
};

export default HeaderAction;
