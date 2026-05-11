import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

/* =======================
   Get all promo banners
======================= */
export const useGetPromoBanners = () => {
  return useQuery({
    queryKey: ["promo-banners"],
    queryFn: () =>
      fetcher({
        route: "/admin/promo-banner",
      }),
  });
};

/* =======================
   Create promo banner
======================= */
export const useCreatePromoBanner = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/promo-banner",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد بنر تبلیغاتی...",
        successText: "بنر تبلیغاتی با موفقیت ایجاد شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["promo-banners"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

/* =======================
   Update promo banner
======================= */
export const useUpdatePromoBanner = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      fetcher({
        route: `/admin/promo-banner/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی بنر...",
        successText: "بنر تبلیغاتی با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["promo-banners"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

/* =======================
   Delete promo banner
======================= */
export const useDeletePromoBanner = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/promo-banner/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف بنر...",
        successText: "بنر تبلیغاتی با موفقیت حذف شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["promo-banners"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useUpdatePromoBannerOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      display_order,
    }: {
      id: number;
      display_order: any;
    }) => {
      return fetcher({
        route: `/admin/promo-banner/${id}/order`,
        method: "PATCH",
        body: { display_order },
        isActiveToast: true,
        successText: "با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};