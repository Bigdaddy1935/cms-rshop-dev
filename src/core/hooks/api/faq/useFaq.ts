"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

/* ---------------------- Get All FAQs ---------------------- */
export const useGetFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: () =>
      fetcher({
        route: `/admin/store-info/faqs`,
        isActiveToast: false,
      }),
  });
};

/* ---------------------- Create FAQ ---------------------- */
export const useCreateFaq = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/store-info/faqs",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد سوال...",
        successText: "سوال ایجاد شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

/* ---------------------- Update FAQ ---------------------- */
export const useUpdateFaq = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: number | null }) =>
      fetcher({
        route: `/admin/store-info/faqs/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ویرایش سوال...",
        successText: "سوال بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

/* ---------------------- Delete FAQ ---------------------- */
export const useDeleteFaq = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/store-info/faqs/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف سوال...",
        successText: "سوال حذف شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

/* ---------------------- Bulk Delete FAQs ---------------------- */
export const useBulkDeleteFaqs = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) =>
      fetcher({
        route: "/admin/store-info/faqs/bulk",
        method: "DELETE",
        body: { ids },
        isActiveToast: true,
        loadingText: "در حال حذف دسته‌جمعی...",
        successText: "سوالات حذف شدند",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};
