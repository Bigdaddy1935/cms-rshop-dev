"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
}

export default function ScrollPagination({
  containerRef,
  currentPage,
  totalPages,
  isLoading = false,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (isLoading) return;
      if (currentPage >= totalPages) return;

      const { scrollTop, scrollHeight, clientHeight } = el;

      // وقتی رسیدیم به ته باکس
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        const nextPage = currentPage + 1;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", nextPage.toString());

        router.push(`?${params.toString()}`);
      }
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, currentPage, totalPages, isLoading, router, searchParams]);

  return null;
}