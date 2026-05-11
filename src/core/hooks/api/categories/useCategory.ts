"use client";

import { ListQueryParams } from "@/core/types";
import { buildListQuery } from "@/core/utils/buildListQuery";
import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type CategorySortBy = Array<
  "id:ASC" | "id:DESC" | "name:ASC" | "name:DESC" | "logo:ASC" | "logo:DESC"
>;

export const useGetCategories = ({
  page = 1,
  filter,
  search,
  sortBy,
  limit = 10,
}: ListQueryParams) => {
  return useQuery({
    queryKey: ["categories", page, filter, search, sortBy, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
        sortBy,
        search,
        filter,
      });

      return fetcher({
        route: `/category?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: () =>
      fetcher({
        route: "/category/site",
        isActiveToast: false,
      }),
  });
};

export const useGetCategory = (id?: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () =>
      fetcher({
        route: `/category/${id}`,
        isActiveToast: true,
        loadingText: "درحال گرفتن مقادیر دسته بندی فعلی",
        successText: "دسته‌بندی آماده ویرایش است",
      }),
    enabled: !!id,
  });
};

/* -------- Mutations -------- */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/category",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال اضافه کردن دسته بندی جدید",
        successText: "دسته بندی با موفقیت اضافه شد!"
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) =>
      fetcher({
        route: `/category/${data.id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی دسته بندی",
        successText: "دسته بندی با موفقیت بروزرسانی شد!"
      }),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/category/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف دسته‌بندی",
        successText: "دسته‌بندی حذف شد",
      }),
    onSuccess: (_res, id) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
  });
};

export const useCategoryImageUpload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      fetcher({
        route: "/category/upload",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال آپلود عکس",
        successText: "آپلود عکس موفقیت آمیز بود!",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
  });
};
