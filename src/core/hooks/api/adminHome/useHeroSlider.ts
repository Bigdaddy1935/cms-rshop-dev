import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useGetHeroSliders = () => {
  return useQuery({
    queryKey: ["hero-sliders"],
    queryFn: () => fetcher({ route: "/admin/hero-sliders" }),
  });
};

export const useGetOneHeroSlider = (id?: number) => {
  return useQuery({
    queryKey: ["hero-slider", id],
    queryFn: () => fetcher({ route: `/admin/hero-sliders/${id}` }),
    enabled: !!id,
  });
};

export const useCreateHeroSlider = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/hero-sliders",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد اسلایدر...",
        successText: "اسلایدر با موفقیت ایجاد شد",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["home"] }),
  });
};

export const useUpdateHeroSlider = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: number }) =>
      fetcher({
        route: `/admin/hero-sliders/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی اسلایدر...",
        successText: "اسلایدر با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["hero-slider"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useUpdateHeroOrder = () => {
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
        route: `/admin/hero-sliders/${id}/order`,
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

export const useDeleteHeroSlider = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/hero-sliders/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف اسلایدر...",
        successText: "اسلایدر با موفقیت حذف شد",
      }),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["hero-sliders"] });
      qc.invalidateQueries({ queryKey: ["hero-slider", id] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useUpdateHeroSlidersSortOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; sort_order: number }[]) =>
      fetcher({
        route: "/admin/hero-sliders/sort-order",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی ترتیب نمایش...",
        successText: "ترتیب اسلایدرها با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hero-sliders"] }),
  });
};
