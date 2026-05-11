"use client";

import ConversationDetail from "@/components/features/store/support/ConversationDetail";
import ConversationList from "@/components/features/store/support/ConversationList";
import EmptyStateCard from "@/components/feedback/EmptyStateCard";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import {
  SupportSortBy,
  useGetSupportList,
} from "@/core/hooks/api/support/useSupport";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import ScrollPagination from "@/core/hooks/system/InfiniteScrollPagination";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

const ChatPage = () => {
  const router = useRouter();
  const { page } = useListQueryParams<SupportSortBy[number]>();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [allItems, setAllItems] = useState<any[]>([]);

  useEffect(() => {
    if (page !== 1) router.push("?page=1");
  }, []);

  const { data: support, isLoading } = useGetSupportList({ page });

  useEffect(() => {
    if (support?.data?.items) {
      if (page === 1) {
        setAllItems(support.data.items);
      } else {
        setAllItems((prev) => [...prev, ...support.data.items]);
      }
    }
  }, [support, page]);

  const isExistItems = allItems.length > 0;

  if (isLoading && page === 1) {
    return <LoadingApiCall />;
  }

  if (!isExistItems && !isLoading) {
    return <EmptyStateCard />;
  }

  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="w-full flex flex-row gap-2 bg-white rounded-xl h-[80vh] py-6 px-2">
          <ConversationList
            conversations={allItems}
            containerRef={listRef}
            className="overflow-y-auto"
          />
          <ConversationDetail showBackBtn />
        </div>
      </div>
      <ScrollPagination
        containerRef={listRef}
        currentPage={support?.data?.meta.current_page || 1}
        totalPages={support?.data?.meta.total_pages || 1}
        isLoading={isLoading}
      />
    </>
  );
};

export default ChatPage;
