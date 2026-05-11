"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

/* ---------------------- Get All Store Infos ---------------------- */
export const useGetStoreInfos = () => {
  return useQuery({
    queryKey: ["store-infos"],
    queryFn: () =>
      fetcher({
        route: "/admin/store-info",
        isActiveToast: false,
      }),
  });
};

/* ---------------------- Create Store Info ---------------------- */
export const useCreateStoreInfo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/store-info",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد صفحه اطلاعاتی...",
        successText: "صفحه اطلاعاتی ایجاد شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-infos"] });
    },
  });
};

/* ---------------------- Upsert Store Info ---------------------- */
export const useUpsertStoreInfo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/store-info/upsert",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ذخیره اطلاعات...",
        successText: "اطلاعات ذخیره شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-infos"] });
    },
  });
};

/* ---------------------- Update Store Info By Type ---------------------- */
export const useUpdateStoreInfo = (type: string | null) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: `/admin/store-info/${type}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی...",
        successText: "صفحه بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-infos"] });
    },
  });
};