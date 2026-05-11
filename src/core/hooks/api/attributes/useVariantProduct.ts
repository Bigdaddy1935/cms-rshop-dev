import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* 🎭 Variant Products Start */

export const useAddNewVariantProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/variant-product",
        method: "POST",
        body: data,
        isActiveToast: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

export const useUpdateVariantProduct = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) =>
      fetcher({
        route: `/variant-product/${+id}`,
        method: "PATCH",
        body: data,
        isActiveToast: false,
      }),
  });
};

export const useDeleteVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number | string) =>
      fetcher({
        route: `/variant-product/${+id}`,
        method: "DELETE",
        successText: "با موفقیت حذف شد",
        loadingText: "در حال حذف...",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

export const useDeleteAttributeNode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      attributeId,
      valueId,
    }: {
      productId: number;
      attributeId: number;
      valueId: number;
    }) =>
      fetcher({
        route: `/variant-product/product/${productId}/attributes/${attributeId}/values/${valueId}`,
        method: "DELETE",
        successText: "با موفقیت حذف شد",
        loadingText: "در حال حذف...",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

export const useDeleteAttributeNodeSimple = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      attributeId,
      valueId,
    }: {
      productId: number;
      attributeId: number;
      valueId: number;
    }) =>
      fetcher({
        route: `/product-attributes/product/${productId}/attributes/${attributeId}/values/${valueId}`,
        method: "DELETE",
        successText: "با موفقیت حذف شد",
        loadingText: "در حال حذف...",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

/* 🎭 Variant Products End */
