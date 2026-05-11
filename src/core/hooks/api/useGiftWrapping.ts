"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { ListQueryParams } from "@/core/types";
import { buildListQuery } from "@/core/utils/buildListQuery";

/* ---------------------- Get All Gift Wrappings ---------------------- */
export const useGetGiftWrappings = ({
  page = 1,
  filter,
  search,
  sortBy,
  limit = 40,
}: ListQueryParams) => {
  return useQuery({
    queryKey: ["gift-wrappings", page, filter, search, sortBy, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
        sortBy,
        search,
        filter,
      });

      return fetcher({
        route: `/admin/gift-wrappings?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

/* ---------------------- Get One Gift Wrapping ----------------------- */
export const useGetOneGiftWrapping = (id?: number) => {
  return useQuery({
    queryKey: ["gift-wrapping", id],
    queryFn: () =>
      fetcher({
        route: `/admin/gift-wrappings/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};

/* ---------------------- Upload Images ---------------------- */
export const useUploadGiftWrappingImages = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      fetcher({
        route: "/admin/gift-wrappings/upload",
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gift-wrappings"] });
    },
  });
};

/* ---------------------- Create Gift Wrapping ---------------------- */
export const useCreateGiftWrapping = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/gift-wrappings",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد بسته‌بندی...",
        successText: "بسته‌بندی با موفقیت ایجاد شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gift-wrappings"] });
    },
  });
};

/* ---------------------- Update Gift Wrapping ---------------------- */
export const useUpdateGiftWrapping = (id: number | null) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: `/admin/gift-wrappings/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی بسته‌بندی...",
        successText: "بسته‌بندی بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gift-wrappings"] });
      qc.invalidateQueries({ queryKey: ["gift-wrapping", id] });
    },
  });
};

/* ---------------------- Delete Gift Wrapping ---------------------- */
export const useDeleteGiftWrapping = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/gift-wrappings/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف بسته‌بندی...",
        successText: "بسته‌بندی حذف شد",
      }),
    onSuccess: (_res, id) => {
      qc.invalidateQueries({ queryKey: ["gift-wrappings"] });
      qc.invalidateQueries({ queryKey: ["gift-wrapping", id] });
    },
  });
};

/* ---------------------- Toggle Status ---------------------- */
export const useToggleGiftWrappingStatus = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetcher({
        route: `/admin/gift-wrappings/${id}/toggle-status`,
        method: "PATCH",
        isActiveToast: true,
        loadingText: "در حال تغییر وضعیت...",
        successText: "وضعیت بسته‌بندی بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gift-wrappings"] });
      qc.invalidateQueries({ queryKey: ["gift-wrapping", id] });
    },
  });
};
