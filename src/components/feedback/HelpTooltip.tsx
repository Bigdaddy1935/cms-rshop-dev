"use client";

import { ReactNode } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { PiQuestion } from "react-icons/pi";
import IconBadge from "../common/IconBadge";

interface HelpTooltipProps {
  children?: ReactNode;
  placement?: "top" | "right" | "bottom" | "left" | "top-start" | "top-end";
  className?: string;
  contentClassName?: string;
  title: string;
  description: string;
}

export function HelpTooltip({
  children,
  placement = "top",
  className,
  contentClassName = "!max-w-[320px] text-sm p-4",
  description,
  title,
}: HelpTooltipProps) {
  return (
    <Popover
      placement={placement}
      showArrow={true}
      backdrop="blur"
      offset={8}
      className={className}
    >
      <PopoverTrigger className="!border-none !h-fit">
        <div>
          <IconBadge
            icon={PiQuestion}
            circleClassName="bg-orange-100 !rounded-lg !w-6 !h-6"
            iconClassName="text-yellow-600 -top-[43px] -left-[6px] w-6 animate-pulse"
            wrapperClassName="cursor-pointer"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className={contentClassName}>
        {children}
        <div className="flex flex-col gap-4 max-w-[430px]">
          <p className="text-lg p-3">{title}</p>
          <div className="text-gray-600 leading-7 whitespace-pre-wrap break-words font-[Dana-Medium] max-h-[500px] overflow-y-auto">
            <p className="p-3">{description}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
