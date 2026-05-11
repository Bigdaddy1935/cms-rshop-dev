"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useFetchOnEdit = <T = any>(
  queryFn: (id?: number) => any,
  paramName = "edit_id"
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get(paramName);

  const editId = useMemo<number | null>(() => {
    if (!idParam) return null; // پارامتر اصلاً وجود ندارد
    const num = Number(idParam);
    return isNaN(num) || num <= 0 ? null : num;
  }, [idParam]);

  useEffect(() => {
    if (idParam !== null && (idParam.trim() === "" || isNaN(Number(idParam)) || Number(idParam) <= 0)) {
      router.back();
    }
  }, [idParam, router]);

  // ⚠️ React Hooks rules: queryFn must be called unconditionally and
  // in the same order on every render. The earlier
  //   `editId !== null ? queryFn(editId) : null`
  // changed the hook order between renders and triggered
  // 'change in order of Hooks called by CreateNewProduct'.
  // queryFn is expected to gate via `enabled: !!id` (useGetOneProduct
  // already does), so calling it unconditionally is safe.
  const query = queryFn(editId ?? undefined);

  return {
    data: query?.data?.data as T | null,
    isLoading: query?.isLoading ?? false,
    isError: query?.isError ?? false,
    error: query?.error ?? null,
    editId,
  };
};
