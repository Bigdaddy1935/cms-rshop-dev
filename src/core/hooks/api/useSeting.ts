import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useGetSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => {
      return fetcher({ route: "/admin/settings", isActiveToast: false });
    },
  });
};

export const useGetSetting = (key: string) => {
  return useQuery({
    queryKey: ["setting"],
    queryFn: () => {
      return fetcher({
        route: `/admin/settings/${key}`,
        isActiveToast: false,
      });
    },
  });
};

export const useInfosCreate = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return fetcher({
        route: "/admin/settings/bulk-upsert",
        method: "POST",
        body: { settings: data },
        isActiveToast: true,
        successText: "عملیات با موفقیت انجام شد",
        loadingText: "در حال ثبت تغیرات",
      });
    },
  });
};

export const useSettingCreate = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return fetcher({
        route: "/admin/settings/upsert",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "عملیات با موفقیت انجام شد",
        loadingText: "در حال ثبت تغیرات",
      });
    },
  });
};

export const useUpdateHomePageLayout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ type }: { type: "side_by_side" | "stacked" }) =>
      fetcher({
        route: `/admin/settings/homepage-layout/${type}`,
        method: "PATCH",
        isActiveToast: true,
        loadingText: "در حال بروزرسانی چیدمان...",
        successText: "چیدمان با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};
