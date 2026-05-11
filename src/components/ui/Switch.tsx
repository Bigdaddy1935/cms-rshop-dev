"use client";

import { Switch as SwitchHero, SwitchProps } from "@heroui/react";

const Switch: React.FC<SwitchProps> = ({ children, size = "sm", ...props }) => {
  return (
    <div className="flex items-center gap-3">
      <SwitchHero {...props} size={size} />
      {children && <span className="text-sm">{children}</span>}
    </div>
  );
};

export default Switch;