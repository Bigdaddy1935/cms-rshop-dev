import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Not Used
export const useGetAttributeProduct = (productId?: number) => {
  return useQuery({
    queryKey: ["product-attributes", productId],
    enabled: !!productId,
    queryFn: () =>
      fetcher({
        route: `/product-attributes/product/${productId}`,
        isActiveToast: false,
      }),
  });
};

export const useCreateAttributeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: `/product-attributes`,
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال اتصال ویژگی‌ها...",
        successText: "ویژگی‌ها ذخیره شد",
      }),
    onSuccess: (_res, variables: any) => {
      if (variables?.productId) {
        queryClient.invalidateQueries({ queryKey: ["product-attributes"] });
      }
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

// Not Used
export const useUpdateAttributeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      fetcher({
        route: `/product-attributes/${id}`,
        method: "PATCH",
        body: data, // { productId, attributeId, valueIds? }
        isActiveToast: true,
        loadingText: "در حال بروزرسانی ویژگی...",
        successText: "ویژگی بروزرسانی شد",
      }),
    onSuccess: (_res, { data }) => {
      if (data?.productId) {
        queryClient.invalidateQueries({
          queryKey: ["product-attributes", data.productId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

export const useImportantAttributeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: `/product-attributes/important`,
        method: "PATCH",
        body: data,
        isActiveToast: false,
      }),
    onSuccess: (_res, { data }) => {
      if (data?.productId) {
        queryClient.invalidateQueries({
          queryKey: ["product-attributes", data.productId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};

// Not Used
export const useDeleteAttributeProduct = (productId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/product-attributes/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف ویژگی...",
        successText: "ویژگی حذف شد",
      }),
    onSuccess: () => {
      if (productId) {
        queryClient.invalidateQueries({
          queryKey: ["product-attributes", productId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
    },
  });
};
