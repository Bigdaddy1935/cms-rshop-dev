import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* 📁 Attribute Groups Start */

export const useAttributesByGroupGroup = () => {
  return useQuery({
    queryKey: ["all-attribute-group"],
    queryFn: () =>
      fetcher({
        route: "/attribute-group",
        isActiveToast: false,
      }),
  });
};

export const useCreateAttributeGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/attribute-group",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "گروه ویژگی با موفقیت اضافه شد",
        loadingText: "درحال افزودن گروه ویژگی...",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
    },
  });
};

export const useUpdateAttributeOrderGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      display_order,
      product_id,
    }: {
      id: number;
      display_order: any;
      product_id: number;
    }) => {
      return fetcher({
        route: `/attribute-group/${id}/order`,
        method: "PATCH",
        body: { display_order, product_id },
        isActiveToast: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
       queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

export const useUpdateAttributeGroup = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return fetcher({
        route: `/attribute-group/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "دسته بندی با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی دسته بندی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
    },
  });
};

export const useDeleteAttributeGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return fetcher({
        route: `/attribute-group/${id}`,
        method: "DELETE",
        isActiveToast: true,
        successText: "دسته بندی با موفقیت حذف شد",
        loadingText: "درحال حذف دسته بندی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
    },
  });
};

/* 📁 Attribute Groups End */
