import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useGetSideBanners = () => {
  const queryKey = ["side-banners"];
  return useQuery({
    queryKey,
    queryFn: () =>
      fetcher({
        route: "/admin/side-banners",
      }),
  });
};

export const useGetOneSideBanner = (id?: number) => {
  return useQuery({
    queryKey: ["side-banner", id],
    queryFn: () => fetcher({ route: `/admin/side-banners/${id}` }),
    enabled: !!id,
  });
};

export const useCreateSideBanner = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/side-banners",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد بنر...",
        successText: "بنر با موفقیت ایجاد شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["side-banners"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useUpdateSideBanner = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({data, id}:{data: any, id: number}) =>
      fetcher({
        route: `/admin/side-banners/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی بنر...",
        successText: "بنر با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["side-banners"] });
      qc.invalidateQueries({ queryKey: ["side-banner"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useDeleteSideBanner = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/side-banners/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف بنر...",
        successText: "بنر با موفقیت حذف شد",
      }),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["side-banners"] });
      qc.invalidateQueries({ queryKey: ["side-banner", id] });
    },
  });
};
