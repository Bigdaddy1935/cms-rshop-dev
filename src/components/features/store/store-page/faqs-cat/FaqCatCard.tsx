"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import BaseCard from "@/components/ui/BaseCard";
import { useDeleteFaqCategory } from "@/core/hooks/api/faq/useFaqCat";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { MdOutlineQuestionMark } from "react-icons/md";

type FaqCatCardProps = {
  data: any;
  onEdit?: (icon: Record<string, any>) => void;
  disableAction?: boolean;
};

const FaqCatCard: React.FC<FaqCatCardProps> = ({
  onEdit,
  disableAction,
  data,
}) => {
  const { mutate: deleteFaqCat } = useDeleteFaqCategory();

  return (
    <BaseCard
      bodyClassName="p-2 hover-reveal-parent group"
      onClick={() => onEdit?.(data)}
      className="rounded-md shadow-none border border-gray-200 hover:shadow-md"
    >
      <div className="hover-reveal-child flex flex-col gap-2">
        {!disableAction ? (
          <>
            <DeleteButton onDelete={() => deleteFaqCat(data.id)} />
            <ActionButton
              icon={<MdOutlineQuestionMark size={18} />}
              route="/admin/store/store-pages/faqs-cat/faqs"
            />
          </>
        ) : (
          ""
        )}
      </div>

      {/* نمایش SVG */}
      <div className="border-b border-gray-200 px-12 py-8 w-full flex items-center justify-center">
        <div
          className="[&>svg]:w-7 [&>svg]:h-auto [&>svg]:max-h-7"
          dangerouslySetInnerHTML={{ __html: data?.icon?.svg }}
        />
      </div>

      <p className="text-[14px] text-center text-gray-500 pt-4 pb-2">
        {data.name}
      </p>
    </BaseCard>
  );
};

export default FaqCatCard;
