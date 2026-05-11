"use client";

import React from "react";
import { toPersianUTC } from "@/core/utils/date";
import { LuPackage } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";
import { SiOpencollective, SiTicktick } from "react-icons/si";
import { IoCloseCircle } from "react-icons/io5";
import { BsArrow90DegRight } from "react-icons/bs";

type ConversationListProps = {
  conversations: Record<string, any>[];
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
};

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  className = "",
  containerRef,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (conv: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("chat-id", conv.id);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <aside
      ref={containerRef}
      className={`min-w-64 w-full min-[640px]:w-fit min-[640px]:border-l min-h-[73vh] overflow-y-auto rounded-md p-1 flex flex-col ${className}`}
    >
      {conversations?.map((conv, index) => {
        const selectedId = Number(searchParams.get("chat-id"));
        const isSelected = selectedId === conv.id;

        return (
          <div
            key={conv.id}
            onClick={() => handleSelect(conv)}
            className={`flex flex-col shadow-none  py-3.5 ${
              index !== conversations.length - 1 ? "border-b" : ""
            } cursor-pointer py-2 px-2.5 hover:scale-95 transition 
              ${isSelected ? "bg-white shadow-md" : ""}`}
          >
            <div className="flex items-center gap-4 justify-between">
              <p className="text-xs text-gray-700">
                {conv?.messages[0]?.sender?.name}
              </p>
              <p className="text-xs text-gray-400">
                {toPersianUTC(conv.messages[0].created_at, {
                  showTime: false,
                })}
              </p>
            </div>

            <div className="mt-2 mr-2 flex items-center gap-2">
              <div className="scale-[-1]">
                <BsArrow90DegRight
                  className="rotate-180 scale-[-1] text-gray-500"
                  size={12}
                />
              </div>
              <p className="text-gray-500 text-xs truncate">
                {conv.messages[0].content}
              </p>
            </div>

            <div className="flex items-center gap-6 justify-between mt-2.5">
              <div>
                {conv.product && (
                  <div className="text-xs text-orange-500 border border-orange-200 bg-orange-50 rounded-lg border-l-0 pl-2 pr-1 py-0.5 flex items-center gap-1.5 truncate">
                    <LuPackage size={17} />
                    <span>{conv.product.title}</span>
                  </div>
                )}
                {!conv.product && (
                  <p className="text-xs text-gray-500 w-fit truncate">
                    {conv.subject}
                  </p>
                )}
              </div>
              <div>
                {conv.status === "open" ||
                  (conv.status === "waiting" && (
                    <SiOpencollective size={16} className="text-orange-400" />
                  ))}
                {conv.status === "answered" && (
                  <SiTicktick size={16} className="text-green-500" />
                )}
                {conv.status === "closed" && (
                  <IoCloseCircle size={17} className="text-red-500" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default ConversationList;
