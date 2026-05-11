import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* 🧬 Attributes Start */

export const useAttributesByGroup = (groupedId: number | undefined) => {
  return useQuery({
    queryKey: ["all-attribute", groupedId],
    queryFn: () =>
      fetcher({
        route: `/attribute/group/${groupedId}`,
        isActiveToast: false,
      }),
    enabled: !!groupedId,
  });
};

export const useCreateAttribute = (groupedId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/attribute",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "ویژگی با موفقیت اضافه شد",
        loadingText: "درحال افزودن ویژگی...",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute", groupedId] });
    },
  });
};

export const useUpdateAttributeOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      display_order,
      product_id,
    }: {
      id: number;
      display_order: number;
      product_id: number;
    }) => {
      return fetcher({
        route: `/attribute/${id}/order`,
        method: "PATCH",
        body: { display_order, product_id },
        isActiveToast: false,
      });
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute"] });
      queryClient.invalidateQueries({ queryKey: ["attribute"] });
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

export const useUpdateAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, id }: { data: any; id: number }) => {
      return fetcher({
        route: `/attribute/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "ویژگی با موفقیت بروزرسانی شد",
        loadingText: "درحال بروزرسانی ویژگی...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute"] });
      queryClient.invalidateQueries({ queryKey: ["attribute"] });
    },
  });
};

export const useDeleteAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return fetcher({
        route: `/attribute/${id}`,
        method: "DELETE",
        isActiveToast: true,
        successText: "ویژگی با موفقیت حذف شد",
        loadingText: "درحال حذف ویژگی...",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["all-attribute"] });
      queryClient.invalidateQueries({ queryKey: ["all-attribute-group"] });
      queryClient.removeQueries({ queryKey: ["attribute", id] });
    },
  });
};

/* 🧬 Attributes End */
