"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

/* =========================================================
   Get All FAQ Categories
========================================================= */

export const useGetFaqCategories = () => {
  return useQuery({
    queryKey: ["store-faq-cat"],
    queryFn: () =>
      fetcher({
        route: "/admin/store-info/faq-categories",
        isActiveToast: false,
      }),
  });
};

/* =========================================================
   Create FAQ Category
========================================================= */

export const useCreateFaqCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/store-info/faq-categories",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد دسته‌بندی...",
        successText: "دسته‌بندی ایجاد شد",
      }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-faq-cat"] });
    },
  });
};

/* =========================================================
   Update FAQ Category
========================================================= */

export const useUpdateFaqCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: number }) =>
      fetcher({
        route: `/admin/store-info/faq-categories/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ویرایش دسته‌بندی...",
        successText: "دسته‌بندی بروزرسانی شد",
      }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-faq-cat"] });
    },
  });
};

/* =========================================================
   Delete FAQ Category
========================================================= */

export const useDeleteFaqCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/store-info/faq-categories/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف دسته‌بندی...",
        successText: "دسته‌بندی حذف شد",
      }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-faq-cat"] });
    },
  });
};
