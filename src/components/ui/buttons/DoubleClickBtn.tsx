"use client";

import { Button } from "@heroui/react";
import React, { useRef, useState } from "react";

type Props = {
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  variant?: "flat" | "bordered" | "ghost" | "light" | "shadow" | "solid";
  size?: "sm" | "md" | "lg";
  className?: string;
  startContent?: React.ReactNode;
  isActiveDoubleClick?: boolean;
  onPress: () => void;
  textBtn: string | React.ReactNode;
  isDisabled?: boolean;
  msg?: string;
};

const DoubleClickBtn: React.FC<Props> = ({
  className = "",
  color = "default",
  size = "md",
  startContent = "",
  variant = "flat",
  isActiveDoubleClick = false,
  onPress,
  textBtn,
  isDisabled: isDisabledBtn = false,
  msg = "دوباره کلیک کنید",
}) => {
  const [textButton, setTextButton] = useState(textBtn);
  const [isDisabled, setIsDisabled] = useState(isDisabledBtn);
  const submitedRef = useRef<boolean>(false);

  const handleDoubleClick = () => {
    setTextButton(msg);
    setTimeout(() => {
      if (!submitedRef.current) {
        setTextButton(textBtn);
      }
    }, 3000);
  };

  const handleClick = () => {
    setTextButton("تایید شد!!");
    setIsDisabled(true);
    submitedRef.current = true;
    onPress();
    setTimeout(() => {
      submitedRef.current = false;
      setTextButton(textBtn);
      setIsDisabled(false);
    }, 4000);
  };

  const handlePress = () => {
    if (!isActiveDoubleClick || textButton === msg) {
      handleClick();
    } else {
      handleDoubleClick();
    }
  };

  return (
    <Button
      color={color}
      variant={variant}
      onPress={handlePress}
      size={size}
      className={`${className} ${textButton === msg ? "animate-bounce" : ""}`}
      startContent={startContent}
      isDisabled={isDisabled}
    >
      {textButton}
    </Button>
  );
};

export default DoubleClickBtn;
