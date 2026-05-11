"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import BaseCard from "@/components/ui/BaseCard";
import { useDeleteFaq } from "@/core/hooks/api/faq/useFaq";

type FaqCardProps = {
  data: any;
  onEdit?: (faq: Record<string, any>) => void;
  disableAction?: boolean;
};

const FaqCard: React.FC<FaqCardProps> = ({ onEdit, disableAction, data }) => {
  const { mutate: deleteFaq } = useDeleteFaq();

  return (
    <BaseCard
      bodyClassName="p-4 hover-reveal-parent group cursor-pointer"
      onClick={() => onEdit?.(data)}
      className="rounded-md shadow-none border border-gray-200 hover:shadow-md"
    >
      {/* دکمه حذف */}
      <div className="hover-reveal-child">
        {!disableAction ? (
          <DeleteButton onDelete={() => deleteFaq(data.id)} />
        ) : null}
      </div>

      <div className="pb-3 text-gray-600 border-b border-slate-100 mb-3 flex items-center gap-2">
        <div
          className="[&>svg]:w-5 [&>svg]:h-auto [&>svg]:max-h-5"
          dangerouslySetInnerHTML={{ __html: data?.faq_category?.icon?.svg }}
        />
        <p className="text-[13px]">{data?.faq_category?.name}</p>
      </div>

      {/* عنوان سوال */}
      <p className="text-[14px] font-medium">{data.question}</p>

      {/* پاسخ کوتاه */}
      <p className="text-[13px] text-gray-500 pt-2">
        {data.answer.length > 80
          ? data.answer.slice(0, 80) + "..."
          : data.answer}
        {/* آیکون دسته‌بندی */}
      </p>
    </BaseCard>
  );
};

export default FaqCard;
