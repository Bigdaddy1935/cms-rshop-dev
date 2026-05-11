"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export function useListQueryParams<TSort extends string = string>(
  options?: {
    searchKey?: string;
  }
) {
  const searchParams = useSearchParams();

  const searchKey = options?.searchKey ?? "search";

  // page
  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams.toString()]);

  // sortBy
  const sortBy = useMemo(() => {
    const sorts = searchParams.getAll("sortBy") as TSort[];
    return sorts.length ? sorts : undefined;
  }, [searchParams.toString()]);

  // search (داینامیک با دیفالت "search")
  const search = useMemo(() => {
    const s = searchParams.get(searchKey)?.trim();
    return s ? s : undefined;
  }, [searchParams.toString(), searchKey]);

  // filters
  const filter = useMemo(() => {
    const f: Record<string, string[]> = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!key.startsWith("filter.")) continue;
      const [, field] = key.split(".");
      if (!field) continue;
      if (!f[field]) f[field] = [];
      f[field].push(value);
    }
    return Object.keys(f).length ? f : undefined;
  }, [searchParams.toString()]);

  const isFilteredView = !!(search || sortBy?.length || filter);

  return {
    page,
    sortBy,
    search,
    filter,
    isFilteredView,
  };
}
