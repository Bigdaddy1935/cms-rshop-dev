"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

type Meta = {
  total_items: number;
  current_page: number;
  total_pages: number;
};

interface Props {
  meta: Meta;
}

export default function BasePagination({ meta }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return meta?.total_pages > 1 ? (
    <div className="flex justify-center py-6">
      <Pagination
        total={meta?.total_pages}
        page={meta?.current_page}
        onChange={handlePageChange}
        color="secondary"
        showControls
      />
    </div>
  ) : (
    ""
  );
}
