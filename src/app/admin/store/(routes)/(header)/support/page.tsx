"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import SupportFilter from "@/components/features/store/support/Filter/SupportFilter";
import {
  SupportSortBy,
  useGetSupportList,
} from "@/core/hooks/api/support/useSupport";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
// Icons
import { MdOutlineSupportAgent } from "react-icons/md";
import ConversationList from "@/components/features/store/support/ConversationList";
import ConversationDetail from "@/components/features/store/support/ConversationDetail";
import { TfiFullscreen } from "react-icons/tfi";
import ScrollPagination from "@/core/hooks/system/InfiniteScrollPagination";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatID = searchParams.get("chat-id");

  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<SupportSortBy[number]>();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [allItems, setAllItems] = useState<any[]>([]);

  useEffect(() => {
    if (page !== 1) router.push("?page=1");
  }, []);

  const { data: support, isLoading } = useGetSupportList({
    page,
    filter,
    search,
    sortBy,
  });

  useEffect(() => {
    if (support?.data?.items) {
      if (page === 1) {
        setAllItems(support.data.items);
      } else {
        setAllItems((prev) => [...prev, ...support.data.items]);
      }
    }
  }, [support, page]);

  const isExistItems = !!support?.data?.items?.length;

  return (
    <>
      <UnifiedCard
        searchFilter={<SupportFilter />}
        headerProps={{
          title: "پشتیبانی",
          icon: <MdOutlineSupportAgent className="text-2xl" />,
          className: "p-2 mb-4",
          btnIcon: <TfiFullscreen size={16} />,
          textBtn: "تمام صفحه",
          redirect: "/chat",
          tooltipTitle: "پشتیبانی کاربران",
          tooltipDescription:
            "در این بخش می‌توانید با کاربران و کاربران فروشگاه ارتباط برقرار کنید، درخواست‌ها و مشکلات آن‌ها را مشاهده و پاسخ دهید. با دکمه 'تمام صفحه' می‌توانید محیط چت را در حالت فول‌اسکرین باز کرده و تجربه مدیریت راحت‌تری داشته باشید.",
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        bodyClassName="p-0"
      >
        <div className="w-full flex flex-row gap-2">
          {!chatID ? (
            <ConversationList
              conversations={allItems}
              className="max-h-[73vh]"
              containerRef={listRef}
            />
          ) : (
            ""
          )}
          {chatID ? (
            <ConversationDetail showBackBtn />
          ) : (
            <div className="hidden min-[640px]:flex w-full">
              <ConversationDetail />
            </div>
          )}
        </div>
      </UnifiedCard>
      <ScrollPagination
        containerRef={listRef}
        currentPage={support?.data?.meta.current_page || 1}
        totalPages={support?.data?.meta.total_pages || 1}
        isLoading={isLoading}
      />
    </>
  );
};

export default Products;
