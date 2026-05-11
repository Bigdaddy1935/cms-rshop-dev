import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useGetHomeSections = () => {
  return useQuery({
    queryKey: ["home-sections"],
    queryFn: () => fetcher({ route: "/admin/home-sections" }),
  });
};

export const useGetOneHomeSection = (id?: number) => {
  return useQuery({
    queryKey: ["home-section", id],
    queryFn: () => fetcher({ route: `/admin/home-sections/${id}` }),
    enabled: !!id,
  });
};

export const useCreateHomeSection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/home-sections",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد بخش...",
        successText: "بخش با موفقیت ایجاد شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["home-sections"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useUpdateHomeSection = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: `/admin/home-sections/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی بخش...",
        successText: "بخش با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["home-sections"] });
      qc.invalidateQueries({ queryKey: ["home-section", id] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useDeleteHomeSection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/home-sections/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف بخش...",
        successText: "بخش با موفقیت حذف شد",
      }),
    onSuccess: (_data) => {
      qc.invalidateQueries({ queryKey: ["home-sections"] });
      qc.invalidateQueries({ queryKey: ["home-section"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useUpdateSectionOrder = () => {
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
        route: `/admin/home-sections/${id}/order`,
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

export const useGetHomeSectionProducts = (id: number) => {
  return useQuery({
    queryKey: ["home-section-products", id],
    queryFn: () => fetcher({ route: `/admin/home-sections/${id}/products` }),
    enabled: !!id,
  });
};
