import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

// Hookهای اصلی
export const useGetCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => fetcher({ route: "/admin/collections" }),
  });
};

export const useGetOneCollection = (id?: number) => {
  return useQuery({
    queryKey: ["collection", id],
    queryFn: () => fetcher({ route: `/admin/collections/${id}` }),
    enabled: !!id,
  });
};

export const useCreateCollection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/admin/collections",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال ایجاد مجموعه...",
        successText: "مجموعه با موفقیت ایجاد شد",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["collections"] }),
  });
};

export const useUpdateCollection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: number }) =>
      fetcher({
        route: `/admin/collections/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی مجموعه...",
        successText: "مجموعه با موفقیت بروزرسانی شد",
      }),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["collections"] });
      qc.invalidateQueries({ queryKey: ["collection", variables.id] });
    },
  });
};

export const useDeleteCollection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/collections/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف مجموعه...",
        successText: "مجموعه با موفقیت حذف شد",
      }),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["collections"] });
      qc.invalidateQueries({ queryKey: ["collection", id] });
    },
  });
};

// Hookهای مدیریت محصولات مجموعه
export const useAddProductsToCollection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, productIds }: { id: number; productIds: number[] }) =>
      fetcher({
        route: `/admin/collections/${id}/products`,
        method: "POST",
        body: { productIds },
        isActiveToast: true,
        loadingText: "در حال اضافه کردن محصولات...",
        successText: "محصولات با موفقیت اضافه شدند",
      }),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["collection", variables.id] });
      qc.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useRemoveProductFromCollection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ collectionId, productId }: { collectionId: number; productId: number }) =>
      fetcher({
        route: `/admin/collections/${collectionId}/products/${productId}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف محصول از مجموعه...",
        successText: "محصول با موفقیت حذف شد",
      }),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["collection", variables.collectionId] });
      qc.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

// Hook مدیریت ترتیب مجموعه‌ها (در صورت نیاز)
export const useUpdateCollectionsSortOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; sort_order: number }[]) =>
      fetcher({
        route: "/admin/collections/sort-order",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بروزرسانی ترتیب نمایش...",
        successText: "ترتیب مجموعه‌ها با موفقیت بروزرسانی شد",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["collections"] }),
  });
};