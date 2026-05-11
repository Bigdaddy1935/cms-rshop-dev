"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteIcon } from "@/core/hooks/api/useIcon";
import BaseCard from "@/components/ui/BaseCard";
import { Icon } from "./icon-types";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { AiOutlineCloseCircle } from "react-icons/ai";

type IconCardProps = {
  icon: Icon;
  onEdit?: (icon: Record<string, any>) => void;
  showDeselectIcon?: boolean;
  disableAction?: boolean;
  onDelete?: (id: number) => void;
};

const IconCard: React.FC<IconCardProps> = ({
  icon,
  onEdit,
  showDeselectIcon,
  disableAction,
  onDelete,
}) => {
  const { mutate: deleteIcon } = useDeleteIcon();

  return (
    <BaseCard
      bodyClassName="p-2 hover-reveal-parent group"
      onClick={() => onEdit?.(icon)}
      className="rounded-md shadow-none border border-gray-200 hover:shadow-md"
    >
      <div className="hover-reveal-child">
        {!disableAction ? (
          <DeleteButton onDelete={() => deleteIcon({ id: icon.id })} />
        ) : (
          ""
        )}
      </div>

      <div className="hover-reveal-child flex flex-col-reverse items-center gap-1.5">
        {showDeselectIcon && (
          <ActionButton
            icon={<AiOutlineCloseCircle size={18} />}
            onClick={() => {
              onDelete?.(icon.id);
            }}
          />
        )}
      </div>

      {/* نمایش SVG */}
      <div className="border-b border-gray-200 px-12 py-8 w-full flex items-center justify-center">
        <div
          className="[&>svg]:w-7 [&>svg]:h-auto [&>svg]:max-h-7"
          dangerouslySetInnerHTML={{ __html: icon.svg }}
        />
      </div>

      <p className="text-[14px] text-center text-gray-500 pt-4 pb-2">
        {icon.name}
      </p>
    </BaseCard>
  );
};

export default IconCard;
